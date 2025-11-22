import { SlashCommandConfigurator, SLASH_COMMAND_DESCRIPTIONS } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS = {
  proposal: '.cospec/openspec/commands/openspec-proposal.md',
  apply: '.cospec/openspec/commands/openspec-apply.md',
  archive: '.cospec/openspec/commands/openspec-archive.md',
} as const satisfies Record<SlashCommandId, string>;

const FRONTMATTER = {
  proposal: `---
description: "${SLASH_COMMAND_DESCRIPTIONS.proposal}"
argument-hint: feature description or request
---`,
  apply: `---
description: "${SLASH_COMMAND_DESCRIPTIONS.apply}"
argument-hint: change-id
---`,
  archive: `---
description: "${SLASH_COMMAND_DESCRIPTIONS.archive}"
argument-hint: change-id
---`
} as const satisfies Record<SlashCommandId, string>;

export class CostrictSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'costrict';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string | undefined {
    return FRONTMATTER[id];
  }
}