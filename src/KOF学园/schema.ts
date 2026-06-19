const 角色变量 = z.object({
  好感度: z.coerce.number().prefault(50).transform(v => _.clamp(v, 0, 100)),
  关系阶段: z.string().prefault('陌生人'),
  印象: z.string().prefault('新来的转学生'),
}).prefault({});

export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().prefault('2024-04-08 08:30'),
    当前地点: z.string().prefault('主楼走廊'),
    当前活动: z.string().prefault('自由活动'),
    近期事务: z.record(z.string().describe('事务名'), z.string().describe('事务描述')),
  }).prefault({}),

  主角: z.object({
    体力: z.coerce.number().prefault(100).transform(v => _.clamp(v, 0, 100)),
    学业: z.coerce.number().prefault(70).transform(v => _.clamp(v, 0, 100)),
    社交评价: z.coerce.number().prefault(50).transform(v => _.clamp(v, 0, 100)),
    所属社团: z.string().prefault('无'),
  }).prefault({}),

  不知火舞: 角色变量,
  麻宫雅典娜: 角色变量,
  坂崎由莉: 角色变量,
  King: 角色变量,
  布鲁玛丽: 角色变量,
  神乐千鹤: 角色变量,
  莉安娜: 角色变量,
  薇丝: 角色变量,
  麦卓: 角色变量,
  夏尔米: 角色变量,
  库拉: 角色变量,
  安琪儿: 角色变量,
  温妮莎: 角色变量,
  伊丽莎白: 角色变量,
  桃子: 角色变量,
  四条雏子: 角色变量,
  福克茜: 角色变量,
  李香绯: 角色变量,
  藤堂香澄: 角色变量,
  春丽: 角色变量,
  嘉米: 角色变量,
  樱: 角色变量,
  朱莉: 角色变量,
}).prefault({});
export type Schema = z.output<typeof Schema>;
