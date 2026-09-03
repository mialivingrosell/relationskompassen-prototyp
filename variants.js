/* ==========================================================================
   Relationskompassen – variantsystem
   --------------------------------------------------------------------------
   Gör att flera designversioner kan leva i samma prototyp utan att
   basversionen (v0) ändras.

     index.html            -> v0, basversionen (kopian av befintliga kursen)
     index.html?nav=v1     -> v1, arbetsversionen med ny navigation

   Valet sparas per flik (sessionStorage), så det följer med när man klickar
   sig vidare i kursen. Öppna v0 i en flik och v1 i en annan för A/B-test.

   SÅ LÄGGER DU TILL EN NY VARIANT (t.ex. v3):
     1. Lägg till en rad i VARIANTS nedan, och i REDESIGN om den ska ärva
        v1:s stil och logik.
     2. Skapa variant-v3.js. Ska den vara en variation på v1 räcker
        window.RK_V3 = Object.assign({}, window.RK_V1, { ...avvikelser });
        Behöver den egen stil, lägg till en addCss-rad i applyVariant().
     3. Lägg <script src="variant-v3.js"></script> i alla HTML-filer,
        direkt efter variant-v2.js.
   ========================================================================== */

const VARIANTS = [
  { id: 'v0', label: 'v0 · Originalet', note: 'Kopia av befintliga Relationskompassen – oförändrad' },
  { id: 'v1', label: 'v1 · Numrering', note: 'Ny navigation, med numrerade avsnitt' },
  { id: 'v2', label: 'v2 · Utan numrering', note: 'Som v1 men utan numrering' },
];

/* Default när inget val finns i fliken. v1 är den version som testas, så den
   nakna adressen ska ge den – originalet nås med ?nav=v0 eller via footern.
   Tidigare var v0 default, vilket gjorde att en ny flik landade på
   originalet och det såg ut som att arbetet försvunnit. */
const DEFAULT_VARIANT = 'v1';

/* v1 och v2 delar all grundstil (variant-redesign.css) och all logik i
   variant-v1.js. v2 lägger bara till sina avvikelser. Därför får båda även
   klassen rk-redesign, som CSS:en hänger på. */
const REDESIGN = ['v1', 'v2'];

const VARIANT_KEY = 'rk_variant';

/* ------------------------------------------------------- vilken variant? */
function resolveVariant() {
  const fromUrl = new URLSearchParams(location.search).get('nav');
  if (fromUrl && VARIANTS.some(v => v.id === fromUrl)) {
    try { sessionStorage.setItem(VARIANT_KEY, fromUrl); } catch (e) {}
    return fromUrl;
  }
  let saved = null;
  try { saved = sessionStorage.getItem(VARIANT_KEY); } catch (e) {}
  return VARIANTS.some(v => v.id === saved) ? saved : DEFAULT_VARIANT;
}

/* V = variantens API. Används av app.js och av variant-filerna. */
const V = {
  id: resolveVariant(),

  /* Är den aktiva varianten denna? V.is('v1') */
  is(id) { return this.id === id; },

  /* Hämta variantens egen version av en byggfunktion.
     Returnerar undefined om varianten inte har någon egen -> app.js
     kör då basversionens kod. */
  override(name) {
    const pack = window['RK_' + this.id.toUpperCase()];   // RK_V1, RK_V2 ...
    return pack && typeof pack[name] === 'function' ? pack[name] : undefined;
  },

  /* Byt variant och ladda om sidan i samma variant. */
  set(id) {
    try { sessionStorage.setItem(VARIANT_KEY, id); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.set('nav', id);
    location.href = url.toString();
  },

  meta() { return VARIANTS.find(v => v.id === this.id) || VARIANTS[0]; },
};

/* ------------------------------------ märk sidan + ladda variantens CSS */
(function applyVariant() {
  const addCss = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  // Klasser på <html> och <body> så CSS kan hänga på.
  //   rk-v1 / rk-v2   – variantspecifikt
  //   rk-redesign     – gemensamt för alla omdesignade versioner
  const classes = ['rk-' + V.id];
  if (REDESIGN.indexOf(V.id) !== -1) classes.push('rk-redesign');
  classes.forEach(c => {
    document.documentElement.classList.add(c);
    if (document.body) document.body.classList.add(c);
  });

  // v0 kör enbart styles.css och är därmed helt orörd.
  // v1 och v2 delar all stil: skillnaden mellan dem är bara numreringen,
  // som styrs i JS. Därför behövs ingen variantspecifik stilmall.
  if (REDESIGN.indexOf(V.id) !== -1) addCss('variant-redesign.css');
})();

/* ------------------------------------------------------ variantväljaren
   Prototypverktyg, inte del av designen. Ligger fast nere till höger.
   Dölj den under skarpa användartest med ?stamp=off i adressen.           */
const STAMP_KEY = 'rk_stamp_off';

function stampHidden() {
  if (new URLSearchParams(location.search).get('stamp') === 'off') {
    try { sessionStorage.setItem(STAMP_KEY, '1'); } catch (e) {}
    return true;
  }
  try { return sessionStorage.getItem(STAMP_KEY) === '1'; } catch (e) { return false; }
}

function buildVariantStamp() {
  if (stampHidden() || document.getElementById('rkvs')) return;

  const style = document.createElement('style');
  style.textContent = `
    #rkvs{position:fixed;right:14px;bottom:14px;z-index:9999;
      font:600 12px/1.35 system-ui,-apple-system,"Segoe UI",sans-serif;
      background:#1B1D2D;color:#fff;border-radius:12px;padding:10px 12px;
      box-shadow:0 6px 22px rgba(0,0,0,.28);max-width:260px}
    #rkvs .rkvs-top{display:flex;align-items:center;gap:8px;margin-bottom:8px}
    #rkvs .rkvs-tag{font-size:10px;letter-spacing:.09em;text-transform:uppercase;
      opacity:.62;font-weight:700}
    #rkvs .rkvs-x{margin-left:auto;background:none;border:0;color:#fff;opacity:.55;
      cursor:pointer;font-size:15px;line-height:1;padding:0 2px}
    #rkvs .rkvs-x:hover{opacity:1}
    #rkvs .rkvs-btns{display:flex;gap:6px;flex-wrap:wrap}
    #rkvs button.rkvs-v{background:rgba(255,255,255,.12);color:#fff;border:0;
      border-radius:8px;padding:6px 10px;cursor:pointer;font:inherit}
    #rkvs button.rkvs-v:hover{background:rgba(255,255,255,.22)}
    #rkvs button.rkvs-v[aria-current="true"]{background:#F1551F}
    #rkvs .rkvs-note{margin-top:8px;font-weight:400;font-size:11px;opacity:.72}
    #rkvs .rkvs-reset{margin-top:8px;font-weight:400;font-size:11px}
    #rkvs .rkvs-reset a{color:#D7F1F4}
    @media print{#rkvs{display:none}}
  `;
  document.head.appendChild(style);

  const box = document.createElement('div');
  box.id = 'rkvs';
  box.innerHTML = `
    <div class="rkvs-top">
      <span class="rkvs-tag">Prototyp – version</span>
      <button class="rkvs-x" title="Dölj" aria-label="Dölj variantväljaren">✕</button>
    </div>
    <div class="rkvs-btns">
      ${VARIANTS.map(v => `<button class="rkvs-v" data-v="${v.id}"
          aria-current="${v.id === V.id}">${v.label}</button>`).join('')}
    </div>
    <div class="rkvs-note">${V.meta().note}</div>
    <div class="rkvs-reset"><a href="#">↺ Nollställ session</a></div>`;

  box.querySelector('.rkvs-x').addEventListener('click', () => {
    try { sessionStorage.setItem(STAMP_KEY, '1'); } catch (e) {}
    box.remove();
  });
  box.querySelectorAll('.rkvs-v').forEach(b => {
    b.addEventListener('click', () => {
      if (b.dataset.v !== V.id) V.set(b.dataset.v);
    });
  });
  box.querySelector('.rkvs-reset a').addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof resetVisited === 'function') resetVisited();
    // &reset i adressen så att även variantens egna sessionsnycklar nollas
    location.href = 'index.html?nav=' + V.id + '&reset';
  });

  document.body.appendChild(box);
}

/* ----------------------------------------------------- versionslänkar i footern
   Vid sidan om "Nollställ session" ligger länkar till de två versioner man
   INTE står i. De finns i alla tre versioner, inklusive v0 – annars går det
   inte att komma vidare från originalet utan att redigera adressen, vilket
   är precis fällan som gjorde att prototypen såg ut att ha nollställts.     */
function buildFooterVersionLink() {
  const slot = document.querySelector('.footer__reset');
  if (!slot || document.getElementById('rkVersionLinks')) return;

  const wrap = document.createElement('span');
  wrap.id = 'rkVersionLinks';

  VARIANTS.filter(v => v.id !== V.id).forEach(v => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = 'Version ' + v.id.slice(1);
    a.title = v.note;
    a.style.marginLeft = '22px';
    a.addEventListener('click', (e) => { e.preventDefault(); V.set(v.id); });
    wrap.appendChild(a);
  });

  slot.appendChild(wrap);
}

/* Stämpeln är position:fixed och kan byggas direkt.
   Versionslänkarna måste vänta på att app.js hunnit bygga footern. Eftersom
   variants.js laddas först körs dess DOMContentLoaded-lyssnare FÖRE app.js:s,
   så footern finns inte än. setTimeout 0 skjuter anropet till efter att alla
   DOMContentLoaded-lyssnare kört. Det gör att länkarna byggs likadant i alla
   tre versioner – v0 har ingen initExtra att hänga dem på.                  */
document.addEventListener('DOMContentLoaded', () => {
  buildVariantStamp();
  setTimeout(buildFooterVersionLink, 0);
});
