/* Mimi's Phonics Quest — learning content + level map */

/* ---------- Phonics: letters in teaching order (SATPIN-style sets) ---------- */
const LETTER_SETS = [
  { name: 'Sound Set 1', letters: ['s', 'a', 't', 'p', 'i', 'n'] },
  { name: 'Sound Set 2', letters: ['m', 'd', 'g', 'o', 'c', 'k'] },
  { name: 'Sound Set 3', letters: ['e', 'u', 'r', 'h', 'b', 'f'] },
  { name: 'Sound Set 4', letters: ['l', 'j', 'v', 'w', 'z'] },
  { name: 'Sound Set 5', letters: ['y', 'x', 'q'] },
];

/* say: text fed to speech synthesis to approximate the letter SOUND (not name) */
const LETTERS = {
  s: { say: 'sss',  word: 'sun',      icon: 'sun' },
  a: { say: 'ahh',  word: 'apple',    icon: 'apple' },
  t: { say: 'tuh',  word: 'ten',      icon: 'ten' },
  p: { say: 'puh',  word: 'pig',      icon: 'pig' },
  i: { say: 'ih',   word: 'igloo',    icon: 'igloo' },
  n: { say: 'nnn',  word: 'nest',     icon: 'nest' },
  m: { say: 'mmm',  word: 'moon',     icon: 'moon' },
  d: { say: 'duh',  word: 'dog',      icon: 'dog' },
  g: { say: 'guh',  word: 'grapes',   icon: 'grapes' },
  o: { say: 'oh',   word: 'octopus',  icon: 'octopus' },
  c: { say: 'kuh',  word: 'cat',      icon: 'cat' },
  k: { say: 'kuh',  word: 'kite',     icon: 'kite' },
  e: { say: 'eh',   word: 'egg',      icon: 'egg' },
  u: { say: 'uh',   word: 'umbrella', icon: 'umbrella' },
  r: { say: 'rrr',  word: 'rainbow',  icon: 'rainbow' },
  h: { say: 'huh',  word: 'hat',      icon: 'hat' },
  b: { say: 'buh',  word: 'ball',     icon: 'ball' },
  f: { say: 'fff',  word: 'fish',     icon: 'fish' },
  l: { say: 'lll',  word: 'leaf',     icon: 'leaf' },
  j: { say: 'juh',  word: 'jam',      icon: 'jam' },
  v: { say: 'vvv',  word: 'van',      icon: 'van' },
  w: { say: 'wuh',  word: 'web',      icon: 'web' },
  z: { say: 'zzz',  word: 'zebra',    icon: 'zebra' },
  y: { say: 'yuh',  word: 'yo-yo',    icon: 'yoyo' },
  x: { say: 'ks',   word: 'fox',      icon: 'fox', note: 'x hides at the END of fox!' },
  q: { say: 'kwuh', word: 'queen',    icon: 'queen' },
};

/* ---------- Word Builder: CVC words with pictures ---------- */
const BUILD_WORDS = [
  { w: 'cat', icon: 'cat' },   { w: 'dog', icon: 'dog' },
  { w: 'sun', icon: 'sun' },   { w: 'hat', icon: 'hat' },
  { w: 'pig', icon: 'pig' },   { w: 'bus', icon: 'bus' },
  { w: 'cup', icon: 'cup' },   { w: 'hen', icon: 'hen' },
  { w: 'fox', icon: 'fox' },   { w: 'jam', icon: 'jam' },
  { w: 'van', icon: 'van' },   { w: 'bed', icon: 'bed' },
  { w: 'bug', icon: 'bug' },   { w: 'mop', icon: 'mop' },
];

/* ---------- Rhyme Match: pairs that rhyme ---------- */
const RHYME_PAIRS = [
  ['cat', 'hat'], ['dog', 'log'], ['hen', 'pen'],
  ['fox', 'box'], ['van', 'fan'], ['cup', 'pup'],
];
const RHYME_ICONS = {
  cat: 'cat', hat: 'hat', dog: 'dog', log: 'log', hen: 'hen', pen: 'pen',
  fox: 'fox', box: 'box', van: 'van', fan: 'fan', cup: 'cup', pup: 'pup',
};

/* ---------- Talk Time: guided daily conversations ---------- */
/* Mimi speaks, the child picks an answer, says it out loud, Mimi reacts. */
const TALKS = [
  {
    id: 'hello', title: 'Saying Hello', sub: '打招呼', icon: 'wave', color: '#FF9F43',
    steps: [
      { m: 'Hello, hello! I am Mimi the cat! Who are you?',
        opts: [
          { t: 'Hello, Mimi! I am me!', r: 'Ha ha! Nice to meet you, my new friend!' },
          { t: 'Hi, Mimi!', r: 'Hi, hi! I am so happy to see you!' },
        ] },
      { m: 'How are you today?',
        opts: [
          { t: 'I am good!', r: 'Yay! I am good too. High five!' },
          { t: 'I am great!', r: 'Wow, great is the BEST! Me too!' },
          { t: 'I am sleepy.', r: 'Sleepy? Cats love naps! But first, a big stretch! Whoooo!' },
        ] },
      { m: 'When we meet in the morning, we say... Good morning! Can you say it?',
        opts: [
          { t: 'Good morning!', r: 'Good morning to you! The sun is up!' },
        ] },
      { m: 'And when we go to sleep, we say... Good night!',
        opts: [
          { t: 'Good night, Mimi!', r: 'Good night! But wait, do not sleep yet! Ha ha!' },
        ] },
      { m: 'Time to go! What do we say when we leave?',
        opts: [
          { t: 'Goodbye, Mimi!', r: 'Goodbye, friend! See you soon!' },
          { t: 'See you later!', r: 'See you later, alligator! That is a funny one!' },
        ] },
    ],
  },
  {
    id: 'feelings', title: 'How I Feel', sub: '我的心情', icon: 'heart', color: '#E85D75',
    steps: [
      { m: 'Look at my face! I am smiling! I feel HAPPY. How do you feel?',
        opts: [
          { t: 'I feel happy!', r: 'Hooray! Happy friends together!' },
          { t: 'I feel excited!', r: 'Excited! Me too! Wiggle wiggle!' },
        ] },
      { m: 'Sometimes I feel sad. Boo hoo. What do you say to a sad friend?',
        opts: [
          { t: 'Are you okay?', r: 'You are so kind! Yes, I am okay now!' },
          { t: 'I can help you!', r: 'Thank you! A helping friend is the best friend!' },
        ] },
      { m: 'GRRR! Sometimes I feel angry! What helps when you are angry?',
        opts: [
          { t: 'Take a big breath!', r: 'Yes! Breathe in... breathe out... Ahh, all better!' },
          { t: 'Count to ten!', r: 'One, two, three... all the way to ten! It works!' },
        ] },
      { m: 'When my tummy makes a rumble sound, I feel hungry! Are you hungry?',
        opts: [
          { t: 'Yes, I am hungry!', r: 'Then let us find a yummy snack after this!' },
          { t: 'No, I am full!', r: 'Full tummy, happy cat! I mean... happy YOU!' },
        ] },
      { m: 'You did it! Talking about feelings makes us strong. How do you feel NOW?',
        opts: [
          { t: 'I feel proud!', r: 'You should be proud! You are amazing!' },
          { t: 'I feel super!', r: 'Super duper! See you next time!' },
        ] },
    ],
  },
  {
    id: 'food', title: 'Yummy Food', sub: '好吃的', icon: 'cake', color: '#F48FB1',
    steps: [
      { m: 'My tummy is rumbling! I like fish. Yum, yum! What do you like?',
        opts: [
          { t: 'I like fish too!', r: 'Fish friends! Cats LOVE fish! Yum!' },
          { t: 'I like cake!', r: 'Cake! Sweet and soft! Save a bite for me!' },
          { t: 'I like apples!', r: 'Apples! Crunch, crunch! So healthy!' },
        ] },
      { m: 'Do you want some grapes? Say: Yes, please!',
        opts: [
          { t: 'Yes, please!', r: 'Here you go! Saying PLEASE is magic!' },
        ] },
      { m: 'Here are your grapes! What do we say?',
        opts: [
          { t: 'Thank you, Mimi!', r: 'You are welcome! Such good manners!' },
        ] },
      { m: 'Blah! I do not like mud pie! If you do not want food, say: No, thank you.',
        opts: [
          { t: 'No, thank you.', r: 'Perfect! Polite AND no mud pie. Smart!' },
        ] },
      { m: 'Mmm, everything was yummy! After we eat, we can say: I am full!',
        opts: [
          { t: 'I am full!', r: 'Me too! My tummy is round like a ball! Ha ha!' },
          { t: 'That was yummy!', r: 'So yummy! Let us eat together again soon!' },
        ] },
    ],
  },
  {
    id: 'family', title: 'My Family', sub: '我的家人', icon: 'house', color: '#5FBB4E',
    steps: [
      { m: 'This is my home! Who lives in your home?',
        opts: [
          { t: 'My mom and dad!', r: 'Moms and dads give the best hugs!' },
          { t: 'My family!', r: 'Family is the best team ever!' },
        ] },
      { m: 'I love my mom. Can you say: I love my mom?',
        opts: [
          { t: 'I love my mom!', r: 'She will be so happy to hear that!' },
        ] },
      { m: 'Do you have a brother or a sister?',
        opts: [
          { t: 'Yes, I do!', r: 'Playing together is so much fun!' },
          { t: 'No, it is just me!', r: 'Then YOU get all the cookies! Ha ha!' },
        ] },
      { m: 'At home, I help my family. I clean up my toys! Do you help too?',
        opts: [
          { t: 'Yes, I help!', r: 'What a big helper! Your family is lucky!' },
          { t: 'I can try!', r: 'Trying is how heroes start! You can do it!' },
        ] },
      { m: 'Before bed, I give my family a big hug. What do you say at bedtime?',
        opts: [
          { t: 'Good night! I love you!', r: 'That is the sweetest thing to say!' },
        ] },
    ],
  },
  {
    id: 'school', title: 'At School', sub: '在学校', icon: 'book', color: '#7C6CF6',
    steps: [
      { m: 'Time for school! I put my book in my bag. What do you put in your bag?',
        opts: [
          { t: 'My book!', r: 'Books are full of adventures!' },
          { t: 'My pencil!', r: 'A pencil! For writing and drawing!' },
        ] },
      { m: 'At school we see our teacher. What do we say?',
        opts: [
          { t: 'Good morning, teacher!', r: 'Your teacher will smile so big!' },
        ] },
      { m: 'I want to say something in class. What should I do?',
        opts: [
          { t: 'Raise my hand!', r: 'Yes! Hand up high, like reaching for a star!' },
        ] },
      { m: 'If I need to go to the toilet, I ask: May I go to the toilet, please?',
        opts: [
          { t: 'May I go to the toilet, please?', r: 'Perfect asking! Off you go, quick quick!' },
        ] },
      { m: 'Ring ring! School is done! I say to my friends: See you tomorrow!',
        opts: [
          { t: 'See you tomorrow!', r: 'See you tomorrow! School is fun with friends!' },
          { t: 'Bye bye, friends!', r: 'Bye bye! Time to go home and play!' },
        ] },
    ],
  },
  {
    id: 'weather', title: 'The Weather', sub: '天气', icon: 'cloud', color: '#4A90D9',
    steps: [
      { m: 'Look outside! The sun is out! It is sunny! Can you say it?',
        opts: [
          { t: 'It is sunny!', r: 'Sunny days are for playing outside!' },
        ] },
      { m: 'Drip, drop, drip, drop! What is the weather now?',
        opts: [
          { t: 'It is rainy!', r: 'Yes! Grab your umbrella! Splash in puddles!' },
        ] },
      { m: 'Brrr! I am shivering! My fur is cold! What should I wear?',
        opts: [
          { t: 'Wear a hat!', r: 'A warm hat for my ears! Thank you!' },
          { t: 'Wear a coat!', r: 'A big cozy coat! Now I am toasty warm!' },
        ] },
      { m: 'WHOOSH! The wind took my hat! It is windy! Say it with me!',
        opts: [
          { t: 'It is windy!', r: 'Whoooosh! Come back, little hat!' },
        ] },
      { m: 'After the rain, look up! Red, yellow, green, blue... What is it?',
        opts: [
          { t: 'A rainbow!', r: 'A beautiful rainbow! Weather is amazing!' },
        ] },
    ],
  },
];

/* ---------- Story Time: decodable stories with scenes ---------- */
const STORIES = [
  {
    id: 'redhat', title: 'The Red Hat', sub: '红帽子', icon: 'hat', color: '#E8483F',
    pages: [
      { text: 'A cat has a red hat.',
        scene: { bg: 'meadow', items: [
          { icon: 'cat', x: 100, y: 90, s: 0.9 }, { icon: 'hat', x: 108, y: 42, s: 0.75 } ] } },
      { text: 'The wind! The hat is up, up, up!',
        scene: { bg: 'sky', items: [
          { icon: 'hat', x: 140, y: 30, s: 0.8, r: -20 }, { icon: 'cat', x: 60, y: 120, s: 0.8 } ] } },
      { text: 'The hat lands on a dog.',
        scene: { bg: 'meadow', items: [
          { icon: 'dog', x: 130, y: 85, s: 0.9 }, { icon: 'hat', x: 136, y: 40, s: 0.7, r: 8 } ] } },
      { text: 'The dog hops on a log. Boing!',
        scene: { bg: 'meadow', items: [
          { icon: 'log', x: 120, y: 120, s: 0.9 }, { icon: 'dog', x: 128, y: 55, s: 0.8 },
          { icon: 'hat', x: 134, y: 18, s: 0.6, r: -10 } ] } },
      { text: 'Whoosh! Now the hat is on a hen!',
        scene: { bg: 'meadow', items: [
          { icon: 'hen', x: 130, y: 90, s: 0.9 }, { icon: 'hat', x: 138, y: 48, s: 0.65, r: 6 } ] } },
      { text: 'The hen naps in the hat. The cat laughs. Ha ha ha!',
        scene: { bg: 'night', items: [
          { icon: 'hat', x: 130, y: 100, s: 1.0, r: 180 }, { icon: 'hen', x: 138, y: 78, s: 0.7 },
          { icon: 'cat', x: 40, y: 95, s: 0.8 } ] } },
    ],
    quiz: { q: 'Who naps in the hat?', opts: [
      { icon: 'hen', t: 'the hen', ok: true }, { icon: 'dog', t: 'the dog' } ] },
  },
  {
    id: 'bigegg', title: 'The Big Egg', sub: '大鸡蛋', icon: 'egg', color: '#F5A623',
    pages: [
      { text: 'Mimi finds a big, big egg.',
        scene: { bg: 'meadow', items: [
          { hero: true, mood: 'think', x: 30, y: 55, s: 0.62 }, { icon: 'egg', x: 180, y: 90, s: 0.95 } ] } },
      { text: 'Tap, tap! The egg wiggles!',
        scene: { bg: 'meadow', items: [
          { hero: true, mood: 'oops', x: 30, y: 55, s: 0.62 }, { icon: 'egg', x: 180, y: 90, s: 0.95, r: 12 } ] } },
      { text: 'CRACK! What is in the egg?',
        scene: { bg: 'meadow', items: [
          { hero: true, mood: 'oops', x: 30, y: 55, s: 0.62 }, { icon: 'egg', x: 180, y: 90, s: 0.95, r: -14 } ] } },
      { text: 'A little chick! PEEP! The peep is very BIG!',
        scene: { bg: 'meadow', items: [
          { hero: true, mood: 'oops', x: 30, y: 55, s: 0.62 }, { icon: 'chick', x: 185, y: 95, s: 0.85 } ] } },
      { text: 'The big peep makes Mimi jump! Whoa!',
        scene: { bg: 'sky', items: [
          { hero: true, mood: 'oops', x: 90, y: 25, s: 0.6 }, { icon: 'chick', x: 190, y: 120, s: 0.8 } ] } },
      { text: 'Mimi and the chick are best friends now. Peep, peep!',
        scene: { bg: 'meadow', items: [
          { hero: true, mood: 'cheer', x: 40, y: 50, s: 0.65 }, { icon: 'chick', x: 190, y: 100, s: 0.8 },
          { icon: 'heart', x: 140, y: 40, s: 0.5 } ] } },
    ],
    quiz: { q: 'What was in the egg?', opts: [
      { icon: 'chick', t: 'a chick', ok: true }, { icon: 'fox', t: 'a fox' } ] },
  },
  {
    id: 'funbus', title: 'The Fun Bus', sub: '欢乐巴士', icon: 'bus', color: '#FFC93C',
    pages: [
      { text: 'Here comes the fun bus! Beep, beep!',
        scene: { bg: 'road', items: [ { icon: 'bus', x: 100, y: 70, s: 1.2 } ] } },
      { text: 'The cat gets on the bus.',
        scene: { bg: 'road', items: [
          { icon: 'bus', x: 130, y: 70, s: 1.1 }, { icon: 'cat', x: 40, y: 95, s: 0.7 } ] } },
      { text: 'The dog gets on the bus too.',
        scene: { bg: 'road', items: [
          { icon: 'bus', x: 130, y: 70, s: 1.1 }, { icon: 'dog', x: 40, y: 95, s: 0.7 } ] } },
      { text: 'The pig gets on. Now the bus is FULL!',
        scene: { bg: 'road', items: [
          { icon: 'bus', x: 130, y: 70, s: 1.1 }, { icon: 'pig', x: 40, y: 95, s: 0.7 } ] } },
      { text: 'But look! The hen sits on TOP of the bus!',
        scene: { bg: 'road', items: [
          { icon: 'bus', x: 130, y: 80, s: 1.1 }, { icon: 'hen', x: 150, y: 28, s: 0.6 } ] } },
      { text: 'Off they go! Beep, beep! What a fun, fun bus!',
        scene: { bg: 'road', items: [
          { icon: 'bus', x: 90, y: 75, s: 1.15 }, { icon: 'hen', x: 112, y: 24, s: 0.55 },
          { icon: 'cloud', x: 230, y: 30, s: 0.6 } ] } },
    ],
    quiz: { q: 'Who sits on top of the bus?', opts: [
      { icon: 'hen', t: 'the hen', ok: true }, { icon: 'pig', t: 'the pig' } ] },
  },
];

/* ---------- The Quest: 22 levels along the adventure path ----------
   type: letters | pop | build | rhyme | quiz | story | talk
   Pass rules live in app.js; boss levels are quiz checkpoints. */
const LEVELS = [
  { type: 'letters', set: 0, name: 'First Sounds',   sub: '字母发音 1', icon: 'speaker' },
  { type: 'pop',                name: 'Sound Pop',     sub: '泡泡游戏',   icon: 'balloon' },
  { type: 'letters', set: 1, name: 'More Sounds',   sub: '字母发音 2', icon: 'speaker' },
  { type: 'build',              name: 'Word Builder',  sub: '拼单词',     icon: 'box' },
  { type: 'rhyme',              name: 'Rhyme Match',   sub: '押韵配对',   icon: 'heart' },
  { type: 'letters', set: 2, name: 'New Sounds',    sub: '字母发音 3', icon: 'speaker' },
  { type: 'pop',                name: 'Sound Pop 2',   sub: '泡泡游戏 2', icon: 'balloon' },
  { type: 'quiz', pass: 6,   name: 'BOSS: Big Quiz', sub: '第一个大考验!', icon: 'trophy', boss: true },
  { type: 'story', id: 'redhat',  name: 'The Red Hat',  sub: '故事: 红帽子', icon: 'hat' },
  { type: 'talk',  id: 'hello',   name: 'Saying Hello', sub: '会话: 打招呼', icon: 'wave' },
  { type: 'letters', set: 3, name: 'Super Sounds',  sub: '字母发音 4', icon: 'speaker' },
  { type: 'build',              name: 'Word Builder 2', sub: '拼单词 2',  icon: 'box' },
  { type: 'talk',  id: 'feelings', name: 'How I Feel',  sub: '会话: 心情', icon: 'heart' },
  { type: 'story', id: 'bigegg',  name: 'The Big Egg',  sub: '故事: 大鸡蛋', icon: 'egg' },
  { type: 'letters', set: 4, name: 'Last Sounds',   sub: '字母发音 5', icon: 'speaker' },
  { type: 'rhyme',              name: 'Rhyme Match 2', sub: '押韵配对 2', icon: 'heart' },
  { type: 'talk',  id: 'food',    name: 'Yummy Food',   sub: '会话: 好吃的', icon: 'cake' },
  { type: 'talk',  id: 'family',  name: 'My Family',    sub: '会话: 家人', icon: 'house' },
  { type: 'story', id: 'funbus',  name: 'The Fun Bus',  sub: '故事: 欢乐巴士', icon: 'bus' },
  { type: 'talk',  id: 'school',  name: 'At School',    sub: '会话: 在学校', icon: 'book' },
  { type: 'talk',  id: 'weather', name: 'The Weather',  sub: '会话: 天气', icon: 'cloud' },
  { type: 'quiz', pass: 8,   name: 'FINAL BOSS!',   sub: '最终大考验!', icon: 'crown', boss: true },
];

/* ---------- Stickers: rewards for total stars (max 66) ---------- */
const STICKERS = [
  { need: 5,  icon: 'ball',    name: 'Bouncy Ball' },
  { need: 12, icon: 'rainbow', name: 'Rainbow' },
  { need: 20, icon: 'octopus', name: 'Dancing Octopus' },
  { need: 30, icon: 'kite',    name: 'Flying Kite' },
  { need: 42, icon: 'trophy',  name: 'Gold Trophy' },
  { need: 56, icon: 'crown',   name: 'Super Star Crown' },
];

/* Mimi's encouragement lines */
const PRAISE = [
  'Yay! You did it!', 'Wonderful!', 'Super duper!', 'You are amazing!',
  'Great job!', 'Fantastic!', 'Wow, so smart!', 'High five!',
];
const TRY_AGAIN = [
  'Oops! Try again!', 'Almost! One more try!', 'Hmm, not that one! You can do it!',
];
