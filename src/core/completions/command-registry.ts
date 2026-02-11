import { CommandDefinition, FlagDefinition } from './types.js';

/**
 * Common flags used across multiple commands
 */
const COMMON_FLAGS = {
  json: {
    name: 'json',
    description: '以 JSON 格式输出',
  } as FlagDefinition,
  jsonValidation: {
    name: 'json',
    description: '以 JSON 格式输出验证结果',
  } as FlagDefinition,
  strict: {
    name: 'strict',
    description: '启用严格验证模式',
  } as FlagDefinition,
  noInteractive: {
    name: 'no-interactive',
    description: '禁用交互式提示',
  } as FlagDefinition,
  type: {
    name: 'type',
    description: '当存在歧义时指定项目类型',
    takesValue: true,
    values: ['change', 'spec'],
  } as FlagDefinition,
} as const;

/**
 * Registry of all OpenSpec CLI commands with their flags and metadata.
 * This registry is used to generate shell completion scripts.
 */
export const COMMAND_REGISTRY: CommandDefinition[] = [
  {
    name: 'init',
    description: '在你的项目中初始化 OpenSpec',
    acceptsPositional: true,
    positionalType: 'path',
    flags: [
      {
        name: 'tools',
        description: '非交互式配置 AI 工具（例如 "all"、"none" 或逗号分隔的工具 ID）',
        takesValue: true,
      },
    ],
  },
  {
    name: 'update',
    description: '更新 OpenSpec 指令文件',
    acceptsPositional: true,
    positionalType: 'path',
    flags: [],
  },
  {
    name: 'list',
    description: '列出项目（默认为变更，使用 --specs 列出规范）',
    flags: [
      {
        name: 'specs',
        description: '列出规范而不是变更',
      },
      {
        name: 'changes',
        description: '明确列出变更（默认）',
      },
    ],
  },
  {
    name: 'view',
    description: '显示规范和变更的交互式仪表盘',
    flags: [],
  },
  {
    name: 'validate',
    description: '验证变更和规范',
    acceptsPositional: true,
    positionalType: 'change-or-spec-id',
    flags: [
      {
        name: 'all',
        description: '验证所有变更和规范',
      },
      {
        name: 'changes',
        description: '验证所有变更',
      },
      {
        name: 'specs',
        description: '验证所有规范',
      },
      COMMON_FLAGS.type,
      COMMON_FLAGS.strict,
      COMMON_FLAGS.jsonValidation,
      {
        name: 'concurrency',
        description: '最大并发验证数（默认为环境变量 OPENSPEC_CONCURRENCY 或 6）',
        takesValue: true,
      },
      COMMON_FLAGS.noInteractive,
    ],
  },
  {
    name: 'show',
    description: '显示变更或规范',
    acceptsPositional: true,
    positionalType: 'change-or-spec-id',
    flags: [
      COMMON_FLAGS.json,
      COMMON_FLAGS.type,
      COMMON_FLAGS.noInteractive,
      {
        name: 'deltas-only',
        description: '仅显示 delta（仅 JSON，变更专用）',
      },
      {
        name: 'requirements-only',
        description: '--deltas-only 的别名（已弃用，变更专用）',
      },
      {
        name: 'requirements',
        description: '仅显示需求，排除场景（仅 JSON，规范专用）',
      },
      {
        name: 'no-scenarios',
        description: '排除场景内容（仅 JSON，规范专用）',
      },
      {
        name: 'requirement',
        short: 'r',
        description: '按 ID 显示特定需求（仅 JSON，规范专用）',
        takesValue: true,
      },
    ],
  },
  {
    name: 'archive',
    description: '归档已完成的变更并更新主规范',
    acceptsPositional: true,
    positionalType: 'change-id',
    flags: [
      {
        name: 'yes',
        short: 'y',
        description: '跳过确认提示',
      },
      {
        name: 'skip-specs',
        description: '跳过规范更新操作',
      },
      {
        name: 'no-validate',
        description: '跳过验证（不推荐）',
      },
    ],
  },
  {
    name: 'feedback',
    description: 'Submit feedback about OpenSpec',
    acceptsPositional: true,
    flags: [
      {
        name: 'body',
        description: 'Detailed description for the feedback',
        takesValue: true,
      },
    ],
  },
  {
    name: 'change',
    description: '管理 OpenSpec 变更提案（已弃用）',
    flags: [],
    subcommands: [
      {
        name: 'show',
        description: '显示变更提案',
        acceptsPositional: true,
        positionalType: 'change-id',
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'deltas-only',
            description: '仅显示 delta（仅 JSON）',
          },
          {
            name: 'requirements-only',
            description: '--deltas-only 的别名（已弃用）',
          },
          COMMON_FLAGS.noInteractive,
        ],
      },
      {
        name: 'list',
        description: '列出所有活跃变更（已弃用）',
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'long',
            description: '显示 ID、标题和计数',
          },
        ],
      },
      {
        name: 'validate',
        description: '验证变更提案',
        acceptsPositional: true,
        positionalType: 'change-id',
        flags: [
          COMMON_FLAGS.strict,
          COMMON_FLAGS.jsonValidation,
          COMMON_FLAGS.noInteractive,
        ],
      },
    ],
  },
  {
    name: 'spec',
    description: '管理 OpenSpec 规范',
    flags: [],
    subcommands: [
      {
        name: 'show',
        description: '显示规范',
        acceptsPositional: true,
        positionalType: 'spec-id',
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'requirements',
            description: '仅显示需求，排除场景（仅 JSON）',
          },
          {
            name: 'no-scenarios',
            description: '排除场景内容（仅 JSON）',
          },
          {
            name: 'requirement',
            short: 'r',
            description: '按 ID 显示特定需求（仅 JSON）',
            takesValue: true,
          },
          COMMON_FLAGS.noInteractive,
        ],
      },
      {
        name: 'list',
        description: '列出所有规范',
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'long',
            description: '显示 ID、标题和计数',
          },
        ],
      },
      {
        name: 'validate',
        description: '验证规范',
        acceptsPositional: true,
        positionalType: 'spec-id',
        flags: [
          COMMON_FLAGS.strict,
          COMMON_FLAGS.jsonValidation,
          COMMON_FLAGS.noInteractive,
        ],
      },
    ],
  },
  {
    name: 'completion',
    description: '管理 OpenSpec CLI 的 shell 自动补全',
    flags: [],
    subcommands: [
      {
        name: 'generate',
        description: '为指定 shell 生成补全脚本（输出到 stdout）',
        acceptsPositional: true,
        positionalType: 'shell',
        flags: [],
      },
      {
        name: 'install',
        description: '为指定 shell 安装补全脚本',
        acceptsPositional: true,
        positionalType: 'shell',
        flags: [
          {
            name: 'verbose',
            description: '显示详细安装输出',
          },
        ],
      },
      {
        name: 'uninstall',
        description: '为指定 shell 卸载补全脚本',
        acceptsPositional: true,
        positionalType: 'shell',
        flags: [
          {
            name: 'yes',
            short: 'y',
            description: 'Skip confirmation prompts',
          },
        ],
      },
    ],
  },
  {
    name: 'config',
    description: 'View and modify global OpenSpec configuration',
    flags: [
      {
        name: 'scope',
        description: 'Config scope (only "global" supported currently)',
        takesValue: true,
        values: ['global'],
      },
    ],
    subcommands: [
      {
        name: 'path',
        description: 'Show config file location',
        flags: [],
      },
      {
        name: 'list',
        description: 'Show all current settings',
        flags: [
          COMMON_FLAGS.json,
        ],
      },
      {
        name: 'get',
        description: 'Get a specific value (raw, scriptable)',
        acceptsPositional: true,
        flags: [],
      },
      {
        name: 'set',
        description: 'Set a value (auto-coerce types)',
        acceptsPositional: true,
        flags: [
          {
            name: 'string',
            description: 'Force value to be stored as string',
          },
          {
            name: 'allow-unknown',
            description: 'Allow setting unknown keys',
          },
        ],
      },
      {
        name: 'unset',
        description: 'Remove a key (revert to default)',
        acceptsPositional: true,
        flags: [],
      },
      {
        name: 'reset',
        description: 'Reset configuration to defaults',
        flags: [
          {
            name: 'all',
            description: 'Reset all configuration (required)',
          },
          {
            name: 'yes',
            short: 'y',
            description: 'Skip confirmation prompts',
          },
        ],
      },
      {
        name: 'edit',
        description: 'Open config in $EDITOR',
        flags: [],
      },
    ],
  },
  {
    name: 'schema',
    description: 'Manage workflow schemas',
    flags: [],
    subcommands: [
      {
        name: 'which',
        description: 'Show where a schema resolves from',
        acceptsPositional: true,
        positionalType: 'schema-name',
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'all',
            description: 'List all schemas with their resolution sources',
          },
        ],
      },
      {
        name: 'validate',
        description: 'Validate a schema structure and templates',
        acceptsPositional: true,
        positionalType: 'schema-name',
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'verbose',
            description: 'Show detailed validation steps',
          },
        ],
      },
      {
        name: 'fork',
        description: 'Copy an existing schema to project for customization',
        acceptsPositional: true,
        positionalType: 'schema-name',
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'force',
            description: 'Overwrite existing destination',
          },
        ],
      },
      {
        name: 'init',
        description: 'Create a new project-local schema',
        acceptsPositional: true,
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'description',
            description: 'Schema description',
            takesValue: true,
          },
          {
            name: 'artifacts',
            description: 'Comma-separated artifact IDs',
            takesValue: true,
          },
          {
            name: 'default',
            description: 'Set as project default schema',
          },
          {
            name: 'no-default',
            description: 'Do not prompt to set as default',
          },
          {
            name: 'force',
            description: 'Overwrite existing schema',
          },
        ],
      },
    ],
  },
];
