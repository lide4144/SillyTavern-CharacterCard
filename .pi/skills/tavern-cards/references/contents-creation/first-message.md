# 开场白创作

仅角色卡需要此步骤。开场白设定初始场景、体现角色性格、引导用户互动。

## 工作流

1. 读取 `创作规划.yaml` 的 `first_messages` 数组
2. 逐项处理：
   - **叙事式**：调用 `first-message-agent`（传入创作规划路径 + 索引；启用 MVU 时传入 initvar 文档路径——有 `initvar_override` 则传 override 路径，否则传默认 `世界书/变量/initvar.yaml`；未启用 MVU 则不传）
   - **大纲式**：主代理直接整理
3. 检查与保存：
   - 确认文件已写入 `output_path`
   - 调用 `check-agent` 检查正文
4. 所有项完成后，按顺序注册到 state 的 `first_messages`

## 两种格式

### 叙事式

传统的角色扮演开场白，AI 直接叙述场景，以角色身份说话。适合大多数情况。

编写流程：
- 遍历 `first_messages` 数组，逐项调用 `first-message-agent`
- 向子代理传入规划路径 + 索引（启用 MVU 时传入 initvar 路径，有 override 则传 override、否则传默认 initvar.yaml）
- 确认子代理已写入当前项的 `output_path`
- 调用 `check-agent` 检查

### 大纲式

只整理关键信息，不写完整描写。适合用户有清晰构想、希望精确控制内容时。

编写要点：
- 只根据用户提供的信息整理，不自己编造
- 结构清晰，关键要素一目了然

格式参考：

```
场景: [时间/地点/情境一句话]
背景设定:
  - [背景信息1]
  - [背景信息2]
当前状态:
  [角色A]状态:
    - [状态描述]
  [角色B]状态:
    - [状态描述]
关键细节:
  - [具体细节1]
  - [具体细节2]
开场点:
  1. [互动切入点1]
  2. [互动切入点2]
```

## MVU 变量确认

- 默认开场白（`开场白/0.txt`）对应默认 `世界书/变量/initvar.yaml`
- 额外开场白需不同初始变量时，在末尾嵌入 `<UpdateVariable><initvar>` 块（完全覆盖默认 initvar，非合并）
- `initvar_override` 的创建与校验见 `references/mvu/initvar.md`

### 嵌入额外开场白

在额外开场白末尾嵌入 `<UpdateVariable><initvar>` 块，使该开场白加载时覆盖默认 initvar：

```text
<UpdateVariable>
<initvar>
{initvar 内容}
</initvar>
</UpdateVariable>
```

该块完全覆盖默认 initvar（非合并），只有需要不同初始变量的额外开场白才需嵌入。

### 嵌入脚本

```bash
INITVAR="cards/{Project}/开场白/initvar/1.yaml"; GREETING="cards/{Project}/开场白/1.txt"; PROJECT="{project}"; \
node scripts/tavern-cards-forge.mjs validate-mvu "$PROJECT" --initvar "$INITVAR" && \
( sed '/<UpdateVariable>/,/<\/UpdateVariable>/d' "$GREETING"; \
  echo ""; echo "<UpdateVariable>"; echo "<initvar>"; cat "$INITVAR"; echo "</initvar>"; echo "</UpdateVariable>" \
) > "$GREETING.tmp" && mv "$GREETING.tmp" "$GREETING"
```

## 注册

按 `output_path` 保存（通常 `开场白/{index}.txt`），然后注册到 state：

```bash
node scripts/tavern-cards-forge.mjs patch {project} '[{"op": "add", "path": "/first_messages/-", "value": "开场白/0.txt"}]'
# 每项一行，顺序与数组一致
```

## 自查清单

叙事式：
- [ ] 每一项已调用 first-message-agent
- [ ] 子代理已交付自查摘要，正文已写入 output_path
- [ ] 已调用 check-agent 检查
- [ ] MVU 项目：叙述状态与对应 initvar 一致
- [ ] 有 `initvar_override` 的项已完成校验和嵌入

大纲式：
- [ ] 每一项已由主代理整理，未编造内容
- [ ] 结构清晰，要素完整
- [ ] 已调用 check-agent 检查
- [ ] 已保存并注册到 `first_messages`

通用：
- [ ] state 中 `first_messages` 顺序与创作规划一致
- [ ] 额外开场白：需要不同变量时已嵌入 `<UpdateVariable><initvar>` 块
