export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().prefault('未知/降临之日-06:00'),
    当前区域: z.string().prefault('巴别塔'),
    当前场景: z.string().prefault('下层泥沼区·破败酒馆老鼠洞'),
    天气与灵液浓度: z.object({
      weather: z.string().prefault('阴'),
      ichor_density: z.coerce.number().prefault(0.3)
    }).prefault({}),
    女神污染度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    剧情阶段: z.string().prefault('降临期')
  }).prefault({}),

  主角: z.object({
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(1),
    邪道等级: z.coerce.number().transform(v => _.clamp(v, 0, 5)).prefault(0),
    异常点数: z.coerce.number().transform(v => _.clamp(v, 0, 99999)).prefault(20),
    侵蚀度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    当前职业: z.string().prefault('战士'),
    技能列表: z.array(z.string()).prefault([]),
    装备列表: z.array(z.object({})).prefault([]),
    基础属性: z.object({
      STR: z.coerce.number().prefault(10),
      DEX: z.coerce.number().prefault(10),
      INT: z.coerce.number().prefault(10),
      CON: z.coerce.number().prefault(10),
      CHA: z.coerce.number().prefault(15)
    }).prefault({}),
    物品栏: z.record(z.string(), z.coerce.number()).prefault({})
  }).prefault({}),

  西尔维娅: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 255)).prefault(0),
    状态: z.string().prefault('未相遇'),
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(35),
    职业: z.string().prefault('圣骑士'),
    侵蚀度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0)
  }).prefault({}),

  伊莉雅: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 255)).prefault(0),
    状态: z.string().prefault('待拯救'),
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(28),
    职业: z.string().prefault('大魔导师'),
    侵蚀度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(15)
  }).prefault({}),

  克洛伊: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 255)).prefault(0),
    状态: z.string().prefault('敌对'),
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(30),
    职业: z.string().prefault('暗影杀手'),
    侵蚀度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(5)
  }).prefault({}),

  米拉: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 255)).prefault(10),
    状态: z.string().prefault('负债中'),
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(1),
    职业: z.string().prefault('平民')
  }).prefault({}),

  弗蕾亚: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 255)).prefault(0),
    状态: z.string().prefault('冰封中'),
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(60),
    职业: z.string().prefault('冰霜女帝')
  }).prefault({}),

  妮娅: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 255)).prefault(0),
    状态: z.string().prefault('未相遇'),
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(12),
    职业: z.string().prefault('机械师')
  }).prefault({}),

  卡米拉: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 255)).prefault(0),
    状态: z.string().prefault('敌对贵族'),
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(5),
    职业: z.string().prefault('贵族')
  }).prefault({}),

  深潜者: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 255)).prefault(0),
    状态: z.string().prefault('被古神控制中'),
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(40),
    职业: z.string().prefault('海妖祭司')
  }).prefault({}),

  玛莎: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 255)).prefault(20),
    状态: z.string().prefault('待拯救'),
    等级: z.coerce.number().transform(v => _.clamp(v, 1, 99)).prefault(8),
    职业: z.string().prefault('修女'),
    侵蚀度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0)
  }).prefault({})
}).prefault({});
export type Schema = z.output<typeof Schema>;
