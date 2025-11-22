import { SlashCommandConfigurator, SLASH_COMMAND_DESCRIPTIONS } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.claude/commands/openspec/proposal.md',
  apply: '.claude/commands/openspec/apply.md',
  archive: '.claude/commands/openspec/archive.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
name: OpenSpec: Proposal
description: ${SLASH_COMMAND_DESCRIPTIONS.proposal}
category: OpenSpec
tags: [openspec, change]
---`,
  apply: `---
name: OpenSpec: Apply
description: ${SLASH_COMMAND_DESCRIPTIONS.apply}
category: OpenSpec
tags: [openspec, apply]
---`,
  archive: `---
name: OpenSpec: Archive
description: ${SLASH_COMMAND_DESCRIPTIONS.archive}
category: OpenSpec
tags: [openspec, archive]
---`
};

export class ClaudeSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'claude';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}
