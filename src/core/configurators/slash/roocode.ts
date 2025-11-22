import { SlashCommandConfigurator, SLASH_COMMAND_DESCRIPTIONS } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const NEW_FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.roo/commands/openspec-proposal.md',
  apply: '.roo/commands/openspec-apply.md',
  archive: '.roo/commands/openspec-archive.md'
};

export class RooCodeSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'roocode';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return NEW_FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string | undefined {
    const description = SLASH_COMMAND_DESCRIPTIONS[id];
    return `# OpenSpec: ${id.charAt(0).toUpperCase() + id.slice(1)}

${description}`;
  }
}