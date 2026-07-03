/* Momo's Phonics Adventure — app logic */
(function () {
'use strict';

const $ = id => document.getElementById(id);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const btnIcon = name => iconInBubble(name, '#FFFFFF'); // white badge so icons stay visible on colored buttons

/* ---------------- progress (localStorage) ---------------- */
const SAVE_KEY = 'momo-phonics-v1';
let P = { stars: 0, letters: {}, setStars: {}, gameStars: {}, talkStars: {}, storyStars: {}, quizBest: 0 };
try { Object.assign(P, JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')); } catch (e) {}
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(P)); } catch (e) {} }
function addStars(n) { P.stars += n; save(); renderStarCount(); }
function renderStarCount() { $('starCount').innerHTML = iconSVG('star') + '<span>' + P.stars + '</span>'; }

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
  const momoBox = opts.momo ? $(opts.momo) : null;
  if (momoBox) momoBox.innerHTML = momoSVG('talk');
  let fired = false;
  const finish = () => {
    if (fired || token !== speakToken) return;
    fired = true;
    if (momoBox) momoBox.innerHTML = momoSVG(opts.after || 'idle');
    if (cb) cb();
  };
  u.onend = u.onerror = finish;
  synth.speak(u);
  // watchdog: some devices never fire onend (e.g. no voices installed).
  // After the expected duration, finish once the engine is no longer speaking.
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
};

/* ---------------- confetti ---------------- */
function confetti() {
  const box = $('confetti');
  const colors = ['#FF8A3D', '#4A90D9', '#5FBB4E', '#F48FB1', '#FFC93C', '#7C6CF6'];
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

/* ---------------- celebration overlay ---------------- */
function celebrate(msg, stars, sayText, onNext) {
  $('celMomo').innerHTML = momoSVG('cheer');
  $('celMsg').textContent = msg;
  $('celStars').innerHTML = iconSVG('star').repeat(stars || 0);
  $('celebrate').classList.remove('hidden');
  confetti(); sfx.star();
  speak(sayText || msg, { momo: 'celMomo', after: 'cheer' });
  $('celBtn').onclick = () => {
    stopSpeech();
    $('celebrate').classList.add('hidden');
    if (onNext) onNext();
  };
}

/* ---------------- navigation ---------------- */
let navStack = [];
function show(id, push) {
  stopSpeech();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  if (push !== false) navStack.push(id);
  $('topbar').classList.toggle('hidden', id === 'home');
  window.scrollTo(0, 0);
}
function goBack() {
  navStack.pop();
  const prev = navStack[navStack.length - 1] || 'home';
  // re-render menu screens so progress refreshes
  if (prev === 'home') renderHome();
  if (prev === 'letters') renderLetters();
  if (prev === 'games') renderGames();
  if (prev === 'talkMenu') renderTalkMenu();
  if (prev === 'storyMenu') renderStoryMenu();
  show(prev, false);
}
$('backBtn').innerHTML = '<svg viewBox="0 0 100 100"><path d="M62 20 L30 50 L62 80" stroke="#B08050" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
$('backBtn').onclick = () => { sfx.tap(); goBack(); };

/* ================= HOME ================= */
function starRow(n, max) {
  let s = '';
  for (let i = 0; i < max; i++) s += `<svg viewBox="0 0 100 100" style="opacity:${i < n ? 1 : 0.22}">${ICONS.star}</svg>`;
  return `<div class="mi-stars">${s}</div>`;
}
function menuItem(icon, color, name, sub, starsHtml, locked) {
  return `<button class="menu-item${locked ? ' locked' : ''}" style="--c:${color}">
    ${iconInBubble(icon, color + '22')}
    <div class="mi-info"><div class="mi-name">${name}</div><div class="mi-sub">${sub}</div></div>
    ${locked ? iconSVG('lock', 'pic').replace('class="pic"', 'class="pic" style="width:30px;height:30px"') : (starsHtml || '')}
  </button>`;
}
function renderHome() {
  renderStarCount();
  $('homeMomo').innerHTML = momoSVG('idle');
  const learned = Object.keys(P.letters).length;
  const talkLocked = P.stars < TALK_UNLOCK;
  const talkSub = talkLocked
    ? `Win ${TALK_UNLOCK - P.stars} more stars to unlock! あと${TALK_UNLOCK - P.stars}こ`
    : 'Chat with Momo! えいかいわ';
  $('mainMenu').innerHTML =
    menuItem('speaker', '#FF9F43', 'Letter Sounds', `Learn the sounds! ${learned}/26 · フォニックス`) +
    menuItem('ball', '#4A90D9', 'Word Games', 'Pop, build and match! ゲーム') +
    menuItem('pencil', '#7C6CF6', 'Quiz Time', `Show what you know! テスト${P.quizBest ? ' · Best: ' + P.quizBest + '/10' : ''}`) +
    menuItem('chat', '#5FBB4E', 'Talk with Momo', talkSub, '', talkLocked) +
    menuItem('book', '#E85D75', 'Story Time', 'Funny little stories! おはなし');
  const items = $('mainMenu').querySelectorAll('.menu-item');
  items[0].onclick = () => { sfx.tap(); renderLetters(); show('letters'); };
  items[1].onclick = () => { sfx.tap(); renderGames(); show('games'); };
  items[2].onclick = () => { sfx.tap(); startQuiz(); };
  items[3].onclick = () => {
    sfx.tap();
    if (P.stars < TALK_UNLOCK) {
      $('homeMomo').innerHTML = momoSVG('think');
      speak(`Learn your sounds first! Win ${TALK_UNLOCK - P.stars} more stars, then we can talk!`, { momo: 'homeMomo' });
      $('homeBubble').innerHTML = `Win <b>${TALK_UNLOCK - P.stars}</b> more stars<br>and we can talk together!`;
    } else { renderTalkMenu(); show('talkMenu'); }
  };
  items[4].onclick = () => { sfx.tap(); renderStoryMenu(); show('storyMenu'); };

  const got = STICKERS.filter(s => P.stars >= s.need);
  $('stickerBtn').innerHTML = (got.length ? got.slice(-3).map(s => iconSVG(s.icon)).join('') : iconSVG('star')) +
    `<span>My Sticker Book (${got.length}/${STICKERS.length})</span>`;
  $('stickerBtn').onclick = () => { sfx.tap(); renderStickers(); show('stickers'); };
}
$('homeMomo').addEventListener('click', () => {
  sfx.tap();
  speak(pick(['Hi! I am Momo the fox!', 'Let us play with sounds!', 'You are my favorite friend!', 'Tap Letter Sounds to start!']),
    { momo: 'homeMomo', after: 'happy' });
});

/* ================= LETTER SOUNDS ================= */
let currentLetterList = [];
let currentLetterIdx = 0;

function renderLetters() {
  let html = '';
  LETTER_SETS.forEach((set, si) => {
    const done = set.letters.every(l => P.letters[l]);
    html += `<div class="set-block"><div class="set-name">${done ? iconSVG('check') : ''}${set.name} ${done ? '· Done!' : ''}</div><div class="letter-grid">`;
    set.letters.forEach(l => {
      const d = LETTERS[l];
      html += `<button class="letter-tile${P.letters[l] ? ' learned' : ''}" data-l="${l}" data-set="${si}">
        ${P.letters[l] ? `<svg class="lt-check" viewBox="0 0 100 100">${ICONS.check}</svg>` : ''}
        <div class="lt-char">${l.toUpperCase()}${l}</div>${iconSVG(d.icon)}</button>`;
    });
    html += '</div></div>';
  });
  $('letterSets').innerHTML = html;
  $('letterSets').querySelectorAll('.letter-tile').forEach(b => {
    b.onclick = () => {
      sfx.tap();
      const si = +b.dataset.set;
      currentLetterList = LETTER_SETS[si].letters;
      currentLetterIdx = currentLetterList.indexOf(b.dataset.l);
      openLetterCard();
      show('letterCard');
    };
  });
}

function openLetterCard() {
  const l = currentLetterList[currentLetterIdx];
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
  $('lcDone').innerHTML = btnIcon('check') + (P.letters[l] ? 'Next letter' : 'I know it!');
  $('lcDots').innerHTML = currentLetterList.map((_, i) => `<span class="${i === currentLetterIdx ? 'on' : ''}"></span>`).join('');
  sayLetter(l);
}
function sayLetter(l) {
  const d = LETTERS[l];
  speak(`${l}. ${l} says ${d.say}. ${d.say}, ${d.say}, ${d.word}!`, {});
}
$('lcHear').onclick = () => { sfx.tap(); sayLetter(currentLetterList[currentLetterIdx]); };
$('lcSay').onclick = () => {
  sfx.tap();
  const l = currentLetterList[currentLetterIdx];
  const d = LETTERS[l];
  speak(`Your turn! Say it nice and loud: ${d.say}!`, {}, () =>
    setTimeout(() => speak(pick(PRAISE), {}), 1500));
};
$('lcDone').onclick = () => {
  const l = currentLetterList[currentLetterIdx];
  const first = !P.letters[l];
  P.letters[l] = 1; save();
  sfx.good();
  const set = LETTER_SETS.find(s => s.letters.includes(l));
  const si = LETTER_SETS.indexOf(set);
  const setDone = set.letters.every(x => P.letters[x]);
  if (setDone && !P.setStars[si]) {
    P.setStars[si] = 1;
    addStars(2);
    celebrate(`${set.name} complete!`, 2, `Amazing! You know all the sounds in ${set.name}! Two stars for you!`, () => {
      renderLetters(); show('letters', false); navStack.pop();
    });
    return;
  }
  if (currentLetterIdx < currentLetterList.length - 1) {
    currentLetterIdx++;
    openLetterCard();
  } else {
    renderLetters(); goBack();
  }
};

/* ================= GAMES MENU ================= */
function renderGames() {
  $('gamesMenu').innerHTML =
    menuItem('balloon', '#4A90D9', 'Sound Pop', 'Pop the bubble with the right sound!', starRow(Math.min(P.gameStars.pop || 0, 3), 3)) +
    menuItem('box', '#FF9F43', 'Word Builder', 'Build words with letter blocks!', starRow(Math.min(P.gameStars.build || 0, 3), 3)) +
    menuItem('heart', '#7C6CF6', 'Rhyme Match', 'Find words that rhyme!', starRow(Math.min(P.gameStars.rhyme || 0, 3), 3));
  const items = $('gamesMenu').querySelectorAll('.menu-item');
  items[0].onclick = () => { sfx.tap(); startPop(); };
  items[1].onclick = () => { sfx.tap(); startBuild(); };
  items[2].onclick = () => { sfx.tap(); startRhyme(); };
}

/* ---------- game: Sound Pop ---------- */
const POP_COLORS = ['#4A90D9', '#E85D75', '#5FBB4E', '#F5A623', '#7C6CF6'];
let pop = null;
function startPop() {
  const learned = Object.keys(P.letters);
  const poolSrc = learned.length >= 6 ? learned : LETTER_SETS[0].letters.concat(learned);
  pop = { round: 0, total: 8, score: 0, pool: [...new Set(poolSrc)] };
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
  $('popProgress').textContent = `Bubble ${pop.round} of ${pop.total}`;
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
  if (l === pop.target) {
    sfx.pop(); pop.score++;
    b.classList.add('popping');
    speak(pick(PRAISE), {}, null);
    setTimeout(popRound, 700);
  } else {
    sfx.bad();
    b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope');
    speak(pick(TRY_AGAIN), {});
  }
}
function popEnd() {
  const won = pop.score >= 6;
  if (won) { P.gameStars.pop = (P.gameStars.pop || 0) + 1; addStars(1); }
  save();
  celebrate(won ? `You popped ${pop.score} of ${pop.total}!` : `You popped ${pop.score}! So close!`,
    won ? 1 : 0,
    won ? 'Pop pop pop! You have super fox ears! One star for you!' : 'Good popping! Play again to win a star!',
    () => { renderGames(); show('games', false); navStack.pop(); });
}

/* ---------- game: Word Builder ---------- */
let build = null;
function startBuild() {
  build = { words: shuffle(BUILD_WORDS).slice(0, 4), idx: 0, done: 0 };
  show('gBuild');
  buildWord();
}
function buildWord() {
  const item = build.words[build.idx];
  const w = item.w;
  build.next = 0;
  $('buildPic').innerHTML = iconInBubble(item.icon, '#FFF4DC');
  $('buildSlots').innerHTML = w.split('').map(() => '<div class="build-slot"></div>').join('');
  $('buildTiles').innerHTML = shuffle(w.split('')).map((ch, i) =>
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
      // blend it!
      const sounds = w.split('').map(c => (LETTERS[c] ? LETTERS[c].say : c)).join('... ');
      sfx.good();
      speak(`${sounds}... ${w}! ${w}! ${pick(PRAISE)}`, {}, () => {
        build.idx++;
        if (build.idx < build.words.length) buildWord();
        else {
          P.gameStars.build = (P.gameStars.build || 0) + 1; addStars(1); save();
          celebrate('You built all the words!', 1, 'What a word builder! One shiny star for you!',
            () => { renderGames(); show('games', false); navStack.pop(); });
        }
      });
    }
  } else {
    sfx.bad();
    tile.classList.remove('nope'); void tile.offsetWidth; tile.classList.add('nope');
    setTimeout(() => tile.classList.remove('nope'), 450);
    speak(pick(TRY_AGAIN), {});
  }
}

/* ---------- game: Rhyme Match ---------- */
let rhyme = null;
function startRhyme() {
  const pairs = shuffle(RHYME_PAIRS).slice(0, 4);
  const cards = shuffle(pairs.flatMap((p, pi) => p.map(w => ({ w, pi }))));
  rhyme = { cards, open: [], matched: 0, lock: false, total: pairs.length };
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
          P.gameStars.rhyme = (P.gameStars.rhyme || 0) + 1; addStars(1); save();
          setTimeout(() => celebrate('All rhymes found!', 1, 'Cat, hat! Dog, log! You are the rhyme king! One star!',
            () => { renderGames(); show('games', false); navStack.pop(); }), 900);
        }
      } else {
        sfx.bad();
        a.classList.remove('open'); bb.classList.remove('open');
        speak('Hmm, those do not rhyme. Try again!', {});
      }
      rhyme.open = []; rhyme.lock = false;
    }, 900);
  }
}

/* ================= QUIZ ================= */
let quiz = null;
function makeQuizQuestions() {
  const learned = Object.keys(P.letters);
  const letterPool = learned.length >= 8 ? learned : [...new Set(LETTER_SETS[0].letters.concat(LETTER_SETS[1].letters, learned))];
  const qs = [];
  // type 1: hear a sound -> pick the letter
  shuffle(letterPool).slice(0, 4).forEach(l => {
    const wrong = shuffle(letterPool.filter(x => x !== l && LETTERS[x].say !== LETTERS[l].say)).slice(0, 3);
    qs.push({ type: 'sound2letter', target: l, opts: shuffle([l].concat(wrong)) });
  });
  // type 2: picture -> first sound
  shuffle(BUILD_WORDS).slice(0, 3).forEach(bw => {
    const l = bw.w[0];
    const wrong = shuffle(letterPool.filter(x => x !== l && LETTERS[x].say !== LETTERS[l].say)).slice(0, 3);
    qs.push({ type: 'pic2letter', word: bw, target: l, opts: shuffle([l].concat(wrong)) });
  });
  // type 3: read the word -> pick the picture
  shuffle(BUILD_WORDS).slice(0, 3).forEach(bw => {
    const wrong = shuffle(BUILD_WORDS.filter(x => x.w !== bw.w)).slice(0, 3);
    qs.push({ type: 'word2pic', word: bw, opts: shuffle([bw].concat(wrong)) });
  });
  return shuffle(qs).slice(0, 10);
}
function startQuiz() {
  quiz = { qs: makeQuizQuestions(), i: 0, score: 0, answered: false };
  show('quiz');
  quizQuestion();
}
function quizQuestion() {
  const q = quiz.qs[quiz.i];
  quiz.answered = false;
  $('quizNum').textContent = `Question ${quiz.i + 1} of ${quiz.qs.length} · Score ${quiz.score}`;
  $('quizMomo').innerHTML = momoSVG('think');
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
    $('quizMomo').innerHTML = momoSVG('cheer');
    speak(pick(PRAISE), {});
  } else {
    sfx.bad();
    b.classList.add('no');
    $('quizMomo').innerHTML = momoSVG('oops');
    // reveal the right one
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
  const s = quiz.score, n = quiz.qs.length;
  let stars = s >= 9 ? 2 : s >= 6 ? 1 : 0;
  if (stars) addStars(stars);
  if (s > (P.quizBest || 0)) P.quizBest = s;
  save();
  celebrate(`You got ${s} out of ${n}!`, stars,
    stars === 2 ? `Incredible! ${s} out of ${n}! Two whole stars! You are a phonics champion!` :
    stars === 1 ? `Great job! ${s} out of ${n}! One star for you!` :
    `You got ${s}! Keep practicing your sounds and try again!`,
    () => { renderHome(); show('home', false); navStack = ['home']; });
}

/* ================= TALK TIME ================= */
let talk = null;
function renderTalkMenu() {
  $('talkList').innerHTML = TALKS.map(t =>
    menuItem(t.icon, t.color, t.title, t.jp, starRow(Math.min(P.talkStars[t.id] || 0, 3), 3))).join('');
  $('talkList').querySelectorAll('.menu-item').forEach((b, i) => {
    b.onclick = () => { sfx.tap(); startTalk(TALKS[i]); };
  });
}
function startTalk(t) {
  talk = { t, step: 0 };
  show('talk');
  talkStep();
}
function talkStep() {
  const t = talk.t, st = t.steps[talk.step];
  $('talkProgress').textContent = `${talk.step + 1} of ${t.steps.length}`;
  $('talkMomo').innerHTML = momoSVG('idle');
  $('talkBubble').textContent = st.m;
  $('talkPrompt').innerHTML = iconSVG('ear') + 'Listen to Momo...';
  $('talkOpts').innerHTML = '';
  speak(st.m, { momo: 'talkMomo' }, () => {
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
  $('talkMomo').innerHTML = momoSVG('happy');
  $('talkBubble').textContent = opt.r;
  speak(opt.r, { momo: 'talkMomo', after: 'happy' }, () => {
    talk.step++;
    if (talk.step < talk.t.steps.length) {
      setTimeout(talkStep, 400);
    } else {
      const id = talk.t.id;
      P.talkStars[id] = (P.talkStars[id] || 0) + 1;
      addStars(1); save();
      celebrate('What a great talk!', 1, 'You talked with me in English! That makes me so happy! One star!',
        () => { renderTalkMenu(); show('talkMenu', false); navStack.pop(); });
    }
  });
}

/* ================= STORY TIME ================= */
let story = null;
function renderStoryMenu() {
  $('storyList').innerHTML = STORIES.map(s =>
    menuItem(s.icon, s.color, s.title, s.jp, starRow(Math.min(P.storyStars[s.id] || 0, 3), 3))).join('');
  $('storyList').querySelectorAll('.menu-item').forEach((b, i) => {
    b.onclick = () => { sfx.tap(); startStory(STORIES[i]); };
  });
}
function startStory(s) {
  story = { s, page: -1 }; // -1 = title page
  show('story');
  storyPage();
}
function storyPage() {
  const s = story.s;
  sfx.page();
  if (story.page === -1) {
    $('storyScene').innerHTML = sceneSVG({ bg: 'meadow', items: [{ momo: true, mood: 'happy', x: 110, y: 40, s: 0.7 }] });
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
  // light words roughly in time with speech
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
  $('storyScene').innerHTML = sceneSVG({ bg: 'meadow', items: [{ momo: true, mood: 'think', x: 110, y: 40, s: 0.7 }] });
  $('storyText').innerHTML = `<b>${s.quiz.q}</b>`;
  $('storyRead').classList.add('hidden');
  $('storyNext').classList.add('hidden');
  $('storyDots').innerHTML = s.quiz.opts.map(o => `
    <button class="quiz-opt" data-ok="${o.ok ? 1 : 0}" style="width:130px">${iconSVG(o.icon)}<span>${o.t}</span></button>`).join('');
  $('storyDots').style.gap = '14px';
  $('storyDots').querySelectorAll('.quiz-opt').forEach(b => {
    b.onclick = () => {
      const restore = () => { $('storyRead').classList.remove('hidden'); $('storyNext').classList.remove('hidden'); $('storyDots').style.gap = ''; };
      if (b.dataset.ok === '1') {
        sfx.good(); b.classList.add('ok');
        P.storyStars[s.id] = (P.storyStars[s.id] || 0) + 1;
        addStars(1); save();
        setTimeout(() => celebrate('You remembered the story!', 1, `Yes! ${s.quiz.opts.find(o => o.ok).t}! You listened so well! One star!`,
          () => { restore(); renderStoryMenu(); show('storyMenu', false); navStack.pop(); }), 600);
      } else {
        sfx.bad(); b.classList.add('no');
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
    const got = P.stars >= s.need;
    return `<div class="sticker-cell${got ? '' : ' locked'}">
      ${iconSVG(s.icon)}
      <div class="sticker-name">${got ? s.name : '???'}</div>
      <div class="sticker-need">${iconSVG('star')} ${s.need} stars</div>
    </div>`;
  }).join('');
}

/* ---------------- boot ---------------- */
renderHome();
show('home');
// unlock audio context on first touch
document.body.addEventListener('pointerdown', () => ac(), { once: true });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
})();
