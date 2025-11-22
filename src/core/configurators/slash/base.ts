import { FileSystemUtils } from '../../../utils/file-system.js';
import { TemplateManager, SlashCommandId } from '../../templates/index.js';
import { OPENSPEC_MARKERS } from '../../config.js';

export interface SlashCommandTarget {
  id: SlashCommandId;
  path: string;
  kind: 'slash';
}

const ALL_COMMANDS: SlashCommandId[] = ['proposal', 'apply', 'archive'];

export const SLASH_COMMAND_DESCRIPTIONS: Record<SlashCommandId, string> = {
  proposal: '\\u521b\\u5efa\\u65b0\\u7684 OpenSpec \\u53d8\\u66f4\\u5e76\\u8fdb\\u884c\\u4e25\\u683c\\u9a8c\\u8bc1',
  apply: '\\u5b9e\\u65bd\\u5df2\\u6279\\u51c6\\u7684 OpenSpec \\u53d8\\u66f4\\u5e76\\u4fdd\\u6301\\u4efb\\u52a1\\u540c\\u6b65',
  archive: '\\u5f52\\u6863\\u5df2\\u90e8\\u7f72\\u7684 OpenSpec \\u53d8\\u66f4\\u5e76\\u66f4\\u65b0\\u89c4\\u8303'
};

export abstract class SlashCommandConfigurator {
  abstract readonly toolId: string;
  abstract readonly isAvailable: boolean;

  getTargets(): SlashCommandTarget[] {
    return ALL_COMMANDS.map((id) => ({
      id,
      path: this.getRelativePath(id),
      kind: 'slash'
    }));
  }

  async generateAll(projectPath: string, _openspecDir: string): Promise<string[]> {
    const createdOrUpdated: string[] = [];

    for (const target of this.getTargets()) {
      const body = this.getBody(target.id);
      const filePath = FileSystemUtils.joinPath(projectPath, target.path);

      if (await FileSystemUtils.fileExists(filePath)) {
        await this.updateBody(filePath, body);
      } else {
        const frontmatter = this.getFrontmatter(target.id);
        const sections: string[] = [];
        if (frontmatter) {
          sections.push(frontmatter.trim());
        }
        sections.push(`${OPENSPEC_MARKERS.start}\n${body}\n${OPENSPEC_MARKERS.end}`);
        const content = sections.join('\n') + '\n';
        await FileSystemUtils.writeFile(filePath, content);
      }

      createdOrUpdated.push(target.path);
    }

    return createdOrUpdated;
  }

  async updateExisting(projectPath: string, _openspecDir: string): Promise<string[]> {
    const updated: string[] = [];

    for (const target of this.getTargets()) {
      const filePath = FileSystemUtils.joinPath(projectPath, target.path);
      if (await FileSystemUtils.fileExists(filePath)) {
        const body = this.getBody(target.id);
        await this.updateBody(filePath, body);
        updated.push(target.path);
      }
    }

    return updated;
  }

  protected abstract getRelativePath(id: SlashCommandId): string;
  protected abstract getFrontmatter(id: SlashCommandId): string | undefined;

  protected getBody(id: SlashCommandId): string {
    return TemplateManager.getSlashCommandBody(id).trim();
  }

  // Resolve absolute path for a given slash command target. Subclasses may override
  // to redirect to tool-specific locations (e.g., global directories).
  resolveAbsolutePath(projectPath: string, id: SlashCommandId): string {
    const rel = this.getRelativePath(id);
    return FileSystemUtils.joinPath(projectPath, rel);
  }

  protected async updateBody(filePath: string, body: string): Promise<void> {
    const content = await FileSystemUtils.readFile(filePath);
    const startIndex = content.indexOf(OPENSPEC_MARKERS.start);
    const endIndex = content.indexOf(OPENSPEC_MARKERS.end);

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      throw new Error(`Missing OpenSpec markers in ${filePath}`);
    }

    const before = content.slice(0, startIndex + OPENSPEC_MARKERS.start.length);
    const after = content.slice(endIndex);
    const updatedContent = `${before}\n${body}\n${after}`;

    await FileSystemUtils.writeFile(filePath, updatedContent);
  }
}
