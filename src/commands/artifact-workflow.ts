/**
 * Artifact Workflow CLI Commands (Experimental)
 *
 * This file contains all artifact workflow commands in isolation for easy removal.
 * Commands expose the ArtifactGraph and InstructionLoader APIs to users and agents.
 *
 * To remove this feature:
 * 1. Delete this file
 * 2. Remove the registerArtifactWorkflowCommands() call from src/cli/index.ts
 */

import type { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';
import * as fs from 'fs';
import {
  loadChangeContext,
  formatChangeStatus,
  generateInstructions,
  listSchemas,
  getSchemaDir,
  resolveSchema,
  ArtifactGraph,
  type ChangeStatus,
  type ArtifactInstructions,
} from '../core/artifact-graph/index.js';
import { createChange, validateChangeName } from '../utils/change-utils.js';

const DEFAULT_SCHEMA = 'spec-driven';

/**
 * Checks if color output is disabled via NO_COLOR env or --no-color flag.
 */
function isColorDisabled(): boolean {
  return process.env.NO_COLOR === '1' || process.env.NO_COLOR === 'true';
}

/**
 * Gets the color function based on status.
 */
function getStatusColor(status: 'done' | 'ready' | 'blocked'): (text: string) => string {
  if (isColorDisabled()) {
    return (text: string) => text;
  }
  switch (status) {
    case 'done':
      return chalk.green;
    case 'ready':
      return chalk.yellow;
    case 'blocked':
      return chalk.red;
  }
}

/**
 * Gets the status indicator for an artifact.
 */
function getStatusIndicator(status: 'done' | 'ready' | 'blocked'): string {
  const color = getStatusColor(status);
  switch (status) {
    case 'done':
      return color('[x]');
    case 'ready':
      return color('[ ]');
    case 'blocked':
      return color('[-]');
  }
}

/**
 * Validates that a change exists and returns available changes if not.
 * Checks directory existence directly to support scaffolded changes (without proposal.md).
 */
async function validateChangeExists(
  changeName: string | undefined,
  projectRoot: string
): Promise<string> {
  const changesPath = path.join(projectRoot, 'openspec', 'changes');

  // Get all change directories (not just those with proposal.md)
  const getAvailableChanges = async (): Promise<string[]> => {
    try {
      const entries = await fs.promises.readdir(changesPath, { withFileTypes: true });
      return entries
        .filter((e) => e.isDirectory() && e.name !== 'archive' && !e.name.startsWith('.'))
        .map((e) => e.name);
    } catch {
      return [];
    }
  };

  if (!changeName) {
    const available = await getAvailableChanges();
    if (available.length === 0) {
      throw new Error('未找到变更。请使用以下命令创建：openspec new change <name>');
    }
    throw new Error(
      `缺少必需选项 --change。可用的变更：\n  ${available.join('\n  ')}`
    );
  }

  // Validate change name format to prevent path traversal
  const nameValidation = validateChangeName(changeName);
  if (!nameValidation.valid) {
    throw new Error(`Invalid change name '${changeName}': ${nameValidation.error}`);
  }

  // Check directory existence directly
  const changePath = path.join(changesPath, changeName);
  const exists = fs.existsSync(changePath) && fs.statSync(changePath).isDirectory();

  if (!exists) {
    const available = await getAvailableChanges();
    if (available.length === 0) {
      throw new Error(
        `变更 '${changeName}' 未找到。当前没有任何变更。请使用以下命令创建：openspec new change <name>`
      );
    }
    throw new Error(
      `变更 '${changeName}' 未找到。可用的变更：\n  ${available.join('\n  ')}`
    );
  }

  return changeName;
}

/**
 * Validates that a schema exists and returns available schemas if not.
 */
function validateSchemaExists(schemaName: string): string {
  const schemaDir = getSchemaDir(schemaName);
  if (!schemaDir) {
    const availableSchemas = listSchemas();
    throw new Error(
      `模式 '${schemaName}' 未找到。可用的模式：\n  ${availableSchemas.join('\n  ')}`
    );
  }
  return schemaName;
}

// -----------------------------------------------------------------------------
// Status Command
// -----------------------------------------------------------------------------

interface StatusOptions {
  change?: string;
  schema?: string;
  json?: boolean;
}

async function statusCommand(options: StatusOptions): Promise<void> {
  const spinner = ora('正在加载变更状态...').start();

  try {
    const projectRoot = process.cwd();
    const changeName = await validateChangeExists(options.change, projectRoot);
    const schemaName = validateSchemaExists(options.schema ?? DEFAULT_SCHEMA);

    const context = loadChangeContext(projectRoot, changeName, schemaName);
    const status = formatChangeStatus(context);

    spinner.stop();

    if (options.json) {
      console.log(JSON.stringify(status, null, 2));
      return;
    }

    printStatusText(status);
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

function printStatusText(status: ChangeStatus): void {
  const doneCount = status.artifacts.filter((a) => a.status === 'done').length;
  const total = status.artifacts.length;

  console.log(`变更：${status.changeName}`);
  console.log(`模式：${status.schemaName}`);
  console.log(`进度：${doneCount}/${total} 个工件已完成`);
  console.log();

  for (const artifact of status.artifacts) {
    const indicator = getStatusIndicator(artifact.status);
    const color = getStatusColor(artifact.status);
    let line = `${indicator} ${artifact.id}`;

    if (artifact.status === 'blocked' && artifact.missingDeps && artifact.missingDeps.length > 0) {
      line += color(` (被以下依赖阻塞：${artifact.missingDeps.join(', ')})`);
    }

    console.log(line);
  }

  if (status.isComplete) {
    console.log();
    console.log(chalk.green('所有工件已完成！'));
  }
}

// -----------------------------------------------------------------------------
// Next Command
// -----------------------------------------------------------------------------

interface NextOptions {
  change?: string;
  schema?: string;
  json?: boolean;
}

async function nextCommand(options: NextOptions): Promise<void> {
  const spinner = ora('正在查找下一个工件...').start();

  try {
    const projectRoot = process.cwd();
    const changeName = await validateChangeExists(options.change, projectRoot);
    const schemaName = validateSchemaExists(options.schema ?? DEFAULT_SCHEMA);

    const context = loadChangeContext(projectRoot, changeName, schemaName);
    const ready = context.graph.getNextArtifacts(context.completed);
    const isComplete = context.graph.isComplete(context.completed);

    spinner.stop();

    if (options.json) {
      console.log(JSON.stringify(ready, null, 2));
      return;
    }

    if (isComplete) {
      console.log(chalk.green('所有工件已完成！'));
      return;
    }

    if (ready.length === 0) {
      console.log('没有工件就绪。所有剩余工件都被阻塞。');
      console.log('运行 `openspec status --change ' + changeName + '` 查看阻塞的依赖项。');
      return;
    }

    console.log('可以创建的工件：');
    for (const artifactId of ready) {
      const color = getStatusColor('ready');
      console.log(color(`  ${artifactId}`));
    }
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

// -----------------------------------------------------------------------------
// Instructions Command
// -----------------------------------------------------------------------------

interface InstructionsOptions {
  change?: string;
  schema?: string;
  json?: boolean;
}

async function instructionsCommand(
  artifactId: string | undefined,
  options: InstructionsOptions
): Promise<void> {
  const spinner = ora('正在生成指令...').start();

  try {
    const projectRoot = process.cwd();
    const changeName = await validateChangeExists(options.change, projectRoot);
    const schemaName = validateSchemaExists(options.schema ?? DEFAULT_SCHEMA);

    if (!artifactId) {
      spinner.stop();
      const schema = resolveSchema(schemaName);
      const graph = ArtifactGraph.fromSchema(schema);
      const validIds = graph.getAllArtifacts().map((a) => a.id);
      throw new Error(
        `缺少必需参数 <artifact>。有效的工件：\n  ${validIds.join('\n  ')}`
      );
    }

    const context = loadChangeContext(projectRoot, changeName, schemaName);
    const artifact = context.graph.getArtifact(artifactId);

    if (!artifact) {
      spinner.stop();
      const validIds = context.graph.getAllArtifacts().map((a) => a.id);
      throw new Error(
        `工件 '${artifactId}' 在模式 '${schemaName}' 中未找到。有效的工件：\n  ${validIds.join('\n  ')}`
      );
    }

    const instructions = generateInstructions(context, artifactId);
    const isBlocked = instructions.dependencies.some((d) => !d.done);

    spinner.stop();

    if (options.json) {
      console.log(JSON.stringify(instructions, null, 2));
      return;
    }

    printInstructionsText(instructions, isBlocked);
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

function printInstructionsText(instructions: ArtifactInstructions, isBlocked: boolean): void {
  const {
    artifactId,
    changeName,
    schemaName,
    changeDir,
    outputPath,
    description,
    instruction,
    template,
    dependencies,
    unlocks,
  } = instructions;

  // Opening tag
  console.log(`<artifact id="${artifactId}" change="${changeName}" schema="${schemaName}">`);
  console.log();

  // Warning for blocked artifacts
  if (isBlocked) {
    const missing = dependencies.filter((d) => !d.done).map((d) => d.id);
    console.log('<warning>');
    console.log('此工件存在未满足的依赖。请先完成它们或谨慎继续。');
    console.log(`缺少：${missing.join(', ')}`);
    console.log('</warning>');
    console.log();
  }

  // Task directive
  console.log('<task>');
  console.log(`为变更 "${changeName}" 创建 ${artifactId} 工件。`);
  console.log(description);
  console.log('</task>');
  console.log();

  // Context (dependencies)
  if (dependencies.length > 0) {
    console.log('<context>');
    console.log('在创建此工件之前，请先阅读以下文件以获取上下文：');
    console.log();
    for (const dep of dependencies) {
      const status = dep.done ? 'done' : 'missing';
      const fullPath = path.join(changeDir, dep.path);
      console.log(`<dependency id="${dep.id}" status="${status}">`);
      console.log(`  <path>${fullPath}</path>`);
      console.log(`  <description>${dep.description}</description>`);
      console.log('</dependency>');
    }
    console.log('</context>');
    console.log();
  }

  // Output location
  console.log('<output>');
  console.log(`写入到：${path.join(changeDir, outputPath)}`);
  console.log('</output>');
  console.log();

  // Instruction (guidance)
  if (instruction) {
    console.log('<instruction>');
    console.log(instruction.trim());
    console.log('</instruction>');
    console.log();
  }

  // Template
  console.log('<template>');
  console.log(template.trim());
  console.log('</template>');
  console.log();

  // Success criteria placeholder
  console.log('<success_criteria>');
  console.log('<!-- To be defined in schema validation rules -->');
  console.log('</success_criteria>');
  console.log();

  // Unlocks
  if (unlocks.length > 0) {
    console.log('<unlocks>');
    console.log(`完成此工件后可解锁：${unlocks.join(', ')}`);
    console.log('</unlocks>');
    console.log();
  }

  // Closing tag
  console.log('</artifact>');
}

// -----------------------------------------------------------------------------
// Templates Command
// -----------------------------------------------------------------------------

interface TemplatesOptions {
  schema?: string;
  json?: boolean;
}

interface TemplateInfo {
  artifactId: string;
  templatePath: string;
  source: 'user' | 'package';
}

async function templatesCommand(options: TemplatesOptions): Promise<void> {
  const spinner = ora('正在加载模板...').start();

  try {
    const schemaName = validateSchemaExists(options.schema ?? DEFAULT_SCHEMA);
    const schema = resolveSchema(schemaName);
    const graph = ArtifactGraph.fromSchema(schema);
    const schemaDir = getSchemaDir(schemaName)!;

    // Determine if this is a user override or package built-in
    const { getUserSchemasDir } = await import('../core/artifact-graph/resolver.js');
    const userSchemasDir = getUserSchemasDir();
    const isUserOverride = schemaDir.startsWith(userSchemasDir);

    const templates: TemplateInfo[] = graph.getAllArtifacts().map((artifact) => ({
      artifactId: artifact.id,
      templatePath: path.join(schemaDir, 'templates', artifact.template),
      source: isUserOverride ? 'user' : 'package',
    }));

    spinner.stop();

    if (options.json) {
      const output: Record<string, { path: string; source: string }> = {};
      for (const t of templates) {
        output[t.artifactId] = { path: t.templatePath, source: t.source };
      }
      console.log(JSON.stringify(output, null, 2));
      return;
    }

    console.log(`模式：${schemaName}`);
    console.log(`来源：${isUserOverride ? '用户覆盖' : '内置包'}`);
    console.log();

    for (const t of templates) {
      console.log(`${t.artifactId}:`);
      console.log(`  ${t.templatePath}`);
    }
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

// -----------------------------------------------------------------------------
// New Change Command
// -----------------------------------------------------------------------------

interface NewChangeOptions {
  description?: string;
}

async function newChangeCommand(name: string | undefined, options: NewChangeOptions): Promise<void> {
  if (!name) {
    throw new Error('缺少必需参数 <name>');
  }

  const validation = validateChangeName(name);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const spinner = ora(`正在创建变更 '${name}'...`).start();

  try {
    const projectRoot = process.cwd();
    await createChange(projectRoot, name);

    // If description provided, create README.md with description
    if (options.description) {
      const { promises: fs } = await import('fs');
      const changeDir = path.join(projectRoot, 'openspec', 'changes', name);
      const readmePath = path.join(changeDir, 'README.md');
      await fs.writeFile(readmePath, `# ${name}\n\n${options.description}\n`, 'utf-8');
    }

    spinner.succeed(`已创建变更 '${name}' 于 openspec/changes/${name}/`);
  } catch (error) {
    spinner.fail(`创建变更 '${name}' 失败`);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// Command Registration
// -----------------------------------------------------------------------------

/**
 * Registers all artifact workflow commands on the given program.
 * All commands are marked as experimental in their help text.
 */
export function registerArtifactWorkflowCommands(program: Command): void {
  // Status command
  program
    .command('status')
    .description('[实验性] 显示变更的工件完成状态')
    .option('--change <id>', '要显示状态的变更名称')
    .option('--schema <name>', `使用的模式（默认：${DEFAULT_SCHEMA}）`)
    .option('--json', '以 JSON 格式输出')
    .action(async (options: StatusOptions) => {
      try {
        await statusCommand(options);
      } catch (error) {
        console.log();
        ora().fail(`错误：${(error as Error).message}`);
        process.exit(1);
      }
    });

  // Next command
  program
    .command('next')
    .description('[实验性] 显示可以创建的工件')
    .option('--change <id>', '要检查的变更名称')
    .option('--schema <name>', `使用的模式（默认：${DEFAULT_SCHEMA}）`)
    .option('--json', '以 JSON 数组格式输出就绪的工件 ID')
    .action(async (options: NextOptions) => {
      try {
        await nextCommand(options);
      } catch (error) {
        console.log();
        ora().fail(`错误：${(error as Error).message}`);
        process.exit(1);
      }
    });

  // Instructions command
  program
    .command('instructions [artifact]')
    .description('[实验性] 输出创建工件的详细指令')
    .option('--change <id>', '变更名称')
    .option('--schema <name>', `使用的模式（默认：${DEFAULT_SCHEMA}）`)
    .option('--json', '以 JSON 格式输出')
    .action(async (artifactId: string | undefined, options: InstructionsOptions) => {
      try {
        await instructionsCommand(artifactId, options);
      } catch (error) {
        console.log();
        ora().fail(`错误：${(error as Error).message}`);
        process.exit(1);
      }
    });

  // Templates command
  program
    .command('templates')
    .description('[实验性] 显示模式中所有工件的已解析模板路径')
    .option('--schema <name>', `使用的模式（默认：${DEFAULT_SCHEMA}）`)
    .option('--json', '以 JSON 格式输出工件 ID 到模板路径的映射')
    .action(async (options: TemplatesOptions) => {
      try {
        await templatesCommand(options);
      } catch (error) {
        console.log();
        ora().fail(`错误：${(error as Error).message}`);
        process.exit(1);
      }
    });

  // New command group with change subcommand
  const newCmd = program.command('new').description('[实验性] 创建新项目');

  newCmd
    .command('change <name>')
    .description('[实验性] 创建新的变更目录')
    .option('--description <text>', '添加到 README.md 的描述')
    .action(async (name: string, options: NewChangeOptions) => {
      try {
        await newChangeCommand(name, options);
      } catch (error) {
        console.log();
        ora().fail(`错误：${(error as Error).message}`);
        process.exit(1);
      }
    });
}
