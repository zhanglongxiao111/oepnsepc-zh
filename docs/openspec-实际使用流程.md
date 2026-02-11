# OpenSpec 实际使用流程指南

## 概述

本指南将详细说明如何在一个已有项目上使用 OpenSpec，从初始化到完成一个完整的功能开发周期。

---

## 前提条件

### 1. 环境要求
- ✅ Node.js >= 20.19.0
- ✅ 已安装 OpenSpec 汉化版（见下方安装步骤）
- ✅ 使用支持的 AI 工具（如 Auggie、Claude Code、Cursor、Codex 等）

### 2. 安装 OpenSpec 汉化版

⚠️ **重要**：不要使用 `npm install -g @fission-ai/openspec`，那样会安装英文原版！

**推荐方式：本地构建并全局链接**

```bash
# 1. 进入 OpenSpec 汉化版目录
cd d:\AI\openspec

# 2. 安装依赖并构建
pnpm install
pnpm build

# 3. 全局链接
npm link

# 4. 验证安装
openspec --version
openspec --help  # 应该看到中文帮助
```

详细安装说明请参考：📄 `docs/本地安装汉化版指南.md`

### 3. 验证安装
```bash
node --version        # 检查 Node.js 版本
openspec --version    # 检查 OpenSpec 版本
openspec --help       # 应该看到中文帮助信息
```

---

## 完整操作流程

### 阶段 0：初始化项目

#### 步骤 1：进入项目目录
```bash
cd /path/to/your/project
```

#### 步骤 2：初始化 OpenSpec
```bash
openspec init
```

**交互式选择**：
1. 选择你使用的 AI 工具（可多选）
   - 例如：Auggie、Claude Code、Cursor、Codex 等
   - 使用空格键选择，回车确认

2. 系统会自动：
   - 创建 `openspec/` 目录结构
   - 生成 `openspec/project.md`（项目上下文）
   - 生成 `openspec/AGENTS.md`（AI 工作流指令）
   - 为选择的工具生成配置文件（如 `.augment/commands/`）
   - 在项目根目录生成 `AGENTS.md`（引导 AI 使用 OpenSpec）

**生成的目录结构**：
```
your-project/
├── AGENTS.md                    # 引导 AI 使用 OpenSpec
├── openspec/
│   ├── project.md               # 项目上下文（需要填写）
│   ├── AGENTS.md                # AI 工作流指令
│   ├── specs/                   # 当前规范（真相源）
│   └── changes/                 # 变更提案
│       └── archive/             # 已归档的变更
└── .augment/                    # AI 工具配置（根据选择生成）
    └── commands/
        ├── openspec-proposal.md
        ├── openspec-apply.md
        └── openspec-archive.md
```

#### 步骤 3：填写项目上下文
```bash
# 在 AI 工具中执行
"请阅读 openspec/project.md 并帮我填写项目的技术栈、架构、约定等信息"
```

**project.md 应包含**：
- 项目简介
- 技术栈（语言、框架、数据库等）
- 架构模式
- 编码规范
- 测试策略
- 部署流程

#### 步骤 4：验证初始化
```bash
openspec list          # 应该显示"未找到活跃的变更"
openspec list --specs  # 应该显示"未找到规范"（新项目）
```

---

### 阶段 1：创建变更提案

#### 场景：添加新功能

假设你要添加"用户个人资料搜索过滤器"功能。

#### 步骤 1：与 AI 沟通需求

**方式 A：使用 Slash 命令**（支持的工具）
```
/openspec-proposal 添加用户个人资料搜索过滤器，支持按角色和团队筛选
```

**方式 B：自然语言**（所有工具）
```
请帮我创建一个 OpenSpec 变更提案，添加用户个人资料搜索过滤器功能，
需要支持按角色和团队进行筛选。
```

#### 步骤 2：AI 自动生成提案

AI 会：
1. 查看 `openspec/project.md` 了解项目上下文
2. 运行 `openspec list` 和 `openspec list --specs` 检查现有规范
3. 选择唯一的 `change-id`（如 `add-profile-filters`）
4. 创建变更目录结构：

```
openspec/changes/add-profile-filters/
├── proposal.md          # 提案说明（为什么、是什么、影响）
├── tasks.md             # 实施任务清单
├── design.md            # 技术设计（可选，复杂变更需要）
└── specs/               # 规范 Delta
    └── profile/         # 能力名称
        └── spec.md      # 规范变更（ADDED/MODIFIED/REMOVED）
```

#### 步骤 3：验证提案

```bash
# 列出所有变更
openspec list

# 查看变更详情
openspec show add-profile-filters

# 严格验证
openspec validate add-profile-filters --strict
```

**验证内容**：
- ✅ 提案格式正确
- ✅ 每个需求至少有一个场景
- ✅ 使用了正确的 Delta 标记（ADDED/MODIFIED/REMOVED）
- ✅ 任务清单结构合理

#### 步骤 4：审查和完善提案

**如果需要修改**：
```
AI，请在 add-profile-filters 提案中添加以下内容：
1. 角色过滤器需要支持多选
2. 团队过滤器需要支持层级结构
3. 添加性能测试任务
```

AI 会：
1. 更新 `specs/profile/spec.md` 添加新的场景
2. 更新 `tasks.md` 添加新的任务
3. 可能更新 `design.md` 说明技术决策

**再次验证**：
```bash
openspec validate add-profile-filters --strict
```

#### 步骤 5：批准提案

**人工审查**：
1. 阅读 `proposal.md` - 确认变更意图
2. 阅读 `design.md` - 确认技术方案
3. 阅读 `specs/profile/spec.md` - 确认需求和场景
4. 阅读 `tasks.md` - 确认实施步骤

**批准**：
```
提案看起来不错，我们可以开始实施了。
```

---

### 阶段 2：实施变更

#### 步骤 1：启动实施

**方式 A：使用 Slash 命令**
```
/openspec-apply add-profile-filters
```

**方式 B：自然语言**
```
请开始实施 add-profile-filters 变更。
```

#### 步骤 2：AI 按任务清单实施

AI 会：
1. 阅读 `proposal.md` 理解目标
2. 阅读 `design.md` 了解技术决策
3. 阅读 `tasks.md` 获取任务清单
4. **按顺序**完成每个任务

**实施过程示例**：
```
AI: 我将开始实施 add-profile-filters 变更。

任务 1.1：添加数据库迁移
✓ 创建 migrations/add_profile_filters.sql
✓ 添加 role_filter 和 team_filter 字段

任务 1.2：更新 API 端点
✓ 修改 /api/profiles/search 接受新参数
✓ 添加参数验证

任务 2.1：实现过滤逻辑
✓ 创建 ProfileFilterService
✓ 实现角色过滤
✓ 实现团队过滤

任务 3.1：添加前端组件
✓ 创建 RoleFilter 组件
✓ 创建 TeamFilter 组件
✓ 集成到搜索页面

任务 4.1：编写测试
✓ 单元测试
✓ 集成测试
✓ E2E 测试

所有任务已完成！
```

#### 步骤 3：AI 更新任务清单

AI 会自动更新 `tasks.md`，将完成的任务标记为 `[x]`：

```markdown
## 1. 数据库更新
- [x] 1.1 添加数据库迁移
- [x] 1.2 更新 API 端点

## 2. 后端实现
- [x] 2.1 实现过滤逻辑
- [x] 2.2 添加参数验证

## 3. 前端实现
- [x] 3.1 添加前端组件
- [x] 3.2 集成到搜索页面

## 4. 测试
- [x] 4.1 编写单元测试
- [x] 4.2 编写集成测试
- [x] 4.3 编写 E2E 测试
```

#### 步骤 4：验证实施

```bash
# 运行测试
npm test

# 本地验证功能
npm run dev
```

**人工测试**：
1. 打开应用
2. 测试角色过滤器
3. 测试团队过滤器
4. 测试多选和层级结构

---

### 阶段 3：归档变更

#### 步骤 1：确认部署

```bash
# 提交代码
git add .
git commit -m "feat: add profile search filters"
git push

# 部署到生产环境
# （根据你的部署流程）
```

#### 步骤 2：归档变更

**方式 A：使用 Slash 命令**
```
/openspec-archive add-profile-filters
```

**方式 B：自然语言**
```
请归档 add-profile-filters 变更。
```

**方式 C：手动命令**
```bash
openspec archive add-profile-filters --yes
```

#### 步骤 3：系统自动处理

归档命令会：
1. ✅ 检查任务是否全部完成
2. ✅ 将规范 Delta 合并到主规范
   - 从 `changes/add-profile-filters/specs/profile/spec.md`
   - 合并到 `specs/profile/spec.md`
3. ✅ 移动变更到归档目录
   - 从 `changes/add-profile-filters/`
   - 移动到 `changes/archive/2025-11-01-add-profile-filters/`

**输出示例**：
```
✓ 变更 'add-profile-filters' 有效
✓ 所有任务已完成

规范更新摘要：
  新建规范：
    - specs/profile/spec.md

✓ 规范已更新
✓ 变更已归档到 changes/archive/2025-11-01-add-profile-filters/

归档成功！
```

#### 步骤 4：验证归档

```bash
# 确认变更已归档
openspec list
# 输出：未找到活跃的变更

# 查看主规范
openspec list --specs
# 输出：
# specs/profile/spec.md

# 查看规范内容
openspec show profile --type spec
```

---

## 常用命令速查

### 查看命令

```bash
# 列出所有活跃变更
openspec list

# 列出所有规范
openspec list --specs

# 查看特定变更
openspec show <change-id>

# 查看特定规范
openspec show <spec-name> --type spec

# 交互式选择查看
openspec show
```

### 验证命令

```bash
# 验证特定变更
openspec validate <change-id>

# 严格验证
openspec validate <change-id> --strict

# 批量验证所有变更
openspec validate --changes

# 交互式验证
openspec validate
```

### 归档命令

```bash
# 交互式归档
openspec archive

# 直接归档（需要确认）
openspec archive <change-id>

# 非交互式归档
openspec archive <change-id> --yes

# 跳过规范更新（仅工具/文档变更）
openspec archive <change-id> --skip-specs --yes
```

### 管理命令

```bash
# 初始化项目
openspec init

# 更新 AI 指令（切换工具或升级后）
openspec update

# 查看帮助
openspec --help
openspec <command> --help
```

---

## 实际工作流程图

```
┌─────────────────────────────────────────────────────────────┐
│ 阶段 0：初始化                                               │
├─────────────────────────────────────────────────────────────┤
│ 1. cd your-project                                          │
│ 2. openspec init                                            │
│ 3. 填写 openspec/project.md                                 │
│ 4. openspec list（验证）                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 阶段 1：创建提案                                             │
├─────────────────────────────────────────────────────────────┤
│ 1. /openspec-proposal <描述>                                │
│    或："请创建 OpenSpec 提案..."                             │
│ 2. AI 生成 proposal.md, tasks.md, specs/                   │
│ 3. openspec validate <change-id> --strict                  │
│ 4. 审查并完善提案                                            │
│ 5. 批准提案                                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 阶段 2：实施变更                                             │
├─────────────────────────────────────────────────────────────┤
│ 1. /openspec-apply <change-id>                             │
│    或："请实施 <change-id> 变更"                             │
│ 2. AI 按 tasks.md 顺序实施                                  │
│ 3. AI 更新 tasks.md 标记完成                                │
│ 4. 运行测试验证                                              │
│ 5. 人工测试功能                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 阶段 3：归档变更                                             │
├─────────────────────────────────────────────────────────────┤
│ 1. git commit & push                                        │
│ 2. 部署到生产环境                                            │
│ 3. /openspec-archive <change-id>                           │
│    或：openspec archive <change-id> --yes                  │
│ 4. 系统合并规范并归档                                        │
│ 5. openspec list（确认归档）                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    回到阶段 1（下一个功能）
```

---

## 最佳实践

### 1. 提案阶段
- ✅ 提案要清晰描述"为什么"和"是什么"
- ✅ 每个需求至少有一个具体场景
- ✅ 复杂变更要写 design.md 说明技术决策
- ✅ 使用 `--strict` 验证确保格式正确

### 2. 实施阶段
- ✅ 严格按照 tasks.md 顺序实施
- ✅ 每完成一个任务就标记为完成
- ✅ 保持编辑最小化，专注于提案范围
- ✅ 实施前确保提案已批准

### 3. 归档阶段
- ✅ 确保所有任务已完成
- ✅ 确保代码已部署到生产环境
- ✅ 使用 `--yes` 标志进行非交互式归档
- ✅ 归档后验证规范已正确更新

### 4. 项目管理
- ✅ 定期更新 `openspec/project.md`
- ✅ 切换 AI 工具后运行 `openspec update`
- ✅ 升级 OpenSpec 后运行 `openspec update`
- ✅ 使用 `openspec list --specs` 查看系统文档

---

## 常见问题

### Q1: 什么时候需要创建提案？
**需要创建提案**：
- ✅ 添加新功能
- ✅ 破坏性变更（API、数据库模式）
- ✅ 架构变更
- ✅ 性能优化（改变行为）
- ✅ 安全模式更新

**不需要创建提案**：
- ❌ Bug 修复（恢复预期行为）
- ❌ 拼写错误、格式化、注释
- ❌ 依赖更新（非破坏性）
- ❌ 配置更改
- ❌ 现有行为的测试

### Q2: 如何处理跨多个规范的变更？
在 `changes/<change-id>/specs/` 下创建多个能力目录：
```
changes/add-payment-flow/
└── specs/
    ├── payment/
    │   └── spec.md
    ├── order/
    │   └── spec.md
    └── notification/
        └── spec.md
```

### Q3: 如何更新已有规范？
使用 `MODIFIED` 标记：
```markdown
## MODIFIED Requirements
### Requirement: User Authentication
系统必须支持双因素认证。

#### Scenario: 2FA 登录
- WHEN 用户提交有效凭证
- THEN 要求输入 OTP
```

### Q4: 归档后发现问题怎么办？
创建新的变更提案修复问题：
```
/openspec-proposal 修复个人资料过滤器的性能问题
```

---

## 总结

OpenSpec 的核心价值在于：
1. **规范先行**：在写代码前就明确要做什么
2. **人机对齐**：人和 AI 对需求达成一致
3. **可追溯性**：每个变更都有完整的文档
4. **渐进式**：从小功能开始，逐步积累规范

现在你可以在自己的项目中开始使用 OpenSpec 了！🎉

