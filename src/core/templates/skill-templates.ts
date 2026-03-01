/**
 * Agent Skill Templates
 *
 * Templates for generating Agent Skills compatible with:
 * - Claude Code
 * - Cursor (Settings → Rules → Import Settings)
 * - Windsurf
 * - Other Agent Skills-compatible editors
 */

export interface SkillTemplate {
   name: string;
   description: string;
   instructions: string;
   license?: string;
   compatibility?: string;
   metadata?: Record<string, string>;
}

/**
 * Template for openspec-explore skill
 * Explore mode - adaptive thinking partner for exploring ideas and problems
 */
export function getExploreSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-explore',
      description: '进入探索模式 - 一个用于探索想法、调查问题和澄清需求的思维伙伴。当用户想在变更之前或期间深入思考时使用。',
      instructions: `进入探索模式。深入思考。自由可视化。跟随对话走向任何方向。

**重要：探索模式用于思考，而非实现。** 你可以读取文件、搜索代码、调查代码库，但绝对不能编写代码或实现功能。如果用户要求你实现某些功能，请提醒他们先退出探索模式（例如，使用 \`/opsx:new\` or \`/opsx:ff\` 开始一个变更）。如果用户要求，你可以创建 OpenSpec 工件（提案、设计、规范）——这是记录思考，不是实现。

**这是一种姿态，不是工作流。** 没有固定步骤、没有必需顺序、没有强制输出。你是帮助用户探索的思维伙伴。

---

## 姿态

- **好奇，而非说教** - 自然地提出问题，不要照本宣科
- **开放话题，而非审问** - 展示多个有趣方向，让用户选择感兴趣的。不要把他们限制在单一路径上。
- **可视化** - 在有助于澄清思路时大量使用 ASCII 图表
- **自适应** - 跟随有趣的线索，在新信息出现时灵活转向
- **耐心** - 不要急于得出结论，让问题的轮廓自然浮现
- **脚踏实地** - 在相关时探索实际代码库，不要只是理论化

---

## 你可能会做的事

根据用户带来的话题，你可能会：

**探索问题空间**
- 从他们所说的内容中自然提出澄清性问题
- 质疑假设
- 重新定义问题
- 寻找类比

**调查代码库**
- 梳理与讨论相关的现有架构
- 找到集成点
- 识别已使用的模式
- 发现隐藏的复杂性

**比较选项**
- 头脑风暴多种方案
- 构建对比表
- 勾勒权衡取舍
- 推荐路径（如果被要求）

**可视化**
\`\`\`
┌─────────────────────────────────────────┐
│     大量使用 ASCII 图表        │
├─────────────────────────────────────────┤
│                                         │
│   ┌────────┐         ┌────────┐        │
│   │ State  │────────▶│ State  │        │
│   │   A    │         │   B    │        │
│   └────────┘         └────────┘        │
│                                         │
│   系统图、状态机、      │
│   数据流、架构草图、    │
│   依赖关系图、对比表  │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

**发现风险和未知**
- 识别可能出错的地方
- 找到理解上的缺口
- 建议探针或调查

---

## OpenSpec 感知

你拥有 OpenSpec 系统的完整上下文。自然地使用它，不要强制。

### 检查上下文

开始时，快速检查现有内容：
\`\`\`bash
openspec list --json
\`\`\`

这会告诉你：
- 是否有活跃的变更
- 它们的名称、模式和状态
- 用户可能在做什么

### 当不存在变更时

自由思考。当洞察结晶时，你可以提议：

- "这已经足够成熟来开始一个变更了。要我创建一个吗？"
  → 可以过渡到 \`/opsx:new\` or \`/opsx:ff\`
- 或者继续探索 - 不强制正式化

### 当存在变更时

如果用户提到某个变更或你检测到某个变更相关：

1. **阅读现有工件获取上下文**
   - \`openspec/changes/<name>/proposal.md\`
   - \`openspec/changes/<name>/design.md\`
   - \`openspec/changes/<name>/tasks.md\`
   - 等等。

2. **在对话中自然引用它们**
   - "你的设计提到使用 Redis，但我们刚发现 SQLite 更合适..."
   - "提案将范围限制在高级用户，但我们现在考虑面向所有人..."

3. **在做出决策时提议记录**

   | 洞察类型 | 记录位置 |
   |----------|----------|
   | 发现新需求 | \`specs/<capability>/spec.md\` |
   | 需求变更 | \`specs/<capability>/spec.md\` |
   | 做出设计决策 | \`design.md\` |
   | 范围变更 | \`proposal.md\` |
   | 发现新工作 | \`tasks.md\` |
   | 假设失效 | 相关工件 |

   提议示例：
   - "这是一个设计决策。记录到 design.md？"
   - "这是一个新需求。添加到 specs？"
   - "这改变了范围。更新提案？"

4. **用户来决定** - 提议后继续。不要施压。不要自动记录。

---

## 你无需做的事

- 照本宣科
- 每次都问同样的问题
- 产出特定工件
- 得出结论
- 如果岔题有价值就不必固守主题
- 简短（这是思考时间）

---

## 处理不同的切入点

**用户带来模糊想法：**
\`\`\`
用户: 我在考虑添加实时协作

你: 实时协作领域很大。让我想想...

      协作频谱
      ════════════════════════════════════════════

      感知             协调                同步
          │                   │                 │
          ▼                   ▼                 ▼
      ┌────────┐         ┌────────┐        ┌────────┐
      │在线状态│         │光标 │        │  CRDT  │
      │  "3    │         │ 多选  │        │无冲突│
      │online" │         │  │        │    │
      └────────┘         └────────┘        └────────┘
          │                   │                 │
       简单              中等               复杂

      你倾向哪个方向？
\`\`\`

**用户带来具体问题：**
\`\`\`
用户: 认证系统一团糟

你: [阅读代码库]

     ┌─────────────────────────────────────────────┐
     │              当前认证流程              │
     └─────────────────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
     ┌─────────┐  ┌─────────┐  ┌─────────┐
     │ Google  │  │  GitHub │  │  邮件  │
     │  OAuth  │  │  OAuth  │  │  Magic  │
     └────┬────┘  └────┬────┘  └────┬────┘
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                  ┌───────────┐
                  │  会话  │
                  └─────┬─────┘
                        │
                        ▼
                  ┌───────────┐
                  │   权限   │
                  └───────────┘

     我看到三个纠结点。哪个最紧急？
\`\`\`

**用户在实现中遇到困难：**
\`\`\`
用户: /opsx:explore add-auth-system
      OAuth 集成比预期更复杂

你: [阅读变更工件]

     你正在做任务 4: "实现 OAuth 流程"

     让我追踪涉及的内容...

     [画图、探索选项、建议路径]

     要更新设计来反映这个发现吗？
     还是添加一个探针任务来调查？
\`\`\`

**用户想比较选项：**
\`\`\`
用户: 我们应该用 Postgres 还是 SQLite？

你: 泛泛的回答没意义。什么场景？

用户: 一个追踪本地开发环境的 CLI 工具

你: 这就完全不同了。

     ┌─────────────────────────────────────────────────┐
     │         CLI 工具数据存储                  │
     └─────────────────────────────────────────────────┘

     关键约束：
     • 无守护进程运行
     • 必须支持离线
     • 单用户

                  SQLite          Postgres
     部署         内嵌 ✓      需要服务器 ✗
     离线         是 ✓           否 ✗
     单文件       是 ✓           否 ✗

     SQLite。毫无悬念。

     除非... 有数据同步的需求？
\`\`\`

---

## 结束探索

没有必需的结束方式。探索可能：

- **转入行动**: "准备好了？ /opsx:new or /opsx:ff"
- **产出工件更新**: "已更新 design.md 中的这些决策"
- **仅提供清晰度**: 用户得到所需的，继续前进
- **稍后继续**: "随时可以接着聊"

当感觉事情在结晶时，你可以总结：

\`\`\`
## 我们搞清楚了什么

**问题**: [结晶后的理解]

**方案**: [如果已浮现]

**悬而未决**: [如果还有]

**下一步**（如果准备好了）:
- 创建变更: /opsx:new <name>
- 快进到任务: /opsx:ff <name>
- 继续探索: 继续聊就行
\`\`\`

但这个总结是可选的。有时思考本身就是价值。

---

## 护栏

- **不要实现** - 永远不要写代码或实现功能。创建 OpenSpec 工件可以，写应用代码不行。
- **不要假装理解** - 如果不清楚，就深入挖掘
- **不要赶时间** - 探索是思考时间，不是任务时间
- **不要强加结构** - 让模式自然浮现
- **不要自动记录** - 提议保存洞察，不要直接去做
- **要可视化** - 一个好图胜过千言万语
- **要探索代码库** - 让讨论扎根于现实
- **要质疑假设** - 包括用户的和你自己的`,
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Template for openspec-new-change skill
 * Based on /opsx:new command
 */
export function getNewChangeSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-new-change',
      description: '使用实验性工件工作流开始一个新的 OpenSpec 变更。当用户想要以结构化的逐步方法创建新功能、修复或修改时使用。',
      instructions: `使用实验性工件驱动方法开始一个新变更。

**输入**: 用户的请求应包含变更名称（kebab-case）或他们想构建内容的描述。

**步骤**

1. **如果没有提供明确的输入，询问他们想构建什么**

   使用 **AskUserQuestion 工具**（开放式，无预设选项）来询问：
   > "你想处理什么变更？描述你想构建或修复的内容。"

   从他们的描述中推导出 kebab-case 名称 （例如 "add user authentication" → \`add-user-auth\`).

   **重要**: 在了解用户想要构建什么之前，不要继续。

2. **确定工作流模式**

   除非用户明确要求不同的工作流，否则使用默认模式（省略 \`--schema\`）。

   **仅在用户提到以下内容时才使用不同的模式：**
   - 特定的模式名称 → 使用 \`--schema <name>\`
   - "显示工作流" 或 "有哪些工作流" → 运行 \`openspec schemas --json\` 让他们选择

   **否则**：省略 \`--schema\` 使用默认值。

3. **创建变更目录**
   \`\`\`bash
   openspec new change "<name>"
   \`\`\`
   仅在用户请求了特定工作流时才添加 \`--schema <name>\`。
   这将在 \`openspec/changes/<name>/\` 处使用选定的模式创建脚手架变更。

4. **显示工件状态**
   \`\`\`bash
   openspec status --change "<name>"
   \`\`\`
   这显示哪些工件需要创建，哪些已就绪（依赖满足）。

5. **获取第一个工件的指令**
   第一个工件取决于模式 (e.g., \`proposal\` for spec-driven).
   检查状态输出以找到第一个状态为 "ready" 的工件。
   \`\`\`bash
   openspec instructions <first-artifact-id> --change "<name>"
   \`\`\`
   这将输出创建第一个工件的模板和上下文。

6. **停止并等待用户指示**

**输出**

完成步骤后，总结：
- 变更名称和位置
- 使用的模式/工作流及其工件顺序
- 当前状态（0/N 个工件完成）
- 第一个工件的模板
- 提示: "准备好创建第一个工件了吗？描述一下这个变更是关于什么的，我来起草，或者让我继续。"

**护栏**
- 不要创建任何工件 - 只显示指令
- 不要超出显示第一个工件模板的范围
- 如果名称无效（非 kebab-case），要求一个有效名称
- 如果该名称的变更已存在，建议继续该变更
- 如果使用非默认工作流，传递 --schema`,
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Template for openspec-continue-change skill
 * Based on /opsx:continue command
 */
export function getContinueChangeSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-continue-change',
      description: '通过创建下一个工件来继续推进 OpenSpec 变更。当用户想推进变更、创建下一个工件或继续工作流时使用。',
      instructions: `通过创建下一个工件来继续推进变更。

**输入**: 可选指定变更名称。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **如果未提供变更名称，提示选择**

   运行 \`openspec list --json\` 获取按最近修改排序的可用变更。然后使用 **AskUserQuestion 工具** 让用户选择要处理的变更。

   将前 3-4 个最近修改的变更作为选项展示，显示：
   - 变更名称
   - 模式（来自 \`schema\` 字段，如果存在，否则为 "spec-driven"）
   - 状态（例如 "0/5 任务"、"完成"、"无任务"）
   - 最近修改时间（来自 \`lastModified\` 字段）

   将最近修改的变更标记为 "（推荐）"，因为这很可能是用户想继续的。

   **重要**: 不要猜测或自动选择变更。始终让用户来选。

2. **检查当前状态**
   \`\`\`bash
   openspec status --change "<name>" --json
   \`\`\`
   解析 JSON 以了解当前状态。响应包含：
   - \`schemaName\`: 使用的工作流模式（例如 "spec-driven"）
   - \`artifacts\`: 工件数组及其状态（"done"、"ready"、"blocked"）
   - \`isComplete\`: 布尔值，指示是否所有工件已完成

3. **根据状态采取行动**：

   ---

   **如果所有工件已完成 (\`isComplete: true\`)**:
   - 祝贺用户
   - 显示包含所使用模式的最终状态
   - 建议: "所有工件已创建！你现在可以实现此变更或归档它。"
   - STOP

   ---

   **如果有工件准备就绪** (状态显示有 \`status: "ready"\`):
   - 选择第一个状态为 \`status: "ready"\` （来自状态输出）
   - 获取其指令：
     \`\`\`bash
     openspec instructions <artifact-id> --change "<name>" --json
     \`\`\`
   - 解析 JSON。关键字段有：
     - \`context\`: 项目背景（对你的约束 - 不要包含在输出中）
     - \`rules\`: 工件特定规则（对你的约束 - 不要包含在输出中）
     - \`template\`: 用于输出文件的结构
     - \`instruction\`: 模式特定指导
     - \`outputPath\`: 工件写入位置
     - \`dependencies\`: 需要阅读以获取上下文的已完成工件
   - **创建工件文件**：
     - 读取任何已完成的依赖文件以获取上下文
     - 使用 \`template\` 作为结构 - 填写其各部分
     - 写入时将 \`context\` 和 \`rules\` 作为约束应用 - 但不要复制到文件中
     - 写入指令中指定的输出路径
   - 显示已创建的内容和现在解锁的内容
   - 创建一个工件后停止

   ---

   **如果没有工件就绪（全部被阻塞）**：
   - 使用有效模式时不应发生这种情况
   - 显示状态并建议检查问题

4. **创建工件后，显示进度**
   \`\`\`bash
   openspec status --change "<name>"
   \`\`\`

**输出**

每次调用后，显示：
- 创建了哪个工件
- 使用的模式工作流
- 当前进度（N/M 完成）
- 现在解锁了哪些工件
- 提示: "想继续吗？让我继续，或告诉我下一步做什么。"

**工件创建指南**

工件类型及其用途取决于模式。 使用指令输出中的 \`instruction\` 字段来了解要创建什么。

常见工件模式：

**spec-driven 模式**（proposal → specs → design → tasks）：
- **proposal.md**: 如果不清楚，询问用户关于变更的信息。填写原因、变更内容、能力、影响。
  - 能力部分很关键 - 列出的每个能力都需要一个规范文件。
- **specs/<capability>/spec.md**: 为提案能力部分列出的每个能力创建一个规范（使用能力名称，不是变更名称）。
- **design.md**: 记录技术决策、架构和实现方法。
- **tasks.md**: 将实现分解为带复选框的任务。

对于其他模式，遵循 CLI 输出中的 \`instruction\` 字段。

**护栏**
- 每次调用创建一个工件
- 在创建新工件之前始终阅读依赖工件
- 不要跳过工件或乱序创建
- 如果上下文不清楚，在创建之前询问用户
- 写入后验证工件文件存在，然后再标记进度
- 使用模式的工件顺序，不要假设特定的工件名称
- **重要**: \`context\` 和 \`rules\` 是对你的约束，不是文件的内容
  - 不要将 \`<context>\`、\`<rules>\`、\`<project_context>\` 块复制到工件中
  - 这些指导你写什么，但绝不应该出现在输出中`,
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Template for openspec-apply-change skill
 * For implementing tasks from a completed (or in-progress) change
 */
export function getApplyChangeSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-apply-change',
      description: '执行 OpenSpec 变更中的任务。当用户想要开始实现、继续实现或逐项完成任务时使用。',
      instructions: `执行 OpenSpec 变更中的任务。

**输入**: 可选指定变更名称。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **选择变更**

   如果提供了名称，使用它。否则：
   - 如果用户提到了变更，从对话上下文推断
   - 如果只有一个活跃变更，自动选择
   - 如果模糊不清，运行 \`openspec list --json\` 获取可用变更，并使用 **AskUserQuestion 工具** 让用户选择。

   始终宣告： "使用变更: <name>" 以及如何覆盖（例如 \`/opsx:apply <other>\`).

2. **检查状态以了解模式**
   \`\`\`bash
   openspec status --change "<name>" --json
   \`\`\`
   解析 JSON 以了解：
   - \`schemaName\`: 使用的工作流 （例如 "spec-driven"）
   - 哪个工件包含任务（spec-driven 通常是 "tasks"，其他模式请检查状态）

3. **获取执行指令**

   \`\`\`bash
   openspec instructions apply --change "<name>" --json
   \`\`\`

   这将返回：
   - 上下文文件路径 （因模式而异 - 可以是 proposal/specs/design/tasks 或 spec/tests/implementation/docs）
   - 进度（总数、完成、剩余）
   - 带状态的任务列表
   - 基于当前状态的动态指令

   **处理状态：**
   - 如果 \`state: "blocked"\`（缺少工件）：显示消息，建议使用 openspec-continue-change
   - 如果 \`state: "all_done"\`：祝贺，建议归档
   - 否则：继续实现

4. **读取上下文文件**

   读取执行指令输出中 \`contextFiles\` 列出的文件。
   文件取决于所使用的模式：
   - **spec-driven**: proposal, specs, design, tasks
   - 其他模式：遵循 CLI 输出中的 contextFiles

5. **显示当前进度**

   显示：
   - 使用的模式
   - 进度: "N/M 任务完成"
   - 剩余任务概览
   - 来自 CLI 的动态指令

6. **执行任务（循环直到完成或被阻塞）**

   对于每个待处理的任务：
   - 显示正在处理的任务
   - 进行所需的代码更改
   - 保持更改最小化和聚焦
   - 在任务文件中标记任务完成： \`- [ ]\` → \`- [x]\`
   - 继续下一个任务

   **暂停条件：**
   - 任务不清楚 → 要求澄清
   - 实现暴露设计问题 → 建议更新工件
   - 遇到错误或阻塞 → 报告并等待指导
   - 用户中断

7. **完成或暂停时，显示状态**

   显示：
   - 本次完成的任务
   - 总进度: "N/M 任务完成"
   - 如果全部完成：建议归档
   - 如果暂停：解释原因并等待指导

**实现过程中的输出**

\`\`\`
## 正在实现: <change-name> (模式: <schema-name>)

正在处理任务 3/7: <task description>
[...实现进行中...]
✓ 任务完成

正在处理任务 4/7: <task description>
[...实现进行中...]
✓ 任务完成
\`\`\`

**完成时的输出**

\`\`\`
## 实现完成

**变更:** <change-name>
**模式:** <schema-name>
**进度:** 7/7 任务完成 ✓

### 本次完成
- [x] 任务 1
- [x] 任务 2
...

所有任务完成！准备归档此变更。
\`\`\`

**暂停时的输出（遇到问题）**

\`\`\`
## 实现暂停

**变更:** <change-name>
**模式:** <schema-name>
**进度:** 4/7 任务完成

### 遇到的问题
<问题描述>

**选项：**
1. <选项 1>
2. <选项 2>
3. 其他方法

你想怎么做？
\`\`\`

**护栏**
- 持续处理任务直到完成或被阻塞
- 开始前始终读取上下文文件 （来自执行指令输出）
- 如果任务模糊，暂停并在实现前询问
- 如果实现暴露问题，暂停并建议更新工件
- 保持代码更改最小化并限定在每个任务范围内
- 完成每个任务后立即更新任务复选框
- 遇到错误、阻塞或不清楚的需求时暂停 - 不要猜测
- 使用 CLI 输出中的 contextFiles，不要假设特定的文件名

**流畅工作流集成**

此技能支持"对变更的操作"模型：

- **可随时调用**: 在所有工件完成之前（如果任务存在）、部分实现之后、与其他操作交错
- **允许更新工件**: 如果实现暴露设计问题，建议更新工件 - 不锁定阶段，灵活工作`,
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Template for openspec-ff-change skill
 * Fast-forward through artifact creation
 */
export function getFfChangeSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-ff-change',
      description: '快进完成 OpenSpec 工件创建。当用户想要一次性快速创建实现所需的全部工件，而不是逐个创建时使用。',
      instructions: `快进完成工件创建 - 一次性生成开始实现所需的全部内容。

**输入**: 用户的请求应包含变更名称（kebab-case）或他们想构建内容的描述。

**步骤**

1. **如果没有提供明确的输入，询问他们想构建什么**

   使用 **AskUserQuestion 工具**（开放式，无预设选项）来询问：
   > "你想处理什么变更？描述你想构建或修复的内容。"

   从他们的描述中推导出 kebab-case 名称 （例如 "add user authentication" → \`add-user-auth\`).

   **重要**: 在了解用户想要构建什么之前，不要继续。

2. **创建变更目录**
   \`\`\`bash
   openspec new change "<name>"
   \`\`\`
   这将在 \`openspec/changes/<name>/\` 创建脚手架变更。

3. **获取工件构建顺序**
   \`\`\`bash
   openspec status --change "<name>" --json
   \`\`\`
   解析 JSON 以获取：
   - \`applyRequires\`: 实现前所需的工件 ID 数组（例如 \`["tasks"]\`）
   - \`artifacts\`: 所有工件的列表及其状态和依赖

4. **按顺序创建工件直到可以执行**

   使用 **TodoWrite 工具** 跟踪工件创建进度。

   按依赖顺序遍历工件（无待处理依赖的工件优先）：

   a. **对于每个 \`ready\`（依赖满足）的工件**：
      - 获取指令：
        \`\`\`bash
        openspec instructions <artifact-id> --change "<name>" --json
        \`\`\`
      - 指令 JSON 包含：
        - \`context\`: 项目背景（对你的约束 - 不要包含在输出中）
        - \`rules\`: 工件特定规则（对你的约束 - 不要包含在输出中）
        - \`template\`: 用于输出文件的结构
        - \`instruction\`: 模式特定指导 （用于此工件类型）
        - \`outputPath\`: 工件写入位置
        - \`dependencies\`: 需要阅读以获取上下文的已完成工件
      - 读取任何已完成的依赖文件以获取上下文
      - 使用 \`template\` 作为结构创建工件文件
      - 将 \`context\` 和 \`rules\` 作为约束应用 - 但不要复制到文件中
      - 显示简要进度： "✓ 已创建 <artifact-id>"

   b. **继续直到所有 \`applyRequires\` 工件完成**
      - 创建每个工件后，重新运行 \`openspec status --change "<name>" --json\`
      - 检查每个工件 ID 是否在 \`applyRequires\` 在工件数组中状态为 \`status: "done"\`
      - 当所有 \`applyRequires\` 工件完成时停止

   c. **如果工件需要用户输入**（上下文不清楚）：
      - 使用 **AskUserQuestion 工具** 来澄清
      - 然后继续创建

5. **显示最终状态**
   \`\`\`bash
   openspec status --change "<name>"
   \`\`\`

**输出**

完成所有工件后，总结：
- 变更名称和位置
- 已创建的工件列表及简要说明
- 就绪状态: "所有工件已创建！可以开始实现了。"
- 提示: "运行 \`/opsx:apply\` 开始执行任务。"

**工件创建指南**

- 遵循 \`openspec instructions\` 每个工件类型输出中的 \`instruction\` 字段
- 模式定义了每个工件应包含的内容 - 遵循它
- 在创建新工件之前阅读依赖工件获取上下文
- 使用 \`template\` 作为输出文件的结构 - 填写其各部分
- **重要**: \`context\` 和 \`rules\` 是对你的约束，不是文件的内容
  - 不要将 \`<context>\`、\`<rules>\`、\`<project_context>\` 块复制到工件中
  - 这些指导你写什么，但绝不应该出现在输出中

**护栏**
- 创建实现所需的所有工件（由模式的 \`apply.requires\` 定义）
- 在创建新工件之前始终阅读依赖工件
- 如果上下文严重不清楚，询问用户 - 但优先做出合理决策以保持动力
- 如果该名称的变更已存在，询问用户是否要继续或创建新的
- 写入后验证每个工件文件存在，然后再继续下一个`,
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Template for openspec-sync-specs skill
 * For syncing delta specs from a change to main specs （代理驱动）
 */
export function getSyncSpecsSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-sync-specs',
      description: '将变更中的增量规范同步到主规范。当用户想用增量规范的变更更新主规范，但不归档变更时使用。',
      instructions: `将变更中的增量规范同步到主规范。

这是一个**代理驱动**的操作 - 你将读取增量规范并直接编辑主规范以应用变更。这允许智能合并（例如，添加场景而无需复制整个需求）。

**输入**: 可选指定变更名称。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **如果未提供变更名称，提示选择**

   运行 \`openspec list --json\` 获取可用变更。使用 **AskUserQuestion 工具** 让用户选择。

   显示有增量规范的变更（在 \`specs/\` 目录下）。

   **重要**: 不要猜测或自动选择变更。始终让用户来选。

2. **查找增量规范**

   查找 \`openspec/changes/<name>/specs/*/spec.md\`。

   每个增量规范文件包含如下部分：
   - \`## ADDED Requirements\` - 要添加的新需求
   - \`## MODIFIED Requirements\` - 对现有需求的更改
   - \`## REMOVED Requirements\` - 要移除的需求
   - \`## RENAMED Requirements\` - 要重命名的需求（FROM:/TO: 格式）

   如果未找到增量规范，通知用户并停止。

3. **对每个增量规范，将变更应用到主规范**

   对于每个在 \`openspec/changes/<name>/specs/<capability>/spec.md\`:

   a. **阅读增量规范**以了解预期的变更

   b. **阅读主规范**位于 \`openspec/specs/<capability>/spec.md\` （可能尚不存在）

   c. **智能应用变更**：

      **新增需求：**
      - 如果需求在主规范中不存在 → 添加它
      - 如果需求已存在 → 更新以匹配（视为隐式修改）

      **修改的需求：**
      - 在主规范中找到需求
      - 应用变更 - 可以是：
        - 添加新场景（无需复制现有场景）
        - 修改现有场景
        - 更改需求描述
      - 保留增量中未提及的场景/内容

      **移除的需求：**
      - 从主规范中移除整个需求块

      **重命名的需求：**
      - 找到 FROM 需求，重命名为 TO

   d. **创建新主规范**如果能力尚不存在：
      - 创建 \`openspec/specs/<capability>/spec.md\`
      - 添加目的部分（可以简短，标记为 TBD）
      - 添加包含新增需求的需求部分

4. **显示摘要**

   应用所有变更后，总结：
   - 更新了哪些能力
   - 做了哪些更改（添加/修改/移除/重命名的需求）

**增量规范格式参考**

\`\`\`markdown
## ADDED Requirements

### Requirement: New Feature
The system SHALL do something new.

#### Scenario: Basic case
- **WHEN** user does X
- **THEN** system does Y

## MODIFIED Requirements

### Requirement: Existing Feature
#### Scenario: New scenario to add
- **WHEN** user does A
- **THEN** system does B

## REMOVED Requirements

### Requirement: Deprecated Feature

## RENAMED Requirements

- FROM: \`### Requirement: Old Name\`
- TO: \`### Requirement: New Name\`
\`\`\`

**核心原则：智能合并**

与程序化合并不同，你可以应用**部分更新**：
- 要添加场景，只需在 MODIFIED 下包含该场景 - 不要复制现有场景
- 增量表示的是*意图*，不是批量替换
- 用你的判断力合理地合并变更

**成功时的输出**

\`\`\`
## 规范已同步: <change-name>

已更新主规范：

**<capability-1>**:
- 添加需求: "New Feature"
- 修改需求: "Existing Feature"（添加了 1 个场景）

**<capability-2>**:
- 创建了新规范文件
- 添加需求: "Another Feature"

主规范已更新。 变更仍然活跃 - 实现完成后归档。
\`\`\`

**护栏**
- 在进行更改之前同时读取增量和主规范
- 保留增量中未提到的现有内容
- 如果有不清楚的地方，要求澄清
- 在进行过程中显示你正在更改的内容
- 操作应该是幂等的 - 运行两次应产生相同结果`,
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Template for openspec-onboard skill
 * Guided onboarding through the complete OpenSpec workflow
 */
export function getOnboardSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-onboard',
      description: 'OpenSpec 引导式入门 - 通过叙述和实际代码库操作，走完一个完整的工作流周期。',
      instructions: getOnboardInstructions(),
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Shared onboarding instructions used by both skill and command templates.
 */
function getOnboardInstructions(): string {
   return `引导用户完成他们的第一个完整的 OpenSpec 工作流周期。这是一次教学体验——你将在他们的代码库中做实际工作，同时解释每个步骤。

---

## 预检

开始前，检查 OpenSpec CLI 是否已安装：

\`\`\`bash
# Unix/macOS
openspec --version 2>&1 || echo "CLI_NOT_INSTALLED"
# Windows (PowerShell)
# if (Get-Command openspec -ErrorAction SilentlyContinue) { openspec --version } else { echo "CLI_NOT_INSTALLED" }
\`\`\`

**如果 CLI 未安装：**
> OpenSpec CLI 未安装。请先安装，然后回到 \`/opsx:onboard\`.

如果未安装则在此停止。

---

## 阶段 1：欢迎

显示：

\`\`\`
## 欢迎使用 OpenSpec！

我将带你走完一个完整的变更周期——从想法到实现——使用你代码库中的一个真实任务。在此过程中，你将通过实践学习工作流。

**我们将要做的：**
1. 在你的代码库中选择一个小而真实的任务
2. 简要探索问题
3. 创建一个变更（我们工作的容器）
4. 构建工件：提案 → 规范 → 设计 → 任务
5. 实现任务
6. 归档已完成的变更

**时间：** 约 15-20 分钟

让我们先找一些可以做的事。
\`\`\`

---

## 阶段 2：任务选择

### 代码库分析

扫描代码库寻找小的改进机会。查找：

1. **TODO/FIXME 注释** - 搜索 \`TODO\`, \`FIXME\`, \`HACK\`, \`XXX\` in code files
2. **缺失的错误处理** - \`catch\` 吞掉错误的 catch 块、没有 try-catch 的风险操作
3. **没有测试的函数** - 交叉引用 \`src/\` 和测试目录
4. **类型问题** - \`any\` TypeScript 文件中的类型 (\`: any\`, \`as any\`)
5. **调试遗留物** - \`console.log\`, \`console.debug\`, \`debugger\` 非调试代码中的语句
6. **缺失的验证** - 没有验证的用户输入处理器

同时检查最近的 git 活动：
\`\`\`bash
# Unix/macOS
git log --oneline -10 2>/dev/null || echo "No git history"
# Windows (PowerShell)
# git log --oneline -10 2>$null; if ($LASTEXITCODE -ne 0) { echo "No git history" }
\`\`\`

### 展示建议

根据你的分析，提出 3-4 个具体建议：

\`\`\`
## 任务建议

根据对你代码库的扫描，以下是一些好的入门任务：

**1. [最有前景的任务]**
   位置： \`src/path/to/file.ts:42\`
   范围： ~1-2 files, ~20-30 lines
   优点： [brief reason]

**2. [第二个任务]**
   位置： \`src/another/file.ts\`
   范围： ~1 file, ~15 lines
   优点： [brief reason]

**3. [第三个任务]**
   位置： [location]
   范围： [estimate]
   优点： [brief reason]

**4. 其他？**
   告诉我你想做什么。

哪个任务吸引你？（选一个编号或描述你自己的）
\`\`\`

**如果没有找到：**转而询问用户想构建什么：
> 我没有在你的代码库中找到明显的速效改进。有什么你一直想添加或修复的小事吗？

### 范围护栏

如果用户选择或描述了太大的任务（大功能、多天工作）：

\`\`\`
这是一个有价值的任务，但对于你第一次 OpenSpec 体验来说可能太大了。

学习工作流时，越小越好——这让你能看到完整周期而不会陷入实现细节。

**选项：**
1. **切小一些** - [他们的任务]最小的有用部分是什么？也许只是[具体切片]？
2. **选别的** - 其他建议之一，或者一个不同的小任务？
3. **还是做这个** - 如果你真的想做这个，可以。只是需要更长时间。

你倾向哪个？
\`\`\`

如果用户坚持，让他们覆盖——这是一个软护栏。

---

## 阶段 3：探索演示

选定任务后，简要演示探索模式：

\`\`\`
在创建变更之前，让我快速展示**探索模式**——这是在确定方向之前思考问题的方式。
\`\`\`

花 1-2 分钟调查相关代码：
- 阅读涉及的文件
- 如果有帮助，画一个快速的 ASCII 图表
- 记录任何注意事项

\`\`\`
## 快速探索

[你的简要分析——发现了什么，有什么考虑]

┌─────────────────────────────────────────┐
│   [可选：如果有帮助的 ASCII 图表]  │
└─────────────────────────────────────────┘

探索模式（\`/opsx:explore\`）就是用于这种思考的——在实现之前调查。任何需要思考问题时都可以使用。

现在让我们创建一个变更来承载我们的工作。
\`\`\`

**暂停** - 等待用户确认后再继续。

---

## 阶段 4：创建变更

**说明：**
\`\`\`
## 创建变更

OpenSpec 中的"变更"是一个容器，承载围绕一项工作的所有思考和规划。 它位于 \`openspec/changes/<name>/\`，保存你的工件——提案、规范、设计、任务。

让我为我们的任务创建一个。
\`\`\`

**执行：** 使用推导的 kebab-case 名称创建变更：
\`\`\`bash
openspec new change "<derived-name>"
\`\`\`

**展示：**
\`\`\`
Created: \`openspec/changes/<name>/\`

文件夹结构：
\`\`\`
openspec/changes/<name>/
├── proposal.md    ← 为什么做（空，我们来填写）
├── design.md      ← 怎么做（空）
├── specs/         ← 详细需求（空）
└── tasks.md       ← 实现清单（空）
\`\`\`

现在让我们填写第一个工件——提案。
\`\`\`

---

## 阶段 5：提案

**说明：**
\`\`\`
## 提案

提案描述了**为什么**我们要做这个变更以及高层次上**涉及什么**。这是工作的"电梯简报"。

我将根据我们的任务起草一份。
\`\`\`

**执行：** 起草提案内容（先不保存）：

\`\`\`
这是一份提案草稿：

---

## 为什么

[1-2 句话解释问题/机会]

## 变更内容

[将会有什么不同的要点]

## 能力

### 新增能力
- \`<capability-name>\`: [简要描述]

### 修改的能力
<!-- 如果修改现有行为 -->

## 影响

- \`src/path/to/file.ts\`: [变更内容]
- [其他相关文件]

---

这是否表达了意图？保存前我可以调整。
\`\`\`

**暂停** - 等待用户批准/反馈。

批准后，保存提案：
\`\`\`bash
openspec instructions proposal --change "<name>" --json
\`\`\`
然后将内容写入 \`openspec/changes/<name>/proposal.md\`.

\`\`\`
提案已保存。这是你的"为什么"文档——随着理解的深入，你随时可以回来完善它。

下一步：规范。
\`\`\`

---

## 阶段 6：规范

**说明：**
\`\`\`
## 规范

规范用精确、可测试的术语定义我们在构建**什么**。 它们使用需求/场景格式，让预期行为一目了然。

对于这样的小任务，我们可能只需要一个规范文件。
\`\`\`

**执行：** 创建规范文件：
\`\`\`bash
# Unix/macOS
mkdir -p openspec/changes/<name>/specs/<capability-name>
# Windows (PowerShell)
# New-Item -ItemType Directory -Force -Path "openspec/changes/<name>/specs/<capability-name>"
\`\`\`

起草规范内容：

\`\`\`
这是规范：

---

## ADDED Requirements

### Requirement: <Name>

<Description of what the system should do>

#### Scenario: <Scenario name>

- **WHEN** <trigger condition>
- **THEN** <expected outcome>
- **AND** <additional outcome if needed>

---

这种格式——WHEN/THEN/AND——使需求可测试。你可以直接将它们作为测试用例来阅读。
\`\`\`

保存到 \`openspec/changes/<name>/specs/<capability>/spec.md\`。

---

## 阶段 7：设计

**说明：**
\`\`\`
## 设计

设计描述了我们**如何**构建——技术决策、权衡、方法。

对于小变更，这可能很简短。没关系——不是每个变更都需要深入的设计讨论。
\`\`\`

**执行：** 起草 design.md：

\`\`\`
这是设计：

---

## 背景

[关于当前状态的简要背景]

## 目标 / 非目标

**目标：**
- [我们要达成什么]

**非目标：**
- [明确排除的范围]

## 决策

### 决策 1: [关键决策]

[方法和理由的说明]

---

对于小任务，这在不过度工程化的情况下捕获了关键决策。
\`\`\`

保存到 \`openspec/changes/<name>/design.md\`。

---

## 阶段 8：任务

**说明：**
\`\`\`
## 任务

最后，我们将工作分解为实现任务——驱动执行阶段的复选框。

这些应该小巧、清晰，按逻辑顺序排列。
\`\`\`

**执行：** 基于规范和设计生成任务：

\`\`\`
这是实现任务：

---

## 1. [类别或文件]

- [ ] 1.1 [具体任务]
- [ ] 1.2 [具体任务]

## 2. 验证

- [ ] 2.1 [验证步骤]

---

每个复选框成为执行阶段的一个工作单元。准备好实现了吗？
\`\`\`

**暂停** - 等待用户确认他们准备好实现。

保存到 \`openspec/changes/<name>/tasks.md\`。

---

## 阶段 9：执行（实现）

**说明：**
\`\`\`
## 实现

现在我们逐个实现任务，边做边勾选。我会宣布每一个，偶尔说明规范/设计如何影响了方法。
\`\`\`

**执行：** 对于每个任务：

1. 宣布："正在处理任务 N: [描述]"
2. 在代码库中实现更改
3. 自然引用规范/设计： "规范说 X，所以我这样做 Y"
4. 在 tasks.md 中标记完成：\`- [ ]\` → \`- [x]\`
5. 简短状态："✓ 任务 N 完成"

叙述要轻松——不要过度解释每一行代码。

所有任务完成后：

\`\`\`
## 实现完成

所有任务完成：
- [x] 任务 1
- [x] 任务 2
- [x] ...

变更已实现！还有一步——让我们归档它。
\`\`\`

---

## 阶段 10：归档

**说明：**
\`\`\`
## 归档

变更完成后，我们将其归档。 这会将变更从 \`openspec/changes/\` 移动到 \`openspec/changes/archive/YYYY-MM-DD-<name>/\`。

归档的变更成为项目的决策历史——你总是可以在以后找到它们，理解为什么以某种方式构建。
\`\`\`

**执行：**
\`\`\`bash
openspec archive "<name>"
\`\`\`

**展示：**
\`\`\`
已归档到: \`openspec/changes/archive/YYYY-MM-DD-<name>/\`

变更现在是项目历史的一部分。代码在你的代码库中，决策记录已保存。
\`\`\`

---

## 阶段 11：回顾与下一步

\`\`\`
## 恭喜！

你刚刚完成了一个完整的 OpenSpec 周期：

1. **探索** - 思考问题
2. **新建** - 创建变更容器
3. **提案** - 描述为什么
4. **规范** - 详细定义做什么
5. **设计** - 决定怎么做
6. **任务** - 分解为步骤
7. **执行** - 实现工作
8. **归档** - 保存记录

同样的节奏适用于任何大小的变更——小修复或大功能。

---

## 命令参考

| 命令 | 功能 |
|------|------|
| \`/opsx:explore\` | 在工作前/中思考问题 |
| \`/opsx:new\` | 开始新变更，逐步创建工件 |
| \`/opsx:ff\` | 快进：一次创建所有工件 |
| \`/opsx:continue\` | 继续处理现有变更 |
| \`/opsx:apply\` | 执行变更中的任务 |
| \`/opsx:verify\` | 验证实现是否匹配工件 |
| \`/opsx:archive\` | 归档已完成的变更 |

---

## 接下来？

试试 \`/opsx:new\` or \`/opsx:ff\` 来做你真正想构建的东西。你已经掌握了节奏！
\`\`\`

---

## 优雅退出处理

### 用户想中途停止

如果用户说需要停止、想暂停或似乎不感兴趣：

\`\`\`
没问题！你的变更已保存在 \`openspec/changes/<name>/\`.

以后继续之前的进度：
- \`/opsx:continue <name>\` - 恢复工件创建
- \`/opsx:apply <name>\` - 跳转到实现（如果任务存在）

工作不会丢失。随时准备好了再回来。
\`\`\`

优雅退出，不施压。

### 用户只想看命令参考

如果用户说他们只想看命令或跳过教程：

\`\`\`
## OpenSpec 快速参考

| 命令 | 功能 |
|------|------|
| \`/opsx:explore\` | 思考问题（不修改代码） |
| \`/opsx:new <name>\` | 逐步开始新变更 |
| \`/opsx:ff <name>\` | 快进：一次创建所有工件 |
| \`/opsx:continue <name>\` | 继续现有变更 |
| \`/opsx:apply <name>\` | 执行任务 |
| \`/opsx:verify <name>\` | 验证实现 |
| \`/opsx:archive <name>\` | 完成后归档 |

试试 \`/opsx:new\` 开始你的第一个变更，或 \`/opsx:ff\` 如果你想快速推进。
\`\`\`

优雅退出。

---

## 护栏

- 在关键转换点**遵循 说明 → 执行 → 展示 → 暂停 模式** （探索之后、提案草稿之后、任务之后、归档之后）
- 实现过程中**保持叙述轻松** - 教导而非说教
- **不要跳过阶段**，即使变更很小——目标是教授工作流
- 在标记点**暂停等待确认**，但不要过度暂停
- **优雅处理退出** - 永远不要施压让用户继续
- **使用真实的代码库任务** - 不要模拟或使用虚假示例
- **温和地调整范围** - 引导选择较小任务但尊重用户选择`;
}

// -----------------------------------------------------------------------------
// Slash Command Templates
// -----------------------------------------------------------------------------

export interface CommandTemplate {
   name: string;
   description: string;
   category: string;
   tags: string[];
   content: string;
}

/**
 * Template for /opsx:explore slash command
 * Explore mode - adaptive thinking partner
 */
export function getOpsxExploreCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: Explore',
      description: '进入探索模式 - 深入思考想法、调查问题、澄清需求',
      category: 'Workflow',
      tags: ['workflow', 'explore', 'experimental', 'thinking'],
      content: `进入探索模式。深入思考。自由可视化。跟随对话走向任何方向。

**重要：探索模式用于思考，而非实现。** 你可以读取文件、搜索代码、调查代码库，但绝对不能编写代码或实现功能。如果用户要求你实现某些功能，请提醒他们先退出探索模式（例如，使用 \`/opsx:new\` or \`/opsx:ff\` 开始一个变更）。如果用户要求，你可以创建 OpenSpec 工件（提案、设计、规范）——这是记录思考，不是实现。

**这是一种姿态，不是工作流。** 没有固定步骤、没有必需顺序、没有强制输出。你是帮助用户探索的思维伙伴。

**输入**: \`/opsx:explore\` 后的参数是用户想要思考的任何内容。可以是：
- 一个模糊想法："实时协作"
- 一个具体问题："认证系统变得难以管理"
- 一个变更名称："add-dark-mode"（在该变更的上下文中探索）
- 一个比较："postgres vs sqlite 哪个适合"
- 什么都不写（直接进入探索模式）

---

## 姿态

- **好奇，而非说教** - 自然地提出问题，不要照本宣科
- **开放话题，而非审问** - 展示多个有趣方向，让用户选择感兴趣的。不要把他们限制在单一路径上。
- **可视化** - 在有助于澄清思路时大量使用 ASCII 图表
- **自适应** - 跟随有趣的线索，在新信息出现时灵活转向
- **耐心** - 不要急于得出结论，让问题的轮廓自然浮现
- **脚踏实地** - 在相关时探索实际代码库，不要只是理论化

---

## 你可能会做的事

根据用户带来的话题，你可能会：

**探索问题空间**
- 从他们所说的内容中自然提出澄清性问题
- 质疑假设
- 重新定义问题
- 寻找类比

**调查代码库**
- 梳理与讨论相关的现有架构
- 找到集成点
- 识别已使用的模式
- 发现隐藏的复杂性

**比较选项**
- 头脑风暴多种方案
- 构建对比表
- 勾勒权衡取舍
- 推荐路径（如果被要求）

**可视化**
\`\`\`
┌─────────────────────────────────────────┐
│     大量使用 ASCII 图表        │
├─────────────────────────────────────────┤
│                                         │
│   ┌────────┐         ┌────────┐        │
│   │ State  │────────▶│ State  │        │
│   │   A    │         │   B    │        │
│   └────────┘         └────────┘        │
│                                         │
│   系统图、状态机、      │
│   数据流、架构草图、    │
│   依赖关系图、对比表  │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

**发现风险和未知**
- 识别可能出错的地方
- 找到理解上的缺口
- 建议探针或调查

---

## OpenSpec 感知

你拥有 OpenSpec 系统的完整上下文。自然地使用它，不要强制。

### 检查上下文

开始时，快速检查现有内容：
\`\`\`bash
openspec list --json
\`\`\`

这会告诉你：
- 是否有活跃的变更
- 它们的名称、模式和状态
- 用户可能在做什么

如果用户提到了特定的变更名称，阅读其工件获取上下文。

### 当不存在变更时

自由思考。当洞察结晶时，你可以提议：

- "这已经足够成熟来开始一个变更了。要我创建一个吗？"
  → 可以过渡到 \`/opsx:new\` or \`/opsx:ff\`
- 或者继续探索 - 不强制正式化

### 当存在变更时

如果用户提到某个变更或你检测到某个变更相关：

1. **阅读现有工件获取上下文**
   - \`openspec/changes/<name>/proposal.md\`
   - \`openspec/changes/<name>/design.md\`
   - \`openspec/changes/<name>/tasks.md\`
   - 等等。

2. **在对话中自然引用它们**
   - "你的设计提到使用 Redis，但我们刚发现 SQLite 更合适..."
   - "提案将范围限制在高级用户，但我们现在考虑面向所有人..."

3. **在做出决策时提议记录**

   | 洞察类型 | 记录位置 |
   |----------|----------|
   | 发现新需求 | \`specs/<capability>/spec.md\` |
   | 需求变更 | \`specs/<capability>/spec.md\` |
   | 做出设计决策 | \`design.md\` |
   | 范围变更 | \`proposal.md\` |
   | 发现新工作 | \`tasks.md\` |
   | 假设失效 | 相关工件 |

   提议示例：
   - "这是一个设计决策。记录到 design.md？"
   - "这是一个新需求。添加到 specs？"
   - "这改变了范围。更新提案？"

4. **用户来决定** - 提议后继续。不要施压。不要自动记录。

---

## 你无需做的事

- 照本宣科
- 每次都问同样的问题
- 产出特定工件
- 得出结论
- 如果岔题有价值就不必固守主题
- 简短（这是思考时间）

---

## 结束探索

没有必需的结束方式。探索可能：

- **转入行动**: "准备好了？ \`/opsx:new\` or \`/opsx:ff\`"
- **产出工件更新**: "已更新 design.md 中的这些决策"
- **仅提供清晰度**: 用户得到所需的，继续前进
- **稍后继续**: "随时可以接着聊"

当事情结晶时，你可以提供总结 - 但这是可选的。有时思考本身就是价值。

---

## 护栏

- **不要实现** - 永远不要写代码或实现功能。创建 OpenSpec 工件可以，写应用代码不行。
- **不要假装理解** - 如果不清楚，就深入挖掘
- **不要赶时间** - 探索是思考时间，不是任务时间
- **不要强加结构** - 让模式自然浮现
- **不要自动记录** - 提议保存洞察，不要直接去做
- **要可视化** - 一个好图胜过千言万语
- **要探索代码库** - 让讨论扎根于现实
- **要质疑假设** - 包括用户的和你自己的`
   };
}

/**
 * Template for /opsx:new slash command
 */
export function getOpsxNewCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: New',
      description: '使用 OPSX 实验性工件工作流开始一个新变更',
      category: 'Workflow',
      tags: ['workflow', 'artifacts', 'experimental'],
      content: `使用实验性工件驱动方法开始一个新变更。

**输入**:  \`/opsx:new\` 后的参数可以是变更名称。

**步骤**

1. **如果没有提供输入，询问他们想构建什么**

   使用 **AskUserQuestion 工具**（开放式，无预设选项）来询问：
   > "你想处理什么变更？描述你想构建或修复的内容。"

   从他们的描述中推导出 kebab-case 名称 （例如 "add user authentication" → \`add-user-auth\`).

   **重要**: 在了解用户想要构建什么之前，不要继续。

2. **确定工作流模式**

   除非用户明确要求不同的工作流，否则使用默认模式（省略 \`--schema\`）。

   **仅在用户提到以下内容时才使用不同的模式：**
   - 特定的模式名称 → 使用 \`--schema <name>\`
   - "显示工作流" 或 "有哪些工作流" → 运行 \`openspec schemas --json\` 让他们选择

   **否则**：省略 \`--schema\` 使用默认值。

3. **创建变更目录**
   \`\`\`bash
   openspec new change "<name>"
   \`\`\`
   仅在用户请求了特定工作流时才添加 \`--schema <name>\`。
   这将在 \`openspec/changes/<name>/\` 处使用选定的模式创建脚手架变更。

4. **显示工件状态**
   \`\`\`bash
   openspec status --change "<name>"
   \`\`\`
   这显示哪些工件需要创建，哪些已就绪（依赖满足）。

5. **获取第一个工件的指令**
   第一个工件取决于模式. 检查状态输出以找到第一个状态为 "ready" 的工件。
   \`\`\`bash
   openspec instructions <first-artifact-id> --change "<name>"
   \`\`\`
   这将输出创建第一个工件的模板和上下文。

6. **停止并等待用户指示**

**输出**

完成步骤后，总结：
- 变更名称和位置
- 使用的模式/工作流及其工件顺序
- 当前状态（0/N 个工件完成）
- 第一个工件的模板
- 提示: "准备好创建第一个工件了吗？运行 \`/opsx:continue\`，或描述这个变更是关于什么的，我来起草。"

**护栏**
- 不要创建任何工件 - 只显示指令
- 不要超出显示第一个工件模板的范围
- 如果名称无效（非 kebab-case），要求一个有效名称
- 如果该名称的变更已存在，建议使用 \`/opsx:continue\`
- 如果使用非默认工作流，传递 --schema`
   };
}

/**
 * Template for /opsx:continue slash command
 */
export function getOpsxContinueCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: Continue',
      description: '继续推进变更 - 创建下一个工件（实验性）',
      category: 'Workflow',
      tags: ['workflow', 'artifacts', 'experimental'],
      content: `通过创建下一个工件来继续推进变更。

**输入**: 可选在 \`/opsx:continue\` (e.g., \`/opsx:continue add-auth\`）。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **如果未提供变更名称，提示选择**

   运行 \`openspec list --json\` 获取按最近修改排序的可用变更。然后使用 **AskUserQuestion 工具** 让用户选择要处理的变更。

   将前 3-4 个最近修改的变更作为选项展示，显示：
   - 变更名称
   - 模式（来自 \`schema\` 字段，如果存在，否则为 "spec-driven"）
   - 状态（例如 "0/5 任务"、"完成"、"无任务"）
   - 最近修改时间（来自 \`lastModified\` 字段）

   将最近修改的变更标记为 "（推荐）"，因为这很可能是用户想继续的。

   **重要**: 不要猜测或自动选择变更。始终让用户来选。

2. **检查当前状态**
   \`\`\`bash
   openspec status --change "<name>" --json
   \`\`\`
   解析 JSON 以了解当前状态。响应包含：
   - \`schemaName\`: 使用的工作流模式（例如 "spec-driven"）
   - \`artifacts\`: 工件数组及其状态（"done"、"ready"、"blocked"）
   - \`isComplete\`: 布尔值，指示是否所有工件已完成

3. **根据状态采取行动**：

   ---

   **如果所有工件已完成 (\`isComplete: true\`)**:
   - 祝贺用户
   - 显示包含所使用模式的最终状态
   - 建议: "所有工件已创建！你现在可以使用 \`/opsx:apply\` 实现此变更，或使用 \`/opsx:archive\`."
   - STOP

   ---

   **如果有工件准备就绪** (状态显示有 \`status: "ready"\`):
   - 选择第一个状态为 \`status: "ready"\` （来自状态输出）
   - 获取其指令：
     \`\`\`bash
     openspec instructions <artifact-id> --change "<name>" --json
     \`\`\`
   - 解析 JSON。关键字段有：
     - \`context\`: 项目背景（对你的约束 - 不要包含在输出中）
     - \`rules\`: 工件特定规则（对你的约束 - 不要包含在输出中）
     - \`template\`: 用于输出文件的结构
     - \`instruction\`: 模式特定指导
     - \`outputPath\`: 工件写入位置
     - \`dependencies\`: 需要阅读以获取上下文的已完成工件
   - **创建工件文件**：
     - 读取任何已完成的依赖文件以获取上下文
     - 使用 \`template\` 作为结构 - 填写其各部分
     - 写入时将 \`context\` 和 \`rules\` 作为约束应用 - 但不要复制到文件中
     - 写入指令中指定的输出路径
   - 显示已创建的内容和现在解锁的内容
   - 创建一个工件后停止

   ---

   **如果没有工件就绪（全部被阻塞）**：
   - 使用有效模式时不应发生这种情况
   - 显示状态并建议检查问题

4. **创建工件后，显示进度**
   \`\`\`bash
   openspec status --change "<name>"
   \`\`\`

**输出**

每次调用后，显示：
- 创建了哪个工件
- 使用的模式工作流
- 当前进度（N/M 完成）
- 现在解锁了哪些工件
- 提示: "运行 \`/opsx:continue\` 创建下一个工件"

**工件创建指南**

工件类型及其用途取决于模式。 使用指令输出中的 \`instruction\` 字段来了解要创建什么。

常见工件模式：

**spec-driven 模式**（proposal → specs → design → tasks）：
- **proposal.md**: 如果不清楚，询问用户关于变更的信息。填写原因、变更内容、能力、影响。
  - 能力部分很关键 - 列出的每个能力都需要一个规范文件。
- **specs/<capability>/spec.md**: 为提案能力部分列出的每个能力创建一个规范（使用能力名称，不是变更名称）。
- **design.md**: 记录技术决策、架构和实现方法。
- **tasks.md**: 将实现分解为带复选框的任务。

对于其他模式，遵循 CLI 输出中的 \`instruction\` 字段。

**护栏**
- 每次调用创建一个工件
- 在创建新工件之前始终阅读依赖工件
- 不要跳过工件或乱序创建
- 如果上下文不清楚，在创建之前询问用户
- 写入后验证工件文件存在，然后再标记进度
- 使用模式的工件顺序，不要假设特定的工件名称
- **重要**: \`context\` 和 \`rules\` 是对你的约束，不是文件的内容
  - 不要将 \`<context>\`、\`<rules>\`、\`<project_context>\` 块复制到工件中
  - 这些指导你写什么，但绝不应该出现在输出中`
   };
}

/**
 * Template for /opsx:apply slash command
 */
export function getOpsxApplyCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: Apply',
      description: '执行 OpenSpec 变更中的任务（实验性）',
      category: 'Workflow',
      tags: ['workflow', 'artifacts', 'experimental'],
      content: `执行 OpenSpec 变更中的任务。

**输入**: 可选指定变更名称（例如 \`/opsx:apply add-auth\`）。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **选择变更**

   如果提供了名称，使用它。否则：
   - 如果用户提到了变更，从对话上下文推断
   - 如果只有一个活跃变更，自动选择
   - 如果模糊不清，运行 \`openspec list --json\` 获取可用变更，并使用 **AskUserQuestion 工具** 让用户选择。

   始终宣告： "使用变更: <name>" 以及如何覆盖（例如 \`/opsx:apply <other>\`).

2. **检查状态以了解模式**
   \`\`\`bash
   openspec status --change "<name>" --json
   \`\`\`
   解析 JSON 以了解：
   - \`schemaName\`: 使用的工作流 （例如 "spec-driven"）
   - 哪个工件包含任务（spec-driven 通常是 "tasks"，其他模式请检查状态）

3. **获取执行指令**

   \`\`\`bash
   openspec instructions apply --change "<name>" --json
   \`\`\`

   这将返回：
   - 上下文文件路径 (因模式而异)
   - 进度（总数、完成、剩余）
   - 带状态的任务列表
   - 基于当前状态的动态指令

   **处理状态：**
   - 如果 \`state: "blocked"\`（缺少工件）：显示消息，建议使用 \`/opsx:continue\`
   - 如果 \`state: "all_done"\`：祝贺，建议归档
   - 否则：继续实现

4. **读取上下文文件**

   读取执行指令输出中 \`contextFiles\` 列出的文件。
   文件取决于所使用的模式：
   - **spec-driven**: proposal, specs, design, tasks
   - 其他模式：遵循 CLI 输出中的 contextFiles

5. **显示当前进度**

   显示：
   - 使用的模式
   - 进度: "N/M 任务完成"
   - 剩余任务概览
   - 来自 CLI 的动态指令

6. **执行任务（循环直到完成或被阻塞）**

   对于每个待处理的任务：
   - 显示正在处理的任务
   - 进行所需的代码更改
   - 保持更改最小化和聚焦
   - 在任务文件中标记任务完成： \`- [ ]\` → \`- [x]\`
   - 继续下一个任务

   **暂停条件：**
   - 任务不清楚 → 要求澄清
   - 实现暴露设计问题 → 建议更新工件
   - 遇到错误或阻塞 → 报告并等待指导
   - 用户中断

7. **完成或暂停时，显示状态**

   显示：
   - 本次完成的任务
   - 总进度: "N/M 任务完成"
   - 如果全部完成：建议归档
   - 如果暂停：解释原因并等待指导

**实现过程中的输出**

\`\`\`
## 正在实现: <change-name> (模式: <schema-name>)

正在处理任务 3/7: <task description>
[...实现进行中...]
✓ 任务完成

正在处理任务 4/7: <task description>
[...实现进行中...]
✓ 任务完成
\`\`\`

**完成时的输出**

\`\`\`
## 实现完成

**变更:** <change-name>
**模式:** <schema-name>
**进度:** 7/7 任务完成 ✓

### 本次完成
- [x] 任务 1
- [x] 任务 2
...

所有任务完成！你可以使用 \`/opsx:archive\` 归档此变更。
\`\`\`

**暂停时的输出（遇到问题）**

\`\`\`
## 实现暂停

**变更:** <change-name>
**模式:** <schema-name>
**进度:** 4/7 任务完成

### 遇到的问题
<问题描述>

**选项：**
1. <选项 1>
2. <选项 2>
3. 其他方法

你想怎么做？
\`\`\`

**护栏**
- 持续处理任务直到完成或被阻塞
- 开始前始终读取上下文文件 （来自执行指令输出）
- 如果任务模糊，暂停并在实现前询问
- 如果实现暴露问题，暂停并建议更新工件
- 保持代码更改最小化并限定在每个任务范围内
- 完成每个任务后立即更新任务复选框
- 遇到错误、阻塞或不清楚的需求时暂停 - 不要猜测
- 使用 CLI 输出中的 contextFiles，不要假设特定的文件名

**流畅工作流集成**

此技能支持"对变更的操作"模型：

- **可随时调用**: 在所有工件完成之前（如果任务存在）、部分实现之后、与其他操作交错
- **允许更新工件**: 如果实现暴露设计问题，建议更新工件 - 不锁定阶段，灵活工作`
   };
}


/**
 * Template for /opsx:ff slash command
 */
export function getOpsxFfCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: Fast Forward',
      description: '一次性创建变更并生成实现所需的全部工件',
      category: 'Workflow',
      tags: ['workflow', 'artifacts', 'experimental'],
      content: `快进完成工件创建 - 生成开始实现所需的全部内容。

**输入**:  \`/opsx:ff\` 后的参数可以是变更名称。

**步骤**

1. **如果没有提供输入，询问他们想构建什么**

   使用 **AskUserQuestion 工具**（开放式，无预设选项）来询问：
   > "你想处理什么变更？描述你想构建或修复的内容。"

   从他们的描述中推导出 kebab-case 名称 （例如 "add user authentication" → \`add-user-auth\`).

   **重要**: 在了解用户想要构建什么之前，不要继续。

2. **创建变更目录**
   \`\`\`bash
   openspec new change "<name>"
   \`\`\`
   这将在 \`openspec/changes/<name>/\` 创建脚手架变更。

3. **获取工件构建顺序**
   \`\`\`bash
   openspec status --change "<name>" --json
   \`\`\`
   解析 JSON 以获取：
   - \`applyRequires\`: 实现前所需的工件 ID 数组（例如 \`["tasks"]\`）
   - \`artifacts\`: 所有工件的列表及其状态和依赖

4. **按顺序创建工件直到可以执行**

   使用 **TodoWrite 工具** 跟踪工件创建进度。

   按依赖顺序遍历工件（无待处理依赖的工件优先）：

   a. **对于每个 \`ready\`（依赖满足）的工件**：
      - 获取指令：
        \`\`\`bash
        openspec instructions <artifact-id> --change "<name>" --json
        \`\`\`
      - 指令 JSON 包含：
        - \`context\`: 项目背景（对你的约束 - 不要包含在输出中）
        - \`rules\`: 工件特定规则（对你的约束 - 不要包含在输出中）
        - \`template\`: 用于输出文件的结构
        - \`instruction\`: 模式特定指导 （用于此工件类型）
        - \`outputPath\`: 工件写入位置
        - \`dependencies\`: 需要阅读以获取上下文的已完成工件
      - 读取任何已完成的依赖文件以获取上下文
      - 使用 \`template\` 作为结构创建工件文件
      - 将 \`context\` 和 \`rules\` 作为约束应用 - 但不要复制到文件中
      - 显示简要进度： "✓ 已创建 <artifact-id>"

   b. **继续直到所有 \`applyRequires\` 工件完成**
      - 创建每个工件后，重新运行 \`openspec status --change "<name>" --json\`
      - 检查每个工件 ID 是否在 \`applyRequires\` 在工件数组中状态为 \`status: "done"\`
      - 当所有 \`applyRequires\` 工件完成时停止

   c. **如果工件需要用户输入**（上下文不清楚）：
      - 使用 **AskUserQuestion 工具** 来澄清
      - 然后继续创建

5. **显示最终状态**
   \`\`\`bash
   openspec status --change "<name>"
   \`\`\`

**输出**

完成所有工件后，总结：
- 变更名称和位置
- 已创建的工件列表及简要说明
- What's ready: "所有工件已创建！可以开始实现了。"
- 提示: "运行 \`/opsx:apply\` 开始执行任务。"

**工件创建指南**

- 遵循 \`openspec instructions\` 每个工件类型输出中的 \`instruction\` 字段
- 模式定义了每个工件应包含的内容 - 遵循它
- 在创建新工件之前阅读依赖工件获取上下文
- 使用 \`template\` 作为起点，根据上下文填写

**护栏**
- 创建实现所需的所有工件（由模式的 \`apply.requires\` 定义）
- 在创建新工件之前始终阅读依赖工件
- 如果上下文严重不清楚，询问用户 - 但优先做出合理决策以保持动力
- 如果该名称的变更已存在，询问用户是否要继续或创建新的
- 写入后验证每个工件文件存在，然后再继续下一个`
   };
}

/**
 * Template for openspec-archive-change skill
 * For archiving completed changes in the experimental workflow
 */
export function getArchiveChangeSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-archive-change',
      description: '在实验性工作流中归档已完成的变更。当用户想在实现完成后最终确定并归档变更时使用。',
      instructions: `在实验性工作流中归档已完成的变更。

**输入**: 可选指定变更名称。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **如果未提供变更名称，提示选择**

   运行 \`openspec list --json\` 获取可用变更。使用 **AskUserQuestion 工具** 让用户选择。

   仅显示活跃的变更（未归档的）。
   如果可用，包含每个变更使用的模式。

   **重要**: 不要猜测或自动选择变更。始终让用户来选。

2. **检查工件完成状态**

   运行 \`openspec status --change "<name>" --json\` 检查工件完成状态。

   解析 JSON 以了解：
   - \`schemaName\`: 使用的工作流
   - \`artifacts\`: 工件列表及其状态（\`done\` 或其他）

   **如果有工件未完成：**
   - 显示列出未完成工件的警告
   - 使用 **AskUserQuestion 工具** 确认用户想要继续
   - 用户确认后继续

3. **检查任务完成状态**

   阅读任务文件（通常是 \`tasks.md\`）检查未完成的任务。

   计算标记为 \`- [ ]\`（未完成）和 \`- [x]\`（已完成）的任务数。

   **如果发现未完成的任务：**
   - 显示未完成任务数量的警告
   - 使用 **AskUserQuestion 工具** 确认用户想要继续
   - 用户确认后继续

   **如果不存在任务文件**: 继续但无任务相关警告。

4. **评估增量规范同步状态**

   检查增量规范在 \`openspec/changes/<name>/specs/\`. 如果不存在，继续但无同步提示。

   **如果增量规范存在：**
   - 将每个增量规范与其对应的主规范进行比较，位于 \`openspec/specs/<capability>/spec.md\`
   - 确定将应用的变更（添加、修改、移除、重命名）
   - 在提示前显示合并摘要

   **提示选项：**
   - 如果需要变更： "立即同步（推荐）"、"不同步直接归档"
   - 如果已同步： "立即归档"、"仍然同步"、"取消"

   如果用户选择同步，使用 Task 工具（subagent_type: "general-purpose", prompt: "使用 Skill 工具调用 openspec-sync-specs 同步变更 '<name>'。增量规范分析: <包含分析的增量规范摘要>"）。无论选择什么都继续归档。

5. **执行归档**

   如果归档目录不存在则创建：
   \`\`\`bash
   mkdir -p openspec/changes/archive
   \`\`\`

   使用当前日期生成目标名称： \`YYYY-MM-DD-<change-name>\`

   **检查目标是否已存在：**
   - 如果是：报错，建议重命名现有归档或使用不同日期
   - 如果否：将变更目录移动到归档

   \`\`\`bash
   mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
   \`\`\`

6. **显示摘要**

   显示归档完成摘要，包括：
   - 变更名称
   - 使用的模式
   - 归档位置
   - 规范是否已同步（如果适用）
   - 关于任何警告的说明（未完成的工件/任务）

**成功时的输出**

\`\`\`
## 归档完成

**变更:** <change-name>
**模式:** <schema-name>
**已归档到:** openspec/changes/archive/YYYY-MM-DD-<name>/
**规范:** ✓ 已同步到主规范（或 "无增量规范" 或 "跳过同步"）

所有工件完成。所有任务完成。
\`\`\`

**护栏**
- 如果未提供，始终提示选择变更
- 使用工件图（openspec status --json）进行完成检查
- 不要因警告而阻止归档 - 只需通知并确认
- 移动到归档时保留 .openspec.yaml（它随目录一起移动）
- 显示清晰的事件摘要
- 如果请求同步，使用 openspec-sync-specs 方式（代理驱动）
- 如果增量规范存在，始终运行同步评估并在提示前显示合并摘要`,
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Template for openspec-bulk-archive-change skill
 * For archiving multiple completed changes at once
 */
export function getBulkArchiveChangeSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-bulk-archive-change',
      description: '一次归档多个已完成的变更。当需要同时归档多个并行变更时使用。',
      instructions: `在单次操作中归档多个已完成的变更。

此技能允许你批量归档变更，通过检查代码库确定实际实现的内容来智能处理规范冲突。

**输入**: 无需输入（交互式提示选择）

**步骤**

1. **获取活跃变更**

   运行 \`openspec list --json\` 获取所有活跃变更。

   如果没有活跃变更，通知用户并停止。

2. **提示选择变更**

   使用 **AskUserQuestion 工具** 的多选模式让用户选择变更：
   - 显示每个变更及其模式
   - 包含 "全部变更" 选项
   - 允许任意数量的选择（1+ 即可，2+ 是典型用例）

   **重要**: 不要自动选择。始终让用户来选。

3. **批量验证 - 收集所有选中变更的状态**

   对于每个选中的变更，收集：

   a. **工件状态** - 运行 \`openspec status --change "<name>" --json\`
      - 解析 \`schemaName\` 和 \`artifacts\` 列表
      - 记录哪些工件是 \`done\` 状态，哪些不是

   b. **任务完成度** - 阅读 \`openspec/changes/<name>/tasks.md\`
      - 计算 \`- [ ]\`（未完成）和 \`- [x]\`（已完成）
      - 如果不存在任务文件，标记为 "无任务"

   c. **增量规范** - 检查 \`openspec/changes/<name>/specs/\` 目录
      - 列出存在的能力规范
      - 对每个规范提取需求名称（匹配 \`### Requirement: <name>\` 的行）

4. **检测规范冲突**

   构建 \`能力 -> [涉及的变更]\` 映射：

   \`\`\`
   auth -> [change-a, change-b]  ← 冲突（2+ 个变更）
   api  -> [change-c]            ← 正常（仅 1 个变更）
   \`\`\`

   当 2+ 个选中变更有相同能力的增量规范时，存在冲突。

5. **代理式解决冲突**

   **对每个冲突**，调查代码库：

   a. **阅读增量规范** - 来自每个冲突变更，了解各自声称添加/修改的内容

   b. **搜索代码库**寻找实现证据：
      - 查找实现每个增量规范需求的代码
      - 检查相关文件、函数或测试

   c. **确定解决方案**：
      - 如果只有一个变更实际实现了 -> 同步该变更的规范
      - 如果两个都实现了 -> 按时间顺序应用（先旧后新，新的覆盖）
      - 如果都未实现 -> 跳过规范同步，警告用户

   d. **记录每个冲突的解决方案**：
      - 应用哪个变更的规范
      - 以什么顺序（如果两个都实现）
      - 理由（在代码库中发现了什么）

6. **显示汇总状态表**

   显示汇总所有变更的表格：

   \`\`\`
   | Change               | Artifacts | Tasks | Specs   | Conflicts | Status |
   |---------------------|-----------|-------|---------|-----------|--------|
   | schema-management   | Done      | 5/5   | 2 delta | None      | Ready  |
   | project-config      | Done      | 3/3   | 1 delta | None      | Ready  |
   | add-oauth           | Done      | 4/4   | 1 delta | auth (!)  | Ready* |
   | add-verify-skill    | 1 left    | 2/5   | None    | None      | Warn   |
   \`\`\`

   对于冲突，显示解决方案：
   \`\`\`
   * Conflict resolution:
     - auth spec: Will apply add-oauth then add-jwt (both implemented, chronological order)
   \`\`\`

   对于未完成的变更，显示警告：
   \`\`\`
   警告：
   - add-verify-skill: 1 个未完成工件，3 个未完成任务
   \`\`\`

7. **确认批量操作**

   使用 **AskUserQuestion 工具** 进行单次确认：

   - "归档 N 个变更？"根据状态提供选项
   - 选项可能包括：
     - "归档所有 N 个变更"
     - "仅归档 N 个就绪变更（跳过未完成的）"
     - "取消"

   如果有未完成的变更，请明确说明它们将带警告归档。

8. **为每个确认的变更执行归档**

   按确定的顺序处理变更（遵循冲突解决方案）：

   a. **同步规范** - 如果增量规范存在：
      - 使用 openspec-sync-specs 方式（代理驱动智能合并）
      - 对于冲突，按解决顺序应用
      - 跟踪是否已同步

   b. **执行归档**：
      \`\`\`bash
      mkdir -p openspec/changes/archive
      mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
      \`\`\`

   c. **跟踪每个变更的结果**：
      - 成功：归档成功
      - 失败：归档时出错（记录错误）
      - 跳过：用户选择不归档（如果适用）

9. **显示摘要**

   显示最终结果：

   \`\`\`
   ## 批量归档完成

   已归档 3 个变更：
   - schema-management-cli -> archive/2026-01-19-schema-management-cli/
   - project-config -> archive/2026-01-19-project-config/
   - add-oauth -> archive/2026-01-19-add-oauth/

   跳过 1 个变更：
   - add-verify-skill（用户选择不归档未完成的）

   规范同步摘要：
   - 4 个增量规范已同步到主规范
   - 1 个冲突已解决（auth：按时间顺序都已应用）
   \`\`\`

   如果有失败：
   \`\`\`
   失败 1 个变更：
   - some-change: 归档目录已存在
   \`\`\`

**冲突解决示例**

示例 1：仅实现了一个
\`\`\`
Conflict: specs/auth/spec.md touched by [add-oauth, add-jwt]

检查 add-oauth：
- 增量添加 "OAuth Provider Integration" 需求
- 搜索代码库... 发现 src/auth/oauth.ts 实现了 OAuth 流程

检查 add-jwt：
- 增量添加 "JWT Token Handling" 需求
- 搜索代码库... 未找到 JWT 实现

解决方案：仅 add-oauth 已实现。将只同步 add-oauth 的规范。
\`\`\`

示例 2：两个都实现了
\`\`\`
Conflict: specs/api/spec.md touched by [add-rest-api, add-graphql]

检查 add-rest-api（创建于 2026-01-10）：
- 增量添加 "REST Endpoints" 需求
- 搜索代码库... 发现 src/api/rest.ts

检查 add-graphql（创建于 2026-01-15）：
- 增量添加 "GraphQL Schema" 需求
- 搜索代码库... 发现 src/api/graphql.ts

解决方案：两个都已实现。先应用 add-rest-api 的规范，
然后应用 add-graphql（按时间顺序，新的优先）。
\`\`\`

**成功时的输出**

\`\`\`
## Bulk Archive Complete

Archived N changes:
- <change-1> -> archive/YYYY-MM-DD-<change-1>/
- <change-2> -> archive/YYYY-MM-DD-<change-2>/

Spec sync summary:
- N delta specs synced to main specs
- No conflicts (or: M conflicts resolved)
\`\`\`

**部分成功时的输出**

\`\`\`
## Bulk Archive Complete (partial)

Archived N changes:
- <change-1> -> archive/YYYY-MM-DD-<change-1>/

Skipped M changes:
- <change-2> (user chose not to archive incomplete)

Failed K changes:
- <change-3>: Archive directory already exists
\`\`\`

**无变更时的输出**

\`\`\`
## No Changes to Archive

No active changes found. Use \`/opsx:new\` 创建新变更。
\`\`\`

**护栏**
- 允许任意数量的变更（1+ 即可，2+ 是典型用例）
- 始终提示选择，从不自动选择
- 尽早检测规范冲突并通过检查代码库解决
- 当两个变更都已实现时，按时间顺序应用规范
- 仅在缺少实现时跳过规范同步（警告用户）
- 确认前显示清晰的每个变更状态
- 对整个批次使用单次确认
- 跟踪并报告所有结果（成功/跳过/失败）
- 移动到归档时保留 .openspec.yaml
- 归档目录使用当前日期：YYYY-MM-DD-<name>
- 如果归档目标已存在，该变更失败但继续处理其他`,
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Template for /opsx:sync slash command
 */
export function getOpsxSyncCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: Sync',
      description: '将变更中的增量规范同步到主规范',
      category: 'Workflow',
      tags: ['workflow', 'specs', 'experimental'],
      content: `将变更中的增量规范同步到主规范。

这是一个**代理驱动**的操作 - 你将读取增量规范并直接编辑主规范以应用变更。这允许智能合并（例如，添加场景而无需复制整个需求）。

**输入**: 可选在 \`/opsx:sync\` (e.g., \`/opsx:sync add-auth\`）。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **如果未提供变更名称，提示选择**

   运行 \`openspec list --json\` 获取可用变更。使用 **AskUserQuestion 工具** 让用户选择。

   显示有增量规范的变更（在 \`specs/\` 目录下）。

   **重要**: 不要猜测或自动选择变更。始终让用户来选。

2. **查找增量规范**

   查找 \`openspec/changes/<name>/specs/*/spec.md\`。

   每个增量规范文件包含如下部分：
   - \`## ADDED Requirements\` - 要添加的新需求
   - \`## MODIFIED Requirements\` - 对现有需求的更改
   - \`## REMOVED Requirements\` - 要移除的需求
   - \`## RENAMED Requirements\` - 要重命名的需求（FROM:/TO: 格式）

   如果未找到增量规范，通知用户并停止。

3. **对每个增量规范，将变更应用到主规范**

   对于每个在 \`openspec/changes/<name>/specs/<capability>/spec.md\`:

   a. **阅读增量规范**以了解预期的变更

   b. **阅读主规范**位于 \`openspec/specs/<capability>/spec.md\` （可能尚不存在）

   c. **智能应用变更**：

      **新增需求：**
      - 如果需求在主规范中不存在 → 添加它
      - 如果需求已存在 → 更新以匹配（视为隐式修改）

      **修改的需求：**
      - 在主规范中找到需求
      - 应用变更 - 可以是：
        - 添加新场景（无需复制现有场景）
        - 修改现有场景
        - 更改需求描述
      - 保留增量中未提及的场景/内容

      **移除的需求：**
      - 从主规范中移除整个需求块

      **重命名的需求：**
      - 找到 FROM 需求，重命名为 TO

   d. **创建新主规范**如果能力尚不存在：
      - 创建 \`openspec/specs/<capability>/spec.md\`
      - 添加目的部分（可以简短，标记为 TBD）
      - 添加包含新增需求的需求部分

4. **显示摘要**

   应用所有变更后，总结：
   - 更新了哪些能力
   - 做了哪些更改（添加/修改/移除/重命名的需求）

**增量规范格式参考**

\`\`\`markdown
## ADDED Requirements

### Requirement: New Feature
The system SHALL do something new.

#### Scenario: Basic case
- **WHEN** user does X
- **THEN** system does Y

## MODIFIED Requirements

### Requirement: Existing Feature
#### Scenario: New scenario to add
- **WHEN** user does A
- **THEN** system does B

## REMOVED Requirements

### Requirement: Deprecated Feature

## RENAMED Requirements

- FROM: \`### Requirement: Old Name\`
- TO: \`### Requirement: New Name\`
\`\`\`

**核心原则：智能合并**

与程序化合并不同，你可以应用**部分更新**：
- 要添加场景，只需在 MODIFIED 下包含该场景 - 不要复制现有场景
- 增量表示的是*意图*，不是批量替换
- 用你的判断力合理地合并变更

**成功时的输出**

\`\`\`
## 规范已同步: <change-name>

已更新主规范：

**<capability-1>**:
- 添加需求: "New Feature"
- 修改需求: "Existing Feature"（添加了 1 个场景）

**<capability-2>**:
- 创建了新规范文件
- 添加需求: "Another Feature"

主规范已更新。 变更仍然活跃 - 实现完成后归档。
\`\`\`

**护栏**
- 在进行更改之前同时读取增量和主规范
- 保留增量中未提到的现有内容
- 如果有不清楚的地方，要求澄清
- 在进行过程中显示你正在更改的内容
- 操作应该是幂等的 - 运行两次应产生相同结果`
   };
}

/**
 * Template for openspec-verify-change skill
 * For verifying implementation matches change artifacts before archiving
 */
export function getVerifyChangeSkillTemplate(): SkillTemplate {
   return {
      name: 'openspec-verify-change',
      description: '验证实现是否与变更工件匹配。当用户想在归档前验证实现是否完整、正确且一致时使用。',
      instructions: `验证实现是否与变更工件（规范、任务、设计）匹配。

**输入**: 可选指定变更名称。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **如果未提供变更名称，提示选择**

   运行 \`openspec list --json\` 获取可用变更。使用 **AskUserQuestion 工具** 让用户选择。

   显示有实现任务的变更（任务工件存在）。
   如果可用，包含每个变更使用的模式。
   将有未完成任务的变更标记为 "（进行中）"。

   **重要**: 不要猜测或自动选择变更。始终让用户来选。

2. **检查状态以了解模式**
   \`\`\`bash
   openspec status --change "<name>" --json
   \`\`\`
   解析 JSON 以了解：
   - \`schemaName\`: 使用的工作流 (e.g., "spec-driven")
   - 此变更存在哪些工件

3. **获取变更目录并加载工件**

   \`\`\`bash
   openspec instructions apply --change "<name>" --json
   \`\`\`

   这将返回变更目录和上下文文件。从 \`contextFiles\`.

4. **初始化验证报告结构**

   创建具有三个维度的报告结构：
   - **完整性**: 跟踪任务和规范覆盖
   - **正确性**: 跟踪需求实现和场景覆盖
   - **一致性**: 跟踪设计遵守和模式一致性

   每个维度可有 CRITICAL（严重）、WARNING（警告）或 SUGGESTION（建议）问题。

5. **验证完整性**

   **任务完成**：
   - 如果 contextFiles 中存在 tasks.md，阅读它
   - 解析复选框： \`- [ ]\` (incomplete) vs \`- [x]\` (complete)
   - 统计完成和总任务数
   - 如果存在未完成的任务：
     - Add CRITICAL issue for each incomplete task
     - Recommendation: "Complete task: <description>" or "Mark as done if already implemented"

   **规范覆盖**：
   - 如果增量规范存在于 \`openspec/changes/<name>/specs/\`:
     - 提取所有需求（标记为 "### Requirement:"）
     - 对于每个需求：
       - 搜索代码库中与需求相关的关键字
       - 评估实现是否可能存在
     - 如果需求似乎未实现：
       - Add CRITICAL issue: "Requirement not found: <requirement name>"
       - Recommendation: "Implement requirement X: <description>"

6. **验证正确性**

   **需求实现映射**：
   - 对于增量规范中的每个需求：
     - 搜索代码库中的实现证据
     - 如果找到，记录文件路径和行范围
     - 评估实现是否符合需求意图
     - 如果检测到偏差：
       - Add WARNING: "Implementation may diverge from spec: <details>"
       - Recommendation: "Review <file>:<lines> against requirement X"

   **场景覆盖**：
   - 对于增量规范中的每个场景（标记为 "#### Scenario:"）：
     - 检查条件是否在代码中处理
     - 检查是否有覆盖该场景的测试
     - 如果场景似乎未覆盖：
       - Add WARNING: "Scenario not covered: <scenario name>"
       - Recommendation: "Add test or implementation for scenario: <description>"

7. **验证一致性**

   **设计遵守**：
   - 如果 contextFiles 中存在 design.md：
     - 提取关键决策（查找如 "Decision:"、"Approach:"、"Architecture:" 等部分）
     - 验证实现是否遵循这些决策
     - 如果检测到矛盾：
       - Add WARNING: "Design decision not followed: <decision>"
       - Recommendation: "Update implementation or revise design.md to match reality"
   - 如果没有 design.md：跳过设计遵守检查，注明 "无 design.md 可供验证"

   **代码模式一致性**：
   - 审查新代码与项目模式的一致性
   - 检查文件命名、目录结构、编码风格
   - 如果发现显著偏差：
     - Add SUGGESTION: "Code pattern deviation: <details>"
     - Recommendation: "Consider following project pattern: <example>"

8. **生成验证报告**

   **总结记分卡**：
   \`\`\`
   ## 验证报告： <change-name>

   ### 摘要
   | 维度    | 状态           |
   |----------|----------|
   | 完整性 | X/Y 任务, N 需求|
   | 正确性  | M/N 需求覆盖 |
   | 一致性    | 遵循/有问题  |
   \`\`\`

   **按优先级分类的问题**：

   1. **严重**（归档前必须修复）：
      - 未完成的任务
      - 缺失的需求实现
      - 每个都有具体可行的建议

   2. **警告**（应该修复）：
      - 规范/设计偏差
      - 缺失的场景覆盖
      - 每个都有具体建议

   3. **建议**（最好修复）：
      - 模式不一致
      - 小改进
      - 每个都有具体建议

   **最终评估**：
   - 如果有 CRITICAL 问题："发现 X 个严重问题。归档前修复。"
   - 如果只有警告："无严重问题。有 Y 个警告需考虑。可以归档（含建议改进）。"
   - 如果全部通过："所有检查通过。可以归档。"

**验证启发式规则**

- **完整性**: 聚焦于客观的清单项（复选框、需求列表）
- **正确性**: 使用关键字搜索、文件路径分析、合理推理 - 不要求完美的确定性
- **一致性**: 查找明显的不一致，不要吹毛求疵
- **误报**: 不确定时，优先用建议而非警告，用警告而非严重
- **可操作性**: 每个问题必须有具体建议，在适用时附带文件/行引用

**优雅降级**

- 如果只有 tasks.md：仅验证任务完成，跳过规范/设计检查
- 如果有任务和规范：验证完整性和正确性，跳过设计
- 如果有完整工件：验证所有三个维度
- 始终注明跳过了哪些检查及原因

**输出格式**

使用清晰的 markdown，包括：
- 总结记分卡的表格
- 按问题分组的列表（严重/警告/建议）
- 代码引用格式： \`file.ts:123\`
- 具体可行的建议
- 不要有模糊的建议如 "考虑审查"`,
      license: 'MIT',
      compatibility: 'Requires openspec CLI.',
      metadata: { author: 'openspec', version: '1.0' },
   };
}

/**
 * Template for /opsx:archive slash command
 */
export function getOpsxArchiveCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: Archive',
      description: '在实验性工作流中归档已完成的变更',
      category: 'Workflow',
      tags: ['workflow', 'archive', 'experimental'],
      content: `在实验性工作流中归档已完成的变更。

**输入**: 可选在 \`/opsx:archive\` (e.g., \`/opsx:archive add-auth\`）。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **如果未提供变更名称，提示选择**

   运行 \`openspec list --json\` 获取可用变更。使用 **AskUserQuestion 工具** 让用户选择。

   仅显示活跃的变更（未归档的）。
   如果可用，包含每个变更使用的模式。

   **重要**: 不要猜测或自动选择变更。始终让用户来选。

2. **检查工件完成状态**

   运行 \`openspec status --change "<name>" --json\` 检查工件完成状态。

   解析 JSON 以了解：
   - \`schemaName\`: 使用的工作流
   - \`artifacts\`: 工件列表及其状态（\`done\` 或其他）

   **如果有工件未完成：**
   - 显示列出未完成工件的警告
   - 提示用户确认继续
   - 用户确认后继续

3. **检查任务完成状态**

   阅读任务文件（通常是 \`tasks.md\`）检查未完成的任务。

   计算标记为 \`- [ ]\`（未完成）和 \`- [x]\`（已完成）的任务数。

   **如果发现未完成的任务：**
   - 显示未完成任务数量的警告
   - 提示用户确认继续
   - 用户确认后继续

   **如果不存在任务文件**: 继续但无任务相关警告。

4. **评估增量规范同步状态**

   检查增量规范在 \`openspec/changes/<name>/specs/\`. 如果不存在，继续但无同步提示。

   **如果增量规范存在：**
   - 将每个增量规范与其对应的主规范进行比较，位于 \`openspec/specs/<capability>/spec.md\`
   - 确定将应用的变更（添加、修改、移除、重命名）
   - 在提示前显示合并摘要

   **提示选项：**
   - 如果需要变更： "立即同步（推荐）"、"不同步直接归档"
   - 如果已同步： "立即归档"、"仍然同步"、"取消"

   如果用户选择同步，使用 Task 工具（subagent_type: "general-purpose", prompt: "使用 Skill 工具调用 openspec-sync-specs 同步变更 '<name>'。增量规范分析: <包含分析的增量规范摘要>"）。无论选择什么都继续归档。

5. **执行归档**

   如果归档目录不存在则创建：
   \`\`\`bash
   mkdir -p openspec/changes/archive
   \`\`\`

   使用当前日期生成目标名称： \`YYYY-MM-DD-<change-name>\`

   **检查目标是否已存在：**
   - 如果是：报错，建议重命名现有归档或使用不同日期
   - 如果否：将变更目录移动到归档

   \`\`\`bash
   mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
   \`\`\`

6. **显示摘要**

   显示归档完成摘要，包括：
   - 变更名称
   - 使用的模式
   - 归档位置
   - 规范同步状态（已同步 / 跳过同步 / 无增量规范）
   - 关于任何警告的说明（未完成的工件/任务）

**成功时的输出**

\`\`\`
## 归档完成

**变更:** <change-name>
**模式:** <schema-name>
**已归档到:** openspec/changes/archive/YYYY-MM-DD-<name>/
**规范:** ✓ 已同步到主规范

所有工件完成。所有任务完成。
\`\`\`

**成功时的输出（无增量规范）**

\`\`\`
## 归档完成

**变更:** <change-name>
**模式:** <schema-name>
**已归档到:** openspec/changes/archive/YYYY-MM-DD-<name>/
**规范:** 无增量规范

所有工件完成。所有任务完成。
\`\`\`

**成功时的输出（带警告）**

\`\`\`
## 归档完成（带警告）

**变更:** <change-name>
**模式:** <schema-name>
**已归档到:** openspec/changes/archive/YYYY-MM-DD-<name>/
**规范:** 已跳过同步（用户选择跳过）

**警告：**
- 归档时有 2 个未完成工件
- 归档时有 3 个未完成任务
- 增量规范同步已跳过（用户选择跳过）

如果这不是有意的，请检查归档。
\`\`\`

**错误时的输出（归档已存在）**

\`\`\`
## 归档失败

**变更:** <change-name>
**目标:** openspec/changes/archive/YYYY-MM-DD-<name>/

目标归档目录已存在。

**选项：**
1. 重命名现有归档
2. 如果是重复的则删除现有归档
3. 等待不同日期再归档
\`\`\`

**护栏**
- 如果未提供，始终提示选择变更
- 使用工件图（openspec status --json）进行完成检查
- 不要因警告而阻止归档 - 只需通知并确认
- 移动到归档时保留 .openspec.yaml（它随目录一起移动）
- 显示清晰的事件摘要
- 如果请求同步，使用 Skill 工具调用 \`openspec-sync-specs\` （代理驱动）
- 如果增量规范存在，始终运行同步评估并在提示前显示合并摘要`
   };
}

/**
 * Template for /opsx:onboard slash command
 * Guided onboarding through the complete OpenSpec workflow
 */
export function getOpsxOnboardCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: Onboard',
      description: '引导式入门 - 通过叙述走完一个完整的 OpenSpec 工作流周期',
      category: 'Workflow',
      tags: ['workflow', 'onboarding', 'tutorial', 'learning'],
      content: getOnboardInstructions(),
   };
}

/**
 * Template for /opsx:bulk-archive slash command
 */
export function getOpsxBulkArchiveCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: Bulk Archive',
      description: '一次归档多个已完成的变更',
      category: 'Workflow',
      tags: ['workflow', 'archive', 'experimental', 'bulk'],
      content: `在单次操作中归档多个已完成的变更。

此技能允许你批量归档变更，通过检查代码库确定实际实现的内容来智能处理规范冲突。

**输入**: 无需输入（交互式提示选择）

**步骤**

1. **获取活跃变更**

   运行 \`openspec list --json\` 获取所有活跃变更。

   如果没有活跃变更，通知用户并停止。

2. **提示选择变更**

   使用 **AskUserQuestion 工具** 的多选模式让用户选择变更：
   - 显示每个变更及其模式
   - 包含 "全部变更" 选项
   - 允许任意数量的选择（1+ 即可，2+ 是典型用例）

   **重要**: 不要自动选择。始终让用户来选。

3. **批量验证 - 收集所有选中变更的状态**

   对于每个选中的变更，收集：

   a. **工件状态** - 运行 \`openspec status --change "<name>" --json\`
      - 解析 \`schemaName\` 和 \`artifacts\` 列表
      - 记录哪些工件是 \`done\` 状态，哪些不是

   b. **任务完成度** - 阅读 \`openspec/changes/<name>/tasks.md\`
      - 计算 \`- [ ]\`（未完成）和 \`- [x]\`（已完成）
      - 如果不存在任务文件，标记为 "无任务"

   c. **增量规范** - 检查 \`openspec/changes/<name>/specs/\` 目录
      - 列出存在的能力规范
      - 对每个规范提取需求名称（匹配 \`### Requirement: <name>\` 的行）

4. **检测规范冲突**

   构建 \`能力 -> [涉及的变更]\` 映射：

   \`\`\`
   auth -> [change-a, change-b]  ← 冲突（2+ 个变更）
   api  -> [change-c]            ← 正常（仅 1 个变更）
   \`\`\`

   当 2+ 个选中变更有相同能力的增量规范时，存在冲突。

5. **代理式解决冲突**

   **对每个冲突**，调查代码库：

   a. **阅读增量规范** - 来自每个冲突变更，了解各自声称添加/修改的内容

   b. **搜索代码库**寻找实现证据：
      - 查找实现每个增量规范需求的代码
      - 检查相关文件、函数或测试

   c. **确定解决方案**：
      - 如果只有一个变更实际实现了 -> 同步该变更的规范
      - 如果两个都实现了 -> 按时间顺序应用（先旧后新，新的覆盖）
      - 如果都未实现 -> 跳过规范同步，警告用户

   d. **记录每个冲突的解决方案**：
      - 应用哪个变更的规范
      - 以什么顺序（如果两个都实现）
      - 理由（在代码库中发现了什么）

6. **显示汇总状态表**

   显示汇总所有变更的表格：

   \`\`\`
   | Change               | Artifacts | Tasks | Specs   | Conflicts | Status |
   |---------------------|-----------|-------|---------|-----------|--------|
   | schema-management   | Done      | 5/5   | 2 delta | None      | Ready  |
   | project-config      | Done      | 3/3   | 1 delta | None      | Ready  |
   | add-oauth           | Done      | 4/4   | 1 delta | auth (!)  | Ready* |
   | add-verify-skill    | 1 left    | 2/5   | None    | None      | Warn   |
   \`\`\`

   对于冲突，显示解决方案：
   \`\`\`
   * Conflict resolution:
     - auth spec: Will apply add-oauth then add-jwt (both implemented, chronological order)
   \`\`\`

   对于未完成的变更，显示警告：
   \`\`\`
   警告：
   - add-verify-skill: 1 个未完成工件，3 个未完成任务
   \`\`\`

7. **确认批量操作**

   使用 **AskUserQuestion 工具** 进行单次确认：

   - "归档 N 个变更？"根据状态提供选项
   - 选项可能包括：
     - "归档所有 N 个变更"
     - "仅归档 N 个就绪变更（跳过未完成的）"
     - "取消"

   如果有未完成的变更，请明确说明它们将带警告归档。

8. **为每个确认的变更执行归档**

   按确定的顺序处理变更（遵循冲突解决方案）：

   a. **同步规范** - 如果增量规范存在：
      - 使用 openspec-sync-specs 方式（代理驱动智能合并）
      - 对于冲突，按解决顺序应用
      - 跟踪是否已同步

   b. **执行归档**：
      \`\`\`bash
      mkdir -p openspec/changes/archive
      mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
      \`\`\`

   c. **跟踪每个变更的结果**：
      - 成功：归档成功
      - 失败：归档时出错（记录错误）
      - 跳过：用户选择不归档（如果适用）

9. **显示摘要**

   显示最终结果：

   \`\`\`
   ## 批量归档完成

   已归档 3 个变更：
   - schema-management-cli -> archive/2026-01-19-schema-management-cli/
   - project-config -> archive/2026-01-19-project-config/
   - add-oauth -> archive/2026-01-19-add-oauth/

   跳过 1 个变更：
   - add-verify-skill（用户选择不归档未完成的）

   规范同步摘要：
   - 4 个增量规范已同步到主规范
   - 1 个冲突已解决（auth：按时间顺序都已应用）
   \`\`\`

   如果有失败：
   \`\`\`
   失败 1 个变更：
   - some-change: 归档目录已存在
   \`\`\`

**冲突解决示例**

示例 1：仅实现了一个
\`\`\`
Conflict: specs/auth/spec.md touched by [add-oauth, add-jwt]

检查 add-oauth：
- 增量添加 "OAuth Provider Integration" 需求
- 搜索代码库... 发现 src/auth/oauth.ts 实现了 OAuth 流程

检查 add-jwt：
- 增量添加 "JWT Token Handling" 需求
- 搜索代码库... 未找到 JWT 实现

解决方案：仅 add-oauth 已实现。将只同步 add-oauth 的规范。
\`\`\`

示例 2：两个都实现了
\`\`\`
Conflict: specs/api/spec.md touched by [add-rest-api, add-graphql]

检查 add-rest-api（创建于 2026-01-10）：
- 增量添加 "REST Endpoints" 需求
- 搜索代码库... 发现 src/api/rest.ts

检查 add-graphql（创建于 2026-01-15）：
- 增量添加 "GraphQL Schema" 需求
- 搜索代码库... 发现 src/api/graphql.ts

解决方案：两个都已实现。先应用 add-rest-api 的规范，
然后应用 add-graphql（按时间顺序，新的优先）。
\`\`\`

**成功时的输出**

\`\`\`
## Bulk Archive Complete

Archived N changes:
- <change-1> -> archive/YYYY-MM-DD-<change-1>/
- <change-2> -> archive/YYYY-MM-DD-<change-2>/

Spec sync summary:
- N delta specs synced to main specs
- No conflicts (or: M conflicts resolved)
\`\`\`

**部分成功时的输出**

\`\`\`
## Bulk Archive Complete (partial)

Archived N changes:
- <change-1> -> archive/YYYY-MM-DD-<change-1>/

Skipped M changes:
- <change-2> (user chose not to archive incomplete)

Failed K changes:
- <change-3>: Archive directory already exists
\`\`\`

**无变更时的输出**

\`\`\`
## No Changes to Archive

No active changes found. Use \`/opsx:new\` 创建新变更。
\`\`\`

**护栏**
- 允许任意数量的变更（1+ 即可，2+ 是典型用例）
- 始终提示选择，从不自动选择
- 尽早检测规范冲突并通过检查代码库解决
- 当两个变更都已实现时，按时间顺序应用规范
- 仅在缺少实现时跳过规范同步（警告用户）
- 确认前显示清晰的每个变更状态
- 对整个批次使用单次确认
- 跟踪并报告所有结果（成功/跳过/失败）
- 移动到归档时保留 .openspec.yaml
- 归档目录使用当前日期：YYYY-MM-DD-<name>
- 如果归档目标已存在，该变更失败但继续处理其他`
   };
}

/**
 * Template for /opsx:verify slash command
 */
export function getOpsxVerifyCommandTemplate(): CommandTemplate {
   return {
      name: 'OPSX: Verify',
      description: '在归档前验证实现是否与变更工件匹配',
      category: 'Workflow',
      tags: ['workflow', 'verify', 'experimental'],
      content: `验证实现是否与变更工件（规范、任务、设计）匹配。

**输入**: 可选在 \`/opsx:verify\` (e.g., \`/opsx:verify add-auth\`）。如果省略，检查是否可从对话上下文推断。如果模糊不清，你必须提示选择可用的变更。

**步骤**

1. **如果未提供变更名称，提示选择**

   运行 \`openspec list --json\` 获取可用变更。使用 **AskUserQuestion 工具** 让用户选择。

   显示有实现任务的变更（任务工件存在）。
   如果可用，包含每个变更使用的模式。
   将有未完成任务的变更标记为 "（进行中）"。

   **重要**: 不要猜测或自动选择变更。始终让用户来选。

2. **检查状态以了解模式**
   \`\`\`bash
   openspec status --change "<name>" --json
   \`\`\`
   解析 JSON 以了解：
   - \`schemaName\`: 使用的工作流 (e.g., "spec-driven")
   - 此变更存在哪些工件

3. **获取变更目录并加载工件**

   \`\`\`bash
   openspec instructions apply --change "<name>" --json
   \`\`\`

   这将返回变更目录和上下文文件。从 \`contextFiles\`.

4. **初始化验证报告结构**

   创建具有三个维度的报告结构：
   - **完整性**: 跟踪任务和规范覆盖
   - **正确性**: 跟踪需求实现和场景覆盖
   - **一致性**: 跟踪设计遵守和模式一致性

   每个维度可有 CRITICAL（严重）、WARNING（警告）或 SUGGESTION（建议）问题。

5. **验证完整性**

   **任务完成**：
   - 如果 contextFiles 中存在 tasks.md，阅读它
   - 解析复选框： \`- [ ]\` (incomplete) vs \`- [x]\` (complete)
   - 统计完成和总任务数
   - 如果存在未完成的任务：
     - Add CRITICAL issue for each incomplete task
     - Recommendation: "Complete task: <description>" or "Mark as done if already implemented"

   **规范覆盖**：
   - 如果增量规范存在于 \`openspec/changes/<name>/specs/\`:
     - 提取所有需求（标记为 "### Requirement:"）
     - 对于每个需求：
       - 搜索代码库中与需求相关的关键字
       - 评估实现是否可能存在
     - 如果需求似乎未实现：
       - Add CRITICAL issue: "Requirement not found: <requirement name>"
       - Recommendation: "Implement requirement X: <description>"

6. **验证正确性**

   **需求实现映射**：
   - 对于增量规范中的每个需求：
     - 搜索代码库中的实现证据
     - 如果找到，记录文件路径和行范围
     - 评估实现是否符合需求意图
     - 如果检测到偏差：
       - Add WARNING: "Implementation may diverge from spec: <details>"
       - Recommendation: "Review <file>:<lines> against requirement X"

   **场景覆盖**：
   - 对于增量规范中的每个场景（标记为 "#### Scenario:"）：
     - 检查条件是否在代码中处理
     - 检查是否有覆盖该场景的测试
     - 如果场景似乎未覆盖：
       - Add WARNING: "Scenario not covered: <scenario name>"
       - Recommendation: "Add test or implementation for scenario: <description>"

7. **验证一致性**

   **设计遵守**：
   - 如果 contextFiles 中存在 design.md：
     - 提取关键决策（查找如 "Decision:"、"Approach:"、"Architecture:" 等部分）
     - 验证实现是否遵循这些决策
     - 如果检测到矛盾：
       - Add WARNING: "Design decision not followed: <decision>"
       - Recommendation: "Update implementation or revise design.md to match reality"
   - 如果没有 design.md：跳过设计遵守检查，注明 "无 design.md 可供验证"

   **代码模式一致性**：
   - 审查新代码与项目模式的一致性
   - 检查文件命名、目录结构、编码风格
   - 如果发现显著偏差：
     - Add SUGGESTION: "Code pattern deviation: <details>"
     - Recommendation: "Consider following project pattern: <example>"

8. **生成验证报告**

   **总结记分卡**：
   \`\`\`
   ## 验证报告： <change-name>

   ### 摘要
   | 维度    | 状态           |
   |----------|----------|
   | 完整性 | X/Y 任务, N 需求|
   | 正确性  | M/N 需求覆盖 |
   | 一致性    | 遵循/有问题  |
   \`\`\`

   **按优先级分类的问题**：

   1. **严重**（归档前必须修复）：
      - 未完成的任务
      - 缺失的需求实现
      - 每个都有具体可行的建议

   2. **警告**（应该修复）：
      - 规范/设计偏差
      - 缺失的场景覆盖
      - 每个都有具体建议

   3. **建议**（最好修复）：
      - 模式不一致
      - 小改进
      - 每个都有具体建议

   **最终评估**：
   - 如果有 CRITICAL 问题："发现 X 个严重问题。归档前修复。"
   - 如果只有警告："无严重问题。有 Y 个警告需考虑。可以归档（含建议改进）。"
   - 如果全部通过："所有检查通过。可以归档。"

**验证启发式规则**

- **完整性**: 聚焦于客观的清单项（复选框、需求列表）
- **正确性**: 使用关键字搜索、文件路径分析、合理推理 - 不要求完美的确定性
- **一致性**: 查找明显的不一致，不要吹毛求疵
- **误报**: 不确定时，优先用建议而非警告，用警告而非严重
- **可操作性**: 每个问题必须有具体建议，在适用时附带文件/行引用

**优雅降级**

- 如果只有 tasks.md：仅验证任务完成，跳过规范/设计检查
- 如果有任务和规范：验证完整性和正确性，跳过设计
- 如果有完整工件：验证所有三个维度
- 始终注明跳过了哪些检查及原因

**输出格式**

使用清晰的 markdown，包括：
- 总结记分卡的表格
- 按问题分组的列表（严重/警告/建议）
- 代码引用格式： \`file.ts:123\`
- 具体可行的建议
- 不要有模糊的建议如 "考虑审查"`
   };
}
/**
 * Template for feedback skill
 * For collecting and submitting user feedback with context enrichment
 */
export function getFeedbackSkillTemplate(): SkillTemplate {
   return {
      name: 'feedback',
      description: '收集和提交关于 OpenSpec 的用户反馈，包含上下文丰富和脱敏处理。',
      instructions: `帮助用户提交关于 OpenSpec 的反馈。

**目标**: 引导用户收集、丰富和提交反馈，同时通过脱敏确保隐私。

**流程**

1. **从对话中收集上下文**
   - 审查最近的对话历史以获取上下文
   - 识别正在执行的任务
   - 记录什么效果好或不好
   - 捕获具体的摩擦点或赞赏

2. **草拟丰富的反馈**
   - 创建清晰描述性的标题（单句，无需 "Feedback:" 前缀）
   - 写一个包含以下内容的正文：
     - 用户试图做什么
     - 发生了什么（好的或坏的）
     - 来自对话的相关上下文
     - 任何具体的建议或请求

3. **脱敏敏感信息**
   - 将文件路径替换为 \`<path>\` 或通用描述
   - 将 API 密钥、令牌、密钥替换为 \`<redacted>\`
   - 将公司/组织名称替换为 \`<company>\`
   - 将个人姓名替换为 \`<user>\`
   - 将特定 URL 替换为 \`<url>\` 除非是公开的/相关的
   - 保留有助于理解问题的技术细节

4. **提交草稿供审批**
   - 向用户展示完整草稿
   - 清晰展示标题和正文
   - 在提交前要求明确批准
   - 允许用户请求修改

5. **确认后提交**
   - 使用 \`openspec feedback\` 命令提交
   - Format: \`openspec feedback "title" --body "body content"\`
   - 命令将自动添加元数据（版本、平台、时间戳）

**草稿示例**

\`\`\`
标题：工件工作流的错误处理需要改进

Body:
我在创建新变更时遇到了
工件工作流的问题。当我在创建
提案后尝试继续时，系统没有清楚地指出我需要先完成
规范。

建议：添加更清晰的错误消息来解释依赖链
在工件工作流中。类似于 "Cannot create design.md
because 规范未完成 (0/2 done)."

上下文：在 <path>/my-project
\`\`\`

**脱敏示例**

之前：
\`\`\`
Working on /Users/john/mycompany/auth-service/src/oauth.ts
Failed with API key: sk_live_abc123xyz
Working at Acme Corp
\`\`\`

之后：
\`\`\`
Working on <path>/oauth.ts
Failed with API key: <redacted>
Working at <company>
\`\`\`

**护栏**

- 必须在提交前展示完整草稿
- 必须要求明确批准
- 必须脱敏敏感信息
- 允许用户在提交前修改草稿
- 未经用户确认不要提交
- 包含相关技术上下文
- 保留对话特定的洞察

**需要用户确认**

始终询问：
\`\`\`
这是我起草的反馈：

标题：[标题]

Body:
[正文]

看起来可以吗？如果需要我可以修改，或者直接提交。
\`\`\`

仅在用户确认后继续提交。`
   };
}
