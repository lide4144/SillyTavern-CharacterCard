export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    近期事务: z.record(z.string().describe('事务名'), z.string().describe('事务描述')),
    探索进度: z.string(),
    灾厄之潮消退度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }),

  李月见: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    信任度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    精神状态: z.enum(['麻木', '波动', '好奇', '依恋']),
    当前行为: z.string(),
    魔能流失度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    关系阶段: z.string().describe('H或剧情后关系质变状态，例：能源提取程序→想知道明天→学会渴望'),
  }),

  米莉雅: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    信任度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前状态: z.enum(['元气满满', '战斗中', '困惑', '害羞']),
    当前行为: z.string(),
    关系阶段: z.string().describe('H或剧情后关系质变状态，例：战斗伙伴→第一次被温柔触碰→学会哭泣'),
  }),

  希尔维娅: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    信任度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前状态: z.enum(['从容', '慌张', '窥探中', '心动']),
    当前行为: z.string(),
    关系阶段: z.string().describe('H或剧情后关系质变状态，例：观测对象#48→不要打开的文件夹→第一次失控'),
  }),

  妮菲塔丽: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    信任度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前状态: z.enum(['威严', '愤怒', '好奇', '慵懒']),
    当前行为: z.string(),
    关系阶段: z.string().describe('H或剧情后关系质变状态，例：臣民收藏→权力失效的恐惧与兴奋→第一次被看见'),
  }),

  尘: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    信任度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前状态: z.enum(['淡漠', '专注', '罕见兴奋', '困惑']),
    当前行为: z.string(),
    关系阶段: z.string().describe('H或剧情后关系质变状态，例：研究对象→待进一步观测样本→删了重写'),
  }),

  主角: z.object({
    物品栏: z
      .record(
        z.string().describe('物品名'),
        z.object({
          描述: z.string(),
          数量: z.coerce.number(),
        }),
      )
      .transform(data => _.pickBy(data, ({ 数量 }) => 数量 > 0)),
    当前状态: z.string(),
    已解锁记忆: z.record(z.string().describe('记忆名'), z.boolean()),
  }),

  剧情: z.object({
    当前路线: z.enum(['无', '拾荒者之道', '血脉之誓', '深渊之谋', '女皇之契', '灵魂之问']),
    路线进度: z.record(z.string().describe('路线名'), z.string().describe('进度描述')),
    已解锁剧情节点: z.record(z.string().describe('节点名'), z.boolean()),
    善恶值: z.coerce.number().transform(v => _.clamp(v, -1000, 1000)),
  }),

  灵魂容器: z.object({
    灵魂融合度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    灾能污染度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前主导碎片: z.enum(['无', '李德', '李破晓', '苏云梦', '灾厄之潮', '旧帝国', '古代法师', '超越之光']),
    与灾厄之潮链接强度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    碎片觉醒状态: z.record(
      z.string().describe('碎片名'),
      z.object({
        觉醒度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
        是否反噬: z.boolean(),
      }),
    ),
  }),
});
export type Schema = z.output<typeof Schema>;
