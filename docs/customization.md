# 自定义配置

OpenSpec 提供三个层级的自定义：

| 层级 | 作用 | 适用场景 |
|------|------|---------|
| **项目配置** | 设置默认值，注入上下文/规则 | 大多数团队 |
| **自定义 Schema** | 定义你自己的工作流工件 | 有独特流程的团队 |
| **全局覆盖** | 跨项目共享 Schema | 高级用户 |

---

## 项目配置

`openspec/config.yaml` 文件是为你的团队自定义 OpenSpec 的最简方式。它可以：

- **设置默认 Schema** — 无需在每个命令上指定 `--schema`
- **注入项目上下文** — AI 能看到你的技术栈、规范等
- **添加每工件规则** — 为特定工件添加自定义规则

### 快速设置

```bash
openspec init
```

这会引导你交互式地创建配置。或者手动创建：

```yaml
# openspec/config.yaml
schema: spec-driven

context: |
  技术栈：TypeScript、React、Node.js、PostgreSQL
  API 风格：RESTful，文档在 docs/api.md
  测试：Jest + React Testing Library
  我们重视所有公共 API 的向后兼容性

rules:
  proposal:
    - 包含回退计划
    - 标识受影响的团队
  specs:
    - 使用 Given/When/Then 格式
    - 在发明新模式之前参考现有模式
```

### 工作原理

**默认 Schema：**

```bash
# 无配置时
openspec new change my-feature --schema spec-driven

# 有配置后 — Schema 自动生效
openspec new change my-feature
```

**上下文和规则注入：**

生成任何工件时，你的上下文和规则会被注入到 AI 提示中：

```xml
<context>
技术栈：TypeScript、React、Node.js、PostgreSQL
...
</context>

<rules>
- 包含回退计划
- 标识受影响的团队
</rules>

<template>
[Schema 的内置模板]
</template>
```

- **上下文**出现在**所有**工件中
- **规则****仅**出现在匹配的工件中

### Schema 解析顺序

当 OpenSpec 需要确定 Schema 时，按以下顺序检查：

1. CLI 参数：`--schema <name>`
2. 变更元数据（变更文件夹中的 `.openspec.yaml`）
3. 项目配置（`openspec/config.yaml`）
4. 默认值（`spec-driven`）

---

## 自定义 Schema

当项目配置不够用时，可以创建完全自定义工作流的 Schema。自定义 Schema 存放在项目的 `openspec/schemas/` 目录中，随代码一起版本控制。

```text
your-project/
├── openspec/
│   ├── config.yaml        # 项目配置
│   ├── schemas/           # 自定义 Schema 在这里
│   │   └── my-workflow/
│   │       ├── schema.yaml
│   │       └── templates/
│   └── changes/           # 你的变更
└── src/
```

### Fork 现有 Schema

最快的自定义方式是 fork 一个内置 Schema：

```bash
openspec schema fork spec-driven my-workflow
```

这会将整个 `spec-driven` Schema 复制到 `openspec/schemas/my-workflow/`，你可以自由编辑。

**你将得到：**

```text
openspec/schemas/my-workflow/
├── schema.yaml           # 工作流定义
└── templates/
    ├── proposal.md       # 提案工件的模板
    ├── spec.md           # 规范的模板
    ├── design.md         # 设计的模板
    └── tasks.md          # 任务的模板
```

编辑 `schema.yaml` 来改变工作流，或编辑模板来改变 AI 生成的内容。

### 从零创建 Schema

创建全新的工作流：

```bash
# 交互式
openspec schema init research-first

# 非交互式
openspec schema init rapid \
  --description "快速迭代工作流" \
  --artifacts "proposal,tasks" \
  --default
```

### Schema 结构

Schema 定义了工作流中的工件类型及其依赖关系：

```yaml
# openspec/schemas/my-workflow/schema.yaml
name: my-workflow
version: 1
description: 我们团队的自定义工作流

artifacts:
  - id: proposal
    generates: proposal.md
    description: 初始提案文档
    template: proposal.md
    instruction: |
      创建一份解释为什么需要这个变更的提案。
      聚焦于问题，而非解决方案。
    requires: []

  - id: design
    generates: design.md
    description: 技术设计
    template: design.md
    instruction: |
      创建一份说明如何实施的设计文档。
    requires:
      - proposal    # 提案完成后才能创建设计

  - id: tasks
    generates: tasks.md
    description: 实施清单
    template: tasks.md
    requires:
      - design

apply:
  requires: [tasks]
  tracks: tasks.md
```

**关键字段：**

| 字段 | 用途 |
|------|------|
| `id` | 唯一标识符，用于命令和规则 |
| `generates` | 输出文件名（支持 glob 如 `specs/**/*.md`） |
| `template` | `templates/` 目录中的模板文件 |
| `instruction` | 创建此工件时的 AI 指令 |
| `requires` | 依赖项 — 哪些工件必须先存在 |

### 模板

模板是引导 AI 的 Markdown 文件。创建工件时会被注入到提示中。

```markdown
<!-- templates/proposal.md -->
## 为什么

<!-- 解释这个变更的动机。它解决了什么问题？ -->

## 变更内容

<!-- 描述将要改变什么。具体说明新功能或修改。 -->

## 影响

<!-- 受影响的代码、API、依赖、系统 -->
```

模板可以包含：
- AI 应该填写的章节标题
- 为 AI 提供指导的 HTML 注释
- 展示预期结构的示例格式

### 验证你的 Schema

在使用自定义 Schema 之前，先验证它：

```bash
openspec schema validate my-workflow
```

这会检查：
- `schema.yaml` 语法正确
- 所有引用的模板存在
- 没有循环依赖
- 工件 ID 有效

### 使用你的自定义 Schema

创建后，通过以下方式使用你的 Schema：

```bash
# 在命令中指定
openspec new change feature --schema my-workflow

# 或在 config.yaml 中设为默认
schema: my-workflow
```

### 调试 Schema 解析

不确定使用了哪个 Schema？用以下命令检查：

```bash
# 查看特定 Schema 的来源
openspec schema which my-workflow

# 列出所有 Schema 及其来源
openspec schema which --all
```

输出会显示它来自项目、用户目录还是包：

```text
Schema: my-workflow
Source: project
Path: /path/to/project/openspec/schemas/my-workflow
```

---

> **注意：** OpenSpec 也支持用户级 Schema（位于 `~/.local/share/openspec/schemas/`），用于跨项目共享，但推荐使用项目级 Schema（`openspec/schemas/`），因为它们随代码版本控制。

---

## 示例

### 快速迭代工作流

一个最小化的快速迭代工作流：

```yaml
# openspec/schemas/rapid/schema.yaml
name: rapid
version: 1
description: 最小开销的快速迭代

artifacts:
  - id: proposal
    generates: proposal.md
    description: 简要提案
    template: proposal.md
    instruction: |
      为这个变更创建简要提案。
      聚焦于做什么和为什么，跳过详细规范。
    requires: []

  - id: tasks
    generates: tasks.md
    description: 实施清单
    template: tasks.md
    requires: [proposal]

apply:
  requires: [tasks]
  tracks: tasks.md
```

### 添加审查工件

Fork 默认 Schema 并添加审查步骤：

```bash
openspec schema fork spec-driven with-review
```

然后编辑 `schema.yaml` 添加：

```yaml
  - id: review
    generates: review.md
    description: 实施前审查清单
    template: review.md
    instruction: |
      基于设计创建审查清单。
      包含安全性、性能和测试注意事项。
    requires:
      - design

  - id: tasks
    # ... 现有 tasks 配置 ...
    requires:
      - specs
      - design
      - review    # 现在任务也需要审查完成
```

---

## 另请参阅

- [CLI 参考：Schema 命令](cli.md#schema-命令) - 完整命令文档
