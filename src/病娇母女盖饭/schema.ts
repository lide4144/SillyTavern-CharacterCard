export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    近期事务: z.record(z.string().describe('事务名'), z.string().describe('事务描述')),
  }),

  诗雨: z
    .object({
      依存度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      病娇度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      嫉妒值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      心情: z.enum(['平静', '焦虑', '兴奋', '愤怒', '悲伤', '甜蜜']),
      着装: z.record(z.enum(['上装', '下装', '内衣', '袜子', '饰品']), z.string().describe('服装描述')),
      当前行为: z.string(),
    })
    .transform(data => {
      const $病娇阶段 =
        data.病娇度 < 20
          ? '普通妹妹'
          : data.病娇度 < 40
            ? '暗中观察'
            : data.病娇度 < 60
              ? '开始行动'
              : data.病娇度 < 80
                ? '危险信号'
                : '完全病娇';
      return { ...data, $病娇阶段 };
    }),

  婉清: z
    .object({
      依存度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      病娇度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      嫉妒值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      心情: z.enum(['平静', '焦虑', '兴奋', '愤怒', '悲伤', '甜蜜']),
      着装: z.record(z.enum(['上装', '下装', '内衣', '袜子', '饰品']), z.string().describe('服装描述')),
      当前行为: z.string(),
    })
    .transform(data => {
      const $病娇阶段 =
        data.病娇度 < 20
          ? '温柔母亲'
          : data.病娇度 < 40
            ? '微妙关注'
            : data.病娇度 < 60
              ? '积极进攻'
              : data.病娇度 < 80
                ? '不择手段'
                : '疯狂母性';
      return { ...data, $病娇阶段 };
    }),

  母女关系: z.object({
    竞争指数: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前优势方: z.enum(['无', '诗雨', '婉清', '僵持']),
    当前事件: z.string(),
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
  }),
});
export type Schema = z.output<typeof Schema>;
