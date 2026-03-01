# 工作流

本指南展示如何在实际工作中有效组合 OpenSpec 命令。阅读前请先了解[快速入门](getting-started.md)和[命令](commands.md)。

## 核心思想

**OpenSpec 是基于动作的，而非基于阶段的。** 你不会按固定阶段前进 — 而是做有意义的事情。

```
         ┌───────────────────────────────────────────────┐
         │           动作（Actions）                      │
         │                                               │
         │     new ◄──► continue ◄──► apply ◄──► archive │
         │      │          │           │             │   │
         │      └──────────┴───────────┴─────────────┘   │
         │                    任意顺序                    │
         └───────────────────────────────────────────────┘
```

每次操作都会推进你的变更。你可以根据需要随时回退来更新工件。

## 常用模式

### 快速功能开发

当你清楚要构建什么，想要快速启动时：

```text
You: /opsx:new add-search-filter
AI:  Created change.

You: /opsx:ff
AI:  ✓ proposal.md
     ✓ specs/
     ✓ design.md
     ✓ tasks.md

You: /opsx:apply
AI:  [实施所有任务]

You: /opsx:archive
AI:  ✓ 已归档
```

**最佳场景：** 需求明确的中小型功能。

### 探索模式

当你不确定要做什么，或需要调查时：

```text
You: /opsx:explore

AI:  What would you like to explore?

You: Our dashboard loads slowly. What could we improve?

AI:  [分析代码库]
     I found several issues:
     1. N+1 queries in the user list
     2. Missing pagination on the orders page
     3. No caching on the config endpoint
     ...

You: Let's fix the N+1 queries first.

You: /opsx:new fix-dashboard-queries
AI:  Created change.

You: /opsx:continue
AI:  ✓ proposal.md
     [依次创建工件...]
```

**最佳场景：** 需求模糊、需要调研、灵感探索。

### 增量审查模式

当你想在每一步进行审查时：

```text
You: /opsx:new add-billing-integration

You: /opsx:continue
AI:  ✓ proposal.md
     [你审查提案]

You: Looks good, but add error handling for failed webhooks.

You: /opsx:continue
AI:  ✓ specs/ (包含 webhook 错误处理场景)
     [你审查规范]

You: /opsx:continue
AI:  ✓ design.md

You: /opsx:continue
AI:  ✓ tasks.md

You: /opsx:apply
AI:  [实施]
```

**最佳场景：** 需要在每个工件上精细控制的复杂变更。

### 并行开发

同时进行多个变更：

```text
You: /opsx:new add-dark-mode
You: /opsx:ff
     [规划 dark mode]

You: /opsx:new fix-memory-leak
You: /opsx:ff
     [规划 memory leak 修复]

You: /opsx:apply add-dark-mode
     [实施 dark mode]

You: /opsx:apply fix-memory-leak
     [修复 memory leak]

You: /opsx:archive add-dark-mode
You: /opsx:archive fix-memory-leak
```

**最佳场景：** 不相关的独立工作流。

---

## `/opsx:ff` vs `/opsx:continue`

| 场景 | 使用 |
|------|------|
| 需求明确，想要快速完成 | `/opsx:ff` |
| 需要审查每个工件 | `/opsx:continue` |
| 复杂变更，可能需要调整 | `/opsx:continue` |
| 简单功能或 bug 修复 | `/opsx:ff` |
| 对方案不确定 | `/opsx:continue` |

**关键区别：**

- `/opsx:ff` — 一次性生成所有工件。速度快，但控制权更少。
- `/opsx:continue` — 每次一个工件。更多审查和调整的机会。

在实际工作中，很多人先用 `/opsx:ff` 快速获取所有工件，然后根据需要编辑它们。都是有效的方式。

---

## 更新 vs 新建

### 何时更新现有变更

- 范围扩大（更多需求发现）
- 设计方案变化
- 实施反馈导致工件需要调整

**只需编辑工件，然后继续。**

```text
# 发现设计需要调整
You: Let me update the design to use WebSocket instead of polling.
     [编辑 design.md]

You: /opsx:apply
     [AI 根据更新后的设计继续实施]
```

### 何时启动新变更

- 完全不同的功能
- 独立的工作流
- 需要分开追踪的问题

```text
You: /opsx:new add-websocket-support
     [这是一个独立的功能，应该有自己的变更]
```

**经验法则：** 如果变更的"为什么"变了，那就是一个新的变更。如果变更的"怎么做"变了，更新现有工件。

---

## 推荐的完成流程

完成变更的推荐流程：

```
/opsx:apply → /opsx:verify → /opsx:archive
```

### 为什么推荐这个流程

1. **Apply** — 实施所有任务
2. **Verify** — 检查实施是否匹配规范和设计
3. **Archive** — 最终化并合并规范

Verify 步骤是可选的，但推荐使用。它会发现：
- 遗漏的任务
- 与规范不匹配的实施
- 与设计文档的不一致

```text
You: /opsx:verify
AI:  ⚠ Task 2.3 "Add keyboard shortcut" is not checked
     ⚠ Spec scenario "System preference detection" has no test
     ✓ All other checks passed

You: Let me fix those.
     [完成遗漏的任务和测试]

You: /opsx:archive
AI:  ✓ All checks passed
     ✓ Archived successfully
```

---

## 处理中途返工

实际开发中，你经常会在实施过程中发现需要调整之前的工件。这完全正常。

### 更新工件后继续

```text
You: /opsx:apply add-dark-mode

AI:  Working on task 2.1 "Create ThemeToggle"...
     I notice the design doesn't account for high-contrast mode.
     Should I update the design first?

You: Yes, update the design to include high-contrast mode,
     then update the specs and tasks accordingly.

AI:  [更新 design.md — 新增高对比度模式]
     [更新 specs/ — 新增高对比度场景]
     [更新 tasks.md — 新增高对比度任务]
     
     Updated artifacts. Continuing implementation...
     ✓ 2.1 Create ThemeToggle (with high-contrast support)
```

### 大幅方向变更

```text
You: /opsx:apply

AI:  While implementing, I discovered the current UI framework
     doesn't support CSS custom properties well.

You: Let's redesign. Update the approach to use Tailwind's
     dark mode classes instead.

AI:  [更新 design.md — 从 CSS 变量改为 Tailwind]
     [更新 tasks.md — 反映新的技术方案]
     
     Updated. Starting fresh on tasks...
```

---

## 技巧与最佳实践

### 命名变更

**推荐：** 描述性、使用连字符分隔

```text
add-dark-mode
fix-login-timeout
refactor-payment-module
```

**避免：** 模糊、过于简短

```text
update
fix
wip
changes
```

### 保持变更聚焦

一个变更 = 一件事。不要在一个变更中塞满不相关的功能。

```text
# 好：每个主题一个变更
/opsx:new add-dark-mode
/opsx:new fix-auth-timeout
/opsx:new refactor-api-layer

# 不推荐：一个变更包揽所有
/opsx:new update-frontend
```

### 利用项目配置

在 `openspec/config.yaml` 中注入上下文可以大幅提升工件质量：

```yaml
context: |
  技术栈：TypeScript、React、Node.js、PostgreSQL
  API 风格：RESTful，文档在 docs/api.md
  测试：Jest + React Testing Library
  我们重视所有公共 API 的向后兼容性

rules:
  proposal:
    - 包含回退计划
  specs:
    - 使用 Given/When/Then 格式
```

### 上下文管理

OpenSpec 在干净的上下文窗口中效果最好：

- 开始 `/opsx:apply` 前清除上下文
- 不同变更之间切换上下文
- 如果 AI 的输出质量下降（通常是上下文过长），重新开始对话

---

## 下一步

- [命令](commands.md) — 完整命令参考
- [核心概念](concepts.md) — 深入理解规范、变更和 Schema
- [CLI](cli.md) — 终端命令参考
- [自定义配置](customization.md) — 配置规则和自定义 Schema
