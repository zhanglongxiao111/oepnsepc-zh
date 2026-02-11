import { SlashCommandConfigurator, SLASH_COMMAND_DESCRIPTIONS } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.iflow/commands/openspec-proposal.md',
  apply: '.iflow/commands/openspec-apply.md',
  archive: '.iflow/commands/openspec-archive.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
name: /openspec-proposal
id: openspec-proposal
category: OpenSpec
description: ${SLASH_COMMAND_DESCRIPTIONS.proposal}
---`,
  apply: `---
name: /openspec-apply
id: openspec-apply
category: OpenSpec
description: ${SLASH_COMMAND_DESCRIPTIONS.apply}
---`,
  archive: `---
name: /openspec-archive
id: openspec-archive
category: OpenSpec
description: ${SLASH_COMMAND_DESCRIPTIONS.archive}
---`
};

export class IflowSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'iflow';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}