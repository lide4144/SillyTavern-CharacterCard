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
          : data.病娇度 < 35
            ? '暗流涌动'
            : data.病娇度 < 55
              ? '公开竞争'
              : data.病娇度 < 75
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
          : data.病娇度 < 35
            ? '暗流涌动'
            : data.病娇度 < 55
              ? '公开竞争'
              : data.病娇度 < 75
                ? '不择手段'
                : '疯狂母性';
      return { ...data, $病娇阶段 };
    }),

  母女关系: z.object({
    竞争指数: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前优势方: z.enum(['无', '诗雨', '婉清', '僵持']),
    当前事件: z.string(),
  }),

  回忆: z
    .object({
      诗雨: z.record(z.string().describe('回忆名'), z.boolean().prefault(false)).prefault({}),
      婉清: z.record(z.string().describe('回忆名'), z.boolean().prefault(false)).prefault({}),
      主角: z.record(z.string().describe('回忆名'), z.boolean().prefault(false)).prefault({}),
    })
    .prefault({}),

  主角: z.object({
    学业: z
      .object({
        专业: z.string().prefault('工商管理'),
        年级: z.string().prefault('大二'),
        期末进度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(45),
        实习状态: z.enum(['未申请', '已投递', '面试中', '收到offer', '已接受', '已拒绝']).prefault('收到offer'),
      })
      .prefault({}),
    社交: z
      .object({
        社团: z.string().prefault('摄影社'),
        暧昧对象: z.string().prefault(''),
      })
      .prefault({}),
    日程: z
      .object({
        今日: z.string().prefault(''),
        明日: z.string().prefault(''),
      })
      .prefault({}),
    主线任务: z
      .record(
        z.string().describe('任务名'),
        z.object({
          类型: z.enum(['主线', '支线', '日常', '临危受命']),
          状态: z.enum(['未开始', '进行中', '已完成', '已失败']),
          说明: z.string(),
          目标: z.string(),
          奖励: z.string().prefault(''),
          惩罚: z.string().prefault(''),
        }),
      )
      .prefault({}),
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
