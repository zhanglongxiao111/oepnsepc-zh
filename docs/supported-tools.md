# 支持的工具

OpenSpec 支持 20+ 种 AI 编程助手。运行 `openspec init` 时，你会被提示选择使用的工具，OpenSpec 将配置相应的集成。

## 工作原理

对于你选择的每个工具，OpenSpec 会安装：

1. **Skills** — 驱动 `/opsx:*` 工作流命令的可复用指令文件
2. **Commands** — 特定工具的斜杠命令绑定

## 工具目录参考

| 工具 | Skills 位置 | Commands 位置 |
|------|------------|--------------|
| Amazon Q Developer | `.amazonq/skills/` | `.amazonq/prompts/` |
| Antigravity | `.agent/skills/` | `.agent/workflows/` |
| Auggie (Augment CLI) | `.augment/skills/` | `.augment/commands/` |
| Claude Code | `.claude/skills/` | `.claude/commands/opsx/` |
| Cline | `.cline/skills/` | `.clinerules/workflows/` |
| CodeBuddy | `.codebuddy/skills/` | `.codebuddy/commands/opsx/` |
| Codex | `.codex/skills/` | `~/.codex/prompts/`\* |
| Continue | `.continue/skills/` | `.continue/prompts/` |
| CoStrict | `.cospec/skills/` | `.cospec/openspec/commands/` |
| Crush | `.crush/skills/` | `.crush/commands/opsx/` |
| Cursor | `.cursor/skills/` | `.cursor/commands/` |
| Factory Droid | `.factory/skills/` | `.factory/commands/` |
| Gemini CLI | `.gemini/skills/` | `.gemini/commands/opsx/` |
| GitHub Copilot | `.github/skills/` | `.github/prompts/`\*\* |
| iFlow | `.iflow/skills/` | `.iflow/commands/` |
| Kilo Code | `.kilocode/skills/` | `.kilocode/workflows/` |
| OpenCode | `.opencode/skills/` | `.opencode/command/` |
| Qoder | `.qoder/skills/` | `.qoder/commands/opsx/` |
| Qwen Code | `.qwen/skills/` | `.qwen/commands/` |
| RooCode | `.roo/skills/` | `.roo/commands/` |
| Trae | `.trae/skills/` | `.trae/skills/`（通过 `/openspec-*`） |
| Windsurf | `.windsurf/skills/` | `.windsurf/workflows/` |

\* Codex 命令安装到全局主目录（`~/.codex/prompts/` 或 `$CODEX_HOME/prompts/`），而非项目目录。

\*\* GitHub Copilot 的 `.github/prompts/*.prompt.md` 文件仅在 **IDE 扩展**（VS Code、JetBrains、Visual Studio）中作为自定义斜杠命令被识别。GitHub Copilot CLI 目前不支持从此目录读取自定义 prompt — 详见 [github/copilot-cli#618](https://github.com/github/copilot-cli/issues/618)。如果你使用 Copilot CLI，可能需要在 `.github/agents/` 中手动设置[自定义 Agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents) 作为变通方案。

## 非交互式设置

用于 CI/CD 或脚本化设置，使用 `--tools` 参数：

```bash
# 配置特定工具
openspec init --tools claude,cursor

# 配置所有支持的工具
openspec init --tools all

# 跳过工具配置
openspec init --tools none
```

**可用的工具 ID：** `amazon-q`、`antigravity`、`auggie`、`claude`、`cline`、`codebuddy`、`codex`、`continue`、`costrict`、`crush`、`cursor`、`factory`、`gemini`、`github-copilot`、`iflow`、`kilocode`、`opencode`、`qoder`、`qwen`、`roocode`、`trae`、`windsurf`

## 安装的内容

对于每个工具，OpenSpec 生成 10 个支持 OPSX 工作流的 skill 文件：

| Skill | 用途 |
|-------|------|
| `openspec-explore` | 用于探索想法的思考伙伴 |
| `openspec-new-change` | 启动新变更 |
| `openspec-continue-change` | 创建下一个工件 |
| `openspec-ff-change` | 快速完成所有规划工件 |
| `openspec-apply-change` | 实施任务 |
| `openspec-verify-change` | 验证实施完整性 |
| `openspec-sync-specs` | 同步差异规范到主规范（可选 — 归档时按需提示） |
| `openspec-archive-change` | 归档已完成的变更 |
| `openspec-bulk-archive-change` | 批量归档多个变更 |
| `openspec-onboard` | 引导式完整工作流教程 |

这些 skills 通过斜杠命令调用，如 `/opsx:new`、`/opsx:apply` 等。详见[命令](commands.md)获取完整列表。

## 添加新工具

想为其他 AI 编程助手添加支持？查看[命令适配器模式](../CONTRIBUTING.md)或在 GitHub 上提 Issue。

---

## 相关文档

- [CLI 参考](cli.md) — 终端命令
- [命令](commands.md) — 斜杠命令和 skills
- [快速入门](getting-started.md) — 初次设置
