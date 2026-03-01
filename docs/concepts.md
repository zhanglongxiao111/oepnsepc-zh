# 核心概念

本指南介绍 OpenSpec 的核心理念以及它们如何相互配合。实际操作请参阅[快速入门](getting-started.md)和[工作流](workflows.md)。

## 理念

OpenSpec 围绕四个原则构建：

```
流动而非僵化       — 没有阶段门禁，做有意义的事
迭代而非瀑布       — 边构建边学习，边学习边完善
简单而非复杂       — 轻量级设置，最少的仪式感
面向存量项目优先   — 适用于现有代码库，而非仅限全新项目
```

### 为什么这些原则重要

**流动而非僵化。** 传统的规范体系会将你锁定在固定阶段中：先规划，再实施，然后完成。OpenSpec 更加灵活 — 你可以按照任何有意义的顺序创建工件。

**迭代而非瀑布。** 需求会变化。理解会加深。开始时看起来不错的方案，在看到代码库后可能就不成立了。OpenSpec 拥抱这一现实。

**简单而非复杂。** 一些规范框架需要大量设置、严格的格式或重量级流程。OpenSpec 不会妨碍你。几秒钟就能初始化，立即开始工作，只在需要时才进行自定义。

**面向存量项目优先。** 大多数软件工作并非从零开始构建 — 而是修改现有系统。OpenSpec 基于差异（Delta）的方法让指定现有行为的变更变得简单，而不仅仅是描述新系统。

## 全局视图

OpenSpec 将你的工作组织到两个主要区域：

```
┌─────────────────────────────────────────────────────────────────┐
│                        openspec/                                 │
│                                                                  │
│   ┌─────────────────────┐      ┌──────────────────────────────┐ │
│   │       specs/        │      │         changes/              │ │
│   │                     │      │                               │ │
│   │  权威来源            │◄─────│  变更提案                      │ │
│   │  你的系统当前        │ 合并 │  每个变更 = 一个文件夹          │ │
│   │  的工作方式          │      │  包含工件 + 差异规范            │ │
│   │                     │      │                               │ │
│   └─────────────────────┘      └──────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**规范（Specs）** 是权威来源 — 描述你的系统当前的工作方式。

**变更（Changes）** 是变更提案 — 它们存放在各自的文件夹中，直到你准备好将它们合并。

这种分离是关键。你可以并行处理多个变更而不会冲突。你可以在变更影响主规范之前进行审查。当你归档变更时，其差异规范会干净地合并到权威来源中。

## 规范（Specs）

规范使用结构化的需求和场景来描述你的系统行为。

### 结构

```
openspec/specs/
├── auth/
│   └── spec.md           # 认证行为
├── payments/
│   └── spec.md           # 支付处理
├── notifications/
│   └── spec.md           # 通知系统
└── ui/
    └── spec.md           # UI 行为和主题
```

按领域组织规范 — 对你的系统有意义的逻辑分组。常见模式：

- **按功能区域**：`auth/`、`payments/`、`search/`
- **按组件**：`api/`、`frontend/`、`workers/`
- **按限界上下文**：`ordering/`、`fulfillment/`、`inventory/`

### 规范格式

一个规范包含需求，每个需求包含场景：

```markdown
# Auth Specification

## Purpose
Authentication and session management for the application.

## Requirements

### Requirement: User Authentication
The system SHALL issue a JWT token upon successful login.

#### Scenario: Valid credentials
- GIVEN a user with valid credentials
- WHEN the user submits login form
- THEN a JWT token is returned
- AND the user is redirected to dashboard

#### Scenario: Invalid credentials
- GIVEN invalid credentials
- WHEN the user submits login form
- THEN an error message is displayed
- AND no token is issued

### Requirement: Session Expiration
The system MUST expire sessions after 30 minutes of inactivity.

#### Scenario: Idle timeout
- GIVEN an authenticated session
- WHEN 30 minutes pass without activity
- THEN the session is invalidated
- AND the user must re-authenticate
```

**关键要素：**

| 要素 | 用途 |
|------|------|
| `## Purpose` | 该规范领域的高层描述 |
| `### Requirement:` | 系统必须具备的特定行为 |
| `#### Scenario:` | 需求运作的具体示例 |
| SHALL/MUST/SHOULD | RFC 2119 关键词，表示需求强度 |

### 为什么这样组织规范

**需求是"做什么"** — 声明系统应该做什么，不指定具体实现。

**场景是"什么时候"** — 提供可以验证的具体示例。好的场景：
- 可测试（可以为它们编写自动化测试）
- 覆盖正常路径和边界情况
- 使用 Given/When/Then 或类似的结构化格式

**RFC 2119 关键词**（SHALL、MUST、SHOULD、MAY）传达意图：
- **MUST/SHALL** — 绝对要求
- **SHOULD** — 推荐，但存在例外
- **MAY** — 可选

## 变更（Changes）

变更是对系统的修改提案，打包为一个文件夹，包含理解和实施所需的一切。

### 变更结构

```
openspec/changes/add-dark-mode/
├── proposal.md           # 为什么和做什么
├── design.md             # 怎么做（技术方案）
├── tasks.md              # 实施清单
├── .openspec.yaml        # 变更元数据（可选）
└── specs/                # 差异规范
    └── ui/
        └── spec.md       # ui/spec.md 中发生的变化
```

每个变更都是自包含的。它包含：
- **工件（Artifacts）** — 捕捉意图、设计和任务的文档
- **差异规范（Delta specs）** — 描述新增、修改或删除内容的规范
- **元数据（Metadata）** — 此特定变更的可选配置

### 为什么变更是文件夹

将变更打包为文件夹有几个好处：

1. **所有内容在一起。** 提案、设计、任务和规范都在一个地方。不需要在不同位置搜索。

2. **并行工作。** 多个变更可以同时存在而不冲突。在进行 `add-dark-mode` 的同时，`fix-auth-bug` 也可以进行中。

3. **清晰的历史。** 归档后，变更移动到 `changes/archive/`，完整上下文得以保留。你可以回顾并理解不仅仅是改了什么，还有为什么改。

4. **便于审查。** 变更文件夹很容易审查 — 打开它，阅读提案，检查设计，查看规范差异。

## 工件（Artifacts）

工件是变更中引导工作的文档。

### 工件流

```
提案 ──────► 规范 ──────► 设计 ──────► 任务 ──────► 实施
  │            │           │            │
 为什么        改什么       怎么做       具体步骤
 + 范围       的变化        方案        

```

工件相互依赖。每个工件为下一个提供上下文。

### 工件类型

#### 提案（`proposal.md`）

提案在高层次上捕捉**意图**、**范围**和**方法**。

```markdown
# Proposal: Add Dark Mode

## Intent
Users have requested a dark mode option to reduce eye strain
during nighttime usage and match system preferences.

## Scope
In scope:
- Theme toggle in settings
- System preference detection
- Persist preference in localStorage

Out of scope:
- Custom color themes (future work)
- Per-page theme overrides

## Approach
Use CSS custom properties for theming with a React context
for state management. Detect system preference on first load,
allow manual override.
```

**何时更新提案：**
- 范围变化（缩小或扩大）
- 意图澄清（更好地理解了问题）
- 方法根本性转变

#### 规范（`specs/` 中的差异规范）

差异规范描述**相对于当前规范发生了什么变化**。详见下方[差异规范](#差异规范delta-specs)。

#### 设计（`design.md`）

设计捕捉**技术方案**和**架构决策**。

```markdown
# Design: Add Dark Mode

## Technical Approach
Theme state managed via React Context to avoid prop drilling.
CSS custom properties enable runtime switching without class toggling.

## Architecture Decisions

### Decision: Context over Redux
Using React Context for theme state because:
- Simple binary state (light/dark)
- No complex state transitions
- Avoids adding Redux dependency

### Decision: CSS Custom Properties
Using CSS variables instead of CSS-in-JS because:
- Works with existing stylesheet
- No runtime overhead
- Browser-native solution

## Data Flow
```
ThemeProvider (context)
       │
       ▼
ThemeToggle ◄──► localStorage
       │
       ▼
CSS Variables (applied to :root)
```

## File Changes
- `src/contexts/ThemeContext.tsx` (new)
- `src/components/ThemeToggle.tsx` (new)
- `src/styles/globals.css` (modified)
```

**何时更新设计：**
- 实施中发现方案行不通
- 发现更好的解决方案
- 依赖或约束发生变化

#### 任务（`tasks.md`）

任务是**实施清单** — 带有复选框的具体步骤。

```markdown
# Tasks

## 1. Theme Infrastructure
- [ ] 1.1 Create ThemeContext with light/dark state
- [ ] 1.2 Add CSS custom properties for colors
- [ ] 1.3 Implement localStorage persistence
- [ ] 1.4 Add system preference detection

## 2. UI Components
- [ ] 2.1 Create ThemeToggle component
- [ ] 2.2 Add toggle to settings page
- [ ] 2.3 Update Header to include quick toggle

## 3. Styling
- [ ] 3.1 Define dark theme color palette
- [ ] 3.2 Update components to use CSS variables
- [ ] 3.3 Test contrast ratios for accessibility
```

**任务最佳实践：**
- 在标题下分组相关任务
- 使用层级编号（1.1、1.2 等）
- 保持任务足够小，可以在一次会话中完成
- 完成时勾选任务

## 差异规范（Delta Specs）

差异规范是让 OpenSpec 适用于存量项目开发的关键概念。它们描述的是**什么发生了变化**，而不是重述整个规范。

### 格式

```markdown
# Delta for Auth

## ADDED Requirements

### Requirement: Two-Factor Authentication
The system MUST support TOTP-based two-factor authentication.

#### Scenario: 2FA enrollment
- GIVEN a user without 2FA enabled
- WHEN the user enables 2FA in settings
- THEN a QR code is displayed for authenticator app setup
- AND the user must verify with a code before activation

#### Scenario: 2FA login
- GIVEN a user with 2FA enabled
- WHEN the user submits valid credentials
- THEN an OTP challenge is presented
- AND login completes only after valid OTP

## MODIFIED Requirements

### Requirement: Session Expiration
The system MUST expire sessions after 15 minutes of inactivity.
(Previously: 30 minutes)

#### Scenario: Idle timeout
- GIVEN an authenticated session
- WHEN 15 minutes pass without activity
- THEN the session is invalidated

## REMOVED Requirements

### Requirement: Remember Me
(Deprecated in favor of 2FA. Users should re-authenticate each session.)
```

### 差异分区

| 分区 | 含义 | 归档时的操作 |
|------|------|-------------|
| `## ADDED Requirements` | 新增行为 | 附加到主规范 |
| `## MODIFIED Requirements` | 变更行为 | 替换现有需求 |
| `## REMOVED Requirements` | 废弃行为 | 从主规范删除 |

### 为什么用差异而不是完整规范

**清晰性。** 差异精确展示了什么发生了变化。阅读完整规范时，你需要在脑中与当前版本做对比。

**避免冲突。** 两个变更可以修改同一个规范文件而不冲突，只要它们修改的是不同的需求。

**审查效率。** 审查者看到的是变更内容，而非未变化的上下文。聚焦于重要的部分。

**适配存量项目。** 大多数工作是修改现有行为。差异让修改成为一等公民，而非事后的补充。

## Schema

Schema 定义了工件类型及其在工作流中的依赖关系。

### Schema 的工作方式

```yaml
# openspec/schemas/spec-driven/schema.yaml
name: spec-driven
artifacts:
  - id: proposal
    generates: proposal.md
    requires: []              # 无依赖，可以首先创建

  - id: specs
    generates: specs/**/*.md
    requires: [proposal]      # 需要先有提案

  - id: design
    generates: design.md
    requires: [proposal]      # 可以与规范并行创建

  - id: tasks
    generates: tasks.md
    requires: [specs, design] # 需要规范和设计都完成
```

**工件形成依赖图：**

```
                    proposal
                   (根节点)
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼
      specs                       design
   (requires:                  (requires:
    proposal)                   proposal)
         │                           │
         └─────────────┬─────────────┘
                       │
                       ▼
                    tasks
                (requires:
                specs, design)
```

**依赖是赋能者，而非门禁。** 它们展示了什么可以被创建，而非必须接下来创建什么。你可以跳过 design（如果不需要的话）。你可以在 design 之前或之后创建 specs — 两者都仅依赖于 proposal。

### 内置 Schema

**spec-driven**（默认）

标准的规范驱动开发工作流：

```
提案 → 规范 → 设计 → 任务 → 实施
```

最适合：大多数需要在实施前就规范达成共识的功能开发。

### 自定义 Schema

为你的团队创建自定义 Schema：

```bash
# 从零创建
openspec schema init research-first

# 或 fork 一个现有的
openspec schema fork spec-driven research-first
```

**自定义 Schema 示例：**

```yaml
# openspec/schemas/research-first/schema.yaml
name: research-first
artifacts:
  - id: research
    generates: research.md
    requires: []           # 先做调研

  - id: proposal
    generates: proposal.md
    requires: [research]   # 提案基于调研结果

  - id: tasks
    generates: tasks.md
    requires: [proposal]   # 跳过规范/设计，直接到任务
```

详见[自定义配置](customization.md)获取创建和使用自定义 Schema 的完整说明。

## 归档（Archive）

归档通过将差异规范合并到主规范并保留变更历史来完成一个变更。

### 归档时会发生什么

```
归档前：

openspec/
├── specs/
│   └── auth/
│       └── spec.md ◄────────────────┐
└── changes/                         │
    └── add-2fa/                     │
        ├── proposal.md              │
        ├── design.md                │ 合并
        ├── tasks.md                 │
        └── specs/                   │
            └── auth/                │
                └── spec.md ─────────┘


归档后：

openspec/
├── specs/
│   └── auth/
│       └── spec.md        # 现在包含了 2FA 需求
└── changes/
    └── archive/
        └── 2025-01-24-add-2fa/    # 保留历史
            ├── proposal.md
            ├── design.md
            ├── tasks.md
            └── specs/
                └── auth/
                    └── spec.md
```

### 归档过程

1. **合并差异。** 每个差异规范分区（ADDED/MODIFIED/REMOVED）应用到对应的主规范。

2. **移动到归档。** 变更文件夹移动到 `changes/archive/`，按日期前缀排序。

3. **保留上下文。** 所有工件在归档中保持完整。你始终可以回顾以理解为什么做了某个变更。

### 为什么归档很重要

**状态清晰。** 活跃变更（`changes/`）只显示进行中的工作。已完成的工作移走。

**审计轨迹。** 归档保留了每个变更的完整上下文 — 不仅仅是改了什么，还有解释为什么的提案、解释怎么做的设计，以及展示具体工作的任务。

**规范演进。** 随着变更被归档，规范自然生长。每次归档合并其差异，逐步构建出全面的规范体系。

## 所有内容如何协同

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              OPENSPEC 流程                                   │
│                                                                              │
│   ┌────────────────┐                                                         │
│   │  1. 启动       │  /opsx:new 创建变更文件夹                                │
│   │     变更       │                                                         │
│   └───────┬────────┘                                                         │
│           │                                                                  │
│           ▼                                                                  │
│   ┌────────────────┐                                                         │
│   │  2. 创建       │  /opsx:ff 或 /opsx:continue                             │
│   │     工件       │  创建 提案 → 规范 → 设计 → 任务                           │
│   │                │  （基于 schema 依赖关系）                                 │
│   └───────┬────────┘                                                         │
│           │                                                                  │
│           ▼                                                                  │
│   ┌────────────────┐                                                         │
│   │  3. 实施       │  /opsx:apply                                            │
│   │     任务       │  逐步完成任务，勾选完成项                                 │
│   │                │◄──── 边学习边更新工件                                    │
│   └───────┬────────┘                                                         │
│           │                                                                  │
│           ▼                                                                  │
│   ┌────────────────┐                                                         │
│   │  4. 验证       │  /opsx:verify（可选）                                    │
│   │     工作       │  检查实施是否匹配规范                                     │
│   └───────┬────────┘                                                         │
│           │                                                                  │
│           ▼                                                                  │
│   ┌────────────────┐     ┌──────────────────────────────────────────────┐   │
│   │  5. 归档       │────►│  差异规范合并到主规范                         │   │
│   │     变更       │     │  变更文件夹移动到 archive/                    │   │
│   └────────────────┘     │  规范成为更新后的权威来源                      │   │
│                          └──────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**良性循环：**

1. 规范描述当前行为
2. 变更提出修改（以差异形式）
3. 实施让变更成为现实
4. 归档将差异合并到规范
5. 规范现在描述新的行为
6. 下一个变更基于更新后的规范

## 术语表

| 术语 | 定义 |
|------|------|
| **工件（Artifact）** | 变更中的文档（提案、设计、任务或差异规范） |
| **归档（Archive）** | 完成变更并将其差异合并到主规范的过程 |
| **变更（Change）** | 对系统的修改提案，打包为一个包含工件的文件夹 |
| **差异规范（Delta spec）** | 描述相对于当前规范的变化（ADDED/MODIFIED/REMOVED）的规范 |
| **领域（Domain）** | 规范的逻辑分组（例如 `auth/`、`payments/`） |
| **需求（Requirement）** | 系统必须具备的特定行为 |
| **场景（Scenario）** | 需求的具体示例，通常采用 Given/When/Then 格式 |
| **Schema** | 工件类型及其依赖关系的定义 |
| **规范（Spec）** | 描述系统行为的规范，包含需求和场景 |
| **权威来源（Source of truth）** | `openspec/specs/` 目录，包含当前达成共识的行为规范 |

## 下一步

- [快速入门](getting-started.md) - 实践第一步
- [工作流](workflows.md) - 常见模式和使用时机
- [命令](commands.md) - 完整命令参考
- [自定义配置](customization.md) - 创建自定义 Schema 和配置项目
