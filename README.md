<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec">
    <picture>
      <source srcset="assets/openspec_bg.png">
      <img src="assets/openspec_bg.png" alt="OpenSpec logo">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@fission-ai/openspec"><img alt="npm version" src="https://img.shields.io/npm/v/@fission-ai/openspec?style=flat-square" /></a>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" /></a>
  <a href="https://discord.gg/YctCnvvshC"><img alt="Discord" src="https://img.shields.io/discord/1411657095639601154?style=flat-square&logo=discord&logoColor=white&label=Discord&suffix=%20online" /></a>
</p>

<details>
<summary><strong>最受欢迎的规范框架。</strong></summary>

[![Stars](https://img.shields.io/github/stars/Fission-AI/OpenSpec?style=flat-square&label=Stars)](https://github.com/Fission-AI/OpenSpec/stargazers)
[![Downloads](https://img.shields.io/npm/dm/@fission-ai/openspec?style=flat-square&label=Downloads/mo)](https://www.npmjs.com/package/@fission-ai/openspec)
[![Contributors](https://img.shields.io/github/contributors/Fission-AI/OpenSpec?style=flat-square&label=Contributors)](https://github.com/Fission-AI/OpenSpec/graphs/contributors)

</details>
<p></p>
我们的理念：

```text
→ 流动而非僵化
→ 迭代而非瀑布
→ 简单而非复杂
→ 面向存量项目，而不仅仅是新项目
→ 从个人项目到企业级，可自由扩展
```

> [!TIP]
> **全新工作流现已上线！** 我们用全新的工件引导式工作流重构了 OpenSpec。
>
> 运行 `/opsx:onboard` 即可开始体验。→ [了解更多](docs/opsx.md)

<p align="center">
  关注 <a href="https://x.com/0xTab">@0xTab on X</a> 获取最新动态 · 加入 <a href="https://discord.gg/YctCnvvshC">OpenSpec Discord</a> 获取帮助和交流。
</p>

### 团队使用

在团队中使用 OpenSpec？[发送邮件](mailto:teams@openspec.dev)以获取 Slack 频道访问权限。

<!-- TODO: Add GIF demo of /opsx:new → /opsx:archive workflow -->

## 使用演示

```text
You: /opsx:new add-dark-mode
AI:  Created openspec/changes/add-dark-mode/
     Ready to create: proposal

You: /opsx:ff   # "快进" - 一次性生成所有规划文档
AI:  ✓ proposal.md — 为什么要做，要改什么
     ✓ specs/       — 需求与场景
     ✓ design.md    — 技术方案
     ✓ tasks.md     — 实施清单
     Ready for implementation!

You: /opsx:apply
AI:  Implementing tasks...
     ✓ 1.1 Add theme context provider
     ✓ 1.2 Create toggle component
     ✓ 2.1 Add CSS variables
     ✓ 2.2 Wire up localStorage
     All tasks complete!

You: /opsx:archive
AI:  Archived to openspec/changes/archive/2025-01-23-add-dark-mode/
     Specs updated. Ready for the next feature.
```

<details>
<summary><strong>OpenSpec 仪表板</strong></summary>

<p align="center">
  <img src="assets/openspec_dashboard.png" alt="OpenSpec 仪表板预览" width="90%">
</p>

</details>

## 快速开始

**需要 Node.js 20.19.0 或更高版本。**

全局安装 OpenSpec：

```bash
npm install -g @fission-ai/openspec@latest
```

然后进入你的项目目录并初始化：

```bash
cd your-project
openspec init
```

现在告诉你的 AI：`/opsx:new <你想构建的内容>`

> [!NOTE]
> 不确定你的工具是否受支持？[查看完整列表](docs/supported-tools.md) — 我们已支持 20+ 种工具且持续增长中。
>
> 同样支持 pnpm、yarn、bun 和 nix。[查看安装选项](docs/installation.md)。

## 文档

→ **[快速入门](docs/getting-started.md)**：起步指南<br>
→ **[工作流](docs/workflows.md)**：组合与模式<br>
→ **[命令](docs/commands.md)**：斜杠命令与技能<br>
→ **[CLI](docs/cli.md)**：终端命令参考<br>
→ **[支持的工具](docs/supported-tools.md)**：工具集成与安装路径<br>
→ **[核心概念](docs/concepts.md)**：整体架构<br>
→ **[多语言](docs/multi-language.md)**：多语言支持<br>
→ **[自定义配置](docs/customization.md)**：按需定制

## 为什么选择 OpenSpec？

当需求仅存在于聊天记录中时，AI 编程助手虽然强大但难以预测。OpenSpec 添加了一个轻量级的规范层，让你在编写代码之前就与 AI 达成共识。

- **先达成共识再开发** — 人类和 AI 在编码之前对齐规范
- **保持有序** — 每个变更（Change）都有独立文件夹，包含提案、规范、设计和任务
- **灵活工作** — 随时更新任何工件，没有僵化的阶段门禁
- **使用你的工具** — 通过斜杠命令支持 20+ 种 AI 助手

### 横向对比

**vs. [Spec Kit](https://github.com/github/spec-kit)**（GitHub）— 全面但笨重。有僵化的阶段门禁，大量 Markdown，需要 Python 环境。OpenSpec 更轻量，支持自由迭代。

**vs. [Kiro](https://kiro.dev)**（AWS）— 功能强大但绑定了特定 IDE，且仅限 Claude 模型。OpenSpec 可与你已有的工具配合使用。

**vs. 没有规范** — 没有规范的 AI 编程意味着模糊的提示和不可预测的结果。OpenSpec 在不增加繁琐流程的前提下带来确定性。

## 更新 OpenSpec

**升级安装包**

```bash
npm install -g @fission-ai/openspec@latest
```

**刷新 Agent 指令**

在每个项目内运行此命令，以重新生成 AI 指导文件并确保最新的斜杠命令生效：

```bash
openspec update
```

## 使用须知

**模型选择**：OpenSpec 配合高推理能力的模型效果最佳。我们推荐使用 Opus 4.5 和 GPT 5.2 进行规划和实施。

**上下文清洁**：OpenSpec 在干净的上下文窗口中效果更好。在开始实施前清除上下文，并在整个会话中保持良好的上下文管理习惯。

## 参与贡献

**小型修复** — Bug 修复、拼写纠正和小幅改进可以直接提交 PR。

**大型变更** — 对于新功能、重大重构或架构变更，请先提交 OpenSpec 变更提案，以便我们在实施前对齐意图和目标。

在编写提案时，请牢记 OpenSpec 的理念：我们服务于使用不同编程 Agent、模型和用例的广泛用户群体。变更应该对所有人都适用。

**欢迎 AI 生成的代码** — 只要经过测试和验证即可。包含 AI 生成代码的 PR 应注明所使用的编程 Agent 和模型（例如 "Generated with Claude Code using claude-opus-4-5-20251101"）。

### 开发

- 安装依赖：`pnpm install`
- 构建：`pnpm run build`
- 测试：`pnpm test`
- 本地开发 CLI：`pnpm run dev` 或 `pnpm run dev:cli`
- 约定式提交（单行）：`type(scope): subject`

## 其他

<details>
<summary><strong>遥测数据</strong></summary>

OpenSpec 会收集匿名使用统计数据。

我们仅收集命令名称和版本号，以了解使用模式。不收集参数、路径、内容或个人身份信息。在 CI 环境中自动禁用。

**退出方式：** `export OPENSPEC_TELEMETRY=0` 或 `export DO_NOT_TRACK=1`

</details>

<details>
<summary><strong>维护者与顾问</strong></summary>

查看 [MAINTAINERS.md](MAINTAINERS.md) 获取核心维护者和帮助指导项目的顾问名单。

</details>



## 许可证

MIT
