/* ==========================================================================
   Relationskompassen – prototyp: delad logik
   Bygger header, footer, kursmeny (INNEHÅLL), breadcrumb, prev/next, progress.
   Kurssidorna beskrivs i CHAPTERS-listan nedan (datadrivet -> menyn blir
   identisk och komplett på alla sidor, alla 22 kapitel visas).

   VARIANTER: koden här är BASVERSIONEN (v0). Varje byggfunktion börjar med
   en rad som lämnar över till den aktiva variantens egen version om den
   finns (se variants.js + variant-v1.js). Ändra alltså inte här när du
   bygger en ny designversion – lägg den i variant-filen.
   ========================================================================== */

/* Linjär ordning för meny, progress och prev/next.
   file: null = kapitlet finns i menyn men är inte med i prototypen (gråas ut).
   level: 1 = underkapitel (Elsa och Omar del 2–4).                          */
const CHAPTERS = [
  { i: 0,  title: 'Relationskompassens grundkurs',                         file: 'grundkurs.html' },
  { i: 1,  title: 'Barns olika relationer',                                file: 'barns-olika-relationer.html' },
  { i: 2,  title: 'Fler exempel på viktiga relationer',                    file: 'fler-exempel.html' },
  { i: 3,  title: 'Att få lära sig schyssta relationer',                   file: 'att-fa-lara-sig.html' },
  { i: 4,  title: 'Elsa och Omar',                                         file: 'elsa-och-omar.html' },
  { i: 5,  title: 'Elsa och Omar del 2',                                   file: 'elsa-och-omar-2.html', level: 1 },
  { i: 6,  title: 'Elsa och Omar del 3',                                   file: 'elsa-och-omar-3.html', level: 1 },
  { i: 7,  title: 'Elsa och Omar del 4',                                   file: 'elsa-och-omar-4.html', level: 1 },
  { i: 8,  title: 'Vad är våld?',                                          file: 'vad-ar-vald.html' },
  { i: 9,  title: 'Övning: Vad ser du i berättelsen om Elsa och Omar?',    file: 'ovning.html' },
  { i: 10, title: 'En genusförändrande ansats',                           file: 'genusforandrande-ansats.html' },
  { i: 11, title: 'Mobbning är våld',                                      file: null },
  { i: 12, title: 'Helheten i ett barns liv',                             file: null },
  { i: 13, title: 'Hur vanligt är våldet?',                               file: null },
  { i: 14, title: 'Att inte normalisera våldet',                          file: null },
  { i: 15, title: 'Elvis',                                                 file: null },
  { i: 16, title: 'Elvis rum',                                            file: null },
  { i: 17, title: 'Våldsförebyggande arbete styrks i lagar och styrdokument', file: null },
  { i: 18, title: 'När vuxna griper in',                                   file: null },
  { i: 19, title: 'Aisha',                                                 file: null },
  { i: 20, title: 'Sammanfattning',                                        file: null },
];
const TOTAL = 20; // progress visas som x/20 (som i originalet)

/* ------------------------------------------------------------------ helpers */
const el = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};
function logoFallback(img) {
  img.outerHTML = '<span class="logo__blob"><span>Relations<br>Kompassen</span></span>';
}
const logoBlob = () =>
  `<img class="logo__img" src="assets/logo.png" alt="Relationskompassen" onerror="logoFallback(this)">`;

/* Orange ikoner (SVG, currentColor = orange via CSS) enligt grafisk profil */
const ICON = {
  globe: `<svg class="ico" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9.2"/><ellipse cx="12" cy="12" rx="4.1" ry="9.2"/><line x1="2.8" y1="12" x2="21.2" y2="12"/><line x1="4.6" y1="7" x2="19.4" y2="7"/><line x1="4.6" y1="17" x2="19.4" y2="17"/></svg>`,
  eye: `<svg class="ico" viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2.2 12.5C6 7 18 7 21.8 12.5 18 18 6 18 2.2 12.5Z"/><circle cx="12" cy="12.4" r="3.1" fill="currentColor" stroke="none"/><line x1="12" y1="4.4" x2="12" y2="2.4"/><line x1="6.6" y1="5.6" x2="5.6" y2="3.9"/><line x1="17.4" y1="5.6" x2="18.4" y2="3.9"/></svg>`,
  search: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.4"/><line x1="19.6" y1="19.6" x2="15.3" y2="15.3"/></svg>`,
  person: `<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><circle cx="12" cy="7.6" r="4.1"/><path d="M3.6 20.5c0-4.6 3.8-8 8.4-8s8.4 3.4 8.4 8Z"/></svg>`,
};

/* ------------------------------------------------------------------ header */
function buildHeader(loggedIn) {
  const o = V.override('buildHeader'); if (o) return o(loggedIn);
  return `
  <header class="site-header">
    <div class="site-header__inner">
      <a class="logo" href="index.html" aria-label="Relationskompassen – hem">${logoBlob()}</a>
      <nav class="header__nav">
        <button class="header__item">${ICON.globe} SPRÅK</button>
        <button class="header__item">${ICON.eye} LÄTTLÄST</button>
      </nav>
      <div class="header__right">
        <form class="search" onsubmit="return false">
          <input type="text" placeholder="SÖK" aria-label="Sök">
          <button aria-label="Sök">${ICON.search}</button>
        </form>
        <a class="header__account" href="${loggedIn ? 'min-sida.html' : 'logga-in.html'}">
          MIN SIDA <span class="avatar">${ICON.person}</span>
        </a>
        <button class="header__menu" onclick="toggleSiteMenu(this)">
          MENY <span class="hamburger"><span></span><span></span><span></span></span>
        </button>
      </div>
    </div>
  </header>`;
}

/* ------------------------------------------------------------------ footer */
function buildFooter() {
  const o = V.override('buildFooter'); if (o) return o();
  return `
  <footer class="site-footer">
    <div class="footer__grid">
      <div class="footer__logo"><a class="logo" href="index.html">${logoBlob()}</a></div>
      <div>
        <h4>Kontakta oss</h4>
        <p style="margin-bottom:6px">E-post:</p>
        <a href="#">mail@email.com</a>
        <p style="margin:14px 0 6px">Telefon:</p>
        <a href="#">000-00000</a>
      </div>
      <div>
        <h4>Vår webbplats</h4>
        <a href="#">Om webbplatsen</a>
        <a href="#">Tillgänglighetsredogörelse</a>
        <a href="#">Om kakor</a>
        <a href="#">Hantering av personuppgifter</a>
      </div>
    </div>
    <div class="footer__reset">
      <a href="#" onclick="resetVisited();location.href='index.html';return false">Nollställ session</a>
    </div>
  </footer>`;
}

/* ---------------------------------------------------------- INNEHÅLL-menyn */
/* ------------------------------------------------ sessionsminne (besökta kapitel)
   Sparas i sessionStorage så att avklarade kapitel förblir markerade även när
   man klickar sig bakåt. Nollställs med "Nollställ session", ?reset i URL:en,
   eller genom att öppna prototypen i en ny flik. */
const VISIT_KEY = 'rk_visited';
function getVisited() {
  try { return new Set(JSON.parse(sessionStorage.getItem(VISIT_KEY) || '[]')); }
  catch (e) { return new Set(); }
}
function markVisited(i) {
  const s = getVisited(); s.add(i);
  try { sessionStorage.setItem(VISIT_KEY, JSON.stringify([...s])); } catch (e) {}
}
function resetVisited() {
  try { sessionStorage.removeItem(VISIT_KEY); } catch (e) {}
}

// bred, tydlig expanderpil (för Elsa och Omar-gruppen)
const CHEVRON = `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;

function tocRow(ch, currentIndex, visited, elsaCollapsed) {
  const o = V.override('tocRow'); if (o) return o(ch, currentIndex, visited, elsaCollapsed);
  const isCurrent = ch.i === currentIndex;
  const isDone    = !isCurrent && visited.has(ch.i);   // avklarat = tidigare besökt
  // (ej besökt = låst/utgråat)

  let radioClass = 'radio', radioInner = '', stateClass = '';
  if (isDone)         { radioClass += ' radio--done';    radioInner = '✓'; stateClass = ' toc__item--done'; }
  else if (isCurrent) { radioClass += ' radio--current';                   stateClass = ' toc__item--current'; }
  else                { radioClass += ' radio--future';                    stateClass = ' toc__item--future'; }

  const sub   = ch.level === 1 ? ' toc__item--sub' : '';
  const label = `<span class="${radioClass}">${radioInner}</span><span>${ch.title}</span>`;
  // Elsa och Omar (index 4): klickbar pil som fäller upp/ner underkapitlen
  const chev  = ch.i === 4
    ? `<span class="toc__chev${elsaCollapsed ? ' collapsed' : ''}" onclick="toggleElsa(event)" role="button" aria-label="Visa/dölj underkapitel">${CHEVRON}</span>`
    : '';

  // Klickbart endast för avklarade/aktuellt kapitel (och som har en sida).
  if ((isDone || isCurrent) && ch.file) {
    return `<a class="toc__item${sub}${stateClass}" href="${ch.file}">${label}${chev}</a>`;
  }
  return `<span class="toc__item${sub}${stateClass}">${label}${chev}</span>`;
}

function buildToc(currentIndex) {
  const o = V.override('buildToc'); if (o) return o(currentIndex);
  const visited = getVisited();
  // Default infälld – men fäll ut automatiskt om man är inne på ett underkapitel (del 2–4)
  const elsaCollapsed = ![5, 6, 7].includes(currentIndex);
  let html = '';
  CHAPTERS.forEach(ch => {
    if (ch.level === 1) return;               // underkapitel hanteras med sin grupp
    html += tocRow(ch, currentIndex, visited, elsaCollapsed);
    if (ch.i === 4) {                          // efter "Elsa och Omar": fällbar grupp
      const subs = CHAPTERS.filter(c => c.level === 1)
        .map(c => tocRow(c, currentIndex, visited, elsaCollapsed)).join('');
      html += `<div class="toc__subgroup${elsaCollapsed ? ' collapsed' : ''}" id="tocSub">${subs}</div>`;
    }
  });
  return `<div class="toc" id="toc">${html}</div>`;
}

/* ---------------------------------------------------------- course subnav */
function buildCourseBar(ch) {
  const o = V.override('buildCourseBar'); if (o) return o(ch);
  return `
  <div class="breadcrumb">
    <div class="breadcrumb__inner">
      <a href="index.html">Hem</a><span class="sep">/</span>
      <a href="#">Skola</a><span class="sep">/</span>
      <a href="grundkurs.html">Relationskompassens grundkurs</a>
      ${ch.i !== 0 ? `<span class="sep">/</span>${ch.title}` : ''}
    </div>
  </div>
  <div class="coursebar">
    <div class="coursebar__inner">
      <button class="coursebar__toggle" onclick="toggleToc(this)">
        INNEHÅLL <span class="hamburger"><span></span><span></span><span></span></span>
      </button>
      <span class="coursebar__title">Relationskompassens grundkurs</span>
      ${buildToc(ch.i)}
    </div>
  </div>`;
}

/* ---------------------------------------------------------- prev/next + progress */
function buildPageNav(ch) {
  const o = V.override('buildPageNav'); if (o) return o(ch);
  const prev = CHAPTERS[ch.i - 1];
  const next = CHAPTERS[ch.i + 1];
  const prevBtn = prev
    ? `<a class="btn btn--outline" href="${prev.file || '#'}"><span class="arrow">←</span> ${prev.title}</a>`
    : `<span></span>`;
  const nextDisabled = !next || !next.file;   // sista innehållssidan -> ingen vidareklickning
  const nextBtn = next
    ? `<a class="btn btn--outline ${nextDisabled ? 'btn--disabled' : ''}" href="${next.file || '#'}">${next.title} <span class="arrow">→</span></a>`
    : `<span></span>`;
  return `<div class="pagenav">${prevBtn}${nextBtn}</div>`;
}
function buildProgress(ch) {
  const o = V.override('buildProgress'); if (o) return o(ch);
  const pct = Math.round((ch.i / TOTAL) * 100);
  return `
  <div class="progress">
    <div class="progress__label" style="--ppos:${pct}%">${ch.i}/${TOTAL}</div>
    <div class="progress__track"><div class="progress__fill" style="width:${pct}%"></div></div>
  </div>`;
}

/* ------------------------------------------------------------------- init */
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const loggedIn = body.dataset.logged === 'true';

  // Nollställ sessionsminnet om ?reset finns i URL:en
  if (location.search.indexOf('reset') !== -1) resetVisited();

  // Header överst
  body.insertAdjacentElement('afterbegin', el(buildHeader(loggedIn)));

  // Sub-bar beroende på sidtyp
  const header = document.querySelector('.site-header');
  const type = body.dataset.subbar; // 'title' | 'hero' | 'course' | 'none'
  let currentCh = null;

  if (type === 'title') {
    header.insertAdjacentElement('afterend',
      el(`<div class="titlebar"><div class="titlebar__inner">
            <span class="person">${ICON.person}</span><span class="t">${body.dataset.title || ''}</span>
          </div></div>`));
  } else if (type === 'course') {
    const idx = parseInt(body.dataset.chapter, 10);
    const ch = CHAPTERS[idx];
    currentCh = ch;
    markVisited(idx);   // spara detta kapitel som besökt innan menyn byggs
    header.insertAdjacentHTML('afterend', buildCourseBar(ch));
    // injicera prev/next + progress i slutet av .course-main om markör finns
    const anchor = document.querySelector('[data-pagenav]');
    if (anchor) {
      anchor.insertAdjacentHTML('beforebegin', buildPageNav(ch));
      anchor.insertAdjacentHTML('beforebegin', buildProgress(ch));
    }
  }

  // Footer sist
  body.insertAdjacentElement('beforeend', el(buildFooter()));

  // Byt grå platshållare mot riktiga bilder om filen finns i assets/
  // (lägg en fil med rätt namn -> den ersätter automatiskt platshållaren)
  document.querySelectorAll('[data-img]').forEach(box => {
    const img = new Image();
    img.onload = () => {
      box.innerHTML = '';
      img.alt = box.dataset.alt || '';
      box.appendChild(img);
      box.classList.add('has-img');
    };
    img.src = 'assets/' + box.dataset.img;
  });

  // MENY-panel (webbplatsmeny) + overlay – finns på alla sidor
  buildMenuLayer();

  // Min sida: låt grundkursens framsteg spegla sessionsminnet
  updateDashProgress();

  // (Nollställ session finns diskret i footern)

  // Variantens egna tillägg (sticky paneler, extra knappar m.m.) – körs sist
  // när all bas-DOM finns på plats. Gör inget i basversionen.
  V.override('initExtra')?.({ ch: currentCh, type, loggedIn });

  // Stäng menyer med Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMenus();
  });
  // Stäng INNEHÅLL-menyn (som saknar overlay) vid klick utanför
  document.addEventListener('click', (e) => {
    const toc = document.getElementById('toc');
    if (toc && toc.classList.contains('open') &&
        !e.target.closest('.toc') && !e.target.closest('.coursebar__toggle')) {
      closeAllMenus();
    }
  });
});

/* ------------------------------------------------ MENY-panel (webbplatsmeny) */
function buildMenuLayer() {
  const o = V.override('buildMenuLayer'); if (o) return o();
  if (document.getElementById('siteMenu')) return;
  const header = document.querySelector('.site-header');
  const top = (header ? header.offsetHeight : 110) + 'px';

  const overlay = el('<div class="menu-overlay" id="menuOverlay"></div>');
  overlay.style.top = top;
  overlay.addEventListener('click', closeAllMenus);

  const menu = el(`
    <nav class="site-menu" id="siteMenu" aria-label="Webbplatsmeny">
      <a href="grundkurs.html">Relationskompassens grundkurs</a>
      <a href="#">Material</a>
      <a href="#">Om Relationskompassen</a>
      <a href="#">Kontakta oss</a>
    </nav>`);
  menu.style.top = top;

  document.body.appendChild(overlay);
  document.body.appendChild(menu);
}
function showOverlay() { document.getElementById('menuOverlay')?.classList.add('show'); }
function closeAllMenus() {
  document.getElementById('siteMenu')?.classList.remove('open');
  document.getElementById('toc')?.classList.remove('open');
  document.getElementById('menuOverlay')?.classList.remove('show');
  document.querySelector('.coursebar')?.classList.remove('above');
  document.querySelectorAll('.header__menu, .coursebar__toggle')
    .forEach(b => b.classList.remove('is-open'));
}
function toggleSiteMenu(btn) {
  const menu = document.getElementById('siteMenu');
  const willOpen = !menu.classList.contains('open');
  closeAllMenus();
  if (willOpen) { menu.classList.add('open'); btn.classList.add('is-open'); showOverlay(); }
}
function toggleToc(btn) {
  const toc = document.getElementById('toc');
  const willOpen = !toc.classList.contains('open');
  closeAllMenus();
  // Vänstermenyn (INNEHÅLL) har ingen bakgrundsdimning – bara panelen fälls ut.
  if (willOpen) { toc.classList.add('open'); btn.classList.add('is-open'); }
}

// Min sida: uppdatera grundkursens progressbar/knapp utifrån besökta kapitel
function updateDashProgress() {
  const gk = document.getElementById('courseGrundkurs');
  if (!gk) return;
  const total = parseInt(gk.dataset.total, 10) || 20;
  const visited = getVisited();
  const done = visited.size ? Math.min(total, Math.max(...visited)) : 0; // hur långt man nått
  const pct = Math.round(done / total * 100);
  gk.querySelector('.course-count').textContent = done + ' av ' + total;
  const fill = gk.querySelector('.mini-fill');
  fill.style.width = pct + '%';
  const cta = gk.querySelector('.course-cta');
  if (done >= total) {
    fill.classList.add('mini-fill--done');
    cta.innerHTML = 'Se igen <span class="arrow">→</span>';
  } else if (done > 0) {
    cta.innerHTML = 'Fortsätt <span class="arrow">→</span>';
  } else {
    cta.innerHTML = 'Starta <span class="arrow">→</span>';
  }
}

/* ----------------------------------------------- interaktioner (globala) */
// Fäll upp/ner underkapitlen för Elsa och Omar (default uppfällt)
function toggleElsa(e) {
  e.preventDefault(); e.stopPropagation();
  document.getElementById('tocSub')?.classList.toggle('collapsed');
  e.currentTarget.classList.toggle('collapsed');
}
function toggleTranscribe(btn) {
  btn.nextElementSibling.classList.toggle('open');
}
// "Vad tror du"-quiz: visa facit (bild-quiz)
function rattaBild(btn, correctSelector) {
  document.querySelectorAll(correctSelector).forEach(o => o.classList.add('correct'));
}
// checkbox-quiz: visa facit
function rattaCheck(btn, groupId) {
  document.querySelectorAll('#' + groupId + ' .checkrow').forEach(row => {
    if (row.dataset.correct === 'true') { row.classList.add('correct'); row.querySelector('.box').textContent = '✓'; }
    else if (row.dataset.wrong === 'true') { row.classList.add('wrong'); row.querySelector('.box').textContent = '✕'; }
  });
  const fb = document.querySelector('#' + groupId + ' .feedback-box');
  if (fb) fb.classList.add('show');
}
