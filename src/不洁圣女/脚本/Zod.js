import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';
export const Schema = z.object({
  修女: z.object({
    堕落: z.object({
      身体堕落度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      精神堕落度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      信仰堕落度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    }).prefault({}),
    身体: z.object({
      处女状态: z.enum(['处女', '非处女', '被改造']).prefault('处女'),
      肉体改造等级: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 3)),
      后颈敏感度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      耳垂敏感度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      大腿内侧敏感度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      乳首敏感度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    }).prefault({}),
    性经验: z.object({
      初吻: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      初次触碰: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      初次插入: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      初次高潮: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      初次触手: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      初次群交: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      初次精神操控: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      初次露出: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      累计高潮次数: z.coerce.number().prefault(0).transform(v => Math.max(0, v)),
      累计性交对象数: z.coerce.number().prefault(0).transform(v => Math.max(0, v)),
      初次受孕: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
    }).prefault({}),
    关系: z.object({
      雷恩好感度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      洛克好感度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      马库斯好感度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      莉莉丝好感度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      格雷因好感度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
      洛伦佐信任: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    }).prefault({}),
    状态: z.object({
      昼夜: z.enum(['day', 'night']).prefault('day'),
      身份暴露: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
    }).prefault({}),
    CG: z.object({
      cg_初次忏悔情欲: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      cg_初次夜间战败: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      cg_初次触手: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      cg_初次雷恩目睹: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      cg_初次催眠: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      cg_初次群交: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      cg_初次肉体改造: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      cg_初次露出: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      cg_贵族调教: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
      cg_身份暴露: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 1)),
    }).prefault({}),
  }).prefault({}),
}).prefault({});

export type Schema = z.output<typeof Schema>;

$(() => {
  registerMvuSchema(Schema);
});
