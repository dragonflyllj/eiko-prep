/* Mimi's Phonics Quest — level-based adventure game logic */
(function () {
'use strict';

const $ = id => document.getElementById(id);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const btnIcon = name => iconInBubble(name, '#FFFFFF'); // white badge so icons stay visible on colored buttons

/* ---------------- progress (localStorage) ---------------- */
const SAVE_KEY = 'mimi-quest-v1';
let P = { prog: 0, levelStars: {}, letters: {}, quizBest: 0 };
try { Object.assign(P, JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')); } catch (e) {}
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(P)); } catch (e) {} }
function totalStars() { return Object.values(P.levelStars).reduce((a, b) => a + b, 0); }
function starPillHTML() { return iconSVG('star') + '<span>' + totalStars() + '</span>'; }

/* ---------------- speech ---------------- */
const synth = window.speechSynthesis;
let voice = null;
function pickVoice() {
  if (!synth) return;
  const vs = synth.getVoices();
  voice = vs.find(v => /en[-_]/.test(v.lang) && /female|child|kids|samantha|karen|zira|jenny|aria/i.test(v.name))
       || vs.find(v => v.lang === 'en-US') || vs.find(v => /^en/.test(v.lang)) || null;
}
if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }

let speakToken = 0;
function speak(text, opts, cb) {
  opts = opts || {};
  if (!synth) { if (cb) setTimeout(cb, 400); return; }
  const token = ++speakToken;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (voice) u.voice = voice;
  u.lang = (voice && voice.lang) || 'en-US';
  u.rate = opts.rate || 0.85;
  u.pitch = opts.pitch || 1.25;
  const catBox = opts.cat ? $(opts.cat) : null;
  if (catBox) catBox.innerHTML = catSVG('talk');
  let fired = false;
  const finish = () => {
    if (fired || token !== speakToken) return;
    fired = true;
    if (catBox) catBox.innerHTML = catSVG(opts.after || 'idle');
    if (cb) cb();
  };
  u.onend = u.onerror = finish;
  synth.speak(u);
  // watchdog: some devices never fire onend (e.g. no voices installed).
  setTimeout(function check() {
    if (fired || token !== speakToken) return;
    if (synth.speaking) setTimeout(check, 400);
    else finish();
  }, Math.max(3000, text.split(/\s+/).length * 600));
}
function stopSpeech() { speakToken++; if (synth) synth.cancel(); }

/* ---------------- sound effects (WebAudio, no assets) ---------------- */
let AC = null;
function ac() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (AC && AC.state === 'suspended') AC.resume(); return AC; }
function tone(freq, t0, dur, type, vol) {
  const c = ac(); if (!c) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type || 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(vol || 0.18, c.currentTime + t0);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t0 + dur);
  o.connect(g); g.connect(c.destination);
  o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + dur + 0.05);
}
const sfx = {
  tap:   () => tone(600, 0, 0.08, 'triangle', 0.12),
  good:  () => { tone(523, 0, 0.12, 'triangle'); tone(659, 0.1, 0.12, 'triangle'); tone(784, 0.2, 0.2, 'triangle'); },
  bad:   () => tone(180, 0, 0.25, 'square', 0.07),
  pop:   () => { tone(880, 0, 0.07, 'sine', 0.2); tone(1320, 0.05, 0.08, 'sine', 0.15); },
  star:  () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.18, 'triangle', 0.16)); },
  page:  () => tone(440, 0, 0.06, 'sine', 0.08),
  fanfare: () => { [392, 392, 392, 523, 659, 784].forEach((f, i) => tone(f, i * 0.13, 0.22, 'triangle', 0.16)); },
};

/* ---------------- confetti ---------------- */
function confetti() {
  const box = $('confetti');
  const colors = ['#9DB8CE', '#4A90D9', '#5FBB4E', '#F48FB1', '#FFC93C', '#7C6CF6'];
  for (let i = 0; i < 36; i++) {
    const d = document.createElement('div');
    d.className = 'conf';
    d.style.left = Math.random() * 100 + '%';
    d.style.background = pick(colors);
    d.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
    d.style.animationDuration = (1.6 + Math.random() * 1.4) + 's';
    d.style.animationDelay = (Math.random() * 0.5) + 's';
    box.appendChild(d);
    setTimeout(() => d.remove(), 3600);
  }
}

/* ---------------- screens ---------------- */
function show(id) {
  stopSpeech();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  $('topbar').classList.toggle('hidden', id === 'map');
  window.scrollTo(0, 0);
}
$('backBtn').innerHTML = '<svg viewBox="0 0 100 100"><path d="M62 20 L30 50 L62 80" stroke="#7E9DB8" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
$('backBtn').onclick = () => { sfx.tap(); backToMap(); };

/* ================= LEVEL ENGINE ================= */
let curLevel = 0;

function startLevel(i) {
  curLevel = i;
  const L = LEVELS[i];
  $('lvlLabel').innerHTML = `Level ${i + 1}<span>${L.sub}</span>`;
  if (L.type === 'letters') {
    letterList = LETTER_SETS[L.set].letters;
    letterIdx = 0;
    show('letterCard');
    openLetterCard();
  } else if (L.type === 'pop') startPop();
  else if (L.type === 'build') startBuild();
  else if (L.type === 'rhyme') startRhyme();
  else if (L.type === 'quiz') startQuiz(L.pass || 6);
  else if (L.type === 'talk') startTalk(TALKS.find(t => t.id === L.id));
  else if (L.type === 'story') startStory(STORIES.find(s => s.id === L.id));
}

function levelComplete(stars, sayText) {
  const L = LEVELS[curLevel];
  const prev = P.levelStars[curLevel] || 0;
  P.levelStars[curLevel] = Math.max(prev, stars);
  if (curLevel === P.prog) P.prog = Math.min(P.prog + 1, LEVELS.length);
  save();
  const finished = curLevel === LEVELS.length - 1;
  $('celCat').innerHTML = catSVG('cheer');
  $('celMsg').textContent = finished ? 'QUEST COMPLETE! You are a champion!' : `Level ${curLevel + 1} clear!`;
  $('celStars').innerHTML = iconSVG('star').repeat(stars);
  $('celBtn').textContent = finished ? 'Hooray!' : 'Next!';
  $('celebrate').classList.remove('hidden');
  confetti();
  if (L.boss || finished) sfx.fanfare(); else sfx.star();
  speak(sayText || (finished
    ? 'You finished the whole quest! You are my English champion! Meow meow hooray!'
    : `Level clear! ${stars === 3 ? 'Three stars! Purr-fect!' : pick(PRAISE)}`),
    { cat: 'celCat', after: 'cheer' });
  $('celBtn').onclick = () => {
    stopSpeech();
    $('celebrate').classList.add('hidden');
    backToMap();
  };
}

function levelFail(msg, sayText) {
  $('failCat').innerHTML = catSVG('oops');
  $('failMsg').textContent = msg;
  $('failbox').classList.remove('hidden');
  sfx.bad();
  speak(sayText || 'So close! Cats always try again. Let us go one more time!', { cat: 'failCat', after: 'think' });
  $('failRetry').onclick = () => { sfx.tap(); stopSpeech(); $('failbox').classList.add('hidden'); startLevel(curLevel); };
  $('failMap').onclick = () => { sfx.tap(); stopSpeech(); $('failbox').classList.add('hidden'); backToMap(); };
}

function backToMap() {
  renderMap();
  show('map');
  // scroll the current level into view
  const cur = document.querySelector('.lvl-node.cur') || document.querySelector('.lvl-node.done:last-of-type');
  if (cur) setTimeout(() => cur.scrollIntoView({ block: 'center', behavior: 'smooth' }), 80);
}

/* ================= QUEST MAP ================= */
const TRAIL_X = [26, 50, 74, 50]; // snake pattern (percent)
const TRAIL_STEP = 112;

function renderMap() {
  $('mapStars').innerHTML = starPillHTML();
  $('mapCat').innerHTML = catSVG('happy');
  const got = STICKERS.filter(s => totalStars() >= s.need).length;
  $('stickerBtn').innerHTML = iconSVG('trophy') + `<span>${got}/${STICKERS.length}</span>`;
  const done = P.prog;
  $('mapBubble').textContent = done === 0
    ? "Let's go! Tap Level 1!"
    : done >= LEVELS.length
      ? 'You beat every level! You are amazing!'
      : `You cleared ${done} ${done === 1 ? 'level' : 'levels'}! On to Level ${done + 1}!`;

  const trail = $('mapTrail');
  const H = LEVELS.length * TRAIL_STEP + 60;
  trail.style.height = H + 'px';
  trail.innerHTML = '';

  // dotted path connecting the levels
  const w = trail.clientWidth || 400;
  const pts = LEVELS.map((_, i) => [w * TRAIL_X[i % 4] / 100, i * TRAIL_STEP + 58]);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    d += ` C ${x0} ${y0 + 56}, ${x1} ${y1 - 56}, ${x1} ${y1}`;
  }
  trail.insertAdjacentHTML('beforeend',
    `<svg class="trail-path" width="${w}" height="${H}" viewBox="0 0 ${w} ${H}">
       <path d="${d}" fill="none" stroke="#E8D9BF" stroke-width="10" stroke-linecap="round" stroke-dasharray="1 22"/>
     </svg>`);

  LEVELS.forEach((L, i) => {
    const state = i < P.prog ? 'done' : i === P.prog ? 'cur' : 'locked';
    const stars = P.levelStars[i] || 0;
    const node = document.createElement('button');
    node.className = `lvl-node ${state}${L.boss ? ' boss' : ''}`;
    node.style.left = TRAIL_X[i % 4] + '%';
    node.style.top = (i * TRAIL_STEP + 58) + 'px';
    node.innerHTML = `
      <span class="lvl-num">${i + 1}</span>
      ${iconSVG(state === 'locked' ? 'lock' : L.icon)}
      <span class="lvl-stars">${stars ? iconSVG('star').repeat(stars) : ''}</span>
      <span class="lvl-name">${L.name}<i>${L.sub}</i></span>`;
    node.onclick = () => {
      sfx.tap();
      if (state === 'locked') {
        node.classList.remove('shake'); void node.offsetWidth; node.classList.add('shake');
        speak(`Clear level ${P.prog + 1} first! You can do it!`, {});
        return;
      }
      startLevel(i);
    };
    trail.appendChild(node);
    if (state === 'cur') {
      const cat = document.createElement('div');
      cat.className = 'trail-cat';
      cat.style.left = (TRAIL_X[i % 4] + (TRAIL_X[i % 4] <= 30 ? 16 : -16)) + '%';
      cat.style.top = (i * TRAIL_STEP + 44) + 'px';
      cat.innerHTML = catSVG('idle');
      trail.appendChild(cat);
    }
  });
}
$('mapCat').addEventListener('click', () => {
  sfx.tap();
  speak(pick(['Meow! I am Mimi the cat!', 'Let us clear some levels!', 'You are my favorite friend!', 'Adventure time! Meow!']),
    { cat: 'mapCat', after: 'happy' });
});
$('stickerBtn').onclick = () => { sfx.tap(); renderStickers(); show('stickers'); };

/* ================= LETTER LEVELS ================= */
let letterList = [], letterIdx = 0;

function openLetterCard() {
  const l = letterList[letterIdx];
  const d = LETTERS[l];
  const wordHtml = d.word.split('').map((ch, i) =>
    (d.word.indexOf(l) === i || (l === 'x' && ch === 'x')) ? `<b>${ch}</b>` : ch).join('');
  $('lcCard').innerHTML = `
    <div class="bc-char">${l.toUpperCase()}<span class="low">${l}</span></div>
    ${iconSVG(d.icon)}
    <div class="bc-word">${wordHtml}</div>
    ${d.note ? `<div class="bc-note">${d.note}</div>` : ''}`;
  $('lcHear').innerHTML = btnIcon('speaker') + 'Hear it';
  $('lcSay').innerHTML = btnIcon('mic') + 'You say it!';
  $('lcDone').innerHTML = btnIcon('check') + (letterIdx === letterList.length - 1 ? 'I know it! Finish!' : 'I know it!');
  $('lcDots').innerHTML = letterList.map((_, i) => `<span class="${i === letterIdx ? 'on' : ''}"></span>`).join('');
  sayLetter(l);
}
function sayLetter(l) {
  const d = LETTERS[l];
  speak(`${l}. ${l} says ${d.say}. ${d.say}, ${d.say}, ${d.word}!`, {});
}
$('lcHear').onclick = () => { sfx.tap(); sayLetter(letterList[letterIdx]); };
$('lcSay').onclick = () => {
  sfx.tap();
  const d = LETTERS[letterList[letterIdx]];
  speak(`Your turn! Say it nice and loud: ${d.say}!`, {}, () =>
    setTimeout(() => speak(pick(PRAISE), {}), 1500));
};
$('lcDone').onclick = () => {
  sfx.good();
  P.letters[letterList[letterIdx]] = 1;
  save();
  if (letterIdx < letterList.length - 1) {
    letterIdx++;
    openLetterCard();
  } else {
    levelComplete(3, 'You learned all the new sounds! Three stars! Meow-velous!');
  }
};

/* helper: letters the child has met so far (fallback: first two sets) */
function learnedPool() {
  const learned = Object.keys(P.letters);
  return learned.length >= 6 ? learned
    : [...new Set(LETTER_SETS[0].letters.concat(learned))];
}

/* ================= LEVEL: SOUND POP ================= */
const POP_COLORS = ['#4A90D9', '#E85D75', '#5FBB4E', '#F5A623', '#7C6CF6'];
let pop = null;
function startPop() {
  pop = { round: 0, total: 8, score: 0, pool: learnedPool() };
  show('gPop');
  $('popHear').innerHTML = iconSVG('speaker');
  popRound();
}
function popRound() {
  if (pop.round >= pop.total) return popEnd();
  pop.round++;
  const target = pick(pop.pool);
  const others = shuffle(pop.pool.filter(l => l !== target && LETTERS[l].say !== LETTERS[target].say)).slice(0, 3);
  pop.target = target;
  $('popPrompt').textContent = 'Pop the bubble that says...';
  $('popProgress').textContent = `Bubble ${pop.round} of ${pop.total} · Score ${pop.score}`;
  const area = $('popArea');
  area.innerHTML = '';
  const spots = shuffle([[8, 8], [52, 14], [14, 44], [56, 50], [30, 72]]).slice(0, 4);
  shuffle([target].concat(others)).forEach((l, i) => {
    const b = document.createElement('button');
    b.className = 'pop-bubble';
    b.textContent = l;
    b.style.background = POP_COLORS[i % POP_COLORS.length];
    b.style.left = spots[i][0] + '%';
    b.style.top = spots[i][1] + '%';
    b.style.animationDelay = (Math.random() * 1.2) + 's';
    b.onclick = () => popTap(b, l);
    area.appendChild(b);
  });
  speak(`Pop the bubble that says ${LETTERS[target].say}! ${LETTERS[target].say}!`, {});
}
$('popHear').onclick = () => { sfx.tap(); if (pop) speak(`${LETTERS[pop.target].say}! ${LETTERS[pop.target].say}!`, {}); };
function popTap(b, l) {
  if (pop.locked) return;
  if (l === pop.target) {
    pop.locked = true;
    sfx.pop(); pop.score++;
    b.classList.add('popping');
    speak(pick(PRAISE), {}, null);
    setTimeout(() => { pop.locked = false; popRound(); }, 700);
  } else {
    // a wrong pop uses up this bubble round
    pop.locked = true;
    sfx.bad();
    b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope');
    document.querySelectorAll('.pop-bubble').forEach(x => {
      if (x.textContent === pop.target) x.classList.add('popping');
    });
    speak(`Oops! It was ${pop.target}! ${LETTERS[pop.target].say}!`, {});
    setTimeout(() => { pop.locked = false; popRound(); }, 1300);
  }
}
function popEnd() {
  if (pop.score >= 6) {
    const stars = pop.score >= 8 ? 3 : pop.score >= 7 ? 2 : 1;
    levelComplete(stars, `Pop pop pop! You popped ${pop.score} bubbles! You have super cat ears!`);
  } else {
    levelFail(`You popped ${pop.score} of ${pop.total}. Pop 6 to clear!`);
  }
}

/* ================= LEVEL: WORD BUILDER ================= */
let build = null;
function startBuild() {
  build = { words: shuffle(BUILD_WORDS).slice(0, 4), idx: 0, next: 0, mistakes: 0 };
  show('gBuild');
  buildWord();
}
function buildWord() {
  const item = build.words[build.idx];
  const w = item.w;
  build.next = 0;
  $('buildPic').innerHTML = iconInBubble(item.icon, '#FFF4DC');
  $('buildSlots').innerHTML = w.split('').map(() => '<div class="build-slot"></div>').join('');
  $('buildTiles').innerHTML = shuffle(w.split('')).map(ch =>
    `<button class="build-tile" data-ch="${ch}">${ch}</button>`).join('');
  $('buildProgress').textContent = `Word ${build.idx + 1} of ${build.words.length}`;
  $('buildTiles').querySelectorAll('.build-tile').forEach(t => { t.onclick = () => buildTap(t, w); });
  speak(`Can you build the word... ${w}? ${w}!`, {});
}
function buildTap(tile, w) {
  const ch = tile.dataset.ch;
  if (ch === w[build.next]) {
    sfx.tap();
    tile.classList.add('used');
    const slots = $('buildSlots').children;
    slots[build.next].textContent = ch;
    slots[build.next].classList.add('filled');
    build.next++;
    const ld = LETTERS[ch];
    if (build.next < w.length) {
      speak(ld ? ld.say : ch, { rate: 0.8 });
    } else {
      const sounds = w.split('').map(c => (LETTERS[c] ? LETTERS[c].say : c)).join('... ');
      sfx.good();
      speak(`${sounds}... ${w}! ${w}! ${pick(PRAISE)}`, {}, () => {
        build.idx++;
        if (build.idx < build.words.length) buildWord();
        else {
          const stars = build.mistakes === 0 ? 3 : build.mistakes <= 2 ? 2 : 1;
          levelComplete(stars, 'You built all the words! What a word builder!');
        }
      });
    }
  } else {
    sfx.bad();
    build.mistakes++;
    tile.classList.remove('nope'); void tile.offsetWidth; tile.classList.add('nope');
    setTimeout(() => tile.classList.remove('nope'), 450);
    speak(pick(TRY_AGAIN), {});
  }
}

/* ================= LEVEL: RHYME MATCH ================= */
let rhyme = null;
function startRhyme() {
  const pairs = shuffle(RHYME_PAIRS).slice(0, 4);
  const cards = shuffle(pairs.flatMap((p, pi) => p.map(w => ({ w, pi }))));
  rhyme = { cards, open: [], matched: 0, misses: 0, lock: false, total: pairs.length };
  show('gRhyme');
  $('rhymeGrid').innerHTML = cards.map((c, i) => `
    <button class="rhyme-card" data-i="${i}">
      <div class="rc-back"><svg viewBox="0 0 100 100">${ICONS.star}</svg></div>
      <div class="rc-face">${iconSVG(RHYME_ICONS[c.w])}<span>${c.w}</span></div>
    </button>`).join('');
  $('rhymeGrid').querySelectorAll('.rhyme-card').forEach(b => { b.onclick = () => rhymeTap(b); });
  speak('Find two words that rhyme! Like cat... and hat!', {});
}
function rhymeTap(b) {
  if (rhyme.lock || b.classList.contains('open')) return;
  const c = rhyme.cards[+b.dataset.i];
  sfx.tap();
  b.classList.add('open');
  speak(c.w, { rate: 0.85 });
  rhyme.open.push(b);
  if (rhyme.open.length === 2) {
    rhyme.lock = true;
    const [a, bb] = rhyme.open;
    const ca = rhyme.cards[+a.dataset.i], cb = rhyme.cards[+bb.dataset.i];
    setTimeout(() => {
      if (ca.pi === cb.pi) {
        sfx.good();
        a.classList.add('matched'); bb.classList.add('matched');
        speak(`${ca.w} and ${cb.w}! They rhyme! ${pick(PRAISE)}`, {});
        rhyme.matched++;
        if (rhyme.matched === rhyme.total) {
          const stars = rhyme.misses <= 1 ? 3 : rhyme.misses <= 3 ? 2 : 1;
          setTimeout(() => levelComplete(stars, 'Cat, hat! Dog, log! You are the rhyme king!'), 900);
        }
      } else {
        sfx.bad();
        rhyme.misses++;
        a.classList.remove('open'); bb.classList.remove('open');
        speak('Hmm, those do not rhyme. Try again!', {});
      }
      rhyme.open = []; rhyme.lock = false;
    }, 900);
  }
}

/* ================= LEVEL: QUIZ (boss) ================= */
let quiz = null;
function makeQuizQuestions() {
  const learned = Object.keys(P.letters);
  const letterPool = learned.length >= 8 ? learned : [...new Set(LETTER_SETS[0].letters.concat(LETTER_SETS[1].letters, learned))];
  const qs = [];
  shuffle(letterPool).slice(0, 4).forEach(l => {
    const wrong = shuffle(letterPool.filter(x => x !== l && LETTERS[x].say !== LETTERS[l].say)).slice(0, 3);
    qs.push({ type: 'sound2letter', target: l, opts: shuffle([l].concat(wrong)) });
  });
  shuffle(BUILD_WORDS).slice(0, 3).forEach(bw => {
    const l = bw.w[0];
    const wrong = shuffle(letterPool.filter(x => x !== l && LETTERS[x].say !== LETTERS[l].say)).slice(0, 3);
    qs.push({ type: 'pic2letter', word: bw, target: l, opts: shuffle([l].concat(wrong)) });
  });
  shuffle(BUILD_WORDS).slice(0, 3).forEach(bw => {
    const wrong = shuffle(BUILD_WORDS.filter(x => x.w !== bw.w)).slice(0, 3);
    qs.push({ type: 'word2pic', word: bw, opts: shuffle([bw].concat(wrong)) });
  });
  return shuffle(qs).slice(0, 10);
}
function startQuiz(passScore) {
  quiz = { qs: makeQuizQuestions(), i: 0, score: 0, answered: false, pass: passScore };
  show('quiz');
  quizQuestion();
}
function quizQuestion() {
  const q = quiz.qs[quiz.i];
  quiz.answered = false;
  $('quizNum').textContent = `Question ${quiz.i + 1} of ${quiz.qs.length} · Score ${quiz.score} · Need ${quiz.pass}`;
  $('quizCat').innerHTML = catSVG('think');
  let qHtml = '', say = '';
  if (q.type === 'sound2letter') {
    say = `Which letter says ${LETTERS[q.target].say}?`;
    qHtml = `<div>Which letter says the sound?</div>
      <button class="qz-hear">${iconSVG('speaker')}Hear it</button>`;
    $('quizOpts').innerHTML = q.opts.map(l => `<button class="quiz-opt" data-v="${l}">${l.toUpperCase()} ${l}</button>`).join('');
  } else if (q.type === 'pic2letter') {
    say = `What sound does ${q.word.w} start with?`;
    qHtml = `${iconSVG(q.word.icon)}<div>What sound does <b>${q.word.w}</b> start with?</div>`;
    $('quizOpts').innerHTML = q.opts.map(l => `<button class="quiz-opt" data-v="${l}">${l.toUpperCase()} ${l}</button>`).join('');
  } else {
    say = `Find the word... ${q.word.w}!`;
    qHtml = `<div>Find the word:</div><div style="font-size:2rem;letter-spacing:4px">${q.word.w}</div>
      <button class="qz-hear">${iconSVG('speaker')}Hear it</button>`;
    $('quizOpts').innerHTML = q.opts.map(o => `<button class="quiz-opt" data-v="${o.w}">${iconSVG(o.icon)}</button>`).join('');
  }
  $('quizQ').innerHTML = qHtml;
  const hear = $('quizQ').querySelector('.qz-hear');
  if (hear) hear.onclick = () => { sfx.tap(); speak(say, {}); };
  $('quizOpts').querySelectorAll('.quiz-opt').forEach(b => { b.onclick = () => quizAnswer(b, q); });
  speak(say, {});
}
function quizAnswer(b, q) {
  if (quiz.answered) return;
  quiz.answered = true;
  const v = b.dataset.v;
  const correct = q.type === 'word2pic' ? v === q.word.w : v === q.target;
  if (correct) {
    quiz.score++; sfx.good();
    b.classList.add('ok');
    $('quizCat').innerHTML = catSVG('cheer');
    speak(pick(PRAISE), {});
  } else {
    sfx.bad();
    b.classList.add('no');
    $('quizCat').innerHTML = catSVG('oops');
    $('quizOpts').querySelectorAll('.quiz-opt').forEach(o => {
      const ok = q.type === 'word2pic' ? o.dataset.v === q.word.w : o.dataset.v === q.target;
      if (ok) o.classList.add('ok');
    });
    speak('Oops! This one! You will get it next time!', {});
  }
  setTimeout(() => {
    quiz.i++;
    if (quiz.i < quiz.qs.length) quizQuestion();
    else quizEnd();
  }, 1400);
}
function quizEnd() {
  const s = quiz.score;
  if (s > (P.quizBest || 0)) P.quizBest = s;
  save();
  if (s >= quiz.pass) {
    const stars = s >= 9 ? 3 : s >= 7 ? 2 : 1;
    levelComplete(stars, `You beat the boss quiz with ${s} out of 10! You are a phonics champion!`);
  } else {
    levelFail(`You got ${s} of 10. Get ${quiz.pass} to beat the boss!`,
      `You got ${s}! The boss is tricky. Practice your sounds and try again!`);
  }
}

/* ================= LEVEL: TALK ================= */
let talk = null;
function startTalk(t) {
  talk = { t, step: 0 };
  show('talk');
  talkStep();
}
function talkStep() {
  const t = talk.t, st = t.steps[talk.step];
  $('talkProgress').textContent = `${talk.step + 1} of ${t.steps.length}`;
  $('talkCat').innerHTML = catSVG('idle');
  $('talkBubble').textContent = st.m;
  $('talkPrompt').innerHTML = iconSVG('ear') + 'Listen to Mimi...';
  $('talkOpts').innerHTML = '';
  speak(st.m, { cat: 'talkCat' }, () => {
    $('talkPrompt').innerHTML = iconSVG('chat') + 'Tap what YOU want to say!';
    $('talkOpts').innerHTML = st.opts.map((o, i) =>
      `<button class="talk-opt" data-i="${i}">${iconSVG('chat')}${o.t}</button>`).join('');
    $('talkOpts').querySelectorAll('.talk-opt').forEach(b => {
      b.onclick = () => talkChoose(st.opts[+b.dataset.i]);
    });
  });
}
function talkChoose(opt) {
  sfx.tap();
  talk.opt = opt;
  $('talkPrompt').innerHTML = iconSVG('speaker') + 'Listen, then say it out loud!';
  $('talkOpts').innerHTML = `
    <button class="talk-opt big-say">${btnIcon('speaker')}${opt.t}</button>
    <button class="talk-opt mic-btn">${btnIcon('mic')}I said it!</button>`;
  const btns = $('talkOpts').querySelectorAll('.talk-opt');
  btns[0].onclick = () => { sfx.tap(); speak(opt.t, { rate: 0.75 }); };
  btns[1].onclick = () => talkSaid();
  speak(opt.t, { rate: 0.75 }, () => {
    $('talkPrompt').innerHTML = iconSVG('mic') + 'Your turn! Say it loud, then tap "I said it!"';
  });
}
function talkSaid() {
  sfx.good();
  const opt = talk.opt;
  $('talkOpts').innerHTML = '';
  $('talkPrompt').innerHTML = iconSVG('star') + 'Wonderful talking!';
  $('talkCat').innerHTML = catSVG('happy');
  $('talkBubble').textContent = opt.r;
  speak(opt.r, { cat: 'talkCat', after: 'happy' }, () => {
    talk.step++;
    if (talk.step < talk.t.steps.length) {
      setTimeout(talkStep, 400);
    } else {
      levelComplete(3, 'You talked with me in English! That makes me so happy! Meow!');
    }
  });
}

/* ================= LEVEL: STORY ================= */
let story = null;
function startStory(s) {
  story = { s, page: -1, firstTry: true };
  $('storyRead').classList.remove('hidden');
  $('storyNext').classList.remove('hidden');
  $('storyDots').style.gap = '';
  show('story');
  storyPage();
}
function storyPage() {
  const s = story.s;
  sfx.page();
  if (story.page === -1) {
    $('storyScene').innerHTML = sceneSVG({ bg: 'meadow', items: [{ hero: true, mood: 'happy', x: 110, y: 40, s: 0.7 }] });
    $('storyText').innerHTML = `<span class="story-title-page">${s.title}</span>`;
    $('storyRead').innerHTML = btnIcon('speaker') + 'Read to me';
    $('storyNext').innerHTML = 'Open the book!';
    $('storyDots').innerHTML = '';
    speak(`Story time! This story is called... ${s.title}! Let us read it together!`, {});
    return;
  }
  if (story.page >= s.pages.length) return storyQuiz();
  const pg = s.pages[story.page];
  $('storyScene').innerHTML = sceneSVG(pg.scene);
  $('storyText').innerHTML = pg.text.split(' ').map(w =>
    `<span class="story-word">${w}&nbsp;</span>`).join('');
  $('storyRead').innerHTML = btnIcon('speaker') + 'Read it';
  $('storyNext').innerHTML = (story.page === s.pages.length - 1 ? 'The end!' : 'Next page');
  $('storyDots').innerHTML = s.pages.map((_, i) => `<span class="${i === story.page ? 'on' : ''}"></span>`).join('');
  $('storyText').querySelectorAll('.story-word').forEach(sp => {
    sp.onclick = () => {
      sfx.tap();
      sp.classList.add('lit');
      setTimeout(() => sp.classList.remove('lit'), 600);
      speak(sp.textContent.replace(/[^a-zA-Z']/g, ''), { rate: 0.75 });
    };
  });
  readPage();
}
function readPage() {
  const pg = story.s.pages[story.page];
  const words = $('storyText').querySelectorAll('.story-word');
  const dur = pg.text.split(' ').length * 380;
  words.forEach((w, i) => {
    setTimeout(() => { w.classList.add('lit'); setTimeout(() => w.classList.remove('lit'), 380); }, i * (dur / words.length));
  });
  speak(pg.text, { rate: 0.8 });
}
$('storyRead').onclick = () => {
  sfx.tap();
  if (story.page === -1) speak(`${story.s.title}!`, {});
  else readPage();
};
$('storyNext').onclick = () => { story.page++; storyPage(); };
function storyQuiz() {
  const s = story.s;
  $('storyScene').innerHTML = sceneSVG({ bg: 'meadow', items: [{ hero: true, mood: 'think', x: 110, y: 40, s: 0.7 }] });
  $('storyText').innerHTML = `<b>${s.quiz.q}</b>`;
  $('storyRead').classList.add('hidden');
  $('storyNext').classList.add('hidden');
  $('storyDots').innerHTML = s.quiz.opts.map(o => `
    <button class="quiz-opt" data-ok="${o.ok ? 1 : 0}" style="width:130px">${iconSVG(o.icon)}<span>${o.t}</span></button>`).join('');
  $('storyDots').style.gap = '14px';
  $('storyDots').querySelectorAll('.quiz-opt').forEach(b => {
    b.onclick = () => {
      if (b.dataset.ok === '1') {
        sfx.good(); b.classList.add('ok');
        setTimeout(() => levelComplete(story.firstTry ? 3 : 2,
          `Yes! ${s.quiz.opts.find(o => o.ok).t}! You listened so well!`), 600);
      } else {
        sfx.bad(); b.classList.add('no');
        story.firstTry = false;
        speak('Hmm, think again! You can do it!', {});
        setTimeout(() => b.classList.remove('no'), 700);
      }
    };
  });
  speak(s.quiz.q, {});
}

/* ================= STICKERS ================= */
function renderStickers() {
  $('stickerGrid').innerHTML = STICKERS.map(s => {
    const got = totalStars() >= s.need;
    return `<div class="sticker-cell${got ? '' : ' locked'}">
      ${iconSVG(s.icon)}
      <div class="sticker-name">${got ? s.name : '???'}</div>
      <div class="sticker-need">${iconSVG('star')} ${s.need} stars</div>
    </div>`;
  }).join('');
  $('lvlLabel').innerHTML = 'Sticker Book<span>贴纸册</span>';
}

/* ---------------- boot ---------------- */
$('starCount').innerHTML = starPillHTML();
// keep the topbar pill fresh whenever the map re-renders
const _renderMap = renderMap;
renderMap = function () { _renderMap(); $('starCount').innerHTML = starPillHTML(); };

renderMap();
show('map');
document.body.addEventListener('pointerdown', () => ac(), { once: true });

/* tiny hook for automated testing */
window.MQ = {
  startLevel, levelComplete, levelFail, backToMap,
  get state() { return P; },
  get pop() { return pop; }, get quiz() { return quiz; },
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
})();
