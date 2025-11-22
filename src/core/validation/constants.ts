/**
 * Validation threshold constants
 */

// Minimum character lengths
export const MIN_WHY_SECTION_LENGTH = 50;
export const MIN_PURPOSE_LENGTH = 50;

// Maximum character/item limits
export const MAX_WHY_SECTION_LENGTH = 1000;
export const MAX_REQUIREMENT_TEXT_LENGTH = 500;
export const MAX_DELTAS_PER_CHANGE = 10;

// Validation messages
export const VALIDATION_MESSAGES = {
  // Required content
  SCENARIO_EMPTY: '场景文本不能为空',
  REQUIREMENT_EMPTY: '需求文本不能为空',
  REQUIREMENT_NO_SHALL: '需求必须包含 SHALL 或 MUST 关键字',
  REQUIREMENT_NO_SCENARIOS: '需求必须至少有一个场景',
  SPEC_NAME_EMPTY: '规范名称不能为空',
  SPEC_PURPOSE_EMPTY: '目的部分不能为空',
  SPEC_NO_REQUIREMENTS: '规范必须至少有一个需求',
  CHANGE_NAME_EMPTY: '变更名称不能为空',
  CHANGE_WHY_TOO_SHORT: `Why 部分必须至少 ${MIN_WHY_SECTION_LENGTH} 个字符`,
  CHANGE_WHY_TOO_LONG: `Why 部分不应超过 ${MAX_WHY_SECTION_LENGTH} 个字符`,
  CHANGE_WHAT_EMPTY: 'What Changes 部分不能为空',
  CHANGE_NO_DELTAS: '变更必须至少有一个 delta',
  CHANGE_TOO_MANY_DELTAS: `考虑拆分超过 ${MAX_DELTAS_PER_CHANGE} 个 delta 的变更`,
  DELTA_SPEC_EMPTY: '规范名称不能为空',
  DELTA_DESCRIPTION_EMPTY: 'Delta 描述不能为空',

  // Warnings
  PURPOSE_TOO_BRIEF: `目的部分过于简短（少于 ${MIN_PURPOSE_LENGTH} 个字符）`,
  REQUIREMENT_TOO_LONG: `需求文本过长（>${MAX_REQUIREMENT_TEXT_LENGTH} 个字符）。考虑拆分。`,
  DELTA_DESCRIPTION_TOO_BRIEF: 'Delta 描述过于简短',
  DELTA_MISSING_REQUIREMENTS: 'Delta 应该包含需求',

  // Guidance snippets (appended to primary messages for remediation)
  GUIDE_NO_DELTAS:
    '未找到 delta。确保你的变更有一个 specs/ 目录，其中包含能力文件夹（例如 specs/http-server/spec.md），包含使用 delta 标题（## ADDED/MODIFIED/REMOVED/RENAMED Requirements）的 .md 文件，并且每个需求至少包含一个 "#### Scenario:" 块。提示：运行 "openspec change show <change-id> --json --deltas-only" 来检查解析的 delta。',
  GUIDE_MISSING_SPEC_SECTIONS:
    '缺少必需的部分。期望的标题："## Purpose" 和 "## Requirements"。示例：\n## Purpose\n[简要目的]\n\n## Requirements\n### Requirement: 清晰的需求陈述\n用户 SHALL ...\n\n#### Scenario: 描述性名称\n- **WHEN** ...\n- **THEN** ...',
  GUIDE_MISSING_CHANGE_SECTIONS:
    '缺少必需的部分。期望的标题："## Why" 和 "## What Changes"。确保在 specs/ 中使用 delta 标题记录 delta。',
  GUIDE_SCENARIO_FORMAT:
    '场景必须使用四级标题。将项目符号列表转换为：\n#### Scenario: 简短名称\n- **WHEN** ...\n- **THEN** ...\n- **AND** ...',
} as const;
