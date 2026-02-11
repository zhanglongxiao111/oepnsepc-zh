import { SlashCommandConfigurator, SLASH_COMMAND_DESCRIPTIONS } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.factory/commands/openspec-proposal.md',
  apply: '.factory/commands/openspec-apply.md',
  archive: '.factory/commands/openspec-archive.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
description: ${SLASH_COMMAND_DESCRIPTIONS.proposal}
argument-hint: request or feature description
---`,
  apply: `---
description: ${SLASH_COMMAND_DESCRIPTIONS.apply}
argument-hint: change-id
---`,
  archive: `---
description: ${SLASH_COMMAND_DESCRIPTIONS.archive}
argument-hint: change-id
---`
};

export class FactorySlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'factory';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }

  protected getBody(id: SlashCommandId): string {
    const baseBody = super.getBody(id);
    return `${baseBody}\n\n$ARGUMENTS`;
  }
}
