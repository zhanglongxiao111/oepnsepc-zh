# Codex 支持实现分析

## 概述

OpenSpec 对 Codex 的支持是通过一个专门的配置器类实现的，该类继承自基类并实现了 Codex 特定的配置逻辑。

## 核心架构

### 1. 类继承结构

```
SlashCommandConfigurator (抽象基类)
    ↓
CodexSlashCommandConfigurator (Codex 实现)
```

### 2. 文件位置

- **源代码**: `src/core/configurators/slash/codex.ts`
- **编译后**: `dist/core/configurators/slash/codex.js`
- **类型定义**: `dist/core/configurators/slash/codex.d.ts`

## Codex 配置器实现详解

### 核心特性

#### 1. 工具标识
```typescript
readonly toolId = "codex";
readonly isAvailable = true;
```

- `toolId`: 唯一标识符，用于注册和查找
- `isAvailable`: 标记该工具是否可用

#### 2. 文件路径配置

```typescript
const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: ".codex/prompts/openspec-proposal.md",
  apply: ".codex/prompts/openspec-apply.md",
  archive: ".codex/prompts/openspec-archive.md",
};
```

**注意**: 这些路径是相对路径，但实际上 Codex 使用**全局目录**。

#### 3. Frontmatter 配置

Codex 支持 YAML frontmatter，包含：
- `description`: 命令描述
- `argument-hint`: 参数提示
- `$ARGUMENTS`: 捕获所有参数

```typescript
protected getFrontmatter(id: SlashCommandId): string | undefined {
  const frontmatter: Record<SlashCommandId, string> = {
    proposal: `---
description: Scaffold a new OpenSpec change and validate strictly.
argument-hint: request or feature description
---

$ARGUMENTS`,
    // ... 其他命令
  };
  return frontmatter[id];
}
```

### Codex 的特殊之处：全局配置

#### 为什么 Codex 特殊？

**大多数工具**（如 Claude、Cursor、Auggie）：
- 配置文件存放在**项目目录**中
- 例如：`项目根目录/.claude/commands/openspec/proposal.md`

**Codex**：
- 配置文件存放在**全局目录**中
- 默认位置：`~/.codex/prompts/` (用户主目录)
- 可通过环境变量 `CODEX_HOME` 自定义

#### 全局目录获取逻辑

```typescript
private getGlobalPromptsDir(): string {
  const home = (process.env.CODEX_HOME && process.env.CODEX_HOME.trim())
    ? process.env.CODEX_HOME.trim()
    : FileSystemUtils.joinPath(os.homedir(), ".codex");
  return FileSystemUtils.joinPath(home, "prompts");
}
```

**逻辑**：
1. 检查环境变量 `CODEX_HOME`
2. 如果存在，使用 `$CODEX_HOME/prompts`
3. 如果不存在，使用 `~/.codex/prompts`

### 文件生成流程

#### generateAll() 方法

```typescript
async generateAll(projectPath: string, _openspecDir: string): Promise<string[]> {
  const createdOrUpdated: string[] = [];
  
  for (const target of this.getTargets()) {
    const body = TemplateManager.getSlashCommandBody(target.id).trim();
    const promptsDir = this.getGlobalPromptsDir();
    const filePath = FileSystemUtils.joinPath(
      promptsDir,
      path.basename(target.path)
    );

    await FileSystemUtils.createDirectory(path.dirname(filePath));

    if (await FileSystemUtils.fileExists(filePath)) {
      await this.updateFullFile(filePath, target.id, body);
    } else {
      const frontmatter = this.getFrontmatter(target.id);
      const sections: string[] = [];
      if (frontmatter) sections.push(frontmatter.trim());
      sections.push(`${OPENSPEC_MARKERS.start}\n${body}\n${OPENSPEC_MARKERS.end}`);
      await FileSystemUtils.writeFile(filePath, sections.join("\n") + "\n");
    }

    createdOrUpdated.push(target.path);
  }
  
  return createdOrUpdated;
}
```

**流程**：
1. 遍历所有命令（proposal, apply, archive）
2. 获取命令的主体内容（从模板管理器）
3. 确定全局目录路径
4. 如果文件已存在，更新内容
5. 如果文件不存在，创建新文件
6. 文件内容包含：frontmatter + OpenSpec 标记 + 主体内容

#### 文件结构示例

生成的文件结构：
```markdown
---
description: Scaffold a new OpenSpec change and validate strictly.
argument-hint: request or feature description
---

$ARGUMENTS
<!-- OPENSPEC:START -->
**护栏**
- 优先采用直接、最小化的实现...

**步骤**
1. 查看 `openspec/project.md`...

**参考**
- 当验证失败时...
<!-- OPENSPEC:END -->
```

### 更新机制

#### updateExisting() 方法

```typescript
async updateExisting(projectPath: string, _openspecDir: string): Promise<string[]> {
  const updated: string[] = [];
  
  for (const target of this.getTargets()) {
    const promptsDir = this.getGlobalPromptsDir();
    const filePath = FileSystemUtils.joinPath(
      promptsDir,
      path.basename(target.path)
    );
    
    if (await FileSystemUtils.fileExists(filePath)) {
      const body = TemplateManager.getSlashCommandBody(target.id).trim();
      await this.updateFullFile(filePath, target.id, body);
      updated.push(target.path);
    }
  }
  
  return updated;
}
```

**用途**：
- 当运行 `openspec update` 时调用
- 只更新已存在的文件
- 不创建新文件

#### updateFullFile() 方法

```typescript
private async updateFullFile(filePath: string, id: SlashCommandId, body: string): Promise<void> {
  const content = await FileSystemUtils.readFile(filePath);
  const startIndex = content.indexOf(OPENSPEC_MARKERS.start);

  if (startIndex === -1) {
    throw new Error(`Missing OpenSpec start marker in ${filePath}`);
  }

  // 替换 frontmatter 和 body
  const frontmatter = this.getFrontmatter(id);
  const sections: string[] = [];
  if (frontmatter) sections.push(frontmatter.trim());
  sections.push(`${OPENSPEC_MARKERS.start}\n${body}\n${OPENSPEC_MARKERS.end}`);

  await FileSystemUtils.writeFile(filePath, sections.join("\n") + "\n");
}
```

**特点**：
- 完全替换文件内容（包括 frontmatter）
- 保留 OpenSpec 标记
- 确保内容始终是最新的

### 路径解析

#### resolveAbsolutePath() 方法

```typescript
resolveAbsolutePath(_projectPath: string, id: SlashCommandId): string {
  const promptsDir = this.getGlobalPromptsDir();
  const fileName = path.basename(FILE_PATHS[id]);
  return FileSystemUtils.joinPath(promptsDir, fileName);
}
```

**作用**：
- 将相对路径转换为绝对路径
- 用于检测配置文件是否存在
- **注意**：忽略 `projectPath` 参数，因为 Codex 使用全局目录

## 注册机制

### SlashCommandRegistry

```typescript
// src/core/configurators/slash/registry.ts
export class SlashCommandRegistry {
  private static configurators: Map<string, SlashCommandConfigurator> = new Map();

  static {
    // ... 其他工具
    const codex = new CodexSlashCommandConfigurator();
    // ...
    
    this.configurators.set(codex.toolId, codex);
  }

  static get(toolId: string): SlashCommandConfigurator | undefined {
    return this.configurators.get(toolId);
  }
}
```

**机制**：
1. 使用静态初始化块自动注册所有配置器
2. 通过 `toolId` 作为键存储在 Map 中
3. 通过 `get(toolId)` 方法获取配置器

## 使用流程

### 初始化时

```typescript
// src/core/init.ts
private async configureAITools(
  projectPath: string,
  openspecDir: string,
  toolIds: string[]
): Promise<RootStubStatus> {
  // ...
  
  for (const toolId of toolIds) {
    // 获取 Slash 命令配置器
    const slashConfigurator = SlashCommandRegistry.get(toolId);
    if (slashConfigurator && slashConfigurator.isAvailable) {
      await slashConfigurator.generateAll(projectPath, openspecDir);
    }
  }
  
  // ...
}
```

**流程**：
1. 用户运行 `openspec init --tools codex`
2. 系统从注册表获取 `CodexSlashCommandConfigurator`
3. 调用 `generateAll()` 方法
4. 在 `~/.codex/prompts/` 目录生成 3 个文件

### 更新时

```typescript
// 用户运行 openspec update
const slashConfigurator = SlashCommandRegistry.get('codex');
if (slashConfigurator) {
  await slashConfigurator.updateExisting(projectPath, openspecDir);
}
```

## 与其他工具的对比

| 特性 | Codex | Claude/Cursor/Auggie |
|------|-------|---------------------|
| 配置位置 | 全局目录 (`~/.codex/prompts/`) | 项目目录 (`.claude/`, `.cursor/`, `.augment/`) |
| 环境变量 | `CODEX_HOME` | 无 |
| Frontmatter | YAML + `$ARGUMENTS` | 各工具特定格式 |
| 更新方式 | 完全替换文件 | 只更新标记之间的内容 |
| 路径解析 | 忽略项目路径 | 基于项目路径 |

## 实际生成的文件

### 位置
```
~/.codex/prompts/
├── openspec-proposal.md
├── openspec-apply.md
└── openspec-archive.md
```

### 内容示例（汉化后）

```markdown
---
description: Scaffold a new OpenSpec change and validate strictly.
argument-hint: request or feature description
---

$ARGUMENTS
<!-- OPENSPEC:START -->
**护栏**
- 优先采用直接、最小化的实现，仅在明确请求或明显需要时才添加复杂性。
- 将变更严格限定在请求的结果范围内。

**步骤**
1. 查看 `openspec/project.md`，运行 `openspec list` 和 `openspec list --specs`
2. 选择唯一的动词开头的 `change-id`
...

**参考**
- 当验证失败时，使用 `openspec show <id> --json --deltas-only`
...
<!-- OPENSPEC:END -->
```

## 总结

Codex 的支持实现展示了 OpenSpec 的灵活架构：

1. **抽象基类**：定义通用接口和默认行为
2. **工具特定实现**：每个工具可以覆盖特定方法
3. **注册机制**：统一管理所有工具配置器
4. **全局 vs 本地**：支持不同的配置存储策略

Codex 的特殊之处在于使用全局配置目录，这使得配置可以跨项目共享，但实现上只需要覆盖几个关键方法即可。

