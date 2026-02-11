import { SlashCommandConfigurator, SLASH_COMMAND_DESCRIPTIONS } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.augment/commands/openspec-proposal.md',
  apply: '.augment/commands/openspec-apply.md',
  archive: '.augment/commands/openspec-archive.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
description: ${SLASH_COMMAND_DESCRIPTIONS.proposal}
argument-hint: feature description or request
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

export class AuggieSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'auggie';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}

