export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().prefault('大周历 承平三年 春 三月初三 午时'),
    当前地点: z.string().prefault('百花谷 山门'),
    天气: z.string().prefault('晴'),
    区域信息: z.string().prefault('百花谷出口，桃花纷飞'),
    近期事务: z.record(z.string().describe('事务名'), z.string().describe('事务描述')).prefault({}),
  }).prefault({}),

  主角: z
    .object({
      体力: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(100),
      内力: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(50),
      花间值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(85),
      暴露度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
      银两: z.coerce.number().transform(v => _.clamp(v, 0, 999999)).prefault(200),
      装备: z
        .object({
          武器: z.string().prefault('花间折扇'),
          防具: z.string().prefault('烟罗纱裙'),
          饰品: z.string().prefault('百花簪'),
        })
        .prefault({}),
      武功: z
        .record(
          z.string().describe('武功名'),
          z.object({
            熟练度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
            描述: z.string(),
          }),
        )
        .transform(data => _.pickBy(data, ({ 熟练度 }) => 熟练度 > 0))
        .prefault({}),
      物品栏: z
        .record(
          z.string().describe('物品名'),
          z.object({
            描述: z.string(),
            数量: z.coerce.number(),
          }),
        )
        .transform(data => _.pickBy(data, ({ 数量 }) => 数量 > 0))
        .prefault({}),
    })
    .prefault({}),

  必吃榜: z
    .record(
      z.string().describe('角色名'),
      z.object({
        好感度: z.coerce.number().transform(v => _.clamp(v, -100, 100)).prefault(0),
        亲密值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
        攻略阶段: z.enum(['未相识', '初识', '熟识', '暧昧', '亲密', '沦陷']).prefault('未相识'),
        关系: z.string().prefault('路人'),
        已攻略: z.boolean().prefault(false),
        特殊事件: z.string().prefault('无'),
      }),
    )
    .prefault({}),

  任务: z
    .object({
      主线: z
        .record(
          z.string().describe('任务名'),
          z.object({
            阶段: z.string(),
            描述: z.string(),
          }),
        )
        .prefault({}),
      支线: z
        .record(
          z.string().describe('任务名'),
          z.object({
            描述: z.string(),
            目标: z.string(),
          }),
        )
        .prefault({}),
    })
    .prefault({}),
});

export type Schema = z.output<typeof Schema>;
