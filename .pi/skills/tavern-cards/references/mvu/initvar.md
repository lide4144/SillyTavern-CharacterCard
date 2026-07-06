# 初始变量（initvar.yaml）

## 编写原则

- YAML 格式，结构需与 `schema.ts` 中定义的 Schema 对应，完成后通过 `validate-mvu` 校验
- 初始值要符合开场情节的设定。开场情节在需求对齐阶段确认，或在此阶段询问用户

## 默认 initvar

注册为 `[InitVar]请勿打开`，写入 `世界书/变量/initvar.yaml`。

## 额外开场白的 initvar_override

当某条额外开场白（`开场白/1.txt` 等）需要与默认 initvar 不同的初始变量时，使用 `initvar_override` 文件。

### 存放约定

- 默认：`世界书/变量/initvar.yaml`
- 额外：`开场白/initvar/{index}.yaml`（与 `开场白/{index}.txt` 编号一致），或创作规划指定任意路径
- `initvar_override` 不是独立条目，不注册、不写入 entryManifest
- 所有 initvar YAML 必须与 `schema.ts` 一致

### 验证

```bash
# 默认
node scripts/tavern-cards-forge.mjs validate-mvu {project}
# 指定 override
node scripts/tavern-cards-forge.mjs validate-mvu {project} --initvar cards/{Project}/开场白/initvar/1.yaml
```

未提供 `--initvar` 时校验默认 `世界书/变量/initvar.yaml`。支持绝对和相对路径。

### 嵌入额外开场白

嵌入方法与脚本见 `references/contents-creation/first-message.md`。

## 自查清单

- [ ] YAML 格式正确
- [ ] 通过 validate-mvu 校验（默认或指定 `--initvar`）
- [ ] 没有繁体字、日文汉字
- [ ] initvar_override 文件未注册为条目，未写入 entryManifest
- [ ] 额外开场白的 `<UpdateVariable><initvar>` 块已正确嵌入且覆盖默认 initvar
