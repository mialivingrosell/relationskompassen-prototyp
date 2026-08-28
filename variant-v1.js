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

     Omgång 7
     X  Elsa och Omar-underkapitlen är utfällda i menyn så snart man är inne
        i något av dem, även förälderkapitlet.                    -> buildToc

     Omgång 8
     Y  Kapitelnummer i kapitelsidans rubrik: "3. Fler exempel på viktiga
        relationer". Placeringen orörd.                        -> initExtra
     Z  Bild-quizet på kapitel 2 och 3 byggt om till kryssrutefråga med
        Rätta-knapp under, som i övningskapitlet. Bilderna flyttade upp
        ovanför sin rubrik i trespalten.                  -> initExtra + CSS

     Omgång 9
     AA Totalen är 18 (antalet huvudkapitel, räknat ur CHAPTERS). Elsa och
        Omar del 2–4 är inte egna steg utan räknas som kapitel 5. -> v1Steps()
     BB Progressraden i kurshuvudet visar kapitlet man STÅR PÅ, medan
        kurskortet på Min sida visar hur många kapitel man GÅTT IGENOM.
                                       -> v1CurrentStep() / v1ChaptersDone()
     CC "Fortsätt" på Min sida går till senaste kapitlet man stod på.
                                                            -> initExtra

     Omgång 10
     DD Primärknapp "Starta Relationskompassens grundkurs" i startsidans
        mörka yta, under introtexten.                      -> initExtra + CSS
     EE Kursrubriken centrerad i svarta listen, MIN SIDA tillagd till höger
        om bakåtpilen.                              -> buildCourseBar + CSS
     FF Progressbaren högre och med "X av 18" i högerkanten.
                                                     -> buildCourseBar + CSS
     GG Kapitelnummer i prev/next-knapparna: "2. Barns olika relationer".
                                                          -> buildPageNav

     Omgång 11
     HH Inloggning krävs för BÅDA ingångarna. Riktig sessionflagga i stället
        för basens hårdkodade data-logged.                 -> initExtra
     II "X av 18" flyttad in i den orangea ytan, linjerad mot skärningen,
        och mjuk rundad högerkant på fyllningen.    -> buildCourseBar + CSS
     JJ Nästa-knappen svart med vit text och orange pil. Föregående behåller
        outline-stilen.                                    -> buildPageNav + CSS
     KK Startsidans primärknapp vit med svart text och orange pil, centrerad
        i hero-ytan.                                                  -> CSS

     Omgång 16
     QQ Quizet på kapitel 2 och 3 byggt om till selection cards: stora
        klickbara kort med fotot inne i kortet. Enkelval. Trespalten under
        blir textbaserad eftersom fotona flyttat in i korten.
                                        -> v1RebuildImageQuiz/v1RattaCards + CSS

     Omgång 15
     PP Kapitelsidans svarta list: MIN SIDA -> STARTSIDAN (och länkar nu dit),
        INNEHÅLL -> KURSINNEHÅLL. Nedfällda menyn har två utgångar sida vid
        sida: "Till Min sida" och "Till startsidan".
                                                       -> buildCourseBar/buildToc + CSS

     Omgång 14
     OO Progressstrecket på Min sida linjerar med knappradens högerkant.
        Bredden mäts per kort.                    -> v1SizeCourseTracks + CSS

     Omgång 13
     MM Strecket till höger om MIN SIDA borttaget. Bakåtpilen orange i
        stället för vit, som hamburgaren mitt emot.  -> buildCourseBar + CSS
     NN Quiz-frågorna svarbara och obligatoriska. Nästa-knappen spärras med
        felmeddelande vid frågan och vid knappen.      -> initExtra + CSS

     Omgång 12
     LL Kapitelrubriken ryms på en rad: h1 får hela innehållsbredden, och
        graden krymps automatiskt för de längre rubrikerna.
                                                       -> v1FitHeading + CSS
        Progressiffran kortad till "1/18" och indragen från skärningen.
        Behåller marinblå text – vit på orange ger bara 3.47:1 och
        underkänns av WCAG AA.                                        -> CSS

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


/* ==========================================================================
   KRAV NN – obligatoriska quiz-frågor med validering
   Motiv: kursen är obligatorisk. Utan spärr klickar man bara vidare.

   Basen har inga svarbara frågor: .checkrow är dekorativa divar och
   rattaCheck() visar bara facit. Därför görs raderna först klickbara här
   (mus + tangentbord, role="checkbox"), sedan spärras Nästa-knappen.

   "Besvarad" = minst ett alternativ valt. Frågorna är flervalsfrågor, så
   antalet val kan inte krävas. Vill man dessutom kräva att man tryckt Rätta
   och sett facit räcker det att lägga till kravet i v1Unanswered().

   Felmeddelandet visas på två nivåer, vilket är standardmönstret för
   formulärvalidering: en sammanfattning vid knappen man tryckte på, och ett
   meddelande vid varje fråga som saknar svar. Sidan hoppar till den första.
   Knappen lämnas klickbar – en utgråad knapp berättar inte vad som saknas.
   ========================================================================== */

/* Alla frågor på sidan. .reflect i övningskapitlet saknar .q och räknas
   alltså inte som fråga. */
function v1Questions() {
  return Array.from(document.querySelectorAll('.checkquiz .q'));
}
/* .v1-checked är den gemensamma markören för "besvarad", så samma spärr
   fungerar både för kryssrutorna i övningskapitlet och för selection cards
   på kapitel 2–3. */
function v1Unanswered() {
  return v1Questions().filter(q => !q.querySelector('.v1-checked'));
}
/* Första svarsalternativet i en fråga, oavsett komponent – dit fokus hoppar
   när spärren slår till. */
function v1FirstOption(q) {
  return q.querySelector('.v1-selcard, .checkrow');
}

/* Gör frågorna svarbara */
function v1WireQuiz() {
  /* Rätta på en obesvarad fråga visar samma fel. Lyssnaren sitter på document
     i capture-fasen och stoppar propagationen, så basens inline-onclick
     (rattaCheck / v1RattaCards) inte hinner avslöja facit. Registreras alltid,
     oavsett vilken frågekomponent sidan använder. */
  document.addEventListener('click', e => {
    const btn = e.target.closest ? e.target.closest('.btn-ratta') : null;
    if (!btn) return;
    const q = btn.closest('.q');
    if (q && !q.querySelector('.v1-checked')) {
      e.preventDefault();
      e.stopPropagation();
      v1ShowQuizErrors([q]);
    }
  }, true);

  v1WireSelectionCards();
  v1WireCheckrows();
}

/* Selection cards – enkelval inom sin fråga */
function v1WireSelectionCards() {
  document.querySelectorAll('.checkquiz .q').forEach(q => {
    const cards = q.querySelectorAll('.v1-selcard');
    if (!cards.length) return;
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => {
          c.classList.remove('v1-checked');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('v1-checked');
        card.setAttribute('aria-checked', 'true');
        v1ClearQuizError(q);
      });
    });
  });
}

/* Kryssrutorna i övningskapitlet – flerval */
function v1WireCheckrows() {
  const rows = document.querySelectorAll('.checkquiz .checkrow');
  if (!rows.length) return;

  rows.forEach(row => {
    row.setAttribute('role', 'checkbox');
    row.setAttribute('aria-checked', 'false');
    row.setAttribute('tabindex', '0');

    const toggle = () => {
      const on = row.classList.toggle('v1-checked');
      row.setAttribute('aria-checked', on ? 'true' : 'false');
      // rutans innehåll rörs inte om facit redan visats (då står ✓/✕ där)
      const box = row.querySelector('.box');
      if (box && !row.classList.contains('correct') && !row.classList.contains('wrong')) {
        box.textContent = on ? '✓' : '';
      }
      v1ClearQuizError(row.closest('.q'));
    };

    row.addEventListener('click', toggle);
    row.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    });
  });
}

/* Spärra Nästa-knappen */
function v1GateNext() {
  if (!v1Questions().length) return;          // inga frågor -> ingen spärr
  const next = document.querySelector('.pagenav .v1-btn--next');
  if (!next) return;

  next.addEventListener('click', e => {
    const missing = v1Unanswered();
    if (!missing.length) return;              // allt besvarat, gå vidare
    e.preventDefault();
    v1ShowQuizErrors(missing);
  });
}

function v1ShowQuizErrors(missing) {
  missing.forEach(q => {
    q.classList.add('v1-q--error');
    if (!q.querySelector('.v1-qerror')) {
      // selection cards är enkelval, kryssrutorna flerval – olika formulering
      const single = !!q.querySelector('.v1-selcard');
      const msg = el('<p class="v1-qerror" role="alert">' + (single
        ? 'Välj ett alternativ innan du går vidare.'
        : 'Du behöver välja minst ett alternativ här innan du går vidare.') +
        '</p>');
      const btn = q.querySelector('.btn-ratta');
      if (btn) btn.insertAdjacentElement('beforebegin', msg);
      else q.appendChild(msg);
    }
  });

  // sammanfattning vid Nästa-knappen
  const pagenav = document.querySelector('.pagenav');
  if (pagenav) {
    let box = document.getElementById('v1NavError');
    if (!box) {
      box = el('<div class="v1-naverror" id="v1NavError" role="alert"></div>');
      pagenav.insertAdjacentElement('beforebegin', box);
    }
    const total = v1Unanswered().length;
    box.textContent = total === 1
      ? 'Du behöver svara på frågan innan du går vidare.'
      : 'Du behöver svara på alla frågor innan du går vidare. ' +
        total + ' frågor är obesvarade.';
  }

  // hoppa till första obesvarade frågan
  const firstRow = v1FirstOption(missing[0]);
  if (firstRow) firstRow.focus({ preventScroll: true });
  missing[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function v1ClearQuizError(q) {
  if (q) {
    q.classList.remove('v1-q--error');
    const msg = q.querySelector('.v1-qerror');
    if (msg) msg.remove();
  }
  if (!v1Unanswered().length) {
    const box = document.getElementById('v1NavError');
    if (box) box.remove();
  }
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


/* ==========================================================================
   KRAV HH – inloggning krävs för båda ingångarna
   Basen har ingen inloggningsstatus: varje sida har ett hårdkodat
   data-logged. Därför gick "Starta Relationskompassens grundkurs" rakt in i
   kursen medan "Min sida" krävde inloggning.

   Här hålls en riktig flagga per flik. Den sätts när inloggningsformuläret
   skickas, och nollas när sessionen nollställs – på alla tre vägar:
     ?reset i adressen         -> hanteras vid parse, före app.js
     "Nollställ session" i sidfoten -> basens resetVisited() byggs på
     Nollställ i prototypstämpeln   -> stämpeln lägger på &reset
   ========================================================================== */
/* Båda sessionsnycklarna deklareras här, eftersom v1ClearSession() körs redan
   vid parse (?reset) och då måste båda finnas. V1_LAST_KEY används av krav CC
   längre ner i filen. */
const V1_LOGGED_KEY = 'rk_logged';
const V1_LAST_KEY   = 'rk_last';

function v1SetLogged(on) {
  try {
    if (on) sessionStorage.setItem(V1_LOGGED_KEY, '1');
    else    sessionStorage.removeItem(V1_LOGGED_KEY);
  } catch (e) {}
}
function v1IsLogged() {
  try { return sessionStorage.getItem(V1_LOGGED_KEY) === '1'; } catch (e) { return false; }
}
function v1ClearSession() {
  try {
    sessionStorage.removeItem(V1_LOGGED_KEY);
    sessionStorage.removeItem(V1_LAST_KEY);
  } catch (e) {}
}

/* Körs vid parse, alltså före app.js hanterar ?reset. */
if (location.search.indexOf('reset') !== -1) v1ClearSession();

/* Fångar inloggningsformuläret i capture-fasen, så flaggan hinner sparas
   innan basens inline-onsubmit navigerar vidare till Min sida. */
document.addEventListener('submit', (e) => {
  const form = e.target;
  const go = form && form.getAttribute ? (form.getAttribute('onsubmit') || '') : '';
  if (go.indexOf('min-sida.html') !== -1) v1SetLogged(true);
}, true);

/* Riktar om ingångarna efter inloggningsstatus. Kursvyn lämnas orörd – är man
   inne i ett kapitel är man redan förbi ingången. */
function v1ApplyLoginState() {
  if (document.body.dataset.subbar === 'course') return;

  if (v1IsLogged()) {
    // inloggad: MIN SIDA i headern ska gå till Min sida, inte till inloggning
    document.querySelectorAll('.site-header a[href="logga-in.html"]')
      .forEach(a => a.setAttribute('href', 'min-sida.html'));
  } else {
    // ej inloggad: kursen nås bara via inloggning – gäller båda knapparna på
    // startsidan och kurslänken i MENY-panelen
    document.querySelectorAll('a[href="grundkurs.html"]')
      .forEach(a => a.setAttribute('href', 'logga-in.html'));
  }
}

/* Låt basens "Nollställ session" i sidfoten även nolla v1:s nycklar. */
function v1PatchReset() {
  if (window._v1ResetPatched || typeof window.resetVisited !== 'function') return;
  const baseReset = window.resetVisited;
  window.resetVisited = function () { baseReset(); v1ClearSession(); };
  window._v1ResetPatched = true;
}


/* ==========================================================================
   KRAV DD – primärknapp på startsidan
   Läggs i den mörka ytan högst upp, under introtexten. Basen har bara en
   outline-knapp längre ner i kurskortet – den här är den tydliga vägen in.

   Orange botten med marinblå text: contrast 4.8:1, alltså godkänt enligt
   WCAG AA. Vit text på orange hade bara gett 3.5:1 och underkänts.
   ========================================================================== */
function v1HomeCta() {
  const hero = document.querySelector('.hero');
  if (!hero || hero.querySelector('.v1-hero-cta')) return;
  hero.insertAdjacentHTML('beforeend',
    '<p class="v1-hero-cta">' +
    '<a class="btn v1-btn--primary" href="grundkurs.html">' +
    'Starta Relationskompassens grundkurs <span class="arrow">→</span></a></p>');
}


/* ==========================================================================
   KRAV Y – kapitelnummer i sidrubriken
   "3. Fler exempel på viktiga relationer". Samma nummer som i menyn, så de
   inte kan glida ifrån varandra. Rubrikens placering rörs inte – bara texten.
   ========================================================================== */
function v1NumberHeading(ch) {
  if (!ch) return;
  const h1 = document.querySelector('.coursepage .course-main > h1');
  if (!h1) return;
  h1.textContent = v1Nums()[ch.i] + '. ' + h1.textContent.trim();
}


/* ==========================================================================
   KRAV LL – kapitelrubriken på en rad
   CSS ger rubriken hela innehållsbredden (se variant-v1.css), vilket räcker
   för de flesta kapitel. För de längre krymps graden här tills raden räcker,
   i stället för att sätta en fast liten grad för alla – korta rubriker får
   alltså behålla sin fulla storlek.

   Mäts efter att webbtypsnitten laddat; annars mäts fallback-typsnittet och
   graden blir fel. Golvet gör att extremt långa rubriker bryts i stället för
   att krympa till oläslighet.
   ========================================================================== */
function v1FitHeading() {
  const h1 = document.querySelector('.coursepage .course-main > h1');
  if (!h1) return;

  const FLOOR = 34;                       // px – under detta bryter vi hellre
  const prevWrap = h1.style.whiteSpace;

  // tillbaka till CSS-graden först, så rubriken kan växa igen när fönstret
  // breddas – annars kunde den bara krympa, aldrig återhämta sig
  h1.style.fontSize = '';
  h1.style.whiteSpace = 'nowrap';         // så scrollWidth blir radens bredd

  let px = parseFloat(getComputedStyle(h1).fontSize);
  while (h1.scrollWidth > h1.clientWidth && px > FLOOR) {
    px -= 1;
    h1.style.fontSize = px + 'px';
  }

  h1.style.whiteSpace = prevWrap;         // tillbaka – nu ryms den ändå
}


/* ==========================================================================
   KRAV Z + QQ – bild-quizet byggs om till selection cards
   Basens quiz är tre stora bilder i rad med etiketter under, och rätt svar
   visas som en grön ram. Frågan är lätt att missa – bilderna läses som
   illustrationer, inte som svarsalternativ.

   Kryssrutor löste det men upplevdes trista. Här blir alternativen i stället
   selection cards: stora klickbara kort på rad, med fotot inne i kortet så
   bilden blir själva valet. Trespalten under blir därmed textbaserad.

   Enkelval, inte flerval: frågan har ett rätt svar. Korten är <button> med
   role="radio", så tangentbord fungerar utan extra kod.

   Gäller kapitel 2 och 3, som har identisk struktur i basen. Kör bara om
   både .quiz-options och .three-col finns på sidan.
   ========================================================================== */
function v1RebuildImageQuiz() {
  const main = document.querySelector('.coursepage .course-main');
  if (!main) return;

  const options  = main.querySelector('.quiz-options');
  const threeCol = main.querySelector('.three-col');
  if (!options || !threeCol) return;

  const txt = e => (e ? e.textContent.trim() : '');

  const opts = Array.from(options.querySelectorAll('.quiz-option')).map(o => ({
    name:     txt(o.querySelector('.quiz-option__label')),
    feedback: txt(o.querySelector('.quiz-option__feedback')),
    correct:  o.classList.contains('is-correct'),
    img:      o.querySelector('.ph'),
  }));
  if (!opts.length) return;

  /* 1. bygg frågan med tomma kort – bildnoderna flyttas in i steg 2 */
  const qid = 'v1quiz';
  let cards = '';
  let feedback = '';
  opts.forEach((o, i) => {
    cards +=
      `<button type="button" class="v1-selcard" role="radio" aria-checked="false"` +
      ` data-opt="${i}"${o.correct ? ' data-correct="true"' : ''}>` +
      `<span class="v1-selcard__radio" aria-hidden="true"></span>` +
      `<span class="v1-selcard__img" data-slot="${i}"></span>` +
      `<span class="v1-selcard__label">${o.name}</span>` +
      `</button>`;
    // facittexten hör till det rätta svaret och är en bekräftelse, inte en
    // varning – därför grön i stället för basens röda feedback-box
    if (o.feedback) {
      feedback += `<div class="feedback-box v1-feedback--ok">${o.feedback}</div>`;
    }
  });

  const quiz = el(`
    <div class="checkquiz v1-quiz">
      <div class="q" id="${qid}">
        <div class="v1-selcards" role="radiogroup"
             aria-label="Välj ett alternativ">${cards}</div>
        ${feedback}
        <button class="btn-ratta" onclick="v1RattaCards(this)">Rätta
          <span style="color:var(--navy)">⌄</span></button>
      </div>
    </div>`);
  options.insertAdjacentElement('beforebegin', quiz);

  /* 2. flytta in fotot i sitt kort.
        Noderna flyttas, inte kopieras, så app.js:s utbyte av platshållaren
        mot riktig bild fortsätter att träffa rätt element. */
  opts.forEach((o, i) => {
    const slot = quiz.querySelector(`.v1-selcard__img[data-slot="${i}"]`);
    if (slot && o.img) slot.appendChild(o.img);
  });

  /* 3. rensa bort den gamla bildraden och dess Rätta-knapp */
  const oldBtn = main.querySelector('.center .btn-ratta');
  if (oldBtn) {
    const wrap = oldBtn.closest('.center');
    (wrap || oldBtn).remove();
  }
  options.remove();
}


/* Rättning för selection cards. Basens rattaCheck() letar efter .checkrow och
   fungerar därför inte här. Efter rättning låses korten – att byta svar när
   facit står framme fyller ingen funktion och skulle lämna kvar färgerna. */
function v1RattaCards(btn) {
  const q = btn.closest('.q');
  if (!q) return;

  q.querySelectorAll('.v1-selcard').forEach(card => {
    const radio  = card.querySelector('.v1-selcard__radio');
    const picked = card.getAttribute('aria-checked') === 'true';
    if (card.dataset.correct === 'true') {
      card.classList.add('v1-correct');
      if (radio) radio.textContent = '✓';
    } else if (picked) {
      card.classList.add('v1-wrong');
      if (radio) radio.textContent = '✕';
    }
    card.disabled = true;
  });

  const fb = q.querySelector('.feedback-box');
  if (fb) fb.classList.add('show');
  btn.disabled = true;
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
   KRAV AA – stegräkning: Elsa och Omar räknas som ett kapitel
   Elsa och Omar del 2–4 är inte egna steg utan ärver förälderns nummer, så
   man står kvar på kapitel 5 genom hela berättelsen.

   Totalen räknas fram ur CHAPTERS (= antalet huvudkapitel, 18) i stället för
   att skrivas in, så den följer kapitellistan om den byggs ut.

   TVÅ OLIKA MÅTT, med avsikt:
     v1CurrentStep()   vilket kapitel man STÅR PÅ  -> progressraden i kurshuvudet
     v1ChaptersDone()  hur många kapitel man GÅTT IGENOM -> kurskortet på Min sida
   Det första kan gå bakåt när man klickar sig bakåt; det andra kan bara växa.
   ========================================================================== */

/* index -> stegnummer. Underkapitel ärver förälderns steg. */
let _v1Steps = null;
function v1Steps() {
  if (_v1Steps) return _v1Steps;
  const map = {};
  let step = 0;
  CHAPTERS.forEach(ch => {
    if (ch.level === 1) map[ch.i] = step;      // Elsa del 2–4 = samma steg
    else                map[ch.i] = ++step;
  });
  _v1Steps = map;
  return map;
}

/* antalet huvudkapitel = högsta stegnummer i listan */
function v1Total() {
  const steps = v1Steps();
  return Object.keys(steps).reduce((max, k) => Math.max(max, steps[k]), 0);
}

/* kapitlet man står på just nu */
function v1CurrentStep(ch) {
  return ch ? (v1Steps()[ch.i] || 0) : 0;
}


/* ==========================================================================
   KRAV CC – senaste kapitlet man stod på
   Sparas per flik. Värdet valideras mot basens besökta-lista, så en
   nollställd session (?reset, Nollställ session, ny flik) inte kan lämna
   kvar ett gammalt kapitel – då är listan tom och det sparade värdet
   ignoreras.

   Tre ställen läser härifrån och kan alltså inte säga olika saker:
   progressraden i kurshuvudet, kurskortet på Min sida och Fortsätt-knappen.
   (V1_LAST_KEY deklareras i krav HH-blocket längre upp.)
   ========================================================================== */
function v1SetLast(i) {
  try { sessionStorage.setItem(V1_LAST_KEY, String(i)); } catch (e) {}
}

function v1Last() {
  const visited = getVisited();
  if (!visited.size) return null;
  let stored = null;
  try { stored = sessionStorage.getItem(V1_LAST_KEY); } catch (e) {}
  const n = stored === null ? NaN : parseInt(stored, 10);
  if (!isNaN(n) && visited.has(n)) return n;
  return Math.max.apply(null, [...visited]);   // reserv om värdet saknas
}

/* Antal kapitel man gått igenom – Min sidas kurskort.
   Räknar distinkta steg bland de besökta kapitlen, så Elsa och Omar del 2–4
   inte ger fyra kapitel utan ett, och så att siffran inte sjunker när man
   klickar sig bakåt. */
function v1ChaptersDone() {
  const visited = getVisited();
  if (!visited.size) return 0;
  const steps = v1Steps();
  const done = new Set();
  visited.forEach(i => { if (steps[i]) done.add(steps[i]); });
  return done.size;
}


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
/* Progressraden i kurshuvudet: kapitlet man STÅR PÅ (krav BB). */
function v1ProgressPct(ch) {
  return Math.round(v1CurrentStep(ch) / v1Total() * 100);
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
    const titleEl = item.querySelector('.row span');
    let done, total;

    if (item.id === 'courseGrundkurs') {
      // krav AA: 20 kapitel, Elsa och Omar som ett enda steg
      total = v1Total();
      done  = v1ChaptersDone();

      // krav CC: Fortsätt går till senaste kapitlet man stod på
      const cta = item.querySelector('.course-cta');
      const last = v1Last();
      const target = last === null ? null : CHAPTERS[last];
      if (cta && target && target.file) cta.setAttribute('href', target.file);
    } else {
      // statiska kort: läs "4 av 4" ur rubrikraden
      const countEl = item.querySelector('.course-count') ||
                      item.querySelector('.row span:last-child');
      const m = (countEl ? countEl.textContent : '').match(/(\d+)\s*av\s*(\d+)/);
      done  = m ? parseInt(m[1], 10) : 0;
      total = m ? parseInt(m[2], 10) : 0;
    }

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

  /* krav OO: progressstrecket linjerar med knappradens högerkant. Mäts när
     typsnitten laddat – knappbredden beror på dem. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(v1SizeCourseTracks);
  } else {
    v1SizeCourseTracks();
  }
  window.addEventListener('resize', v1SizeCourseTracks);
}

/* ==========================================================================
   KRAV OO – progressstreckets längd på Min sida
   Strecket ska gå kant i kant med knappraden under. Knappraden är olika bred
   på de två korten ("Fortsätt" ensam mot "Se igen" + "Ladda ner intyg"), så
   ett fast mått kan inte linjera med båda – bredden mäts därför per kort.

   .v1-card__actions är en flexbehållare i full kortbredd, så dess egen bredd
   säger inget om knapparna. Måttet tas från behållarens vänsterkant till den
   högsta högerkanten bland knapparna, vilket också fungerar om de radbryter.

   Golvet på 340px finns för att ett ensamt smalt "Fortsätt" annars skulle
   krympa strecket till en stump.
   ========================================================================== */
function v1SizeCourseTracks() {
  document.querySelectorAll('.v1-card').forEach(card => {
    const actions = card.querySelector('.v1-card__actions');
    const track = card.querySelector('.v1-card__track');
    if (!actions || !track) return;

    const btns = actions.querySelectorAll('.btn');
    if (!btns.length) return;

    const left = actions.getBoundingClientRect().left;
    let right = left;
    btns.forEach(b => {
      right = Math.max(right, b.getBoundingClientRect().right);
    });

    const w = Math.round(right - left);
    if (w > 0) track.style.maxWidth = Math.max(340, w) + 'px';
  });
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
          <div class="v1-headleft">
            <a class="v1-back" href="index.html" title="Tillbaka till startsidan">
              <span class="arrow">←</span> STARTSIDAN
            </a>
          </div>
          <span class="coursebar__title">Relationskompassens grundkurs</span>
          <button class="coursebar__toggle v1-toc-toggle" onclick="toggleToc(this)">
            KURSINNEHÅLL <span class="hamburger"><span></span><span></span><span></span></span>
          </button>
        </div>
        ${buildToc(ch.i)}
      </div>

      <div class="v1-progress" role="progressbar" aria-label="Kursens framsteg"
           aria-valuenow="${v1CurrentStep(ch)}" aria-valuemin="0"
           aria-valuemax="${v1Total()}">
        <div class="v1-progress__fill" style="width:${v1ProgressPct(ch)}%"></div>
        <span class="v1-progress__label"
              style="left:max(${v1ProgressPct(ch)}%, 96px)">${v1CurrentStep(ch)}/${v1Total()}</span>
      </div>

    </div>`;
  },

  /* krav O: samma kapitellista som basen, men med en utgång längst ner.
     Menyn hänger från svarta listens underkant (se buildCourseBar) och lägger
     sig därmed ovanpå progressraden i stället för under den. */
  buildToc(currentIndex) {
    const visited = getVisited();
    /* krav X: utfälld så snart man är inne i Elsa och Omar – även på
       förälderkapitlet (index 4), inte bara på del 2–4 som i basen. */
    const elsaCollapsed = ![4, 5, 6, 7].includes(currentIndex);
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
    // två vägar ut ur kursen, fast placerade efter sista kapitlet.
    // .btn ger samma storlek som övriga knappar på sajten.
    html += `<div class="v1-toc-exits">` +
            `<a class="btn v1-toc-exit" href="min-sida.html">Till Min sida</a>` +
            `<a class="btn v1-toc-exit" href="index.html">Till startsidan</a>` +
            `</div>`;
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

  /* krav EE: kapitelnummer i prev/next-knapparna, t.ex.
     "2. Barns olika relationer". Samma numrering som menyn och sidrubriken,
     eftersom alla tre läser v1Nums(). I övrigt identisk med basen. */
  buildPageNav(ch) {
    const prev = CHAPTERS[ch.i - 1];
    const next = CHAPTERS[ch.i + 1];
    const label = c => v1Nums()[c.i] + '. ' + c.title;

    const prevBtn = prev
      ? `<a class="btn btn--outline" href="${prev.file || '#'}"><span class="arrow">←</span> ${label(prev)}</a>`
      : `<span></span>`;

    /* krav JJ: nästa-knappen är svart med vit text och orange pil, alltså den
       tydliga vägen framåt. Föregående behåller outline-stilen. */
    const nextDisabled = !next || !next.file;   // sista byggda sidan
    const nextBtn = next
      ? `<a class="btn v1-btn--next ${nextDisabled ? 'btn--disabled' : ''}" href="${next.file || '#'}">${label(next)} <span class="arrow">→</span></a>`
      : `<span></span>`;

    return `<div class="pagenav">${prevBtn}${nextBtn}</div>`;
  },

  /* krav 6: progressindikatorn i botten av kapitelsidan tas bort. Den nya
     ligger i stället i kurshuvudet (krav N). */
  buildProgress(ch) {
    return '';
  },

  /* Körs sist i uppstarten, när all bas-DOM finns */
  initExtra({ ch, type }) {
    v1PatchReset();           // krav HH: nollställning tar även v1:s nycklar
    v1HomeCta();              // krav DD: primärknapp på startsidan
    if (type === 'title') v1BuildMinSida();
    if (type === 'course') {
      if (ch) v1SetLast(ch.i);  // krav CC: minns var man stod
      v1NormalizeWidths();      // krav Q: samma bredd överallt
      v1NumberHeading(ch);      // krav Y: kapitelnummer i rubriken
      v1RebuildImageQuiz();     // krav Z: bild-quiz -> kryssrutefråga
      v1WireQuiz();             // krav NN: gör frågorna svarbara – efter Z
      v1GateNext();             // krav NN: spärra Nästa tills allt är besvarat

      // krav LL: rubriken på en rad – mäts när typsnitten är laddade
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(v1FitHeading);
      } else {
        v1FitHeading();
      }
      window.addEventListener('resize', v1FitHeading);
    }
    v1ApplyLoginState();        // krav HH: rikta om ingångarna – efter Min sida
    v1SwapArrows();             // krav P: handritad pil överallt, alla sidtyper
  },

};
