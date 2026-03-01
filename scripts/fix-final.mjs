/**
 * Final comprehensive fix for all remaining English and corrupted text.
 * Run: node scripts/fix-final.mjs
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
// 1. Fix ALL "否" corruption (no → 否)
// ============================================================
tr('e否ugh', 'enough');  // will be retranslated below  
tr('A否ther', 'Another'); // will be retranslated below
tr('否 p', 'no p');       // will be retranslated below  
tr('否t ', 'not ');       // will be retranslated below
tr('否te ', 'note ');     // will be retranslated below

// ============================================================  
// 2. Fix ALL "现在" corruption (now → 现在)
// ============================================================
tr("we're 现在 thinking", "we're now thinking");
tr("is 现在 updated", "is now updated");
tr("are 现在 updated", "are now updated");
tr("Main specs are now updated.", "主规范已更新。");
tr("specs are not complete", "规范未完成");

// ============================================================
// 3. Fix "实现/规范/会话" corruption in code block display text  
// ============================================================
tr("## 实现 Complete", "## 实现完成");
tr("## 实现 Paused", "## 实现暂停");
tr("## 规范 Synced:", "## 规范已同步:");
tr("Completed This 会话\n", "本次完成\n");
tr("Completed This 会话\r\n", "本次完成\r\n");

// ============================================================
// 4. Explore template - fix remaining English  
// ============================================================
// Lines 114-116
tr('- "This feels solid enough to start a change. Want me to create one?"\r\n  → Can transition to', '- "这已经足够成熟来开始一个变更了。要我创建一个吗？"\r\n  → 可以过渡到');
tr('- Or keep exploring - no pressure to formalize', '- 或者继续探索 - 不强制正式化');

// Lines 126, 129-131 - Example reference sentences  
tr('   - etc.', '   - 等等。');
tr('   - "Your design mentions using Redis, but we just realized SQLite fits better..."', '   - "你的设计提到使用 Redis，但我们刚发现 SQLite 更合适..."');
tr('   - "The proposal scopes this to premium users, but we\'re now thinking everyone..."', '   - "提案将范围限制在高级用户，但我们现在考虑面向所有人..."');
tr('   - "That\'s a design decision. Capture it in design.md?"', '   - "这是一个设计决策。记录到 design.md？"');
tr('   - "This is a new requirement. Add it to specs?"', '   - "这是一个新需求。添加到 specs？"');
tr('   - "This changes scope. Update the proposal?"', '   - "这改变了范围。更新提案？"');

// Lines 165, 188, 219, 236 - Section intro text
tr('**User brings a vague idea:**', '**用户带来模糊想法：**');
tr('**User brings a specific problem:**', '**用户带来具体问题：**');
tr('**User is stuck mid-implementation:**', '**用户在实现中遇到困难：**');
tr('**User wants to compare options:**', '**用户想比较选项：**');

// ============================================================
// 5. Apply template - fix remaining English
// ============================================================
// Line 530
tr('to get available changes and use the **AskUserQuestion tool** to let the user ', '获取可用变更，并使用 **AskUserQuestion 工具** 让用户选择。');
// Line 532
tr('"Using change: <name>" 以及如何覆盖', '"使用变更: <name>" 以及如何覆盖');
// Lines 539-540
tr("(e.g., \"spec-driven\")\r\n   - 哪个工件包含任务 (typically \"tasks\" for spec-driven, check status for others)",
    "（例如 \"spec-driven\"）\r\n   - 哪个工件包含任务（spec-driven 通常是 \"tasks\"，其他模式请检查状态）");
// Line 549
tr("(因模式而异 - could be proposal/specs/design/tasks or spec/tests/implementation/docs)",
    "（因模式而异 - 可以是 proposal/specs/design/tasks 或 spec/tests/implementation/docs）");
// Lines 555-557
tr('   - If \\`state: "blocked"\\` (missing artifacts): show message, suggest using openspec-continue-change\r\n   - If \\`state: "all_done"\\`: congratulate, suggest archive\r\n   - Otherwise: proceed to implementation',
    '   - 如果 \\`state: "blocked"\\`（缺少工件）：显示消息，建议使用 openspec-continue-change\r\n   - 如果 \\`state: "all_done"\\`：祝贺，建议归档\r\n   - 否则：继续实现');
// Lines 561-564
tr("Read the files listed in \\`contextFiles\\` from the apply instructions output.\r\n   The files depend on the schema being used:\r\n   - **spec-driven**: proposal, specs, design, tasks\r\n   - Other schemas: follow the contextFiles from CLI output",
    "读取执行指令输出中 \\`contextFiles\\` 列出的文件。\r\n   文件取决于所使用的模式：\r\n   - **spec-driven**: proposal, specs, design, tasks\r\n   - 其他模式：遵循 CLI 输出中的 contextFiles");
// Line 570
tr('   - Progress: "N/M tasks complete"', '   - 进度: "N/M 任务完成"');
// Line 580
tr("\\`- [ ]\\` → \\`- [x]\\`", "\\`- [ ]\\` → \\`- [x]\\`");
// Line 593
tr('   - Overall progress: "N/M tasks complete"', '   - 总进度: "N/M 任务完成"');
// Lines 600-608 - code block display text
tr("## Implementing: <change-name> (schema: <schema-name>)", "## 正在实现: <change-name> (模式: <schema-name>)");
tr("Working on task 3/7: <task description>", "正在处理任务 3/7: <task description>");
tr("[...implementation happening...]", "[...实现进行中...]");
tr("✓ Task complete", "✓ 任务完成");
tr("Working on task 4/7: <task description>", "正在处理任务 4/7: <task description>");
// Lines 614-625 - code block display text
tr("**Change:** <change-name>", "**变更:** <change-name>");
tr("**Schema:** <schema-name>", "**模式:** <schema-name>");
tr("**Progress:** 7/7 tasks complete ✓", "**进度:** 7/7 任务完成 ✓");
tr("**Progress:** 4/7 tasks complete", "**进度:** 4/7 任务完成");
tr("- [x] Task 1", "- [x] 任务 1");
tr("- [x] Task 2", "- [x] 任务 2");
tr("All tasks complete! Ready to archive this change.", "所有任务完成！准备归档此变更。");
// Lines 631-645 - code block display text
tr("### Issue Encountered", "### 遇到的问题");
tr("<description of the issue>", "<问题描述>");
tr("1. <option 1>", "1. <选项 1>");
tr("2. <option 2>", "2. <选项 2>");
tr("3. Other approach", "3. 其他方法");
tr("What would you like to do?", "你想怎么做？");
// Line 656
tr("- Use contextFiles from CLI output, don't assume specific file names", "- 使用 CLI 输出中的 contextFiles，不要假设特定的文件名");

// ============================================================
// 6. FF template - fix remaining English
// ============================================================
// Line 689
tr('(e.g., "add user authentication" →', '（例如 "add user authentication" →');
// Line 697
tr("这将在 \\`openspec/changes/<name>/\\`.", "这将在 \\`openspec/changes/<name>/\\` 创建脚手架变更。");
// Lines 704-705
tr("   - \\`applyRequires\\`: array of artifact IDs needed before implementation (e.g., \\`[\"tasks\"]\\`)\r\n   - \\`artifacts\\`: list of all artifacts with their status and dependencies",
    "   - \\`applyRequires\\`: 实现前所需的工件 ID 数组（例如 \\`[\"tasks\"]\\`）\r\n   - \\`artifacts\\`: 所有工件的列表及其状态和依赖");
// Line 709
tr("Use the **TodoWrite tool** to track progress through the artifacts.", "使用 **TodoWrite 工具** 跟踪工件创建进度。");
// Line 713
tr("   a. **For each artifact that is \\`ready\\` (dependencies satisfied)**:", "   a. **对于每个 \\`ready\\`（依赖满足）的工件**：");
tr("      - Get instructions:", "      - 获取指令：");
// Line 722
tr('for this artifact type', '（用于此工件类型）');
// Lines 725-728
tr("      - Create the artifact file using \\`template\\` as the structure", "      - 使用 \\`template\\` 作为结构创建工件文件");
tr("      - Apply \\`context\\` and \\`rules\\` as constraints - but do NOT copy them into the file", "      - 将 \\`context\\` 和 \\`rules\\` 作为约束应用 - 但不要复制到文件中");
tr('"✓ Created <artifact-id>"', '"✓ 已创建 <artifact-id>"');
// Lines 730-733
tr("   b. **Continue until all \\`applyRequires\\` artifacts are complete**", "   b. **继续直到所有 \\`applyRequires\\` 工件完成**");
tr("has \\`status: \"done\"\\` in the artifacts array", "在工件数组中状态为 \\`status: \"done\"\\`");
tr("\\`applyRequires\\` 工件完成时停止", "\\`applyRequires\\` 工件完成时停止");

// ============================================================
// 7. Sync template - fix remaining English
// ============================================================
// Line 792
tr("Run \\`openspec list --json\\` to get available changes. Use the **AskUserQuestion tool** to let the user .", "运行 \\`openspec list --json\\` 获取可用变更。使用 **AskUserQuestion 工具** 让用户选择。");
// Line 794
tr("Show changes that have delta specs (under \\`specs/\\` directory).", "显示有增量规范的变更（在 \\`specs/\\` 目录下）。");
// Line 800
tr("在 \\`openspec/changes/<name>/specs/*/spec.md\\`.", "查找 \\`openspec/changes/<name>/specs/*/spec.md\\`。");
// Line 839
tr("      - Create \\`openspec/specs/<capability>/spec.md\\`", "      - 创建 \\`openspec/specs/<capability>/spec.md\\`");
// Lines 888-900 - code block display text
tr("Updated main specs:", "已更新主规范：");
tr('- Added requirement: "New Feature"', '- 添加需求: "New Feature"');
tr('- Modified requirement: "Existing Feature" (added 1 scenario)', '- 修改需求: "Existing Feature"（添加了 1 个场景）');
tr("- Created new spec file", "- 创建了新规范文件");
tr('- Added requirement: "Another Feature"', '- 添加需求: "Another Feature"');
tr("The change remains active - archive when implementation is complete.", "变更仍然活跃 - 实现完成后归档。");

// ============================================================
// Write result
// ============================================================
fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n✅ Final fix complete. ${count} fixes applied.`);
console.log(`File size: ${content.length} bytes`);
