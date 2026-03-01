# 快速入门

本指南介绍 OpenSpec 安装并初始化后的工作方式。安装步骤请参阅[主 README](../README.md#快速开始)。

## 工作原理

OpenSpec 帮助你和 AI 编程助手在编写代码之前就达成共识。工作流遵循一个简单的模式：

```
┌────────────────────┐
│ 启动变更           │  /opsx:new
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ 创建工件           │  /opsx:ff 或 /opsx:continue
│ (提案、规范、      │
│  设计、任务)       │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ 实施任务           │  /opsx:apply
│ (AI 编写代码)      │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ 归档 & 合并        │  /opsx:archive
│ 规范               │
└────────────────────┘
```

## OpenSpec 创建的内容

运行 `openspec init` 后，你的项目会有如下结构：

```
openspec/
├── specs/              # 权威来源（你的系统行为规范）
│   └── <domain>/
│       └── spec.md
├── changes/            # 变更提案（每个变更一个文件夹）
│   └── <change-name>/
│       ├── proposal.md
│       ├── design.md
│       ├── tasks.md
│       └── specs/      # 差异规范（Delta specs，描述变更内容）
│           └── <domain>/
│               └── spec.md
└── config.yaml         # 项目配置（可选）
```

**两个核心目录：**

- **`specs/`** - 权威来源。这些规范描述了你的系统当前的行为方式。按领域组织（例如 `specs/auth/`、`specs/payments/`）。

- **`changes/`** - 变更提案。每个变更都有独立的文件夹，包含所有相关工件。当变更完成后，其规范会合并到主 `specs/` 目录中。

## 理解工件（Artifacts）

每个变更文件夹包含引导工作的工件：

| 工件 | 用途 |
|------|------|
| `proposal.md` | "为什么"和"做什么" — 捕捉意图、范围和方法 |
| `specs/` | 差异规范，显示新增/修改/删除的需求 |
| `design.md` | "怎么做" — 技术方案和架构决策 |
| `tasks.md` | 实施清单，带有复选框 |

**工件之间相互依赖：**

```
提案 ──► 规范 ──► 设计 ──► 任务 ──► 实施
  ▲         ▲        ▲                │
  └─────────┴────────┴────────────────┘
           随着学习不断更新
```

在实施过程中你可以随时回过头来完善之前的工件。

## 差异规范（Delta Specs）的工作原理

差异规范是 OpenSpec 的核心概念。它们描述的是**相对于当前规范发生了什么变化**。

### 格式

差异规范使用分区来标明变更类型：

```markdown
# Delta for Auth

## ADDED Requirements

### Requirement: Two-Factor Authentication
The system MUST require a second factor during login.

#### Scenario: OTP required
- GIVEN a user with 2FA enabled
- WHEN the user submits valid credentials
- THEN an OTP challenge is presented

## MODIFIED Requirements

### Requirement: Session Timeout
The system SHALL expire sessions after 30 minutes of inactivity.
(Previously: 60 minutes)

#### Scenario: Idle timeout
- GIVEN an authenticated session
- WHEN 30 minutes pass without activity
- THEN the session is invalidated

## REMOVED Requirements

### Requirement: Remember Me
(Deprecated in favor of 2FA)
```

### 归档时会发生什么

当你归档一个变更时：

1. **ADDED** 的需求会被附加到主规范中
2. **MODIFIED** 的需求会替换现有版本
3. **REMOVED** 的需求会从主规范中删除

变更文件夹移动到 `openspec/changes/archive/` 保留审计历史。

## 示例：你的第一个变更

让我们来演示为应用添加暗色模式。

### 1. 启动变更

```
You: /opsx:new add-dark-mode

AI:  Created openspec/changes/add-dark-mode/
     Ready to create: proposal
```

### 2. 创建工件

使用 `/opsx:ff`（快进）一次性创建所有规划工件：

```
You: /opsx:ff

AI:  Creating artifacts for add-dark-mode...
     ✓ proposal.md — 为什么要做，要改什么
     ✓ specs/       — 需求和场景
     ✓ design.md    — 技术方案
     ✓ tasks.md     — 实施清单
     Ready for implementation!
```

### 3. 创建的内容

**proposal.md** - 捕捉意图：

```markdown
# Proposal: Add Dark Mode

## Intent
Users have requested a dark mode option to reduce eye strain
during nighttime usage.

## Scope
- Add theme toggle in settings
- Support system preference detection
- Persist preference in localStorage

## Approach
Use CSS custom properties for theming with a React context
for state management.
```

**specs/ui/spec.md** - 差异规范，显示新增需求：

```markdown
# Delta for UI

## ADDED Requirements

### Requirement: Theme Selection
The system SHALL allow users to choose between light and dark themes.

#### Scenario: Manual toggle
- GIVEN a user on any page
- WHEN the user clicks the theme toggle
- THEN the theme switches immediately
- AND the preference persists across sessions

#### Scenario: System preference
- GIVEN a user with no saved preference
- WHEN the application loads
- THEN the system's preferred color scheme is used
```

**tasks.md** - 实施清单：

```markdown
# Tasks

## 1. Theme Infrastructure
- [ ] 1.1 Create ThemeContext with light/dark state
- [ ] 1.2 Add CSS custom properties for colors
- [ ] 1.3 Implement localStorage persistence

## 2. UI Components
- [ ] 2.1 Create ThemeToggle component
- [ ] 2.2 Add toggle to settings page
- [ ] 2.3 Update Header to include quick toggle

## 3. Styling
- [ ] 3.1 Define dark theme color palette
- [ ] 3.2 Update components to use CSS variables
```

### 4. 实施

```
You: /opsx:apply

AI:  Working through tasks...
     ✓ 1.1 Created ThemeContext with light/dark state
     ✓ 1.2 Added CSS custom properties to globals.css
     ✓ 1.3 Implemented localStorage persistence
     ✓ 2.1 Created ThemeToggle component
     ...
     All tasks complete!
```

在实施过程中，如果发现设计需要调整，只需更新工件然后继续。

### 5. 归档

```
You: /opsx:archive

AI:  Archiving add-dark-mode...
     ✓ Merged specs into openspec/specs/ui/spec.md
     ✓ Moved to openspec/changes/archive/2025-01-24-add-dark-mode/
     Done! Ready for the next feature.
```

你的差异规范现在已经成为主规范的一部分，记录了系统的工作方式。

## 验证与查看

使用 CLI 检查你的变更：

```bash
# 列出活跃变更
openspec list

# 查看变更详情
openspec show add-dark-mode

# 验证规范格式
openspec validate add-dark-mode

# 交互式仪表板
openspec view
```

## 下一步

- [工作流](workflows.md) - 常见模式和命令使用时机
- [命令](commands.md) - 所有斜杠命令的完整参考
- [核心概念](concepts.md) - 深入理解规范、变更和 Schema
- [自定义配置](customization.md) - 让 OpenSpec 适应你的方式
