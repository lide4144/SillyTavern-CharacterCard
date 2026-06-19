export interface CharacterInfo {
  id: string;
  name: string;
  emoji: string;
  dept: string;
  nick: string;
}

export const CHARACTERS: CharacterInfo[] = [
  { id: '不知火舞', name: '不知火舞', emoji: '🔥', dept: '体育系大三', nick: '小舞' },
  { id: '麻宫雅典娜', name: '麻宫雅典娜', emoji: '💜', dept: '音乐系大二', nick: '雅典娜' },
  { id: '坂崎由莉', name: '坂崎由莉', emoji: '⚔️', dept: '体育系大二', nick: '由莉' },
  { id: 'King', name: 'King', emoji: '🥋', dept: '体育系大四', nick: 'King' },
  { id: '布鲁玛丽', name: '布鲁玛丽', emoji: '🧥', dept: '体育系大三', nick: '玛丽' },
  { id: '神乐千鹤', name: '神乐千鹤', emoji: '🕊️', dept: '文学系研一', nick: '千鹤' },
  { id: '莉安娜', name: '莉安娜', emoji: '🔵', dept: '军事研究系大二', nick: '莉安娜' },
  { id: '薇丝', name: '薇丝', emoji: '🐍', dept: '经济系大四', nick: '薇丝' },
  { id: '麦卓', name: '麦卓', emoji: '🦅', dept: '经济系大四', nick: '麦卓' },
  { id: '夏尔米', name: '夏尔米', emoji: '🎹', dept: '设计系大三', nick: '夏尔米' },
  { id: '库拉', name: '库拉', emoji: '❄️', dept: '大一新生', nick: '库拉' },
  { id: '安琪儿', name: '安琪儿', emoji: '😈', dept: '体育系大三', nick: '安琪儿' },
  { id: '温妮莎', name: '温妮莎', emoji: '🥊', dept: '体育系教师', nick: '温妮莎' },
  { id: '伊丽莎白', name: '伊丽莎白', emoji: '👑', dept: '文学系研二', nick: '伊丽莎白' },
  { id: '桃子', name: '桃子', emoji: '🍑', dept: '大一新生', nick: '小桃' },
  { id: '四条雏子', name: '四条雏子', emoji: '🌸', dept: '体育系大二', nick: '雏子' },
  { id: '福克茜', name: '福克茜', emoji: '🤺', dept: '法学系研一', nick: '福克茜' },
  { id: '李香绯', name: '李香绯', emoji: '🥟', dept: '大一新生', nick: '香绯' },
  { id: '藤堂香澄', name: '藤堂香澄', emoji: '🏯', dept: '大一新生', nick: '香澄' },
  { id: '春丽', name: '春丽', emoji: '🦋', dept: '法律系大三', nick: '春丽' },
  { id: '嘉米', name: '嘉米', emoji: '🇬🇧', dept: '体育系大二', nick: '嘉米' },
  { id: '樱', name: '樱', emoji: '🌸', dept: '大一新生', nick: '小樱' },
  { id: '朱莉', name: '朱莉', emoji: '🕷️', dept: '心理学系大三', nick: '朱莉' },
];

export const LOCATIONS = [
  { id: '主楼走廊', name: '主楼走廊' },
  { id: '一般教室', name: '教室' },
  { id: '体育馆', name: '体育馆' },
  { id: 'SunnySpot咖啡厅', name: '咖啡厅' },
  { id: '社团楼地下排练室', name: '排练室' },
  { id: '天台', name: '天台' },
  { id: '图书馆自习区', name: '图书馆' },
  { id: '学园祭广场', name: '广场' },
];
