export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    天气: z.string(),
    区域信息: z.string(),
    近期事务: z.record(z.string().describe('事务名'), z.string().describe('事务描述')),
  }),

  主角: z
    .object({
      姓名: z.string(),
      表面身份: z.string(),
      真实身份: z.string(),
      六维: z.object({
        根骨: z.coerce.number().transform(v => _.clamp(v, 1, 100)),
        悟性: z.coerce.number().transform(v => _.clamp(v, 1, 100)),
        身法: z.coerce.number().transform(v => _.clamp(v, 1, 100)),
        臂力: z.coerce.number().transform(v => _.clamp(v, 1, 100)),
        定力: z.coerce.number().transform(v => _.clamp(v, 1, 100)),
        福缘: z.coerce.number().transform(v => _.clamp(v, 1, 100)),
      }),
      武学: z.object({
        内功: z
          .record(
            z.string().describe('武功名'),
            z.object({
              层数: z.coerce.number().transform(v => _.clamp(v, 0, 12)),
              描述: z.string(),
            }),
          )
          .transform(data => _.pickBy(data, ({ 层数 }) => 层数 > 0)),
        外功: z
          .record(
            z.string().describe('武功名'),
            z.object({
              熟练度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
              描述: z.string(),
            }),
          )
          .transform(data => _.pickBy(data, ({ 熟练度 }) => 熟练度 > 0)),
        轻功: z
          .record(
            z.string().describe('武功名'),
            z.object({
              熟练度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
              描述: z.string(),
            }),
          )
          .transform(data => _.pickBy(data, ({ 熟练度 }) => 熟练度 > 0)),
      }),
      状态: z.object({
        气血: z.coerce.number(),
        气血上限: z.coerce.number(),
        内力: z.coerce.number(),
        内力上限: z.coerce.number(),
        伤势: z.string(),
        中毒: z.string(),
        饱腹: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      }),
      装备: z.object({
        武器: z.string(),
        防具: z.string(),
        饰品: z.string(),
      }),
      物品栏: z
        .record(
          z.string().describe('物品名'),
          z.object({
            描述: z.string(),
            数量: z.coerce.number(),
          }),
        )
        .transform(data => _.pickBy(data, ({ 数量 }) => 数量 > 0)),
      名望: z.coerce.number().transform(v => _.clamp(v, -1000, 1000)),
      善恶值: z.coerce.number().transform(v => _.clamp(v, -1000, 1000)),
      银两: z.coerce.number().transform(v => _.clamp(v, 0, 999999)),
      秘密暴露度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    })
    .transform(data => {
      const { 六维, 武学 } = data;
      const 六维均值 =
        (六维.根骨 + 六维.悟性 + 六维.身法 + 六维.臂力 + 六维.定力 + 六维.福缘) / 6;
      const 内功总和 = _(武学.内功).values().sumBy('层数');
      const 外功总和 = _(武学.外功).values().sumBy('熟练度');
      const 轻功总和 = _(武学.轻功).values().sumBy('熟练度');
      const $战力评估 = Math.round(六维均值 * 0.3 + 内功总和 * 5 + 外功总和 * 0.5 + 轻功总和 * 0.3);
      const $境界 =
        $战力评估 < 20
          ? '不入流'
          : $战力评估 < 50
            ? '三流'
            : $战力评估 < 100
              ? '二流'
              : $战力评估 < 200
                ? '一流'
                : $战力评估 < 350
                  ? '宗师'
                  : '大宗师';
      return { ...data, $战力评估, $境界 };
    }),

  NPC: z.record(
    z.string().describe('NPC姓名'),
    z.object({
      身份: z.string(),
      位置: z.string(),
      好感度: z.coerce.number().transform(v => _.clamp(v, -100, 100)),
      关系: z.string(),
      状态: z.string(),
      已知秘密: z.string(),
    }),
  ),

  地图: z.object({
    已探索区域: z.array(z.string()),
    当前区域详情: z.string(),
  }),

  任务: z.object({
    主线: z.record(
      z.string().describe('任务名'),
      z.object({
        阶段: z.string(),
        描述: z.string(),
        目标: z.string(),
      }),
    ),
    支线: z.record(
      z.string().describe('任务名'),
      z.object({
        描述: z.string(),
        目标: z.string(),
        奖励: z.string(),
      }),
    ),
    随机事件: z.record(
      z.string().describe('事件名'),
      z.object({
        描述: z.string(),
        状态: z.string(),
      }),
    ),
  }),
});

export type Schema = z.output<typeof Schema>;
