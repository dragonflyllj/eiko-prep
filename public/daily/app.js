/* Mimi's Week — daily English practice (听说读写) */
(function () {
'use strict';

const $ = id => document.getElementById(id);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const wIcon = w => w.color ? colorSVG(w.color) : iconSVG(w.icon);
const btnIcon = n => iconInBubble(n, '#FFFFFF');

/* ---------------- dates & storage ---------------- */
function todayKey(d) { d = d || new Date(); return d.toISOString().slice(0, 10); }
function yesterdayKey() { const d = new Date(); d.setDate(d.getDate() - 1); return todayKey(d); }
/* Monday-start week id, e.g. "2026-08-24" (the Monday's date) */
function weekKey() {
  const d = new Date();
  const dow = (d.getDay() + 6) % 7;       // 0 = Monday
  d.setDate(d.getDate() - dow);
  return todayKey(d);
}
function todayIdx() { return (new Date().getDay() + 6) % 7; }  // 0 = Monday

const SAVE_KEY = 'mimi-week-v1';
let P = { week: '', pages: {}, stamps: {}, streak: 0, best: 0, lastDone: '', totalDays: 0 };
try { Object.assign(P, JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')); } catch (e) {}
let freshWeek = false;
if (P.week !== weekKey()) { P.week = weekKey(); P.pages = {}; P.stamps = {}; freshWeek = true; save(); }
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(P)); } catch (e) {} }
function pagesOf(id) { return P.pages[id] || (P.pages[id] = [0, 0, 0, 0, 0]); }
function dayDone(id) { return pagesOf(id).every(x => x); }

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
function say(text, opts, cb) {
  opts = opts || {};
  if (!synth) { if (cb) setTimeout(cb, 400); return; }
  const token = ++speakToken;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (voice) u.voice = voice;
  u.lang = (voice && voice.lang) || 'en-US';
  u.rate = opts.rate || 0.82;
  u.pitch = opts.pitch || 1.25;
  const box = opts.cat ? $(opts.cat) : null;
  if (box) box.innerHTML = catSVG('talk');
  let fired = false;
  const finish = () => {
    if (fired || token !== speakToken) return;
    fired = true;
    if (box) box.innerHTML = catSVG(opts.after || 'idle');
    if (cb) cb();
  };
  u.onend = u.onerror = finish;
  synth.speak(u);
  setTimeout(function check() {
    if (fired || token !== speakToken) return;
    if (synth.speaking) setTimeout(check, 400); else finish();
  }, Math.max(3000, text.split(/\s+/).length * 620));
}
function stopSay() { speakToken++; if (synth) synth.cancel(); }

/* ---------------- sound ---------------- */
let AC = null;
function ac() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (AC && AC.state === 'suspended') AC.resume(); return AC; }
function tone(f, t0, dur, type, vol) {
  const c = ac(); if (!c) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type || 'sine'; o.frequency.value = f;
  g.gain.setValueAtTime(vol || 0.16, c.currentTime + t0);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t0 + dur);
  o.connect(g); g.connect(c.destination);
  o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + dur + 0.05);
}
const sfx = {
  tap: () => tone(620, 0, 0.07, 'triangle', 0.11),
  good: () => { tone(523, 0, 0.12, 'triangle'); tone(659, 0.1, 0.12, 'triangle'); tone(784, 0.2, 0.2, 'triangle'); },
  bad: () => tone(180, 0, 0.24, 'square', 0.07),
  star: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.18, 'triangle', 0.15)),
  fan: () => [392, 392, 392, 523, 659, 784].forEach((f, i) => tone(f, i * 0.13, 0.22, 'triangle', 0.15)),
};
function confetti() {
  const box = $('confetti'), cols = ['#9DB8CE', '#4A90D9', '#5FBB4E', '#F48FB1', '#FFC93C', '#7C6CF6'];
  for (let i = 0; i < 34; i++) {
    const d = document.createElement('div');
    d.className = 'conf';
    d.style.left = Math.random() * 100 + '%';
    d.style.background = pick(cols);
    d.style.borderRadius = Math.random() > .5 ? '50%' : '3px';
    d.style.animationDuration = (1.6 + Math.random() * 1.4) + 's';
    d.style.animationDelay = (Math.random() * .5) + 's';
    box.appendChild(d);
    setTimeout(() => d.remove(), 3600);
  }
}

/* ---------------- navigation ---------------- */
let curDay = null, curPage = 0;
function show(id) {
  stopSay();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  $('topbar').classList.toggle('hidden', id === 'week');
  window.scrollTo(0, 0);
}
$('backBtn').innerHTML = '<svg viewBox="0 0 100 100"><path d="M62 20 L30 50 L62 80" stroke="#7E9DB8" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
$('backBtn').onclick = () => {
  sfx.tap();
  const onPage = ['pLook', 'pTrace', 'pSpell', 'pListen', 'pSpeak'].some(id => $(id).classList.contains('active'));
  if (onPage) { openDay(curDay); } else { renderWeek(); show('week'); }
};

function setTopbar() {
  const k = PAGE_KINDS[curPage];
  $('pageLabel').innerHTML = `${k.cn} · ${k.name}<span>${curDay.cn} ${curDay.themeCn} · 第 ${curPage + 1} / 5 页</span>`;
  const done = pagesOf(curDay.id);
  $('pageDots').innerHTML = PAGE_KINDS.map((_, i) =>
    `<i class="${i === curPage ? 'on' : (done[i] ? 'done' : '')}"></i>`).join('');
}

/* ================= WEEK VIEW ================= */
function renderWeek() {
  $('wkCat').innerHTML = catSVG('happy');
  const ti = todayIdx();
  const doneCount = WEEK.filter(d => dayDone(d.id)).length;

  $('streakBar').innerHTML =
    `${iconSVG('trophy')}<div><div class="sb-num">${P.streak} 天</div>
      <div class="sb-txt">连续打卡 · best ${P.best}</div></div>
     <div style="width:1px;height:34px;background:#E3ECF3"></div>
     <div><div class="sb-num" style="color:var(--green)">${doneCount}/7</div>
      <div class="sb-txt">本周完成</div></div>`;

  const today = WEEK[ti];
  $('wkBubble').innerHTML = doneCount === 7
    ? '这一周全部完成啦!你太棒了!'
    : dayDone(today.id)
      ? `今天的练习完成啦!明天见!`
      : freshWeek && doneCount === 0
        ? `新的一周开始啦!今天是${today.cn},我们练${today.themeCn}!`
        : `今天是${today.cn} · 主题:${today.themeCn}。一起来练五页吧!`;

  $('weekList').innerHTML = WEEK.map((d, i) => {
    const pg = pagesOf(d.id), n = pg.filter(x => x).length, done = n === 5;
    return `<button class="day-card${i === ti ? ' today' : ''}${done ? ' done' : ''}" data-i="${i}" style="--c:${d.color}">
      ${i === ti ? '<span class="dc-badge">今天 TODAY</span>' : ''}
      ${iconInBubble(d.icon, d.color + '22')}
      <div class="dc-info">
        <div class="dc-day">${d.en}<em>${d.cn}</em></div>
        <div class="dc-theme">${d.theme} · ${d.themeCn} · ${n}/5 页</div>
        <div class="dc-prog">${pg.map(x => `<i class="${x ? 'on' : ''}"></i>`).join('')}</div>
      </div>
      ${done ? `<svg class="dc-stamp" viewBox="0 0 100 100">${ICONS.check}</svg>` : ''}
    </button>`;
  }).join('');
  $('weekList').querySelectorAll('.day-card').forEach(b => {
    b.onclick = () => { sfx.tap(); openDay(WEEK[+b.dataset.i]); };
  });

  $('badgeRow').innerHTML = STREAK_BADGES.map(b => {
    const got = P.best >= b.need;
    return `<div class="badge${got ? '' : ' locked'}">${iconSVG(b.icon)}<span>${b.cn}</span></div>`;
  }).join('');
}
$('wkCat').addEventListener('click', () => {
  sfx.tap();
  say(pick(['Hello! Let us practice English today!', 'Meow! Five pages a day makes you strong!',
    'I am Mimi. I practice with you every day!']), { cat: 'wkCat', after: 'happy' });
});

/* ================= DAY MENU ================= */
function openDay(day) {
  curDay = day;
  const pg = pagesOf(day.id);
  $('dayHero').innerHTML = `${iconInBubble(day.icon, day.color + '22')}
    <div class="dh-day">${day.en} <span style="color:${day.color}">${day.cn}</span></div>
    <div class="dh-theme">${day.theme} · ${day.themeCn}</div>
    <div class="dh-words">${day.words.map(w => `<span>${w.w}</span>`).join('')}</div>`;
  $('pageList').innerHTML = PAGE_KINDS.map((k, i) =>
    `<button class="page-row${pg[i] ? ' done' : ''}" data-i="${i}" style="--c:${k.color}">
      <span class="pr-n">${pg[i] ? '✓' : i + 1}</span>
      ${iconInBubble(k.icon, k.color + '22')}
      <span class="pr-info"><span class="pr-name">${k.cn} ${k.name}</span>
        <span class="pr-sub">第 ${i + 1} 页</span></span>
      <span class="pr-skill">${k.skill}</span>
    </button>`).join('');
  $('pageList').querySelectorAll('.page-row').forEach(b => {
    b.onclick = () => { sfx.tap(); startPage(+b.dataset.i); };
  });
  const next = pg.findIndex(x => !x);
  $('dayStart').innerHTML = next === -1 ? '今天已完成!再练一次 →' : `开始第 ${next + 1} 页 →`;
  $('dayStart').onclick = () => { sfx.tap(); startPage(next === -1 ? 0 : next); };
  $('pageLabel').innerHTML = `${day.en}<span>${day.cn} · ${day.themeCn}</span>`;
  $('pageDots').innerHTML = pg.map(x => `<i class="${x ? 'done' : ''}"></i>`).join('');
  show('day');
}

function startPage(i) {
  curPage = i;
  setTopbar();
  [pageLook, pageTrace, pageSpell, pageListen, pageSpeak][i]();
}

/* mark page done, then advance */
function finishPage() {
  const pg = pagesOf(curDay.id);
  const firstTime = !pg[curPage];
  pg[curPage] = 1;
  save();
  const allDone = pg.every(x => x);
  if (allDone && firstTime) return dayComplete();

  sfx.star(); confetti();
  const k = PAGE_KINDS[curPage];
  const last = curPage === 4;
  overlay({
    mood: 'cheer',
    msg: `第 ${curPage + 1} 页完成!`,
    sub: `${k.cn} ${k.name} · 做得好!`,
    stamp: iconSVG('star'),
    btn: last ? '回到今天' : `下一页:${PAGE_KINDS[curPage + 1].cn} →`,
    voice: pick(DAY_PRAISE),
    next: () => { if (last) openDay(curDay); else startPage(curPage + 1); },
  });
}

function dayComplete() {
  // streak bookkeeping — only once per calendar day
  const t = todayKey();
  if (P.lastDone !== t) {
    P.streak = (P.lastDone === yesterdayKey()) ? P.streak + 1 : 1;
    P.lastDone = t;
    P.totalDays = (P.totalDays || 0) + 1;
    if (P.streak > (P.best || 0)) P.best = P.streak;
  }
  P.stamps[curDay.id] = 1;
  save();
  sfx.fan(); confetti();
  const weekDone = WEEK.every(d => dayDone(d.id));
  overlay({
    mood: 'cheer',
    msg: weekDone ? '一整周全部完成!' : `${curDay.cn}的五页全部完成!`,
    sub: weekDone ? '你是每日练习小冠军!' : `连续打卡 ${P.streak} 天 · 明天继续加油!`,
    stamp: iconSVG('check') + iconSVG('star') + (weekDone ? iconSVG('crown') : iconSVG('trophy')),
    btn: '好耶!',
    voice: weekDone
      ? 'You finished the whole week! You are my champion! Meow meow hooray!'
      : `All five pages done! ${P.streak} days in a row! I am so proud of you!`,
    next: () => { renderWeek(); show('week'); },
  });
}

function overlay(o) {
  $('celCat').innerHTML = catSVG(o.mood || 'cheer');
  $('celMsg').textContent = o.msg;
  $('celSub').textContent = o.sub || '';
  $('celStamp').innerHTML = o.stamp || '';
  $('celBtn').textContent = o.btn || 'Next!';
  $('celebrate').classList.remove('hidden');
  if (o.voice) say(o.voice, { cat: 'celCat', after: 'cheer' });
  $('celBtn').onclick = () => { stopSay(); $('celebrate').classList.add('hidden'); if (o.next) o.next(); };
}

/* ================= PAGE 1: LOOK 认一认 ================= */
function pageLook() {
  const words = curDay.words;
  const seen = new Set();
  $('lookTip').innerHTML = `点每张图听一听 · Tap every card to hear it!`;
  $('lookGrid').innerHTML = words.map((w, i) =>
    `<button class="look-card" data-i="${i}">${wIcon(w)}
      <div class="lc-w">${w.w}</div><div class="lc-cn">${w.cn}</div></button>`).join('');
  $('lookDone').innerHTML = `还有 ${words.length} 个没听 (0/${words.length})`;
  $('lookDone').disabled = true;
  $('lookGrid').querySelectorAll('.look-card').forEach(b => {
    b.onclick = () => {
      const w = words[+b.dataset.i];
      sfx.tap();
      b.classList.add('seen');
      seen.add(w.w);
      say(`${w.w}. ${w.w}.`, { rate: 0.72 });
      if (seen.size === words.length) {
        $('lookDone').disabled = false;
        $('lookDone').innerHTML = `${btnIcon('check')}全部听完了!下一页 →`;
      } else {
        $('lookDone').innerHTML = `还有 ${words.length - seen.size} 个没听 (${seen.size}/${words.length})`;
      }
    };
  });
  $('lookDone').onclick = () => { sfx.good(); finishPage(); };
  show('pLook');
  say(`Today is ${curDay.en}! Let us learn ${curDay.theme}! Tap every picture.`, {});
}

/* ================= PAGE 2: TRACE 写一写 ================= */
let tr = null;
function pageTrace() {
  tr = { items: curDay.trace, idx: 0 };
  show('pTrace');
  setTimeout(traceItem, 40);   // wait for layout so canvas sizes correctly
}
function traceItem() {
  const item = tr.items[tr.idx];
  const guide = $('traceGuide');
  // single letters get both cases so the child sees the pair; words stay as-is
  guide.textContent = item.length === 1 ? item.toUpperCase() + item : item;
  guide.style.fontSize = item.length === 1 ? 'min(38vw,190px)' : 'min(30vw,150px)';
  $('traceSteps').innerHTML = tr.items.map((_, i) =>
    `<i class="${i === tr.idx ? 'on' : (i < tr.idx ? 'done' : '')}"></i>`).join('');
  $('traceClear').innerHTML = '重来 Clear';
  $('traceNext').innerHTML = tr.idx === tr.items.length - 1 ? '写好了!完成 →' : '写好了!下一个 →';
  setupCanvas();
  say(`Trace the letter ${item.split('').join(' ')}. ${item}!`, { rate: 0.75 });
}
function setupCanvas() {
  const cv = $('traceCanvas');
  const r = cv.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  cv.width = Math.max(1, Math.round(r.width * dpr));
  cv.height = Math.max(1, Math.round(r.height * dpr));
  const ctx = cv.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = '#4A90D9';
  let drawing = false, last = null, dist = 0;
  const NEED = Math.max(360, r.width * 1.8);   // ink needed to fill the meter
  const setMeter = () => {
    const pct = Math.min(100, dist / NEED * 100);
    $('traceMeter').firstElementChild.style.width = pct + '%';
    $('traceNext').disabled = pct < 100;
  };
  setMeter();
  const pos = e => { const b = cv.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; };
  cv.onpointerdown = e => { drawing = true; last = pos(e); cv.setPointerCapture(e.pointerId); sfx.tap(); };
  cv.onpointermove = e => {
    if (!drawing) return;
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    dist += Math.hypot(p.x - last.x, p.y - last.y);
    last = p; setMeter();
  };
  cv.onpointerup = cv.onpointercancel = () => { drawing = false; };
  $('traceClear').onclick = () => {
    sfx.tap();
    ctx.clearRect(0, 0, cv.width, cv.height);
    dist = 0; setMeter();
  };
}
$('traceNext').onclick = () => {
  sfx.good();
  const item = tr.items[tr.idx];
  say(`${item}! ${pick(DAY_PRAISE)}`, {});
  tr.idx++;
  if (tr.idx < tr.items.length) setTimeout(traceItem, 500);
  else setTimeout(finishPage, 700);
};

/* ================= PAGE 3: SPELL 拼一拼 ================= */
let sp = null;
function pageSpell() {
  const list = curDay.spell.map(w => {
    const found = curDay.words.find(x => x.w === w);
    return found || { w, icon: guessIcon(w), cn: '' };
  });
  sp = { list, idx: 0, next: 0 };
  show('pSpell');
  spellWord();
}
function guessIcon(w) { return ICONS[w] ? w : 'star'; }
function spellWord() {
  const it = sp.list[sp.idx];
  sp.next = 0;
  $('spellPic').innerHTML = it.color ? colorSVG(it.color) : iconInBubble(it.icon, '#FFF4DC');
  $('spellSlots').innerHTML = it.w.split('').map(() => '<div class="spell-slot"></div>').join('');
  $('spellTiles').innerHTML = shuffle(it.w.split('')).map(c =>
    `<button class="spell-tile" data-c="${c}">${c}</button>`).join('');
  $('spellSteps').innerHTML = sp.list.map((_, i) =>
    `<i class="${i === sp.idx ? 'on' : (i < sp.idx ? 'done' : '')}"></i>`).join('');
  $('spellTiles').querySelectorAll('.spell-tile').forEach(t => { t.onclick = () => spellTap(t, it.w); });
  say(`Spell the word... ${it.w}. ${it.w}!`, {});
}
function spellTap(tile, w) {
  const c = tile.dataset.c;
  if (c === w[sp.next]) {
    sfx.tap();
    tile.classList.add('used');
    const s = $('spellSlots').children[sp.next];
    s.textContent = c; s.classList.add('filled');
    sp.next++;
    if (sp.next < w.length) {
      say(c, { rate: 0.7 });
    } else {
      sfx.good();
      say(`${w.split('').join('... ')}... ${w}! ${pick(DAY_PRAISE)}`, {}, () => {
        sp.idx++;
        if (sp.idx < sp.list.length) spellWord(); else finishPage();
      });
    }
  } else {
    sfx.bad();
    tile.classList.remove('nope'); void tile.offsetWidth; tile.classList.add('nope');
    setTimeout(() => tile.classList.remove('nope'), 450);
    say(pick(DAY_RETRY), {});
  }
}

/* ================= PAGE 4: LISTEN 听一听 ================= */
let ls = null;
function pageListen() {
  ls = { rounds: shuffle(curDay.words).slice(0, 4), idx: 0, locked: false };
  $('listenBtn').innerHTML = iconInBubble('speaker', '#FFFFFF') + '再听一次 Listen again';
  $('listenBtn').onclick = () => { sfx.tap(); if (ls) say(`${ls.target.w}. ${ls.target.w}.`, { rate: 0.7 }); };
  show('pListen');
  listenRound();
}
function listenRound() {
  const target = ls.rounds[ls.idx];
  ls.target = target; ls.locked = false;
  const others = shuffle(curDay.words.filter(w => w.w !== target.w)).slice(0, 3);
  $('listenGrid').innerHTML = shuffle([target].concat(others)).map(w =>
    `<button class="listen-card" data-w="${w.w}">${wIcon(w)}</button>`).join('');
  $('listenSteps').innerHTML = ls.rounds.map((_, i) =>
    `<i class="${i === ls.idx ? 'on' : (i < ls.idx ? 'done' : '')}"></i>`).join('');
  $('listenGrid').querySelectorAll('.listen-card').forEach(b => {
    b.onclick = () => listenTap(b, target);
  });
  say(`Where is the... ${target.w}? ${target.w}!`, {});
}
function listenTap(b, target) {
  if (ls.locked) return;
  if (b.dataset.w === target.w) {
    ls.locked = true;
    sfx.good(); b.classList.add('ok');
    say(`Yes! ${target.w}! ${pick(DAY_PRAISE)}`, {}, () => {
      ls.idx++;
      if (ls.idx < ls.rounds.length) listenRound(); else finishPage();
    });
  } else {
    sfx.bad();
    b.classList.remove('no'); void b.offsetWidth; b.classList.add('no');
    setTimeout(() => b.classList.remove('no'), 500);
    say(pick(DAY_RETRY), {});
  }
}

/* ================= PAGE 5: SPEAK 说一说 ================= */
let sk = null;
function pageSpeak() {
  sk = { list: curDay.sentences, idx: 0 };
  show('pSpeak');
  speakLine();
}
function speakLine() {
  const s = sk.list[sk.idx];
  $('speakCat').innerHTML = catSVG('idle');
  $('speakBubble').textContent = 'Listen, then say it with me!';
  $('speakPic').innerHTML = s.color ? colorSVG(s.color) : iconInBubble(s.icon, '#FFF4DC');
  $('speakLine').innerHTML = s.t.split(' ').map(w => `<span class="sw">${w}&nbsp;</span>`).join('');
  $('speakCn').textContent = s.cn;
  $('speakSteps').innerHTML = sk.list.map((_, i) =>
    `<i class="${i === sk.idx ? 'on' : (i < sk.idx ? 'done' : '')}"></i>`).join('');
  $('speakLine').querySelectorAll('.sw').forEach(sw => {
    sw.onclick = () => {
      sfx.tap(); sw.classList.add('lit');
      setTimeout(() => sw.classList.remove('lit'), 600);
      say(sw.textContent.replace(/[^a-zA-Z']/g, ''), { rate: 0.7 });
    };
  });
  $('speakBtns').innerHTML = `
    <button class="btn btn-blue" id="skHear">${btnIcon('speaker')}再听一次 Listen</button>
    <button class="btn btn-green" id="skSaid">${btnIcon('mic')}我说好了! I said it!</button>`;
  $('skHear').onclick = () => { sfx.tap(); readLine(); };
  $('skSaid').onclick = () => {
    sfx.good();
    $('speakCat').innerHTML = catSVG('happy');
    $('speakBubble').textContent = pick(DAY_PRAISE);
    say(pick(DAY_PRAISE), { cat: 'speakCat', after: 'happy' }, () => {
      sk.idx++;
      if (sk.idx < sk.list.length) speakLine(); else finishPage();
    });
  };
  readLine();
}
function readLine() {
  const s = sk.list[sk.idx];
  const words = $('speakLine').querySelectorAll('.sw');
  const per = 420;
  words.forEach((w, i) => setTimeout(() => {
    w.classList.add('lit'); setTimeout(() => w.classList.remove('lit'), per - 60);
  }, i * per));
  say(s.t, { rate: 0.72, cat: 'speakCat' });
}

/* ---------------- boot ---------------- */
renderWeek();
show('week');
document.body.addEventListener('pointerdown', () => ac(), { once: true });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});

/* test hook */
window.MW = {
  openDay, startPage, finishPage, renderWeek,
  get state() { return P; }, get day() { return curDay; },
  get ls() { return ls; }, get sp() { return sp; }, get tr() { return tr; },
  WEEK,
};
})();
