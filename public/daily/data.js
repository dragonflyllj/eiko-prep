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
