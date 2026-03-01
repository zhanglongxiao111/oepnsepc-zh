# 多语言指南

配置 OpenSpec 以生成英语以外语言的工件。

## 快速设置

在你的 `openspec/config.yaml` 中添加语言指令：

```yaml
schema: spec-driven

context: |
  语言：中文（简体）
  所有产出物必须用简体中文撰写。

  # 下方添加其他项目上下文...
  技术栈：TypeScript、React、Node.js
```

就这样。现在所有生成的工件都将使用中文。

## 各语言示例

### 中文（简体）

```yaml
context: |
  语言：中文（简体）
  所有产出物必须用简体中文撰写。
```

### 葡萄牙语（巴西）

```yaml
context: |
  Language: Portuguese (pt-BR)
  All artifacts must be written in Brazilian Portuguese.
```

### 西班牙语

```yaml
context: |
  Idioma: Español
  Todos los artefactos deben escribirse en español.
```

### 日语

```yaml
context: |
  言語：日本語
  すべての成果物は日本語で作成してください。
```

### 法语

```yaml
context: |
  Langue : Français
  Tous les artefacts doivent être rédigés en français.
```

### 德语

```yaml
context: |
  Sprache: Deutsch
  Alle Artefakte müssen auf Deutsch verfasst werden.
```

## 使用技巧

### 处理技术术语

决定如何处理技术术语：

```yaml
context: |
  语言：中文（简体）
  用中文撰写，但：
  - 保留技术术语如 "API"、"REST"、"GraphQL" 的英文形式
  - 代码示例和文件路径保持英文
```

### 与其他上下文组合使用

语言设置与你的其他项目上下文协同工作：

```yaml
schema: spec-driven

context: |
  语言：中文（简体）
  所有产出物必须用简体中文撰写。

  技术栈：TypeScript、React 18、Node.js 20
  数据库：PostgreSQL + Prisma ORM
```

## 验证

验证你的语言配置是否生效：

```bash
# 检查指令 — 应该显示你的语言上下文
openspec instructions proposal --change my-change

# 输出会包含你的语言上下文
```

## 相关文档

- [自定义配置指南](./customization.md) - 项目配置选项
- [工作流指南](./workflows.md) - 完整工作流文档
