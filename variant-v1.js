/* ==========================================================================
   VARIANT v1 – ny meny & navigation
   Bygger kravspec v1 (2026-08-24). Allt som INTE står här ärvs från
   basversionen i app.js, så v0 är helt orörd.

   KRAV SOM ÄR BYGGDA
     1  Min sida: "Mina kurser" överst i full bredd, uppgifter + lösenord
        sida vid sida under, "Ta bort kontot" längst ner.        -> initExtra + CSS
     2  "Logga ut" flyttad till svarta listen, längst upp till höger.  -> initExtra
     3  Kurskort med procent i stor siffra + nedtonat kapitelantal.    -> initExtra
        (lågprioriterat/osäkert – stäng av med ?kurskort=bas i adressen
         för att se basversionens kort inne i v1)
     4  Kursvy: topheader + brödsmulor bort, svarta listen sticky med
        kursnamn vänster och MIN SIDA höger.               -> buildCourseBar + CSS
     5  Blå sticky navrad under: bakåtpil vänster, "Innehåll" +
        hamburgare höger, innehållsmenyn högerställd.      -> buildCourseBar + CSS
     6  Progressindikatorn i botten av kapitelsidan borttagen.   -> buildProgress

   Tillgängliga hooks och byggstenar: se kommentaren i variants.js samt
   funktionsnamnen i app.js.
   ========================================================================== */

/* Liten vänsterpil till bakåtknappen (krav 5). currentColor = navy via CSS. */
const V1_BACK = `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`;

/* ---------------------------------------------- krav 3: av/på för kurskortet
   Kravet är uttryckligen osäkert, så procentkortet går att stänga av utan att
   byta variant: ?kurskort=bas ger basversionens kort, ?kurskort=pct ger
   tillbaka procentkortet. Valet sparas per flik. */
const V1_CARD_KEY = 'rk_kurskort';
function v1CardStyle() {
  const p = new URLSearchParams(location.search).get('kurskort');
  if (p) { try { sessionStorage.setItem(V1_CARD_KEY, p); } catch (e) {} return p; }
  try { return sessionStorage.getItem(V1_CARD_KEY) || 'pct'; } catch (e) { return 'pct'; }
}

/* ------------------------------------------------------------ krav 1, 2, 3
   Min sida byggs om i DOM:en i stället för i min-sida.html, så att samma
   HTML-fil kan visa både v0 och v1. */
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

  /* krav 3: procent i stor siffra, kapitelantal nedtonat under */
  if (v1CardStyle() === 'pct') v1UpgradeCourseCards();
}

function v1UpgradeCourseCards() {
  document.querySelectorAll('.dash .course-item').forEach(card => {
    // "5 av 20" står antingen i .course-count (grundkursen, sätts av app.js)
    // eller som sista span i kortets rubrikrad (de statiska korten).
    const countEl = card.querySelector('.course-count') ||
                    card.querySelector('.row span:last-child');
    const track = card.querySelector('.mini-track');
    if (!countEl || !track) return;

    const m = countEl.textContent.match(/(\d+)\s*av\s*(\d+)/);
    if (!m) return;
    const done = parseInt(m[1], 10);
    const total = parseInt(m[2], 10);
    const pct = total ? Math.round(done / total * 100) : 0;

    countEl.classList.add('v1-hidden');   // antalet flyttar ner, bort ur rubrikraden
    track.insertAdjacentHTML('afterend', `
      <div class="v1-pct">
        <div class="v1-pct__big">Du har genomfört <strong>${pct} %</strong></div>
        <div class="v1-pct__sub">${done} av ${total} kapitel genomförda</div>
      </div>`);
  });
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

  /* krav 6: progressindikatorn i botten av kapitelsidan tas bort.
     Prev/next behålls oförändrad (ingen override av buildPageNav). */
  buildProgress(ch) {
    return '';
  },

  /* krav 1, 2, 3 – körs sist i uppstarten, när all bas-DOM finns */
  initExtra({ type }) {
    if (type === 'title') v1BuildMinSida();
  },

};
