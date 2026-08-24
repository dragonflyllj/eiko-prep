/* Mimi's Week — 7 days of daily English practice (听说读写) */

/* Each day = 5 "pages":
   1 look   认一认  reading / recognition
   2 trace  写一写  writing
   3 spell  拼一拼  spelling
   4 listen 听一听  listening
   5 speak  说一说  speaking
*/

const PAGE_KINDS = [
  { id: 'look',   name: 'Look & Learn', cn: '认一认', skill: '读', icon: 'book',    color: '#7C6CF6' },
  { id: 'trace',  name: 'Trace It',     cn: '写一写', skill: '写', icon: 'pencil',  color: '#FF9F43' },
  { id: 'spell',  name: 'Spell It',     cn: '拼一拼', skill: '拼', icon: 'box',     color: '#5FBB4E' },
  { id: 'listen', name: 'Listen & Find', cn: '听一听', skill: '听', icon: 'ear',    color: '#4A90D9' },
  { id: 'speak',  name: 'Say It',       cn: '说一说', skill: '说', icon: 'mic',     color: '#E85D75' },
];

const WEEK = [
  {
    id: 'mon', en: 'Monday', cn: '星期一', theme: 'Animals', themeCn: '动物',
    color: '#E85D75', icon: 'dog',
    words: [
      { w: 'cat', icon: 'cat', cn: '猫' },
      { w: 'dog', icon: 'dog', cn: '狗' },
      { w: 'pig', icon: 'pig', cn: '猪' },
      { w: 'fish', icon: 'fish', cn: '鱼' },
      { w: 'bird', icon: 'bird', cn: '鸟' },
    ],
    trace: ['c', 'a', 't', 'dog'],
    spell: ['cat', 'pig', 'dog'],
    sentences: [
      { t: 'I see a cat.', icon: 'cat', cn: '我看见一只猫。' },
      { t: 'The dog is big.', icon: 'dog', cn: '这只狗很大。' },
      { t: 'I like the little bird.', icon: 'bird', cn: '我喜欢这只小鸟。' },
    ],
  },
  {
    id: 'tue', en: 'Tuesday', cn: '星期二', theme: 'Yummy Food', themeCn: '好吃的',
    color: '#F5A623', icon: 'cake',
    words: [
      { w: 'apple', icon: 'apple', cn: '苹果' },
      { w: 'cake', icon: 'cake', cn: '蛋糕' },
      { w: 'egg', icon: 'egg', cn: '鸡蛋' },
      { w: 'milk', icon: 'milk', cn: '牛奶' },
      { w: 'bread', icon: 'bread', cn: '面包' },
    ],
    trace: ['e', 'g', 'g', 'milk'],
    spell: ['egg', 'jam', 'cup'],
    sentences: [
      { t: 'I like apples.', icon: 'apple', cn: '我喜欢苹果。' },
      { t: 'I want milk, please.', icon: 'milk', cn: '我想要牛奶,谢谢。' },
      { t: 'The cake is yummy!', icon: 'cake', cn: '蛋糕真好吃!' },
    ],
  },
  {
    id: 'wed', en: 'Wednesday', cn: '星期三', theme: 'My Home', themeCn: '我的家',
    color: '#5FBB4E', icon: 'house',
    words: [
      { w: 'house', icon: 'house', cn: '房子' },
      { w: 'bed', icon: 'bed', cn: '床' },
      { w: 'door', icon: 'door', cn: '门' },
      { w: 'book', icon: 'book', cn: '书' },
      { w: 'cup', icon: 'cup', cn: '杯子' },
    ],
    trace: ['b', 'e', 'd', 'cup'],
    spell: ['bed', 'cup', 'box'],
    sentences: [
      { t: 'This is my house.', icon: 'house', cn: '这是我的家。' },
      { t: 'I read a book.', icon: 'book', cn: '我读书。' },
      { t: 'Open the door, please.', icon: 'door', cn: '请开门。' },
    ],
  },
  {
    id: 'thu', en: 'Thursday', cn: '星期四', theme: 'Colors', themeCn: '颜色',
    color: '#7C6CF6', icon: 'rainbow',
    words: [
      { w: 'red', color: '#E8483F', cn: '红色' },
      { w: 'blue', color: '#4A90D9', cn: '蓝色' },
      { w: 'green', color: '#5FBB4E', cn: '绿色' },
      { w: 'yellow', color: '#FFC93C', cn: '黄色' },
      { w: 'pink', color: '#F48FB1', cn: '粉色' },
    ],
    trace: ['r', 'e', 'd', 'blue'],
    spell: ['red', 'sun', 'hat'],
    sentences: [
      { t: 'The sun is yellow.', icon: 'sun', cn: '太阳是黄色的。' },
      { t: 'I like blue.', color: '#4A90D9', cn: '我喜欢蓝色。' },
      { t: 'My hat is red.', icon: 'hat', cn: '我的帽子是红色的。' },
    ],
  },
  {
    id: 'fri', en: 'Friday', cn: '星期五', theme: 'My Body', themeCn: '我的身体',
    color: '#26A69A', icon: 'eye',
    words: [
      { w: 'eye', icon: 'eye', cn: '眼睛' },
      { w: 'ear', icon: 'ear2', cn: '耳朵' },
      { w: 'nose', icon: 'nose', cn: '鼻子' },
      { w: 'mouth', icon: 'mouth', cn: '嘴巴' },
      { w: 'hand', icon: 'hand', cn: '手' },
    ],
    trace: ['e', 'a', 'r', 'eye'],
    spell: ['ear', 'leg', 'hen'],
    sentences: [
      { t: 'This is my nose.', icon: 'nose', cn: '这是我的鼻子。' },
      { t: 'I have two eyes.', icon: 'eye', cn: '我有两只眼睛。' },
      { t: 'Wash your hands!', icon: 'hand', cn: '洗洗你的手!' },
    ],
  },
  {
    id: 'sat', en: 'Saturday', cn: '星期六', theme: 'Toys & Play', themeCn: '玩具和游戏',
    color: '#FF6B9D', icon: 'balloon',
    words: [
      { w: 'ball', icon: 'ball', cn: '球' },
      { w: 'kite', icon: 'kite', cn: '风筝' },
      { w: 'doll', icon: 'doll', cn: '娃娃' },
      { w: 'car', icon: 'car', cn: '小汽车' },
      { w: 'balloon', icon: 'balloon', cn: '气球' },
    ],
    trace: ['b', 'a', 'l', 'ball'],
    spell: ['ball', 'kite', 'van'],
    sentences: [
      { t: 'I play with my ball.', icon: 'ball', cn: '我玩我的球。' },
      { t: 'The kite can fly!', icon: 'kite', cn: '风筝会飞!' },
      { t: 'Let us play together.', icon: 'doll', cn: '我们一起玩吧。' },
    ],
  },
  {
    id: 'sun', en: 'Sunday', cn: '星期日', theme: 'Weather & Sky', themeCn: '天气和天空',
    color: '#4A90D9', icon: 'sun',
    words: [
      { w: 'sun', icon: 'sun', cn: '太阳' },
      { w: 'rain', icon: 'rain', cn: '雨' },
      { w: 'cloud', icon: 'cloud', cn: '云' },
      { w: 'star', icon: 'star', cn: '星星' },
      { w: 'tree', icon: 'tree', cn: '树' },
    ],
    trace: ['s', 'u', 'n', 'star'],
    spell: ['sun', 'rain', 'tree'],
    sentences: [
      { t: 'The sun is hot.', icon: 'sun', cn: '太阳很热。' },
      { t: 'I see a rainbow!', icon: 'rainbow', cn: '我看见彩虹啦!' },
      { t: 'Look at the stars.', icon: 'star', cn: '看看星星。' },
    ],
  },
];

/* ================================================================
   UNIT 2 — Days of the Week 一周七天
   ================================================================ */

const DAY_INFO = [
  { w: 'Monday',    short: 'Mon', cn: '星期一', color: '#E85D75', parts: ['Mon', 'day'] },
  { w: 'Tuesday',   short: 'Tue', cn: '星期二', color: '#F5A623', parts: ['Tues', 'day'] },
  { w: 'Wednesday', short: 'Wed', cn: '星期三', color: '#5FBB4E', parts: ['Wednes', 'day'] },
  { w: 'Thursday',  short: 'Thu', cn: '星期四', color: '#26A69A', parts: ['Thurs', 'day'] },
  { w: 'Friday',    short: 'Fri', cn: '星期五', color: '#4A90D9', parts: ['Fri', 'day'] },
  { w: 'Saturday',  short: 'Sat', cn: '星期六', color: '#7C6CF6', parts: ['Satur', 'day'] },
  { w: 'Sunday',    short: 'Sun', cn: '星期日', color: '#FF6B9D', parts: ['Sun', 'day'] },
];
/* word entry for the Look/Listen pages */
const D = i => ({ w: DAY_INFO[i].w, day: i, cn: DAY_INFO[i].cn });
/* chunk-building entry: real parts + one wrong prefix to choose against */
const B = (i, dis) => ({ w: DAY_INFO[i].w, parts: DAY_INFO[i].parts, distract: DAY_INFO[dis].parts[0] });

const DAYS_LESSONS = [
  {
    id: 'd1', en: 'Lesson 1', cn: '第 1 课', theme: 'Mon · Tue · Wed', themeCn: '一周的开始',
    color: '#E85D75', icon: 'calendar',
    pages: ['look', 'listen', 'build', 'trace', 'speak'],
    words: [D(0), D(1), D(2)],
    trace: ['Mon', 'Tue', 'Wed', 'Monday'],
    build: [B(0, 1), B(1, 2), B(2, 0)],
    sentences: [
      { t: 'Today is Monday.', day: 0, cn: '今天是星期一。' },
      { t: 'I go to school on Tuesday.', icon: 'book', cn: '我星期二去上学。' },
      { t: 'Wednesday comes after Tuesday.', day: 2, cn: '星期三在星期二后面。' },
    ],
  },
  {
    id: 'd2', en: 'Lesson 2', cn: '第 2 课', theme: 'Thu · Fri', themeCn: '上学的最后两天',
    color: '#26A69A', icon: 'calendar',
    pages: ['look', 'listen', 'build', 'trace', 'speak'],
    words: [D(3), D(4), D(2), D(1)],
    trace: ['Thu', 'Fri', 'Friday', 'Thursday'],
    build: [B(3, 5), B(4, 3), B(2, 4)],
    sentences: [
      { t: 'Thursday is day four.', day: 3, cn: '星期四是第四天。' },
      { t: 'Friday is my favorite day!', day: 4, cn: '星期五是我最喜欢的一天!' },
      { t: 'I have school five days.', icon: 'book', cn: '我一周上五天学。' },
    ],
  },
  {
    id: 'd3', en: 'Lesson 3', cn: '第 3 课', theme: 'Sat · Sun', themeCn: '周末啦!',
    color: '#7C6CF6', icon: 'balloon',
    pages: ['look', 'listen', 'build', 'trace', 'speak'],
    words: [D(5), D(6), D(4)],
    trace: ['Sat', 'Sun', 'Sunday', 'Saturday'],
    build: [B(5, 6), B(6, 5), B(4, 0)],
    sentences: [
      { t: 'Saturday and Sunday are the weekend.', day: 5, cn: '星期六和星期日是周末。' },
      { t: 'I play on Saturday.', icon: 'ball', cn: '我星期六玩。' },
      { t: 'No school on Sunday!', icon: 'house', cn: '星期日不上学!' },
    ],
  },
  {
    id: 'd4', en: 'Lesson 4', cn: '第 4 课', theme: 'All Seven Days', themeCn: '七天排排队',
    color: '#4A90D9', icon: 'order',
    pages: ['look', 'order', 'listen', 'trace', 'speak'],
    words: [D(0), D(1), D(2), D(3), D(4), D(5), D(6)],
    order: [0, 1, 2, 3, 4, 5, 6],
    trace: ['Mon', 'Wed', 'Sat', 'Tuesday'],
    sentences: [
      { t: 'There are seven days in a week.', icon: 'order', cn: '一周有七天。' },
      { t: 'Monday is the first day.', day: 0, cn: '星期一是第一天。' },
      { t: 'Sunday is the last day.', day: 6, cn: '星期日是最后一天。' },
    ],
  },
  {
    id: 'd5', en: 'Lesson 5', cn: '第 5 课', theme: 'Today · Tomorrow', themeCn: '今天 明天 昨天',
    color: '#F5A623', icon: 'sun',
    pages: ['look', 'listen', 'order', 'trace', 'speak'],
    words: [
      { w: 'today', icon: 'calendar', cn: '今天' },
      { w: 'tomorrow', icon: 'sun', cn: '明天' },
      { w: 'yesterday', icon: 'moon', cn: '昨天' },
      { w: 'week', icon: 'order', cn: '一周' },
    ],
    order: [2, 3, 4, 5],
    trace: ['day', 'week', 'today', 'Sunday'],
    sentences: [
      { t: 'Today is Wednesday.', day: 2, cn: '今天是星期三。' },
      { t: 'Tomorrow is Thursday.', day: 3, cn: '明天是星期四。' },
      { t: 'Yesterday was Tuesday.', day: 1, cn: '昨天是星期二。' },
    ],
  },
  {
    id: 'd6', en: 'Lesson 6', cn: '第 6 课', theme: 'What Day Is It?', themeCn: '今天星期几?',
    color: '#5FBB4E', icon: 'chat',
    pages: ['look', 'listen', 'order', 'build', 'speak'],
    words: [D(0), D(2), D(4), D(5), D(6)],
    order: [3, 4, 5, 6],
    build: [B(1, 3), B(3, 1), B(5, 2)],
    sentences: [
      { t: 'What day is it today?', icon: 'chat', cn: '今天星期几?' },
      { t: 'It is Friday today!', day: 4, cn: '今天是星期五!' },
      { t: 'See you on Monday!', day: 0, cn: '星期一见!' },
    ],
  },
  {
    id: 'd7', en: 'Lesson 7', cn: '第 7 课', theme: 'The Week Song', themeCn: '一周儿歌 · 复习',
    color: '#FF6B9D', icon: 'trophy',
    pages: ['look', 'order', 'build', 'listen', 'speak'],
    words: [D(0), D(1), D(2), D(3), D(4), D(5), D(6)],
    order: [0, 1, 2, 3, 4, 5, 6],
    build: [B(2, 5), B(5, 3), B(6, 1)],
    sentences: [
      { t: 'Monday, Tuesday, Wednesday, Thursday.', icon: 'order', cn: '周一、周二、周三、周四。' },
      { t: 'Friday, Saturday, Sunday!', icon: 'balloon', cn: '周五、周六、周日!' },
      { t: 'Seven days in one week. Hooray!', icon: 'trophy', cn: '一周七天,好耶!' },
    ],
  },
];

/* ---------------- units ---------------- */
const UNITS = [
  {
    id: 'words', name: 'Everyday Words', cn: '主题词汇周',
    sub: '动物 · 食物 · 颜色 · 身体 · 天气', icon: 'star', color: '#5FBB4E',
    byWeekday: true, weekly: true, lessons: WEEK,
  },
  {
    id: 'days', name: 'Days of the Week', cn: '一周七天',
    sub: 'Monday → Sunday · 7 课', icon: 'calendar', color: '#4A90D9',
    byWeekday: false, weekly: false, lessons: DAYS_LESSONS,
  },
];

/* Page kinds used by the days unit, added to the five base kinds */
PAGE_KINDS.push(
  { id: 'build', name: 'Build It',     cn: '拼一拼', skill: '拼', icon: 'box',   color: '#5FBB4E' },
  { id: 'order', name: 'Put in Order', cn: '排一排', skill: '排', icon: 'order', color: '#7C6CF6' },
);
const KIND = id => PAGE_KINDS.find(k => k.id === id);

/* Mimi's lines */
const DAY_PRAISE = [
  'Yay! You did it!', 'Wonderful!', 'Super duper!', 'You are amazing!',
  'Great job!', 'Fantastic!', 'Wow, so smart!', 'High five!',
];
const DAY_RETRY = [
  'Oops! Try again!', 'Almost! One more try!', 'Hmm, not that one! You can do it!',
];

/* Streak badges */
const STREAK_BADGES = [
  { need: 2,  icon: 'star',    name: '2 days',  cn: '连续 2 天' },
  { need: 3,  icon: 'heart',   name: '3 days',  cn: '连续 3 天' },
  { need: 5,  icon: 'rainbow', name: '5 days',  cn: '连续 5 天' },
  { need: 7,  icon: 'trophy',  name: '7 days',  cn: '连续 7 天' },
  { need: 14, icon: 'crown',   name: '14 days', cn: '连续 14 天' },
];
