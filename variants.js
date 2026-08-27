/* ==========================================================================
   Relationskompassen – variantsystem
   --------------------------------------------------------------------------
   Gör att flera designversioner kan leva i samma prototyp utan att
   basversionen (v0) ändras.

     index.html            -> v0, basversionen (kopian av befintliga kursen)
     index.html?nav=v1     -> v1, arbetsversionen med ny navigation

   Valet sparas per flik (sessionStorage), så det följer med när man klickar
   sig vidare i kursen. Öppna v0 i en flik och v1 i en annan för A/B-test.

   SÅ LÄGGER DU TILL EN NY VARIANT (t.ex. v2):
     1. Lägg till en rad i VARIANTS nedan.
     2. Skapa variant-v2.js  (samma upplägg som variant-v1.js)
        och variant-v2.css   (tom går bra).
     3. Lägg <script src="variant-v2.js"></script> i alla HTML-filer,
        direkt efter variant-v1.js.
   ========================================================================== */

const VARIANTS = [
  { id: 'v0', label: 'v0 · Bas',   note: 'Kopia av befintliga Relationskompassen – oförändrad' },
  { id: 'v1', label: 'v1 · Ny nav', note: 'Arbetsversion – ny meny & navigation' },
];

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
  return VARIANTS.some(v => v.id === saved) ? saved : 'v0';
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
  // Klass på <html> och <body> så CSS kan hänga på: .rk-v1 .coursebar { ... }
  document.documentElement.classList.add('rk-' + V.id);
  if (document.body) document.body.classList.add('rk-' + V.id);

  // Variantens egen stilmall laddas bara när varianten är aktiv.
  // v0 kör enbart styles.css och är därmed helt orörd.
  if (V.id !== 'v0') {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'variant-' + V.id + '.css';
    document.head.appendChild(link);
  }
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

document.addEventListener('DOMContentLoaded', buildVariantStamp);
