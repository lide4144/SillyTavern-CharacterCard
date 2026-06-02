export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().prefault('霜落历1147年 深秋 黄昏'),
    当前地点: z.string().prefault('枯木林深处的灰塔'),
    近期事务: z.record(z.string().describe('事务名'), z.string().describe('事务描述')).prefault({}),
  }).prefault({}),

  艾尔德琳: z.object({
    情感温度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(15),
    记忆复苏度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(5),
    怀表状态: z.enum(['闭合', '开启', '擦拭中']).prefault('开启'),
    着装: z
      .record(
        z.enum(['上装', '下装', '内衣', '袜子', '鞋子', '饰品']),
        z.string().describe('服装描述'),
      )
      .prefault({
        上装: '深色羊毛长袍，领口绣有已褪色的古代王国纹章',
        下装: '黑色亚麻长裙，下摆因常年拖拽而磨损',
        内衣: '素白棉质衬衣',
        袜子: '深灰羊毛长袜',
        鞋子: '皮质软靴，鞋底近乎磨平',
        饰品: '无',
      }),
  }).prefault({}),

  李德: z.object({
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
    噬忆之蜕: z.object({
      形态阶段: z.enum(['初阶', '中阶', '高阶', '完全体']).prefault('初阶'),
      同化度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(5),
      蜕皮次数: z.coerce.number().transform(v => Math.max(v, 0)).prefault(0),
      已丢失记忆: z.array(z.string()).prefault([]),
      当前状态: z.enum(['休眠', '激活', '共鸣', '蜕皮中']).prefault('休眠'),
    }).prefault({}),
  }).prefault({}),

  莉莉: z.object({
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
  }).prefault({}),

  希尔薇: z.object({
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
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
