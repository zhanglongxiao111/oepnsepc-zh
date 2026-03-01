/**
 * Third and final fix pass - code block display text in BulkArchive, Verify, Archive Command, Feedback
 * Run: node scripts/fix-final3.mjs
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
// Fix remaining "否" corruptions
// ============================================================
tr('chro否logical', 'chronological');
tr('an否unce', 'announce');
tr('否ted improvements', 'noted improvements');
tr('| 无冲突s |', '| Conflicts |');
tr('* 无冲突 resolution:', '* Conflict resolution:');
tr('无冲突:', 'Conflict:');

// ============================================================
// BulkArchive - code block display text (appears twice - Skill + Command)
// ============================================================
tr('## Bulk Archive Complete\r\n\r\n   Archived 3 changes:', '## 批量归档完成\r\n\r\n   已归档 3 个变更：');
tr('   Skipped 1 change:\r\n   - add-verify-skill (user chose not to archive incomplete)', '   跳过 1 个变更：\r\n   - add-verify-skill（用户选择不归档未完成的）');
tr('   Spec sync summary:\r\n   - 4 delta specs synced to main specs\r\n   - 1 conflict resolved (auth: applied both in chronological order)', '   规范同步摘要：\r\n   - 4 个增量规范已同步到主规范\r\n   - 1 个冲突已解决（auth：按时间顺序都已应用）');
tr('   If any failures:', '   如果有失败：');
tr('   Failed 1 change:\r\n   - some-change: Archive directory already exists', '   失败 1 个变更：\r\n   - some-change: 归档目录已存在');
tr('Checking add-oauth:', '检查 add-oauth：');
tr('- Delta adds "OAuth Provider Integration" requirement', '- 增量添加 "OAuth Provider Integration" 需求');
tr('- Searching codebase... found src/auth/oauth.ts implementing OAuth flow', '- 搜索代码库... 发现 src/auth/oauth.ts 实现了 OAuth 流程');
tr('Checking add-jwt:', '检查 add-jwt：');
tr('- Delta adds "JWT Token Handling" requirement', '- 增量添加 "JWT Token Handling" 需求');
tr('- Searching codebase... 否 JWT implementation found', '- 搜索代码库... 未找到 JWT 实现');
tr('Resolution: Only add-oauth is implemented. Will sync add-oauth specs only.', '解决方案：仅 add-oauth 已实现。将只同步 add-oauth 的规范。');
tr('Checking add-rest-api (created 2026-01-10):', '检查 add-rest-api（创建于 2026-01-10）：');
tr('- Delta adds "REST Endpoints" requirement', '- 增量添加 "REST Endpoints" 需求');
tr('- Searching codebase... found src/api/rest.ts', '- 搜索代码库... 发现 src/api/rest.ts');
tr('Checking add-graphql (created 2026-01-15):', '检查 add-graphql（创建于 2026-01-15）：');
tr('- Delta adds "GraphQL Schema" requirement', '- 增量添加 "GraphQL Schema" 需求');
tr('- Searching codebase... found src/api/graphql.ts', '- 搜索代码库... 发现 src/api/graphql.ts');
tr('Resolution: Both implemented. Will apply add-rest-api specs first,\r\nthen add-graphql specs (chronological order, newer takes precedence).', '解决方案：两个都已实现。先应用 add-rest-api 的规范，\r\n然后应用 add-graphql（按时间顺序，新的优先）。');
tr('## Bulk Archive Complete\r\n\r\n   Archived N changes:', '## 批量归档完成\r\n\r\n   已归档 N 个变更：');
tr('   Spec sync summary:\r\n   - N delta specs synced to main specs\r\n   - No conflicts (or: M conflicts resolved)', '   规范同步摘要：\r\n   - N 个增量规范已同步到主规范\r\n   - 无冲突（或：已解决 M 个冲突）');
tr('## Bulk Archive Complete (partial)\r\n\r\n   Archived N changes:', '## 批量归档完成（部分）\r\n\r\n   已归档 N 个变更：');
tr('   Skipped M changes:\r\n   - <change-2> (user chose not to archive incomplete)', '   跳过 M 个变更：\r\n   - <change-2>（用户选择不归档未完成的）');
tr('   Failed K changes:\r\n   - <change-3>: Archive directory already exists', '   失败 K 个变更：\r\n   - <change-3>: 归档目录已存在');
tr('## No Changes to Archive\r\n\r\n   No active changes found. Use', '## 无变更可归档\r\n\r\n   未找到活跃变更。使用');
tr('to create a new change.', '创建新变更。');
tr('   - "Archive N changes?" with options based on status', '   - "归档 N 个变更？"根据状态提供选项');
tr('   - Options might include:', '   - 选项可能包括：');
tr('     - "Archive all N changes"', '     - "归档所有 N 个变更"');
tr('     - "Archive only N ready changes (skip incomplete)"', '     - "仅归档 N 个就绪变更（跳过未完成的）"');
tr('     - "Cancel"', '     - "取消"');
tr('Preserve .openspec.yaml when moving to archive', '移动到归档时保留 .openspec.yaml');
tr('b. **任务完成度** - Read', 'b. **任务完成度** - 阅读');
tr('Warnings:\r\n   - add-verify-skill: 1 incomplete artifact, 3 incomplete tasks', '警告：\r\n   - add-verify-skill: 1 个未完成工件，3 个未完成任务');

// ============================================================
// Verify - remaining English (Add CRITICAL/WARNING/SUGGESTION lines)
// ============================================================
tr('- Add CRITICAL issue for each incomplete task\r\n      - Recommendation: "Complete task: <description>" or "Mark as done if already implemented"', '- 为每个未完成任务添加 CRITICAL 问题\r\n      - 建议："完成任务: <description>" 或 "如果已实现则标记完成"');
tr('- Add CRITICAL issue: "Requirement not found: <requirement name>"\r\n        - Recommendation: "Implement requirement X: <description>"', '- 添加 CRITICAL 问题："未找到需求: <requirement name>"\r\n        - 建议："实现需求 X: <description>"');
tr('- Add WARNING: "Implementation may diverge from spec: <details>"\r\n        - Recommendation: "Review <file>:<lines> against requirement X"', '- 添加 WARNING："实现可能偏离规范: <details>"\r\n        - 建议："对照需求 X 审查 <file>:<lines>"');
tr('- Add WARNING: "Scenario not covered: <scenario name>"\r\n        - Recommendation: "Add test or implementation for scenario: <description>"', '- 添加 WARNING："场景未覆盖: <scenario name>"\r\n        - 建议："为场景添加测试或实现: <description>"');
tr('- Add WARNING: "Design decision not followed: <decision>"\r\n        - Recommendation: "Update implementation or revise design.md to match reality"', '- 添加 WARNING："设计决策未遵循: <decision>"\r\n        - 建议："更新实现或修改 design.md 以匹配实际"');
tr('- Add SUGGESTION: "Code pattern deviation: <details>"\r\n      - Recommendation: "Consider following project pattern: <example>"', '- 添加 SUGGESTION："代码模式偏差: <details>"\r\n      - 建议："考虑遵循项目模式: <example>"');
tr('   - If tasks.md exists in contextFiles, read it\r\n   - Parse checkboxes:', '   - 如果 contextFiles 中存在 tasks.md，阅读它\r\n   - 解析复选框：');
tr('   - If delta specs exist in', '   - 如果增量规范存在于');
tr('   ## Verification Report:', '   ## 验证报告：');
tr('   ### Summary\r\n   | Dimension    | Status           |', '   ### 摘要\r\n   | 维度    | 状态           |');
tr('   | Completeness | X/Y tasks, N reqs|', '   | 完整性 | X/Y 任务, N 需求|');
tr('   | Correctness  | M/N reqs covered |', '   | 正确性  | M/N 需求覆盖 |');
tr('   | Coherence    | Followed/Issues  |', '   | 一致性    | 遵循/有问题  |');
tr('   - If CRITICAL issues: "X critical issue(s) found. Fix before archiving."', '   - 如果有 CRITICAL 问题："发现 X 个严重问题。归档前修复。"');
tr('   - If only warnings: "No critical issues. Y warning(s) to consider. Ready for archive (with noted improvements)."', '   - 如果只有警告："无严重问题。有 Y 个警告需考虑。可以归档（含建议改进）。"');
tr('   - If all clear: "All checks passed. Ready for archive."', '   - 如果全部通过："所有检查通过。可以归档。"');
tr('   - Which artifacts exist for this change', '   - 此变更存在哪些工件');
tr('   This returns the change directory and context files. Read all available artifacts from', '   这将返回变更目录和上下文文件。从');

// ============================================================
// Archive Command - remaining English in code blocks
// ============================================================
tr('**Specs:** ✓ Synced to main specs\r\n', '**规范:** ✓ 已同步到主规范\r\n');
tr('**Specs:** No delta specs\r\n', '**规范:** 无增量规范\r\n');
tr('## 归档完成 (with warnings)', '## 归档完成（带警告）');
tr('**Specs:** Sync skipped (user chose to skip)', '**规范:** 已跳过同步（用户选择跳过）');
tr('**Warnings:**\r\n- Archived with 2 incomplete artifacts\r\n- Archived with 3 incomplete tasks\r\n- Delta spec sync was skipped (user chose to skip)', '**警告：**\r\n- 归档时有 2 个未完成工件\r\n- 归档时有 3 个未完成任务\r\n- 增量规范同步已跳过（用户选择跳过）');
tr('## Archive Failed', '## 归档失败');
tr('**Target:** openspec/changes/archive/YYYY-MM-DD-<name>/', '**目标:** openspec/changes/archive/YYYY-MM-DD-<name>/');
tr('Target archive directory already exists.', '目标归档目录已存在。');
tr('1. Rename the existing archive', '1. 重命名现有归档');
tr('2. Delete the existing archive if it\'s a duplicate', '2. 如果是重复的则删除现有归档');
tr('3. Wait until a different date to archive', '3. 等待不同日期再归档');
tr('If sync is requested, use the Skill tool to invoke', '如果请求同步，使用 Skill 工具调用');
tr('(agent-driven)', '（代理驱动）');

// ============================================================
// Feedback - remaining English
// ============================================================
tr('Replace file paths with', '将文件路径替换为');
tr('or generic descriptions', '或通用描述');
tr('Replace API keys, tokens, secrets with', '将 API 密钥、令牌、密钥替换为');
tr('Replace company/organization names with', '将公司/组织名称替换为');
tr('Replace personal names with', '将个人姓名替换为');
tr('Replace specific URLs with', '将特定 URL 替换为');
tr('unless public/relevant', '除非是公开的/相关的');
tr('Use the', '使用');
tr('command to submit', '命令提交');
tr('Before:', '之前：');
tr('After:', '之后：');
tr('in the artifact workflow. Something like "Cannot create design.md', '在工件工作流中。类似于 "Cannot create design.md');

// Write result
fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n✅ Third fix pass complete. ${count} fixes applied.`);
console.log(`File size: ${content.length} bytes`);
