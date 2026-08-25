/* ==========================================================================
   VARIANT v1 – ny meny & navigation
   Bygger kravspec v1 (2026-08-24) + återkoppling omgång 2–4.
   Allt som INTE står här ärvs från basversionen i app.js, så v0 är orörd.

   KRAV SOM ÄR BYGGDA
     Omgång 1
     1  Min sida: "Mina kurser" överst, kontouppgifterna under.  -> initExtra + CSS
     2  "Logga ut" flyttad till svarta listen, längst upp till höger.  -> initExtra
     4  Kursvy: topheader + brödsmulor bort, svarta listen sticky.
                                                          -> buildCourseBar + CSS
     6  Progressindikatorn i botten av kapitelsidan borttagen.   -> buildProgress

     Omgång 2
     A  Större rubriker på artikel-/kapitelsidor (brödtexten orörd).    -> CSS
     B  Blå rutan på Min sida läses som en ruta med luft ovanför.       -> CSS
     C  Vita kurskort på den blå ytan. Pågående kurs först, genomförd
        sist. Två i bredd, tre eller fler staplas.          -> initExtra + CSS
     D  Kapitelnumrering från 1 i innehållsmenyn, undernivåer 5.1–5.3.
                                                              -> tocRow + CSS

     Omgång 3
     E  "Mina uppgifter" är en helbred platta som även rymmer "Byt lösenord"
        och "Ta bort användarkontot" som undersektioner.       -> initExtra + CSS
     F  Större videoruta på kapitelsidor, smalare radbredd.             -> CSS
     G  Skarpa hörn på kursplattan och kurskorten; korten breddade.     -> CSS

     Omgång 4
     H  Orange progresslinje även för pågående kurs.                    -> CSS
     I  Introtext + rad med beräknad tid på varje kurskort. -> initExtra + CSS
     J  "Ladda ner intyg" vit med svart text så den inte konkurrerar
        med "Fortsätt".                                                 -> CSS
     K  Byt lösenord: halverad fältbredd + ögonikon i fältet.
                                                            -> initExtra + CSS
     L  Numret direkt bredvid kapitelnamnet: "1. Relationskompassens
        grundkurs".                                               -> tocRow + CSS
     M  Kapitelsidans svarta list enligt skiss: vit bakåtpil före
        kursnamnet, INNEHÅLL + hamburgare uppflyttad till höger,
        MIN SIDA borttagen.                               -> buildCourseBar + CSS
     N  Tunn progressindikator direkt under svarta listen, synkad med
        Min sidas progress.                               -> buildCourseBar + CSS

     Omgång 5
     O  Innehållsmenyn ligger ovanpå progressraden, och har en knapp
        "Till Min sida" klistrad i underkanten.  -> buildCourseBar/buildToc + CSS
     P  Handritad pil i styleguidens manér, i knappar och svarta listen.
                                                            -> initExtra + CSS
     Q  Samma innehållsbredd på alla kapitelsidor: film och bildrader i
        --v1-media, rubriker och brödtext i --v1-text. Spalten centrerad
        som i betan. Prev/next linjerar med innehållet.      -> initExtra + CSS
     R  Prev/next med transparent bakgrund och svart ram, som originalet.
                                                                     -> CSS

     Omgång 6
     S  Lättare kursnamn på Min sida (vikt 700, mindre grad).          -> CSS
     T  Lägre vita kurskort.                                           -> CSS
     U  "Till Min sida" ligger fast efter sista kapitlet, med .btn:s mått
        och bara textens bredd.                            -> buildToc + CSS
     V  Litet lodrätt streck mellan bakåtpilen och kursrubriken i svarta
        listen, så pilen läses som "tillbaka", inte som del av rubriken.
                                                      -> buildCourseBar + CSS

   Tillgängliga hooks och byggstenar: se kommentaren i variants.js samt
   funktionsnamnen i app.js.
   ========================================================================== */


/* ---------------------------------------------------------------- krav P
   Handritad pil, i styleguidens ikonmanér.

   Styleguidens ikonsida (s. 10) innehåller INGEN pil – de tolv ikonerna är
   öga, läppar, hjärta, hashtag, "!!!", två smileys, pratbubbla, sicksack,
   blixt och stjärnsmäll. Men manéret är entydigt: handritat, en enkel
   obruten linje, rundade ändar, lätt ojämn form. Pilarna nedan är ritade
   efter det: bågad skaftlinje och ett något asymmetriskt huvud.

   currentColor gör att samma pil blir vit i svarta listen och orange i
   knapparna, utan egna varianter.                                          */
const V1_ARROW_SVG =
  '<svg class="v1-arr" viewBox="0 0 40 24" width="30" height="18" fill="none"' +
  ' stroke="currentColor" stroke-width="3.4" stroke-linecap="round"' +
  ' stroke-linejoin="round" aria-hidden="true" focusable="false">';

const V1_ARROW_LEFT = V1_ARROW_SVG +
  '<path d="M37 12.2c-10.4.6-21 .8-32.6.6"/>' +
  '<path d="M13.6 3.6C10.1 6.9 7.1 9.7 3.9 12.6c3.3 2.4 6.4 5 9.3 7.8"/></svg>';

const V1_ARROW_RIGHT = V1_ARROW_SVG +
  '<path d="M3 12.2c10.4.6 21 .8 32.6.6"/>' +
  '<path d="M26.4 3.6C29.9 6.9 32.9 9.7 36.1 12.6c-3.3 2.4-6.4 5-9.3 7.8"/></svg>';

/* Byter ut basens teckenpilar (← →) mot den handritade ikonen överallt där
   de förekommer: svarta listen, prev/next på kapitelsidor och knapparna på
   Min sida. Tecken som inte är pilar (t.ex. ✕) lämnas orörda. */
function v1SwapArrows(root) {
  (root || document).querySelectorAll('.arrow').forEach(span => {
    const t = span.textContent.trim();
    if (t === '←')      span.innerHTML = V1_ARROW_LEFT;
    else if (t === '→') span.innerHTML = V1_ARROW_RIGHT;
  });
}


/* ---------------------------------------------------------------- krav Q
   Kapitelsidorna i basen sätter inline-bredder på enstaka stycken
   (style="max-width:900px" på 9 ställen, medan grundkurs.html saknar dem).
   Det var därför innehållet låg olika brett från kapitel till kapitel.
   Här nollas bara max-width – övriga inline-stilar (t.ex. margin-top) står
   kvar – så att CSS-måtten --v1-text / --v1-media gäller överallt.       */
function v1NormalizeWidths() {
  const main = document.querySelector('.coursepage .course-main');
  if (!main) return;
  main.querySelectorAll('[style*="max-width"]').forEach(el => {
    el.style.maxWidth = '';
  });
}


/* ---------------------------------------------------------------- krav I
   Kursinformation som inte finns i min-sida.html. Nyckeln är kursnamnet så
   som det står i rubrikraden på kortet.

   Obs: tiden står bara på den egna raden, inte också i introtexten – annars
   hade "2 timmar" stått två gånger i samma kort. */
const V1_COURSE_INFO = {
  'Relationskompassens grundkurs': {
    time:  'Beräknad tid: ca 2 timmar',
    intro: 'Detta är en webbkurs för alla vuxna som ska arbeta med Relationskompassen.',
  },
  'Att leda träffar i skolan': {
    time:  'Beräknad tid: ca 45 minuter',
    intro: 'Här får du som ska leda Relationskompassens träffar i skolan stöd för att planera och genomföra dem.',
  },
};


/* ==========================================================================
   KRAV D + L – kapitelnumrering
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
   KRAV N – progressindikator i kurshuvudet
   Visar samma tal som Min sida: hur långt man nått av TOTAL, inte vilket
   kapitel man just nu råkar läsa. Klickar man sig bakåt står siffran alltså
   kvar, precis som på Min sida.
   ========================================================================== */
function v1ProgressPct() {
  const visited = getVisited();
  const done = visited.size ? Math.min(TOTAL, Math.max.apply(null, [...visited])) : 0;
  return Math.round(done / TOTAL * 100);
}


/* ==========================================================================
   KRAV 1, 2, C, E, I, K – Min sida
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

  /* krav E: "Mina uppgifter" är sektionsrubrik för hela den creme plattan och
     får därför samma nivå som "Mina kurser" (h2). "Byt lösenord" och "Ta bort
     användarkontot" ligger kvar som h3 och blir undersektioner.
     Styleguiden anger bara typsnitt och vikter, ingen rubrikskala – nivåerna
     är alltså prototypens egna (h2 clamp(1.6–2.3rem), h3 1.4rem). */
  const firstHeading = dash.querySelector('.dash__side > section h3');
  if (firstHeading) {
    const h2 = document.createElement('h2');
    h2.textContent = firstHeading.textContent;
    firstHeading.replaceWith(h2);
  }

  v1BuildCourseCards();
  v1PasswordFields();
}

/* krav C + I: ett vitt kort per kurs på den blå ytan.
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
    const info = V1_COURSE_INFO[c.title] || {};
    const box = document.createElement('div');
    box.className = 'v1-card' + (c.pct >= 100 ? ' v1-card--done' : '');
    box.innerHTML = `
      <h3 class="v1-card__title">${c.title}</h3>
      ${info.intro ? `<p class="v1-card__intro">${info.intro}</p>` : ''}
      ${info.time  ? `<p class="v1-card__time">${info.time}</p>` : ''}
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

/* krav K: lösenordsfälten halveras och får en ögonikon längst till höger,
   som i originalet. Ikonen är samma öga som LÄTTLÄST i headern (ICON.eye),
   alltså profilens handritade manér. */
function v1PasswordFields() {
  document.querySelectorAll('.dash__side input[type="password"]').forEach(input => {
    const field = input.closest('.field');
    if (field) {
      field.style.maxWidth = '';        // släpper min-sida.html:s inline-bredd
      field.classList.add('v1-pwfield');
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'v1-eye';
    btn.setAttribute('aria-label', 'Visa lösenord');
    btn.innerHTML = ICON.eye;
    btn.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.classList.toggle('is-on', show);
      btn.setAttribute('aria-label', show ? 'Dölj lösenord' : 'Visa lösenord');
    });
    input.insertAdjacentElement('afterend', btn);
  });
}


/* ========================================================================== */

window.RK_V1 = {

  /* ------------------------------------------------------------ krav M + N
     Kapitelsidans sidhuvud enligt skiss: vit bakåtpil till Min sida, kursnamn,
     och INNEHÅLL + hamburgare längst till höger – allt i den svarta listen.
     MIN SIDA är borttagen (bakåtpilen fyller den funktionen).

     Under listen en tunn progressindikator. Svarta listen, progressraden och
     innehållsmenyn ligger i en gemensam sticky-behållare, så allt följer med
     vid scroll utan att vi behöver räkna ut någon pixelhöjd.
     Ingen breadcrumb byggs (krav 4); topheadern göms med CSS.               */
  buildCourseBar(ch) {
    return `
    <div class="v1-coursehead">

      <div class="coursebar">
        <div class="coursebar__inner">
          <a class="v1-back" href="min-sida.html" aria-label="Tillbaka till Min sida"
             title="Tillbaka till Min sida"><span class="arrow">←</span></a>
          <span class="v1-headsep" aria-hidden="true"></span>
          <span class="coursebar__title">Relationskompassens grundkurs</span>
          <button class="coursebar__toggle v1-toc-toggle" onclick="toggleToc(this)">
            INNEHÅLL <span class="hamburger"><span></span><span></span><span></span></span>
          </button>
        </div>
        ${buildToc(ch.i)}
      </div>

      <div class="v1-progress" role="progressbar" aria-label="Kursens framsteg"
           aria-valuenow="${v1ProgressPct()}" aria-valuemin="0" aria-valuemax="100">
        <div class="v1-progress__fill" style="width:${v1ProgressPct()}%"></div>
      </div>

    </div>`;
  },

  /* krav O: samma kapitellista som basen, men med en utgång längst ner.
     Menyn hänger från svarta listens underkant (se buildCourseBar) och lägger
     sig därmed ovanpå progressraden i stället för under den. */
  buildToc(currentIndex) {
    const visited = getVisited();
    // Default infälld – men fäll ut automatiskt om man är inne på ett underkapitel
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
    // extra väg ut ur kursen, fast placerad efter sista kapitlet.
    // .btn ger samma storlek som övriga knappar på sajten.
    html += `<a class="btn v1-toc-exit" href="min-sida.html">Till Min sida</a>`;
    return `<div class="toc" id="toc">${html}</div>`;
  },

  /* krav D + L: kapitelnummer i innehållsmenyn, direkt bredvid kapitelnamnet
     med punkt och ett blanksteg. Samma logik som basen i övrigt – den lilla
     cirkeln med bock/prick behålls som den är. */
  tocRow(ch, currentIndex, visited, elsaCollapsed) {
    const isCurrent = ch.i === currentIndex;
    const isDone    = !isCurrent && visited.has(ch.i);

    let radioClass = 'radio', radioInner = '', stateClass = '';
    if (isDone)         { radioClass += ' radio--done';    radioInner = '✓'; stateClass = ' toc__item--done'; }
    else if (isCurrent) { radioClass += ' radio--current';                   stateClass = ' toc__item--current'; }
    else                { radioClass += ' radio--future';                    stateClass = ' toc__item--future'; }

    const sub   = ch.level === 1 ? ' toc__item--sub' : '';
    const label = `<span class="${radioClass}">${radioInner}</span>` +
                  `<span>${v1Nums()[ch.i]}. ${ch.title}</span>`;
    const chev  = ch.i === 4
      ? `<span class="toc__chev${elsaCollapsed ? ' collapsed' : ''}" onclick="toggleElsa(event)" role="button" aria-label="Visa/dölj underkapitel">${CHEVRON}</span>`
      : '';

    if ((isDone || isCurrent) && ch.file) {
      return `<a class="toc__item${sub}${stateClass}" href="${ch.file}">${label}${chev}</a>`;
    }
    return `<span class="toc__item${sub}${stateClass}">${label}${chev}</span>`;
  },

  /* krav 6: progressindikatorn i botten av kapitelsidan tas bort. Den nya
     ligger i stället i kurshuvudet (krav N).
     Prev/next behålls oförändrad (ingen override av buildPageNav). */
  buildProgress(ch) {
    return '';
  },

  /* Körs sist i uppstarten, när all bas-DOM finns */
  initExtra({ type }) {
    if (type === 'title')  v1BuildMinSida();
    if (type === 'course') v1NormalizeWidths();   // krav Q: samma bredd överallt
    v1SwapArrows();          // krav P: handritad pil överallt, alla sidtyper
  },

};
