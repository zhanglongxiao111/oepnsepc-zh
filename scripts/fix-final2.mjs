/**
 * Second fix pass - remaining English in Onboard, Archive, BulkArchive, Verify, Feedback, and Command templates
 * Run: node scripts/fix-final2.mjs
 */
import fs from 'fs';

const filePath = 'src/core/templates/skill-templates.ts';
let content = fs.readFileSync(filePath, 'utf-8');
let count = 0;

function tr(en, zh) {
    if (content.includes(en)) {
        content = content.replaceAll(en, zh);
        count++;
    }
}

// ============================================================
// ONBOARD - remaining mixed English
// ============================================================
tr('> OpenSpec CLI is not installed. Install it first, then come back to', '> OpenSpec CLI 未安装。请先安装，然后回到');
tr('\\`src/a否ther/file.ts\\`', '\\`src/another/file.ts\\`');
tr('**If 否thing found:** Fall back to asking what the user wants to build:', '**如果没有找到：**转而询问用户想构建什么：');
tr("3. **Do it anyway** - If you really want to tackle this, we can. Just k现在 it'll take longer.", "3. **还是做这个** - 如果你真的想做这个，可以。只是需要更长时间。");
tr("It lives in \\`openspec/changes/<name>/\\` and holds your artifacts—proposal, specs, design, tasks.", "它位于 \\`openspec/changes/<name>/\\`，保存你的工件——提案、规范、设计、任务。");
tr("├── proposal.md    ← Why we're doing this (empty, we'll fill it)", "├── proposal.md    ← 为什么做（空，我们来填写）");
tr("├── design.md      ← How we'll build it (empty)", "├── design.md      ← 怎么做（空）");
tr("├── specs/         ← Detailed requirements (empty)", "├── specs/         ← 详细需求（空）");
tr("└── tasks.md       ← Implementation checklist (empty)", "└── tasks.md       ← 实现清单（空）");
tr("**执行：** Create the change with a derived kebab-case name:", "**执行：** 使用推导的 kebab-case 名称创建变更：");
tr("**执行：** Draft the proposal content (don't save yet):", "**执行：** 起草提案内容（先不保存）：");
tr("They use a requirement/scenario format that makes expected behavior crystal clear.", "它们使用需求/场景格式，让预期行为一目了然。");
tr("**执行：** Create the spec file:", "**执行：** 创建规范文件：");
tr("Draft the spec content:", "起草规范内容：");
tr("Save to \\`openspec/changes/<name>/specs/<capability>/spec.md\\`.", "保存到 \\`openspec/changes/<name>/specs/<capability>/spec.md\\`。");
tr("For small changes, this might be brief. That's fine—not every change needs deep design discussion.", "对于小变更，这可能很简短。没关系——不是每个变更都需要深入的设计讨论。");
tr("**执行：** Draft design.md:", "**执行：** 起草 design.md：");
tr("Save to \\`openspec/changes/<name>/design.md\\`.", "保存到 \\`openspec/changes/<name>/design.md\\`。");
tr("**执行：** Generate tasks based on specs and design:", "**执行：** 基于规范和设计生成任务：");
tr("Save to \\`openspec/changes/<name>/tasks.md\\`.", "保存到 \\`openspec/changes/<name>/tasks.md\\`。");
tr("Now we implement each task, checking them off as we go. I'll an否unce each one and occasionally 注意 how the specs/design informed the approach.", "现在我们逐个实现任务，边做边勾选。我会宣布每一个，偶尔说明规范/设计如何影响了方法。");
tr("**执行：** For each task:", "**执行：** 对于每个任务：");
tr("1. An否unce: \"正在处理任务 N: [描述]\"", "1. 宣布：\"正在处理任务 N: [描述]\"");
tr("4. Mark complete in tasks.md: \\`- [ ]\\` → \\`- [x]\\`", "4. 在 tasks.md 中标记完成：\\`- [ ]\\` → \\`- [x]\\`");
tr("5. 简短状态： \"✓ Task N complete\"", "5. 简短状态：\"✓ 任务 N 完成\"");
tr("After all tasks:", "所有任务完成后：");
tr("This moves it from \\`openspec/changes/\\` to \\`openspec/changes/archive/YYYY-MM-DD-<name>/\\`.", "这会将变更从 \\`openspec/changes/\\` 移动到 \\`openspec/changes/archive/YYYY-MM-DD-<name>/\\`。");
tr("Archived to: \\`openspec/changes/archive/YYYY-MM-DD-<name>/\\`", "已归档到: \\`openspec/changes/archive/YYYY-MM-DD-<name>/\\`");
tr("The change is 现在 part of your project's history. The code is in your codebase, the decision record is preserved.", "变更现在是项目历史的一部分。代码在你的代码库中，决策记录已保存。");
tr("on something you actually want to build. You've got the rhythm 否w!", "来做你真正想构建的东西。你已经掌握了节奏！");
tr("Think through problems (否 code changes)", "思考问题（不修改代码）");
tr("If the user says they need to stop, want to pause, or seem disengaged:", "如果用户说需要停止、想暂停或似乎不感兴趣：");
tr("(after explore, after proposal draft, after tasks, after archive)", "（探索之后、提案草稿之后、任务之后、归档之后）");

// code block headers still in English  
tr("## Why\r\n\r\n[1-2 sentences explaining the problem/opportunity]", "## 为什么\r\n\r\n[1-2 句话解释问题/机会]");
tr("## What Changes\r\n\r\n[Bullet points of what will be different]", "## 变更内容\r\n\r\n[将会有什么不同的要点]");
tr("## Capabilities\r\n\r\n### New Capabilities\r\n- \\`<capability-name>\\`: [brief description]\r\n\r\n### Modified Capabilities\r\n<!-- If modifying existing behavior -->", "## 能力\r\n\r\n### 新增能力\r\n- \\`<capability-name>\\`: [简要描述]\r\n\r\n### 修改的能力\r\n<!-- 如果修改现有行为 -->");
tr("## Impact\r\n\r\n- \\`src/path/to/file.ts\\`: [what changes]\r\n- [other files if applicable]", "## 影响\r\n\r\n- \\`src/path/to/file.ts\\`: [变更内容]\r\n- [其他相关文件]");
tr("## Context\r\n\r\n[Brief context about the current state]\r\n\r\n## Goals / Non-Goals\r\n\r\n**Goals:**\r\n- [What we're trying to achieve]\r\n\r\n**Non-Goals:**\r\n- [What's explicitly out of scope]\r\n\r\n## Decisions\r\n\r\n### Decision 1: [Key decision]\r\n\r\n[Explanation of approach and rationale]", "## 背景\r\n\r\n[关于当前状态的简要背景]\r\n\r\n## 目标 / 非目标\r\n\r\n**目标：**\r\n- [我们要达成什么]\r\n\r\n**非目标：**\r\n- [明确排除的范围]\r\n\r\n## 决策\r\n\r\n### 决策 1: [关键决策]\r\n\r\n[方法和理由的说明]");
tr("## 1. [Category or file]\r\n\r\n- [ ] 1.1 [Specific task]\r\n- [ ] 1.2 [Specific task]\r\n\r\n## 2. Verify\r\n\r\n- [ ] 2.1 [Verification step]", "## 1. [类别或文件]\r\n\r\n- [ ] 1.1 [具体任务]\r\n- [ ] 1.2 [具体任务]\r\n\r\n## 2. 验证\r\n\r\n- [ ] 2.1 [验证步骤]");

// ============================================================
// ARCHIVE SKILL - remaining English
// ============================================================
tr("Run \\`openspec status --change \"<name>\" --json\\` to check artifact completion.", "运行 \\`openspec status --change \"<name>\" --json\\` 检查工件完成状态。");
tr("   - \\`artifacts\\`: List of artifacts with their status (\\`done\\` or other)", "   - \\`artifacts\\`: 工件列表及其状态（\\`done\\` 或其他）");
tr("   **If any artifacts are not \\`done\\`:**", "   **如果有工件未完成：**");
tr("Read the tasks file (typically \\`tasks.md\\`) to check for incomplete tasks.", "阅读任务文件（通常是 \\`tasks.md\\`）检查未完成的任务。");
tr("Count tasks marked with \\`- [ ]\\` (incomplete) vs \\`- [x]\\` (complete).", "计算标记为 \\`- [ ]\\`（未完成）和 \\`- [x]\\`（已完成）的任务数。");
tr("If user chooses sync, use Task tool (subagent_type: \"general-purpose\", prompt: \"Use Skill tool to invoke openspec-sync-specs for change '<name>'. Delta spec analysis: <include the analyzed delta spec summary>\"). Proceed to archive regardless of choice.", "如果用户选择同步，使用 Task 工具（subagent_type: \"general-purpose\", prompt: \"使用 Skill 工具调用 openspec-sync-specs 同步变更 '<name>'。增量规范分析: <包含分析的增量规范摘要>\"）。无论选择什么都继续归档。");
tr("## Archive Complete", "## 归档完成");
tr("**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/", "**已归档到:** openspec/changes/archive/YYYY-MM-DD-<name>/");
tr("**Specs:** ✓ Synced to main specs (or \"No delta specs\" or \"Sync skipped\")", "**规范:** ✓ 已同步到主规范（或 \"无增量规范\" 或 \"跳过同步\"）");
tr("All artifacts complete. All tasks complete.", "所有工件完成。所有任务完成。");

// ============================================================
// BULK ARCHIVE - remaining English
// ============================================================
tr("**输入**: None required (prompts for ion)", "**输入**: 无需输入（交互式提示选择）");
tr("Run \\`openspec list --json\\` to get all active changes.", "运行 \\`openspec list --json\\` 获取所有活跃变更。");
tr("a. **工件状态** - Run \\`openspec status --change \"<name>\" --json\\`", "a. **工件状态** - 运行 \\`openspec status --change \"<name>\" --json\\`");
tr("      - Parse \\`schemaName\\` and \\`artifacts\\` list", "      - 解析 \\`schemaName\\` 和 \\`artifacts\\` 列表");
tr("      - Note which artifacts are \\`done\\` vs other states", "      - 记录哪些工件是 \\`done\\` 状态，哪些不是");
tr("      - Count \\`- [ ]\\` (incomplete) vs \\`- [x]\\` (complete)", "      - 计算 \\`- [ ]\\`（未完成）和 \\`- [x]\\`（已完成）");
tr("      - If 否 tasks file exists, 注意 as \"No tasks\"", "      - 如果不存在任务文件，标记为 \"无任务\"");
tr("c. **增量规范** - Check \\`openspec/changes/<name>/specs/\\` directory", "c. **增量规范** - 检查 \\`openspec/changes/<name>/specs/\\` 目录");
tr("      - 对每个规范提取需求名称 (lines matching \\`### Requirement: <name>\\`)", "      - 对每个规范提取需求名称（匹配 \\`### Requirement: <name>\\` 的行）");
tr("   Build a map of \\`capability -> [changes that touch it]\\`:", "   构建 \\`能力 -> [涉及的变更]\\` 映射：");
tr("   auth -> [change-a, change-b]  <- CONFLICT (2+ changes)", "   auth -> [change-a, change-b]  ← 冲突（2+ 个变更）");
tr("   api  -> [change-c]            <- OK (only 1 change)", "   api  -> [change-c]            ← 正常（仅 1 个变更）");

// ============================================================  
// NEW COMMAND - remaining English
// ============================================================
tr("Prompt: \"Ready to create the first artifact? Run \\`/opsx:continue\\` or just describe what this change is about and I'll draft it.\"", "提示: \"准备好创建第一个工件了吗？运行 \\`/opsx:continue\\`，或描述这个变更是关于什么的，我来起草。\"");
tr("If a change with that name already exists, suggest using \\`/opsx:continue\\` instead", "如果该名称的变更已存在，建议使用 \\`/opsx:continue\\`");

// ============================================================
// APPLY COMMAND + SKILL - remaining mixed state handling
// ============================================================
tr("   - If \\`state: \"blocked\"\\` (missing artifacts): show message, suggest using \\`/opsx:continue\\`\r\n   - If \\`state: \"all_done\"\\`: congratulate, suggest archive\r\n   - Otherwise: proceed to implementation",
    "   - 如果 \\`state: \"blocked\"\\`（缺少工件）：显示消息，建议使用 \\`/opsx:continue\\`\r\n   - 如果 \\`state: \"all_done\"\\`：祝贺，建议归档\r\n   - 否则：继续实现");
tr("All tasks complete! You can archive this change with \\`/opsx:archive\\`.", "所有任务完成！你可以使用 \\`/opsx:archive\\` 归档此变更。");

// ============================================================
// EXPLORE COMMAND - remaining English input line
// ============================================================
tr("**输入**:  \\`/opsx:explore\\` is whatever the user wants to think about. Could be:", "**输入**: \\`/opsx:explore\\` 后的参数是用户想要思考的任何内容。可以是：");

// ============================================================
// Misc remaining "否" corruption patterns  
// ============================================================
tr('Review the archive if this was not intentional.', '如果这不是有意的，请检查归档。');

// Write result
fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n✅ Second fix pass complete. ${count} fixes applied.`);
console.log(`File size: ${content.length} bytes`);
