export type SlashCommandId = 'proposal' | 'apply' | 'archive';

const baseGuardrails = `**防护栏**
- 优先提供直接、最小可行的实现，只在确有需求时再增加复杂度。
- 将改动范围收敛到请求的目标，避免额外扩展。
- 如需更多约定或澄清，参考 \`openspec/AGENTS.md\`（位于 \`openspec/\` 目录，若缺失请先运行 \`ls openspec\` 或 \`openspec update\`）。`;

const proposalGuardrails = `${baseGuardrails}\n- 遇到含糊或不明确的点先提问澄清，再动手改文件。\n- 提案阶段不要写代码，仅产出设计文档（proposal.md、tasks.md、design.md 以及规范 delta）。实现需在获批后在 apply 阶段完成。`;

const proposalSteps = `**步骤**
1. 阅读 \`openspec/project.md\`，运行 \`openspec list\` 与 \`openspec list --specs\`，并查看相关代码或文档（如用 \`rg\`/\`ls\`）以对齐当前行为，记录需要澄清的空缺。
2. 选择唯一的动词开头 \`change-id\`，在 \`openspec/changes/<id>/\` 下搭建 \`proposal.md\`、\`tasks.md\`，必要时添加 \`design.md\`。
3. 将变更拆解为可交付的能力或需求，跨范围的工作拆成独立的规范 delta，并写清关系和顺序。
4. 若方案跨多个系统、引入新模式或需权衡取舍，在 \`design.md\` 记录架构理由后再落地规范。
5. 在 \`changes/<id>/specs/<capability>/spec.md\` 中撰写规范 delta（每个能力单独目录），使用 \`## ADDED|MODIFIED|REMOVED Requirements\`，每个需求至少包含一个 \`#### Scenario:\`，必要时交叉引用相关能力。
6. 将 \`tasks.md\` 写成可验证的小步清单，确保有用户可见的推进、验证方式（测试/工具），并标注依赖或可并行项。
7. 执行 \`openspec validate <id> --strict\`，修复全部问题后再分享提案。`;

const proposalReferences = `**参考**
- 若校验失败，可用 \`openspec show <id> --json --deltas-only\` 或 \`openspec show <spec> --type spec\` 查看详情。
- 在撰写前用 \`rg -n "Requirement:|Scenario:" openspec/specs\` 搜索现有需求，避免重复。
- 用 \`rg <keyword>\`、\`ls\` 或直接读文件探索代码库，确保提案贴合现状。`;

const applySteps = `**步骤**
将以下步骤作为 TODO 逐项完成。
1. 阅读 \`changes/<id>/proposal.md\`、\`design.md\`（若存在）和 \`tasks.md\`，确认范围与验收标准。
2. 按任务顺序推进，保持改动最小且聚焦请求。
3. 完成后再更新状态，确保 \`tasks.md\` 中每项都已完成。
4. 任务全部完成后更新清单，使每一项标记为 \`- [x]\` 且反映真实状态。
5. 需要更多上下文时参考 \`openspec list\` 或 \`openspec show <item>\`。`;

const applyReferences = `**参考**
- 实施中需要补充上下文时，可用 \`openspec show <id> --json --deltas-only\` 查看提案细节。`;

const archiveSteps = `**步骤**
1. 确定要归档的 change ID：
   - 如果当前提示已经给出明确的 change ID（例如 slash 参数生成的 \`<ChangeId>\`），去除空白后直接使用。
   - 如果对话仅模糊提到变更（标题或摘要），运行 \`openspec list\` 找出候选，分享并确认用户意图。
   - 其它情况：先回顾对话，再运行 \`openspec list\`，向用户确认要归档的变更；未确认前不要继续。
   - 若仍无法定位唯一 ID，停止并告知暂无法归档。
2. 运行 \`openspec list\`（或 \`openspec show <id>\`）验证 change ID，若缺失、已归档或状态不合适则停止。
3. 执行 \`openspec archive <id> --yes\`，让 CLI 无提示移动变更并更新规范（仅工具类工作时才加 \`--skip-specs\`）。
4. 检查命令输出，确认目标规范已更新且变更进入 \`changes/archive/\`。
5. 运行 \`openspec validate --strict\`，若异常再用 \`openspec show <id>\` 复查。`;

const archiveReferences = `**参考**
- 归档前用 \`openspec list\` 确认 change ID。
- 归档后用 \`openspec list --specs\` 检查更新的规范，解决任何校验问题再交付。`;

export const slashCommandBodies: Record<SlashCommandId, string> = {
  proposal: [proposalGuardrails, proposalSteps, proposalReferences].join('\n\n'),
  apply: [baseGuardrails, applySteps, applyReferences].join('\n\n'),
  archive: [baseGuardrails, archiveSteps, archiveReferences].join('\n\n')
};

export function getSlashCommandBody(id: SlashCommandId): string {
  return slashCommandBodies[id];
}
