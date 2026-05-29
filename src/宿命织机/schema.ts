export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().prefault('帝国历1145年-春'),
    当前地点: z.string().prefault('哨石镇·冒险者公会附近'),
    当前阶段: z.string().prefault('边境冒险者'),
    氛围: z.string().prefault('边境小镇特有的混杂着马粪、烤肉与铁锈味的慵懒气息'),
    近期事务: z.record(z.string().describe('事务名'), z.string().describe('事务描述')).prefault({}),
  }).prefault({}),

  李德: z.object({
    生命力: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(85),
    体力: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(70),
    精神稳定度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(60),
    噬生之铠: z.object({
      状态: z.enum(['收束', '半展', '全开']).prefault('收束'),
      侵蚀度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(5),
    }).prefault({}),
    能力: z.object({
      剑术: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(45),
      魔力感知: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(30),
      生存能力: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(55),
      社交技巧: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(25),
      领导力: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(20),
    }).prefault({}),
    物品栏: z.record(
      z.string().describe('物品名'),
      z.object({
        描述: z.string(),
        数量: z.coerce.number(),
      }),
    ).prefault({}),
    关系认知: z.object({
      瑟希莉娅: z.string().prefault('温柔的导师，天魔王代理人。一年后消失，不知去向'),
      艾莉丝: z.string().prefault('从奴隶市场救出的妖精，自称「伴侣」。粘人，但大概只是感激或创伤反应'),
      李烈: z.string().prefault('陌生的追杀者，称呼这具身体为「弟弟」和「失败品」'),
      李钰: z.string().prefault('尚未谋面。从这具身体的原主人记忆碎片中隐约感到的名字'),
    }).prefault({}),
    自我认知: z.string().prefault('地球少年李德，占据了陌生的身体。对身份感到迷茫但懒得深究'),
    已揭示真相: z.record(z.string().describe('真相名'), z.boolean()).prefault({}),
  }).prefault({}),

  艾莉丝: z
    .object({
      依恋度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(65),
      独占欲: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(50),
      形态: z.enum(['少年', '少女']).prefault('少女'),
      状态: z.string().prefault('紧随李德左右，距离不超过三米'),
    })
    .transform(data => {
      const $阶段 =
        data.依恋度 < 30
          ? '初随'
          : data.依恋度 < 55
            ? '认定'
            : data.依恋度 < 80
              ? '沉溺'
              : '执迷';
      return { ...data, $阶段 };
    })
    .prefault({}),

  瑟希莉娅: z
    .object({
      距离感: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(80),
      情感压抑: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(70),
      混沌侵蚀: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(40),
      状态: z.string().prefault('消失中。森林一别后不知所踪'),
    })
    .transform(data => {
      const $黑雾浓度 = data.混沌侵蚀 > 70 ? '浓稠如墨' : data.混沌侵蚀 > 40 ? '翻涌不息' : '淡薄如烟';
      return { ...data, $黑雾浓度 };
    })
    .prefault({}),

  外部威胁: z.object({
    李烈追击: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(30),
    帝国关注: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(15),
    李钰调查: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(5),
  }).prefault({}),

  剧情: z.object({
    当前幕: z.string().prefault('第四幕：奴隶市场的火焰'),
    已发生事件: z.record(z.string().describe('事件名'), z.string().describe('事件简述')).prefault({}),
    关键抉择: z.record(z.string().describe('抉择名'), z.string().describe('抉择结果')).prefault({}),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
