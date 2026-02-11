import { TomlSlashCommandConfigurator } from './toml-base.js';
import { SlashCommandId } from '../../templates/index.js';
import { SLASH_COMMAND_DESCRIPTIONS } from './base.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.gemini/commands/openspec/proposal.toml',
  apply: '.gemini/commands/openspec/apply.toml',
  archive: '.gemini/commands/openspec/archive.toml'
};

export class GeminiSlashCommandConfigurator extends TomlSlashCommandConfigurator {
  readonly toolId = 'gemini';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getDescription(id: SlashCommandId): string {
    return SLASH_COMMAND_DESCRIPTIONS[id];
  }
}