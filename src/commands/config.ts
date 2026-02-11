import { Command } from 'commander';
import { spawn } from 'node:child_process';
import * as fs from 'node:fs';
import {
  getGlobalConfigPath,
  getGlobalConfig,
  saveGlobalConfig,
  GlobalConfig,
} from '../core/global-config.js';
import {
  getNestedValue,
  setNestedValue,
  deleteNestedValue,
  coerceValue,
  formatValueYaml,
  validateConfigKeyPath,
  validateConfig,
  DEFAULT_CONFIG,
} from '../core/config-schema.js';

/**
 * Register the config command and all its subcommands.
 *
 * @param program - The Commander program instance
 */
export function registerConfigCommand(program: Command): void {
  const configCmd = program
    .command('config')
    .description('查看和修改 OpenSpec 全局配置')
<<<<<<< HEAD
    .option('--scope <scope>', '配置作用域（目前仅支持 "global"）')
=======
    .option('--scope <scope>', '配置范围（目前仅支持 "global"）')
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
    .hook('preAction', (thisCommand) => {
      const opts = thisCommand.opts();
      if (opts.scope && opts.scope !== 'global') {
        console.error('错误：项目本地配置尚未实现');
        process.exit(1);
      }
    });

  // config path
  configCmd
    .command('path')
    .description('显示配置文件位置')
    .action(() => {
      console.log(getGlobalConfigPath());
    });

  // config list
  configCmd
    .command('list')
    .description('显示所有当前设置')
    .option('--json', '以 JSON 格式输出')
    .action((options: { json?: boolean }) => {
      const config = getGlobalConfig();

      if (options.json) {
        console.log(JSON.stringify(config, null, 2));
      } else {
        console.log(formatValueYaml(config));
      }
    });

  // config get
  configCmd
    .command('get <key>')
<<<<<<< HEAD
    .description('获取特定值（原始值，可用于脚本）')
=======
    .description('获取特定配置值（原始格式，可用于脚本）')
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
    .action((key: string) => {
      const config = getGlobalConfig();
      const value = getNestedValue(config as Record<string, unknown>, key);

      if (value === undefined) {
        process.exitCode = 1;
        return;
      }

      if (typeof value === 'object' && value !== null) {
        console.log(JSON.stringify(value));
      } else {
        console.log(String(value));
      }
    });

  // config set
  configCmd
    .command('set <key> <value>')
<<<<<<< HEAD
    .description('设置一个值（自动转换类型）')
    .option('--string', '强制以字符串格式存储值')
    .option('--allow-unknown', '允许设置未知的键')
=======
    .description('设置配置值（自动类型转换）')
    .option('--string', '强制将值存储为字符串')
    .option('--allow-unknown', '允许设置未知的配置项')
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
    .action((key: string, value: string, options: { string?: boolean; allowUnknown?: boolean }) => {
      const allowUnknown = Boolean(options.allowUnknown);
      const keyValidation = validateConfigKeyPath(key);
      if (!keyValidation.valid && !allowUnknown) {
<<<<<<< HEAD
        const reason = keyValidation.reason ? ` ${keyValidation.reason}.` : '';
        console.error(`错误：无效的配置键 "${key}"。${reason}`);
        console.error('使用 "openspec config list" 查看可用的键。');
=======
        const reason = keyValidation.reason ? ` ${keyValidation.reason}。` : '';
        console.error(`错误：无效的配置项 "${key}"。${reason}`);
        console.error('使用 "openspec config list" 查看可用的配置项。');
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
        console.error('使用 --allow-unknown 跳过此检查。');
        process.exitCode = 1;
        return;
      }

      const config = getGlobalConfig() as Record<string, unknown>;
      const coercedValue = coerceValue(value, options.string || false);

      // Create a copy to validate before saving
      const newConfig = JSON.parse(JSON.stringify(config));
      setNestedValue(newConfig, key, coercedValue);

      // Validate the new config
      const validation = validateConfig(newConfig);
      if (!validation.success) {
        console.error(`错误：无效的配置 - ${validation.error}`);
        process.exitCode = 1;
        return;
      }

      // Apply changes and save
      setNestedValue(config, key, coercedValue);
      saveGlobalConfig(config as GlobalConfig);

      const displayValue =
        typeof coercedValue === 'string' ? `"${coercedValue}"` : String(coercedValue);
      console.log(`已设置 ${key} = ${displayValue}`);
    });

  // config unset
  configCmd
    .command('unset <key>')
<<<<<<< HEAD
    .description('删除一个键（恢复为默认值）')
=======
    .description('移除配置项（恢复为默认值）')
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
    .action((key: string) => {
      const config = getGlobalConfig() as Record<string, unknown>;
      const existed = deleteNestedValue(config, key);

      if (existed) {
        saveGlobalConfig(config as GlobalConfig);
        console.log(`已取消设置 ${key}（已恢复为默认值）`);
      } else {
<<<<<<< HEAD
        console.log(`键 "${key}" 未被设置`);
=======
        console.log(`配置项 "${key}" 未设置`);
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
      }
    });

  // config reset
  configCmd
    .command('reset')
<<<<<<< HEAD
    .description('将配置重置为默认值')
    .option('--all', '重置所有配置（必须）')
=======
    .description('重置配置为默认值')
    .option('--all', '重置所有配置（必需）')
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
    .option('-y, --yes', '跳过确认提示')
    .action(async (options: { all?: boolean; yes?: boolean }) => {
      if (!options.all) {
        console.error('错误：重置操作需要 --all 标志');
        console.error('用法：openspec config reset --all [-y]');
        process.exitCode = 1;
        return;
      }

      if (!options.yes) {
        const { confirm } = await import('@inquirer/prompts');
        const confirmed = await confirm({
<<<<<<< HEAD
          message: '确定将所有配置重置为默认值？',
=======
          message: '是否将所有配置重置为默认值？',
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
          default: false,
        });

        if (!confirmed) {
          console.log('重置已取消。');
          return;
        }
      }

      saveGlobalConfig({ ...DEFAULT_CONFIG });
      console.log('配置已重置为默认值');
    });

  // config edit
  configCmd
    .command('edit')
<<<<<<< HEAD
    .description('在 $EDITOR 中打开配置文件')
=======
    .description('使用 $EDITOR 打开配置文件')
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
    .action(async () => {
      const editor = process.env.EDITOR || process.env.VISUAL;

      if (!editor) {
        console.error('错误：未配置编辑器');
<<<<<<< HEAD
        console.error('请设置 EDITOR 或 VISUAL 环境变量为您的首选编辑器');
=======
        console.error('请设置 EDITOR 或 VISUAL 环境变量为你的编辑器');
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
        console.error('示例：export EDITOR=vim');
        process.exitCode = 1;
        return;
      }

      const configPath = getGlobalConfigPath();

      // Ensure config file exists with defaults
      if (!fs.existsSync(configPath)) {
        saveGlobalConfig({ ...DEFAULT_CONFIG });
      }

      // Spawn editor and wait for it to close
      // Avoid shell parsing to correctly handle paths with spaces in both
      // the editor path and config path
      const child = spawn(editor, [configPath], {
        stdio: 'inherit',
        shell: false,
      });

      await new Promise<void>((resolve, reject) => {
        child.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`编辑器以退出码 ${code} 结束`));
          }
        });
        child.on('error', reject);
      });

      try {
        const rawConfig = fs.readFileSync(configPath, 'utf-8');
        const parsedConfig = JSON.parse(rawConfig);
        const validation = validateConfig(parsedConfig);

        if (!validation.success) {
          console.error(`错误：无效的配置 - ${validation.error}`);
          process.exitCode = 1;
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
<<<<<<< HEAD
          console.error(`错误：配置文件未找到，路径：${configPath}`);
        } else if (error instanceof SyntaxError) {
          console.error(`错误：${configPath} 中包含无效的 JSON`);
=======
          console.error(`错误：配置文件未找到 ${configPath}`);
        } else if (error instanceof SyntaxError) {
          console.error(`错误：${configPath} 中的 JSON 无效`);
>>>>>>> 0e40f46b09282db2e0cfd10a24f710c3a3d4b860
          console.error(error.message);
        } else {
          console.error(`错误：无法验证配置 - ${error instanceof Error ? error.message : String(error)}`);
        }
        process.exitCode = 1;
      }
    });
}
