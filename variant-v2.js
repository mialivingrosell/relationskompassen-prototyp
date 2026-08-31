/* ==========================================================================
   VARIANT v2 – samma navigation som v1, men utan numrering
   Byggd för A/B-test mot v1: enda skillnaden i kursvyn är numreringen.

   ÅTERANVÄNDER v1 i stället för att kopiera den. RK_V2 börjar som en kopia av
   RK_V1 och skriver bara över det som ska skilja. All logik och all
   grundstil (variant-redesign.css) delas, så en framtida ändring behöver
   göras på ett ställe.

   SKILLNADER MOT v1
     1  Ingen numrering: avsnittsrubriker, innehållsmenyn, prev/next-knapparna
        och progressraden saknar siffror. Sköts av V1_NUMBERS i variant-v1.js,
        som läser V.id – därför behövs ingen override här.
     2  Min sida backar till basversionens design. Inga vita kurskort, ingen
        omflyttad "Logga ut", inga ögonikoner – men räkningen rättas till
        21 avsnitt, som i v1.

   RÄKNINGEN ÄR IDENTISK i v1 och v2: 21 avsnitt, Elsa och Omar del 2–4 som
   egna avsnitt 6, 7 och 8. Det är bara siffrorna i texten som tas bort.
   ========================================================================== */

window.RK_V2 = Object.assign({}, window.RK_V1, {

  /* Min sida lämnas i basversionens utförande – ingen ombyggnad av panelerna,
     korten eller lösenordsfälten. Progressen rättas i efterhand så att den
     räknar 21 avsnitt i stället för basens 20. */
  initExtra: function (ctx) {
    if (ctx.type === 'title') {
      // hoppa över v1BuildMinSida() men behåll allt annat v1 gör
      v2FixDashTotal();
      v2ContinueWhereYouLeftOff();
    }

    if (ctx.type === 'course') {
      if (ctx.ch) v1SetLast(ctx.ch.i);
      v1NormalizeWidths();
      v1WireImageQuiz();
      v1WireQuiz();
      v1GateNext();
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(v1FitHeading);
      } else {
        v1FitHeading();
      }
      window.addEventListener('resize', v1FitHeading);
    }

    v1PatchReset();
    v1HomeCta();
    buildFooterVersionLink();
    v1ApplyLoginState();
    v1SwapArrows();
  },

});


/* --------------------------------------------------------------------------
   Min sida: rätta grundkursens räkning till 21 avsnitt.
   Basens updateDashProgress() har redan körts och skrivit "X av 20" utifrån
   data-total i min-sida.html. Här skrivs siffran, progressbaren och
   knapptexten om utifrån samma funktioner som v1 använder, så båda
   versionerna räknar likadant.
   -------------------------------------------------------------------------- */
function v2FixDashTotal() {
  const card = document.getElementById('courseGrundkurs');
  if (!card) return;

  const total = v1Total();          // 21
  const done  = v1ChaptersDone();   // antal genomgångna avsnitt
  const pct   = total ? Math.round(done / total * 100) : 0;

  const count = card.querySelector('.course-count');
  if (count) count.textContent = done + ' av ' + total;

  const fill = card.querySelector('.mini-fill');
  if (fill) {
    fill.style.width = pct + '%';
    fill.classList.toggle('mini-fill--done', done >= total);
  }

  const cta = card.querySelector('.course-cta');
  if (cta) {
    if (done >= total)   cta.innerHTML = 'Se igen <span class="arrow">→</span>';
    else if (done > 0)   cta.innerHTML = 'Fortsätt <span class="arrow">→</span>';
    else                 cta.innerHTML = 'Starta <span class="arrow">→</span>';
  }
}

/* Samma beteende som i v1: Starta/Fortsätt går till senaste avsnittet man
   stod på, inte till kursens början. */
function v2ContinueWhereYouLeftOff() {
  const cta = document.querySelector('#courseGrundkurs .course-cta');
  if (!cta) return;
  const last = v1Last();
  const target = last === null ? null : CHAPTERS[last];
  if (target && target.file) cta.setAttribute('href', target.file);
}
