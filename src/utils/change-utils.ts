import path from 'path';
import { FileSystemUtils } from './file-system.js';

/**
 * Result of validating a change name.
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates that a change name follows kebab-case conventions.
 *
 * Valid names:
 * - Start with a lowercase letter
 * - Contain only lowercase letters, numbers, and hyphens
 * - Do not start or end with a hyphen
 * - Do not contain consecutive hyphens
 *
 * @param name - The change name to validate
 * @returns Validation result with `valid: true` or `valid: false` with an error message
 *
 * @example
 * validateChangeName('add-auth') // { valid: true }
 * validateChangeName('Add-Auth') // { valid: false, error: '...' }
 */
export function validateChangeName(name: string): ValidationResult {
  // Pattern: starts with lowercase letter, followed by lowercase letters/numbers,
  // optionally followed by hyphen + lowercase letters/numbers (repeatable)
  const kebabCasePattern = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

  if (!name) {
    return { valid: false, error: '变更名称不能为空' };
  }

  if (!kebabCasePattern.test(name)) {
    // Provide specific error messages for common mistakes
    if (/[A-Z]/.test(name)) {
      return { valid: false, error: '变更名称必须为小写（使用 kebab-case）' };
    }
    if (/\s/.test(name)) {
      return { valid: false, error: '变更名称不能包含空格（使用连字符代替）' };
    }
    if (/_/.test(name)) {
      return { valid: false, error: '变更名称不能包含下划线（使用连字符代替）' };
    }
    if (name.startsWith('-')) {
      return { valid: false, error: '变更名称不能以连字符开头' };
    }
    if (name.endsWith('-')) {
      return { valid: false, error: '变更名称不能以连字符结尾' };
    }
    if (/--/.test(name)) {
      return { valid: false, error: '变更名称不能包含连续的连字符' };
    }
    if (/[^a-z0-9-]/.test(name)) {
      return { valid: false, error: '变更名称只能包含小写字母、数字和连字符' };
    }
    if (/^[0-9]/.test(name)) {
      return { valid: false, error: '变更名称必须以字母开头' };
    }

    return { valid: false, error: '变更名称必须遵循 kebab-case 规范（例如 add-auth、refactor-db）' };
  }

  return { valid: true };
}

/**
 * Creates a new change directory.
 *
 * @param projectRoot - The root directory of the project (where `openspec/` lives)
 * @param name - The change name (must be valid kebab-case)
 * @throws Error if the change name is invalid
 * @throws Error if the change directory already exists
 *
 * @example
 * // Creates openspec/changes/add-auth/
 * await createChange('/path/to/project', 'add-auth')
 */
export async function createChange(
  projectRoot: string,
  name: string
): Promise<void> {
  // Validate the name first
  const validation = validateChangeName(name);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Build the change directory path
  const changeDir = path.join(projectRoot, 'openspec', 'changes', name);

  // Check if change already exists
  if (await FileSystemUtils.directoryExists(changeDir)) {
    throw new Error(`变更 '${name}' 已存在于 ${changeDir}`);
  }

  // Create the directory (including parent directories if needed)
  await FileSystemUtils.createDirectory(changeDir);
}
