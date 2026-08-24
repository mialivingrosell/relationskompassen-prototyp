/* ==========================================================================
   VARIANT v1 – ny meny & navigation
   Bygger kravspec v1 (2026-08-24) + återkoppling omgång 2 (2026-08-24).
   Allt som INTE står här ärvs från basversionen i app.js, så v0 är orörd.

   KRAV SOM ÄR BYGGDA
     Omgång 1
     1  Min sida: "Mina kurser" överst i full bredd, uppgifter + lösenord
        sida vid sida under, "Ta bort kontot" längst ner.        -> initExtra + CSS
     2  "Logga ut" flyttad till svarta listen, längst upp till höger.  -> initExtra
     4  Kursvy: topheader + brödsmulor bort, svarta listen sticky med
        kursnamn vänster och MIN SIDA höger.               -> buildCourseBar + CSS
     5  Blå sticky navrad under: bakåtpil vänster, "Innehåll" +
        hamburgare höger, innehållsmenyn högerställd.      -> buildCourseBar + CSS
     6  Progressindikatorn i botten av kapitelsidan borttagen.   -> buildProgress

     Omgång 2
     A  Större rubriker på artikel-/kapitelsidor (brödtexten orörd).    -> CSS
     B  Blå rutan på Min sida läses som en ruta med luft ovanför.       -> CSS
     C  Vita kurskort på den blå ytan: kursnamn, procent i stor siffra,
        kapitelantal, kortare progressstreck, knapp. Pågående kurs
        först, genomförd sist. Två i bredd, tre eller fler staplas.
                                                            -> initExtra + CSS
     D  Kapitelnumrering från 1 i innehållsmenyn, undernivåer 5.1–5.3.
                                                              -> tocRow + CSS

   Tillgängliga hooks och byggstenar: se kommentaren i variants.js samt
   funktionsnamnen i app.js.
   ========================================================================== */

/* Liten vänsterpil till bakåtknappen (krav 5). currentColor = navy via CSS. */
const V1_BACK = `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`;


/* ==========================================================================
   KRAV D – kapitelnumrering
   Huvudkapitel numreras 1, 2, 3 ... och underkapitel ärver förälderns
   nummer: 5.1, 5.2, 5.3. Numreringen räknas fram ur CHAPTERS, så den följer
   med automatiskt om kapitelordningen ändras.

   Obs: CHAPTERS bor i app.js som laddas EFTER den här filen – därför räknas
   kartan fram först vid första anropet, inte när filen läses.
   ========================================================================== */
let _v1Nums = null;
function v1Nums() {
  if (_v1Nums) return _v1Nums;
  const map = {};
  let main = 0, sub = 0;
  CHAPTERS.forEach(ch => {
    if (ch.level === 1) { sub += 1; map[ch.i] = main + '.' + sub; }
    else                { main += 1; sub = 0; map[ch.i] = String(main); }
  });
  _v1Nums = map;
  return map;
}


/* ==========================================================================
   KRAV 1, 2, C – Min sida
   Byggs om i DOM:en i stället för i min-sida.html, så att samma HTML-fil kan
   visa både v0 och v1.
   ========================================================================== */
function v1BuildMinSida() {
  const dash = document.querySelector('.dash');
  if (!dash) return;

  /* krav 2: flytta "Logga ut" upp i svarta listen, längst till höger */
  const logout = dash.querySelector('a[href="logga-in.html"]');
  const titlebar = document.querySelector('.titlebar__inner');
  if (logout && titlebar) {
    logout.classList.add('v1-logout');
    titlebar.appendChild(logout);
  }

  /* krav 1: märk sidopanelerna så CSS kan lägga de två första sida vid sida
     och den sista (ta bort kontot) i full bredd längst ner */
  const panels = dash.querySelectorAll('.dash__side > section');
  panels.forEach((s, i) => {
    s.classList.add(i === panels.length - 1 ? 'v1-panel--full' : 'v1-panel--col');
  });

  v1BuildCourseCards();
}

/* krav C: ett vitt kort per kurs på den blå ytan.
   Knapparna ("Fortsätt", "Se igen", "Ladda ner intyg") är godkända som de är
   och flyttas därför över oförändrade i stället för att byggas om. */
function v1BuildCourseCards() {
  const wrap = document.querySelector('.dash__courses');
  if (!wrap) return;

  const items = Array.from(wrap.querySelectorAll('.course-item'));
  if (!items.length) return;

  const courses = items.map(item => {
    // "5 av 20" står i .course-count (grundkursen, sätts av app.js) eller som
    // sista span i kortets rubrikrad (de statiska korten).
    const countEl = item.querySelector('.course-count') ||
                    item.querySelector('.row span:last-child');
    const titleEl = item.querySelector('.row span');
    const m = (countEl ? countEl.textContent : '').match(/(\d+)\s*av\s*(\d+)/);
    const done  = m ? parseInt(m[1], 10) : 0;
    const total = m ? parseInt(m[2], 10) : 0;
    return {
      title: titleEl ? titleEl.textContent.trim() : '',
      done, total,
      pct: total ? Math.round(done / total * 100) : 0,
      actions: item.querySelector('.course-actions') || item.querySelector('.course-cta'),
    };
  });

  /* pågående kurs överst (= först, alltså överst till vänster i rastret),
     genomförd kurs längst ner */
  courses.sort((a, b) => (a.pct >= 100 ? 1 : 0) - (b.pct >= 100 ? 1 : 0));

  const grid = document.createElement('div');
  grid.className = 'v1-cards';
  grid.dataset.count = courses.length;   // 2 -> två i bredd, annars staplade

  courses.forEach(c => {
    const box = document.createElement('div');
    box.className = 'v1-card' + (c.pct >= 100 ? ' v1-card--done' : '');
    box.innerHTML = `
      <h3 class="v1-card__title">${c.title}</h3>
      <p class="v1-card__lead">Du har genomfört</p>
      <div class="v1-card__pct">${c.pct}<span>%</span></div>
      <p class="v1-card__sub">${c.done} av ${c.total} kapitel genomförda</p>
      <div class="v1-card__track">
        <div class="v1-card__fill" style="width:${c.pct}%"></div>
      </div>`;

    // befintliga knappar flyttas in i kortet, oförändrade
    const actions = document.createElement('div');
    actions.className = 'v1-card__actions';
    if (c.actions) {
      if (c.actions.classList.contains('course-actions')) {
        while (c.actions.firstChild) actions.appendChild(c.actions.firstChild);
      } else {
        actions.appendChild(c.actions);
      }
    }
    box.appendChild(actions);
    grid.appendChild(box);
  });

  items.forEach(item => item.remove());
  wrap.appendChild(grid);
}


/* ========================================================================== */

window.RK_V1 = {

  /* --------------------------------------------------------- krav 4 + krav 5
     Kursvyns eget sidhuvud. Svarta listen och den blå navraden ligger i en
     gemensam sticky-behållare – då följer båda med vid scroll utan att vi
     behöver räkna ut någon pixelhöjd.
     Ingen breadcrumb byggs (krav 4); topheadern göms med CSS.               */
  buildCourseBar(ch) {
    return `
    <div class="v1-coursehead">

      <div class="coursebar">
        <div class="coursebar__inner">
          <span class="coursebar__title">Relationskompassens grundkurs</span>
          <a class="header__account v1-account" href="min-sida.html">
            MIN SIDA <span class="avatar">${ICON.person}</span>
          </a>
        </div>
      </div>

      <div class="v1-subnav">
        <div class="v1-subnav__inner">
          <a class="v1-back" href="min-sida.html" aria-label="Tillbaka till Min sida"
             title="Tillbaka till Min sida">${V1_BACK}</a>
          <button class="coursebar__toggle v1-toc-toggle" onclick="toggleToc(this)">
            Innehåll <span class="hamburger"><span></span><span></span><span></span></span>
          </button>
        </div>
        ${buildToc(ch.i)}
      </div>

    </div>`;
  },

  /* krav D: kapitelnummer i innehållsmenyn. Samma logik som basen, men numret
     läggs till i texten – den lilla cirkeln med bock/prick behålls som den är. */
  tocRow(ch, currentIndex, visited, elsaCollapsed) {
    const isCurrent = ch.i === currentIndex;
    const isDone    = !isCurrent && visited.has(ch.i);

    let radioClass = 'radio', radioInner = '', stateClass = '';
    if (isDone)         { radioClass += ' radio--done';    radioInner = '✓'; stateClass = ' toc__item--done'; }
    else if (isCurrent) { radioClass += ' radio--current';                   stateClass = ' toc__item--current'; }
    else                { radioClass += ' radio--future';                    stateClass = ' toc__item--future'; }

    const sub   = ch.level === 1 ? ' toc__item--sub' : '';
    const label = `<span class="${radioClass}">${radioInner}</span>` +
                  `<span><span class="v1-tocnum">${v1Nums()[ch.i]}</span>${ch.title}</span>`;
    const chev  = ch.i === 4
      ? `<span class="toc__chev${elsaCollapsed ? ' collapsed' : ''}" onclick="toggleElsa(event)" role="button" aria-label="Visa/dölj underkapitel">${CHEVRON}</span>`
      : '';

    if ((isDone || isCurrent) && ch.file) {
      return `<a class="toc__item${sub}${stateClass}" href="${ch.file}">${label}${chev}</a>`;
    }
    return `<span class="toc__item${sub}${stateClass}">${label}${chev}</span>`;
  },

  /* krav 6: progressindikatorn i botten av kapitelsidan tas bort.
     Prev/next behålls oförändrad (ingen override av buildPageNav). */
  buildProgress(ch) {
    return '';
  },

  /* krav 1, 2, C – körs sist i uppstarten, när all bas-DOM finns */
  initExtra({ type }) {
    if (type === 'title') v1BuildMinSida();
  },

};
