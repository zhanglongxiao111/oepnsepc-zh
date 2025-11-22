import { SlashCommandConfigurator, SLASH_COMMAND_DESCRIPTIONS } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.github/prompts/openspec-proposal.prompt.md',
  apply: '.github/prompts/openspec-apply.prompt.md',
  archive: '.github/prompts/openspec-archive.prompt.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
description: ${SLASH_COMMAND_DESCRIPTIONS.proposal}
---

$ARGUMENTS`,
  apply: `---
description: ${SLASH_COMMAND_DESCRIPTIONS.apply}
---

$ARGUMENTS`,
  archive: `---
description: ${SLASH_COMMAND_DESCRIPTIONS.archive}
---

$ARGUMENTS`
};

export class GitHubCopilotSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'github-copilot';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}
