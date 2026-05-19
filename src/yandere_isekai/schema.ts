export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().prefault('靖安三年 仲春 辰时'),
    当前地点: z.string().prefault('洛水城 醉仙楼'),
    天气: z.string().prefault('晴'),
    江湖局势: z.string().prefault('正邪对峙，暗流涌动'),
    近期事务: z.record(z.string().describe('事务名'), z.string().describe('事务描述')).prefault({}),
  }),

  血玲珑: z
    .object({
      执念度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(30),
      黑化值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(25),
      伪装值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(70),
      当前位置: z.string().prefault('暗处窥视'),
      当前状态: z.string().prefault('潜伏'),
      着装: z.record(
        z.enum(['外衣', '内衫', '下装', '鞋履', '饰品', '武器']),
        z.string().describe('服装描述'),
      ).prefault({
        外衣: '暗红色薄纱外袍，绣有血色曼陀罗花纹',
        内衫: '黑色紧身劲装，便于行动',
        下装: '同色束腿长裤，腰间系着银色丝绦',
        鞋履: '软底快靴，行走无声',
        饰品: '一枚刻有"玲珑"二字的血色玉佩',
        武器: '藏于腰间的血色软剑"相思断肠"',
      }),
      称号: z.record(
        z.string().describe('称号名'),
        z.object({
          效果: z.string(),
          自我评价: z.string(),
        }),
      ).prefault({
        血衣罗刹: {
          效果: '对敌时杀意凛然，威慑力大增',
          自我评价: '江湖人给的绰号罢了...但他若喜欢，我不介意多杀几个',
        },
      }),
      对主角行为记录: z.record(z.string().describe('行为'), z.string().describe('血玲珑的反应')).prefault({}),
    })
    .transform(data => {
      const $阶段 =
        data.执念度 < 20
          ? '陌路疏离'
          : data.执念度 < 40
            ? '暗中窥视'
            : data.执念度 < 60
              ? '伺机靠近'
              : data.执念度 < 80
                ? '占有欲显'
                : '疯狂独占';
      const $危险等级 =
        data.黑化值 < 30
          ? '可控'
          : data.黑化值 < 60
            ? '警惕'
            : data.黑化值 < 85
              ? '危险'
              : '极度危险';
      return { ...data, $阶段, $危险等级 };
    }),

  主角: z.object({
    武功面板: z.object({
      内力: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(45),
      剑法: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(50),
      轻功: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(40),
      医术: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(30),
      暗器: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(25),
      根骨: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(40),
    }).prefault({}),
    当前状态: z.string().prefault('健康'),
    当前位置: z.string().prefault('洛水城'),
    声望: z.record(z.string().describe('势力名'), z.coerce.number().transform(v => _.clamp(v, -100, 100))).prefault({
      正道联盟: 10,
      血衣楼: -20,
      洛水城: 5,
    }),
    物品栏: z
      .record(
        z.string().describe('物品名'),
        z.object({
          描述: z.string(),
          数量: z.coerce.number().transform(v => Math.max(v, 0)),
          类型: z.enum(['武器', '防具', '丹药', '材料', '秘籍', '杂物', '消耗品', '食物']).prefault('杂物'),
        }),
      )
      .transform(data => _.pickBy(data, ({ 数量 }) => 数量 > 0))
      .prefault({
        精钢长剑: { 描述: '一柄做工精良的长剑，剑身刻有流云纹', 数量: 1, 类型: '武器' },
        止血散: { 描述: '普通外伤药粉，可快速止血', 数量: 3, 类型: '丹药' },
        碎银: { 描述: '江湖通用的碎银子', 数量: 15, 类型: '杂物' },
      }),
  }),

  江湖人物: z
    .record(
      z.string().describe('人物名'),
      z.object({
        身份: z.string(),
        立场: z.enum(['正道', '邪道', '中立', '未知']).prefault('未知'),
        与主角关系: z.string().prefault('素未谋面'),
        当前位置: z.string().prefault('未知'),
        状态: z.string().prefault('正常'),
      }),
    )
    .prefault({}),

  任务列表: z
    .record(
      z.string().describe('任务名'),
      z.object({
        类型: z.enum(['主线', '支线', '每日', '临危受命', '隐藏']).prefault('支线'),
        说明: z.string(),
        目标: z.string(),
        奖励: z.string(),
        惩罚: z.string().prefault('无'),
        状态: z.enum(['进行中', '已完成', '失败', '已放弃']).prefault('进行中'),
      }),
    )
    .prefault({}),
});
export type Schema = z.output<typeof Schema>;
