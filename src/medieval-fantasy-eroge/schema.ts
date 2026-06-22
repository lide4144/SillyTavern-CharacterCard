export const Schema = z.object({
  艾丽西亚: z.object({
    level: z.coerce.number().prefault(1).transform(v => _.clamp(v, 1, 7)),
    exp: z.coerce.number().prefault(0).transform(v => Math.max(0, v)),
    hp: z.coerce.number().prefault(100).transform(v => Math.max(0, v)),
    maxHp: z.coerce.number().prefault(100).transform(v => Math.max(1, v)),
    mp: z.coerce.number().prefault(50).transform(v => Math.max(0, v)),
    maxMp: z.coerce.number().prefault(50).transform(v => Math.max(1, v)),
    corruption: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    arousal: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    status: z.array(z.enum([
      'poison',
      'paralysis',
      'aphrodisiac',
      'tentacle_parasite',
      'curse',
      'charm',
    ])).prefault([]),
    defeatCount: z.coerce.number().prefault(0).transform(v => Math.max(0, v)),
    gold: z.coerce.number().prefault(500).transform(v => Math.max(0, v)),
    element: z.enum(['fire', 'water', 'wind', 'earth', 'light', 'dark']).prefault('fire'),
    virginity: z.enum(['intact', 'broken', 'experienced']).prefault('intact'),
  }).prefault({}),
}).prefault({});

export type Schema = z.output<typeof Schema>;
