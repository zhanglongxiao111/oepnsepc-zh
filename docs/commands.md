# 命令

这是 OpenSpec 斜杠命令的参考文档。这些命令在你的 AI 编程助手的聊天界面中调用（例如 Claude Code、Cursor、Windsurf）。

工作流模式和使用时机请参阅[工作流](workflows.md)。CLI 命令请参阅 [CLI](cli.md)。

## 快速参考

| 命令 | 用途 |
|------|------|
| `/opsx:explore` | 在确定变更之前先思考和探索 |
| `/opsx:new` | 启动新变更 |
| `/opsx:continue` | 基于依赖关系创建下一个工件 |
| `/opsx:ff` | 快进：一次性创建所有规划工件 |
| `/opsx:apply` | 实施变更中的任务 |
| `/opsx:verify` | 验证实施是否匹配工件 |
| `/opsx:sync` | 将差异规范合并到主规范 |
| `/opsx:archive` | 归档已完成的变更 |
| `/opsx:bulk-archive` | 批量归档多个变更 |
| `/opsx:onboard` | 完整工作流的引导式教程 |

---

## 命令详解

### `/opsx:explore`

在确定变更之前，先思考、调查问题、澄清需求。

**语法：**
```
/opsx:explore [topic]
```

**参数：**
| 参数 | 必需 | 描述 |
|------|------|------|
| `topic` | 否 | 你想探索或调查的内容 |

**功能：**
- 开启一段无结构要求的探索性对话
- 调查代码库以回答问题
- 比较选项和方案
- 创建可视化图表以理清思路
- 当洞察明确后可过渡到 `/opsx:new`

**示例：**
```text
You: /opsx:explore

AI:  What would you like to explore?

You: How should we handle authentication for the mobile app?

AI:  Let me investigate your current auth setup...
     [Analyzes codebase]

     I see you're using session-based auth for the web app.
     For mobile, we have three main options:

     1. JWT tokens (stateless, works offline)
     2. OAuth2 (if you need third-party login)
     3. Extend current sessions (simpler, but requires connectivity)

     Your API already has CORS configured. Which direction interests you?

You: Let's go with JWT. Can we start a change for that?

AI:  Ready when you are. Run /opsx:new add-jwt-auth to begin.
```

**技巧：**
- 在需求不明确或需要调查时使用
- 探索期间不会创建任何工件
- 适合在决定之前比较多种方案
- 可以读取文件和搜索代码库

---

### `/opsx:new`

启动新变更。创建变更文件夹结构并用选定的 Schema 搭建脚手架。

**语法：**
```
/opsx:new [change-name] [--schema <schema-name>]
```

**参数：**
| 参数 | 必需 | 描述 |
|------|------|------|
| `change-name` | 否 | 变更文件夹的名称（未提供时会提示输入） |
| `--schema` | 否 | 使用的工作流 Schema（默认从配置或 `spec-driven`） |

**功能：**
- 创建 `openspec/changes/<change-name>/` 目录
- 创建 `.openspec.yaml` 元数据文件
- 显示第一个可创建的工件模板
- 未提供时提示输入变更名称和 Schema

**创建的内容：**
```
openspec/changes/<change-name>/
└── .openspec.yaml    # 变更元数据（schema、创建日期）
```

**示例：**
```
You: /opsx:new add-dark-mode

AI:  Created openspec/changes/add-dark-mode/
     Schema: spec-driven

     Ready to create: proposal
     Use /opsx:continue to create it, or /opsx:ff to create all artifacts.
```

**技巧：**
- 使用描述性名称：`add-feature`、`fix-bug`、`refactor-module`
- 避免泛化名称如 `update`、`changes`、`wip`
- Schema 也可以在项目配置中设置（`openspec/config.yaml`）

---

### `/opsx:continue`

在依赖链中创建下一个工件。每次创建一个工件，实现增量推进。

**语法：**
```
/opsx:continue [change-name]
```

**参数：**
| 参数 | 必需 | 描述 |
|------|------|------|
| `change-name` | 否 | 要继续的变更（未提供时从上下文推断） |

**功能：**
- 查询工件依赖图
- 显示哪些工件已就绪、哪些被阻塞
- 创建第一个就绪的工件
- 读取依赖文件以获取上下文
- 显示创建后解锁了哪些新工件

**示例：**
```
You: /opsx:continue

AI:  Change: add-dark-mode

     Artifact status:
     ✓ proposal    (done)
     ◆ specs       (ready)
     ◆ design      (ready)
     ○ tasks       (blocked - needs: specs)

     Creating specs...

     [Reads proposal.md, creates specs based on requirements]

     ✓ Created openspec/changes/add-dark-mode/specs/ui/spec.md

     Now available: tasks
     Run /opsx:continue to create the next artifact.
```

**技巧：**
- 想要在继续之前审查每个工件时使用
- 适合需要精细控制的复杂变更
- 多个工件可能同时就绪
- 你可以在继续之前编辑已创建的工件

---

### `/opsx:ff`

快进工件创建。一次性创建所有规划工件。

**语法：**
```
/opsx:ff [change-name]
```

**参数：**
| 参数 | 必需 | 描述 |
|------|------|------|
| `change-name` | 否 | 要快进的变更（未提供时从上下文推断） |

**功能：**
- 按依赖顺序创建所有工件
- 通过待办列表跟踪进度
- 当所有 `apply-required` 工件完成时停止
- 创建下一个工件前先读取每个依赖

**示例：**
```
You: /opsx:ff add-dark-mode

AI:  Fast-forwarding add-dark-mode...

     ✓ Creating proposal.md
     ✓ Creating specs/ui/spec.md
     ✓ Creating design.md
     ✓ Creating tasks.md

     All planning artifacts complete!
     Ready for implementation. Run /opsx:apply to begin.
```

**技巧：**
- 当你清楚要构建什么时使用
- 对于简单明了的变更，比 `/opsx:continue` 更快
- 之后仍然可以编辑工件
- 适合中小型功能

---

### `/opsx:apply`

实施变更中的任务。逐步完成任务列表，编写代码并勾选完成项。

**语法：**
```
/opsx:apply [change-name]
```

**参数：**
| 参数 | 必需 | 描述 |
|------|------|------|
| `change-name` | 否 | 要实施的变更（未提供时从上下文推断） |

**功能：**
- 读取 `tasks.md` 并识别未完成的任务
- 逐个完成任务
- 根据需要编写代码、创建文件、运行测试
- 用复选框 `[x]` 标记任务完成

**示例：**
```
You: /opsx:apply

AI:  Implementing add-dark-mode...

     Reading tasks.md:
     - [ ] 1.1 Create ThemeContext
     - [ ] 1.2 Add CSS custom properties
     - [ ] 1.3 Implement localStorage persistence

     Working on 1.1: Create ThemeContext...
     [Creates src/context/ThemeContext.tsx]

     ✓ 1.1 Complete

     Working on 1.2: Add CSS custom properties...
     [Updates src/styles/globals.css]

     ✓ 1.2 Complete
     ...
```

**技巧：**
- 中断后可以从上次停止的地方继续
- 通过指定变更名称在并行变更中使用
- 完成状态由 `tasks.md` 中的复选框跟踪

---

### `/opsx:verify`

验证实施是否匹配你的变更工件。检查完整性、正确性和一致性。

**语法：**
```
/opsx:verify [change-name]
```

**参数：**
| 参数 | 必需 | 描述 |
|------|------|------|
| `change-name` | 否 | 要验证的变更（未提供时从上下文推断） |

**功能：**
- 从三个维度检查实施质量
- 在代码库中搜索实施证据
- 按 CRITICAL、WARNING 或 SUGGESTION 分级报告问题
- 不阻塞归档，但会暴露问题

**验证维度：**

| 维度 | 验证内容 |
|------|----------|
| **完整性** | 所有任务完成、所有需求已实施、场景已覆盖 |
| **正确性** | 实施匹配规范意图、边界情况已处理 |
| **一致性** | 设计决策在代码中得到体现、模式一致 |

**示例：**
```
You: /opsx:verify

AI:  Verifying add-dark-mode...

     COMPLETENESS
     ✓ All 8 tasks in tasks.md are checked
     ✓ All requirements in specs have corresponding code
     ⚠ Scenario "System preference detection" has no test coverage

     CORRECTNESS
     ✓ Implementation matches spec intent
     ✓ Edge cases from scenarios are handled
     ✓ Error states match spec definitions

     COHERENCE
     ✓ Design decisions reflected in code structure
     ✓ Naming conventions consistent with design.md
     ⚠ Design mentions "CSS variables" but implementation uses Tailwind classes

     SUMMARY
     ─────────────────────────────
     Critical issues: 0
     Warnings: 2
     Ready to archive: Yes (with warnings)

     Recommendations:
     1. Add test for system preference detection
     2. Update design.md to reflect Tailwind usage, or refactor to use CSS variables
```

**技巧：**
- 在归档前运行以尽早发现不匹配
- 警告不阻塞归档，但表示潜在问题
- 适合在提交前审查 AI 的工作
- 可以揭示工件与实施之间的偏差

---

### `/opsx:sync`

**可选命令。** 将变更中的差异规范合并到主规范。归档时会提示 sync（如果需要），所以通常不需要手动运行。

**语法：**
```
/opsx:sync [change-name]
```

**参数：**
| 参数 | 必需 | 描述 |
|------|------|------|
| `change-name` | 否 | 要同步的变更（未提供时从上下文推断） |

**功能：**
- 读取变更文件夹中的差异规范
- 解析 ADDED/MODIFIED/REMOVED/RENAMED 分区
- 将更改合并到主 `openspec/specs/` 目录
- 保留差异中未提及的现有内容
- 不归档变更（保持活跃状态）

**示例：**
```text
You: /opsx:sync

AI:  Syncing add-dark-mode delta specs...

     Reading: openspec/changes/add-dark-mode/specs/ui/spec.md
     Target:  openspec/specs/ui/spec.md

     Changes to apply:
     ✓ ADDED: Theme Selection requirement (2 scenarios)
     ✓ ADDED: Accessibility requirement (1 scenario)

     Merging...
     ✓ openspec/specs/ui/spec.md updated

     Change remains active. Run /opsx:archive when ready to complete.
```

**何时手动使用：**

| 场景 | 使用 sync？ |
|------|------------|
| 长期进行的变更，希望在归档前将规范合并到主线 | 是 |
| 多个并行变更需要更新后的基线规范 | 是 |
| 想要单独预览/审查合并结果 | 是 |
| 快速变更，直接归档 | 否（归档会处理） |

**技巧：**
- Sync 是智能的，不是简单的复制粘贴
- 可以在不重复的情况下将场景添加到现有需求
- Sync 后变更保持活跃状态（不归档）
- 大多数用户永远不需要直接调用这个命令——归档会在需要时提示

---

### `/opsx:archive`

归档已完成的变更。最终化变更并将其移动到归档文件夹。

**语法：**
```
/opsx:archive [change-name]
```

**参数：**
| 参数 | 必需 | 描述 |
|------|------|------|
| `change-name` | 否 | 要归档的变更（未提供时从上下文推断） |

**功能：**
- 检查工件完成状态
- 检查任务完成情况（未完成时发出警告）
- 如果差异规范尚未同步，提示进行 sync
- 将变更文件夹移动到 `openspec/changes/archive/YYYY-MM-DD-<name>/`
- 保留所有工件以供审计

**示例：**
```text
You: /opsx:archive

AI:  Archiving add-dark-mode...

     Artifact status:
     ✓ proposal.md exists
     ✓ specs/ exists
     ✓ design.md exists
     ✓ tasks.md exists (8/8 tasks complete)

     Delta specs: Not yet synced
     → Sync now? (recommended)

You: Yes

AI:  ✓ Synced specs to openspec/specs/ui/spec.md
     ✓ Moved to openspec/changes/archive/2025-01-24-add-dark-mode/

     Change archived successfully.
```

**技巧：**
- 任务未完成时归档不会阻塞，但会发出警告
- 差异规范可以在归档时同步，也可以提前同步
- 归档的变更保留完整的历史记录
- 建议先使用 `/opsx:verify` 以发现问题

---

### `/opsx:bulk-archive`

批量归档多个已完成的变更。处理变更之间的规范冲突。

**语法：**
```
/opsx:bulk-archive [change-names...]
```

**参数：**
| 参数 | 必需 | 描述 |
|------|------|------|
| `change-names` | 否 | 要归档的特定变更（未提供时提示选择） |

**功能：**
- 列出所有已完成的变更
- 归档前验证每个变更
- 检测各变更之间的规范冲突
- 通过检查实际实施情况来解决冲突
- 按时间顺序归档

**示例：**
```
You: /opsx:bulk-archive

AI:  Found 3 completed changes:
     - add-dark-mode (8/8 tasks complete)
     - fix-login-bug (3/3 tasks complete)
     - update-footer (2/2 tasks complete)

     Checking for spec conflicts...
     ⚠ add-dark-mode and update-footer both touch specs/ui/

     Inspecting codebase to resolve...
     Both changes are implemented. Will merge in chronological order:
     1. add-dark-mode (created Jan 20)
     2. update-footer (created Jan 22)

     Archive all 3 changes?

You: Yes

AI:  ✓ Archived add-dark-mode
     ✓ Archived fix-login-bug
     ✓ Archived update-footer
     Specs merged: add-dark-mode → update-footer
```

**技巧：**
- 适合并行工作流
- 冲突解决是智能的（检查代码库）
- 变更按创建顺序归档
- 覆盖规范内容前会提示确认

---

### `/opsx:onboard`

完整 OpenSpec 工作流的引导式教程。使用你的实际代码库进行交互式学习。

**语法：**
```
/opsx:onboard
```

**功能：**
- 通过叙述引导完成一个完整的工作流循环
- 扫描你的代码库寻找真实的改进机会
- 使用真实工件创建一个实际变更
- 实施实际工作（小型、安全的改动）
- 归档已完成的变更
- 在每一步进行时解释说明

**阶段：**
1. 欢迎和代码库分析
2. 发现改进机会
3. 创建变更（`/opsx:new`）
4. 编写提案
5. 创建规范
6. 编写设计
7. 创建任务
8. 实施任务（`/opsx:apply`）
9. 验证实施
10. 归档变更
11. 总结和后续步骤

**示例：**
```
You: /opsx:onboard

AI:  Welcome to OpenSpec!

     I'll walk you through the complete workflow using your actual codebase.
     We'll find something small to improve, create a proper change for it,
     implement it, and archive it.

     Let me scan your codebase for opportunities...

     [Analyzes codebase]

     I found a few things we could work on:
     1. Add input validation to the contact form
     2. Improve error messages in the auth flow
     3. Add loading states to async buttons

     Which interests you? (or suggest something else)
```

**技巧：**
- 最适合学习工作流的新用户
- 使用真实代码，而非示例
- 创建的是可以保留或丢弃的真实变更
- 完成需要 15-30 分钟

---

## 各 AI 工具的命令语法

不同的 AI 工具使用略有不同的命令语法。请使用匹配你工具的格式：

| 工具 | 语法示例 |
|------|---------|
| Claude Code | `/opsx:new`、`/opsx:apply` |
| Cursor | `/opsx-new`、`/opsx-apply` |
| Windsurf | `/opsx-new`、`/opsx-apply` |
| Copilot (IDE) | `/opsx-new`、`/opsx-apply` |
| Trae | `/openspec-new-change`、`/openspec-apply-change` |

无论语法如何，功能完全相同。

> **注意：** GitHub Copilot 命令（`.github/prompts/*.prompt.md`）仅在 IDE 扩展（VS Code、JetBrains、Visual Studio）中可用。GitHub Copilot CLI 目前不支持自定义 prompt 文件 — 详见[支持的工具](supported-tools.md)。

---

## 旧版命令

这些命令使用旧版的"一步到位"工作流。它们仍然有效，但推荐使用 OPSX 命令。

| 命令 | 功能 |
|------|------|
| `/openspec:proposal` | 一次性创建所有工件（提案、规范、设计、任务） |
| `/openspec:apply` | 实施变更 |
| `/openspec:archive` | 归档变更 |

**何时使用旧版命令：**
- 使用旧工作流的现有项目
- 不需要增量创建工件的简单变更
- 偏好一步到位的方式

**迁移到 OPSX：**
旧版变更可以继续使用 OPSX 命令。工件结构是兼容的。

---

## 故障排除

### "Change not found"

命令无法识别要操作的变更。

**解决方案：**
- 明确指定变更名称：`/opsx:apply add-dark-mode`
- 检查变更文件夹是否存在：`openspec list`
- 确认你在正确的项目目录下

### "No artifacts ready"

所有工件已完成或被缺失的依赖阻塞。

**解决方案：**
- 运行 `openspec status --change <name>` 查看阻塞原因
- 检查必需的工件是否存在
- 先创建缺失的依赖工件

### "Schema not found"

指定的 Schema 不存在。

**解决方案：**
- 列出可用的 Schema：`openspec schemas`
- 检查 Schema 名称拼写
- 如果是自定义的，先创建它：`openspec schema init <name>`

### 命令未被识别

AI 工具未识别 OpenSpec 命令。

**解决方案：**
- 确保 OpenSpec 已初始化：`openspec init`
- 重新生成技能文件：`openspec update`
- 检查 `.claude/skills/` 目录是否存在（针对 Claude Code）
- 重启你的 AI 工具以加载新的技能

### 工件未正确生成

AI 创建了不完整或不正确的工件。

**解决方案：**
- 在 `openspec/config.yaml` 中添加项目上下文
- 为特定工件添加规则以提供具体指导
- 在变更描述中提供更多细节
- 使用 `/opsx:continue` 代替 `/opsx:ff` 以获得更多控制

---

## 下一步

- [工作流](workflows.md) - 常见模式和命令使用时机
- [CLI](cli.md) - 终端管理和验证命令
- [自定义配置](customization.md) - 创建自定义 Schema 和工作流
