# Relationskompassen – klickbar prototyp (kopia av beta)

Statisk HTML/CSS/JS-prototyp som kopierar den befintliga webbkursens huvudflöde.
Byggd för att sedan utvärderas (med fokus på meny & navigation) och itereras vidare.

> **Om innehållet.** Detta är en designprototyp för användartest, inte den
> riktiga kursen. Bilder, film och text tillhör Jämställdhetsmyndigheten /
> JÄMY och används här enbart som underlag i designarbetet. Sidorna är
> märkta `noindex` och `robots.txt` stänger ute sökmotorer — länken är
> alltså inte hemlig, bara osökbar. Sprid den inte vidare.

## Öppna prototypen

Enklast: dubbelklicka på `index.html`.

Om filmer/typsnitt beter sig konstigt via `file://`, kör en lokal server i mappen:

```
cd relationskompassen-prototyp
python3 -m http.server 8000
# öppna sedan http://localhost:8000
```

## Flöde

Startsida → Logga in / Skapa konto → Konto skapat → Min sida → Grundkursen
(kapitel 0–10). INNEHÅLL-menyn (hamburgaren i den mörka kursbaren) listar **alla
22 kapitel**; de som inte är byggda i prototypen är gråmarkerade.

Byggda kapitel: 0 Grundkurs · 1 Barns olika relationer · 2 Fler exempel ·
3 Att få lära sig · 4–7 Elsa och Omar (del 1–4) · 8 Vad är våld? ·
9 Övning · 10 En genusförändrande ansats. Sista sidan har inaktiv nästa-knapp.

## Platshållare

- **Filmer** = gråa rutor med filmens titel.
- **Foton/bilder** = gråa rutor (för att spara resurser).
- **Seriestrippar (kap 4–7)** = gråa rutor som automatiskt byts mot riktiga
  bilder om du lägger dessa filer i `assets/`:
  `elsa-omar-1.png`, `elsa-omar-2.png`, `elsa-omar-3.png`, `elsa-omar-4.png`.

## Struktur

- `styles.css` – designsystem (färger, typografi, komponenter).
- `app.js` – bygger header, footer, INNEHÅLL-meny, breadcrumb, prev/next och
  progressbar på alla sidor. Kapitelordningen styrs av `CHAPTERS`-listan här –
  ändra där för att lägga till/ändra kapitel.
- `*.html` – en fil per sida, tunn: bara sidans egen innehållsdel.

## Användartest – sessionsminne

Prototypen minns vilka kapitel testpersonen besökt (sparas i `sessionStorage`):
- Besökta kapitel markeras som **avklarade** i INNEHÅLL-menyn och förblir det
  även när man klickar sig bakåt. Ej besökta kapitel är låsta/utgråade.
- **Nollställ mellan testpersoner** på något av dessa sätt:
  - Klicka **"↺ Nollställ session"** i prototypstämpeln nere till höger.
  - Lägg till `?reset` i adressen (t.ex. `index.html?reset`).
  - Öppna prototypen i en **ny flik** (sessionsminnet är per flik).
- En vanlig omladdning **behåller** progressen (så oavsiktliga omladdningar mitt
  i ett test inte nollställer). Använd nollställ-knappen inför nästa person.

## Versioner (v0 / v1 / v2)

Prototypen innehåller flera designversioner i samma kod. Valet sparas per
flik, så det följer med när man klickar sig vidare i kursen.

| Adress | Version |
|---|---|
| `index.html` | **v1 – ny navigation, med numrerade avsnitt.** Default. |
| `index.html?nav=v2` | **v2 – som v1 men utan numrering.** |
| `index.html?nav=v0` | **v0 – originalet.** Kopian av befintliga Relationskompassen, oförändrad. |

v1 och v2 är A/B-paret: **numreringen är den enda skillnaden.** v0 är
referensen.

Längst ner i sidfoten, vid sidan om "Nollställ session", finns länkar till de
två versioner man inte står i — även i v0, så man alltid kan komma vidare utan
att redigera adressen.

**Obs:** versionsvalet ligger i `sessionStorage` och är därmed **per flik**. En
ny flik eller en omstartad webbläsare landar på default (v1).

Nere till höger sitter en stämpel där man klickar mellan versionerna och
nollställer sessionen. Dölj den inför skarpa användartest med `?stamp=off`.
Öppna v1 i en flik och v2 i en annan för att jämföra sida vid sida.

Basversionen är låst i git som taggen `v0-bas`.

> **Obs:** `styles.css` och `min-sida.html` har justerats en gång efter att
> basen låstes, för att göra kopian mer trogen originalet: ljusare och mindre
> rosa ytor, luft ovanför Min sidas paneler, höger panel bleeder ut, samt
> borttagen exempelkurs "Att leda träffar i skolan". Det påverkar alla tre
> versioner lika, så A/B-paret v1/v2 är oförändrat jämförbart. Ursprungsläget
> finns kvar på taggen `v0-bas`.

### Vad v1 ändrar

- **Större rubriker** på artikel- och kapitelsidor. Brödtexten är oförändrad.
- **Bredare videoruta** på kapitelsidor, medan rubriker och brödtext hålls i
  en smalare spalt (ca 800px) för läsbar radlängd.
- **Min sida är basversionens design** i alla versioner. Kunden ville tillbaka
  till originalet, så ombyggnaden av panelerna, de vita kurskorten, den
  flyttade "Logga ut" och ögonikonerna i lösenordsfälten är borttagna. Bara
  två saker rättas, eftersom de är beteende och inte design: räkningen visar
  21 avsnitt i stället för basens 20, och Starta/Fortsätt går till senaste
  avsnittet man stod på.
- **Startsidan** (v1 och v2) har en primärknapp "Starta Relationskompassens grundkurs"
  centrerad i den mörka ytan högst upp: vit botten, marinblå text, orange pil.
- **Inloggning krävs för båda ingångarna.** Basen har ingen
  inloggningsstatus – varje sida har ett hårdkodat `data-logged`, så
  kursknappen gick rakt in medan Min sida krävde inloggning. v1 håller en
  riktig flagga per flik som sätts när inloggningsformuläret skickas och nollas
  vid alla tre nollställningsvägar (`?reset`, sidfotens länk, prototypstämpeln).
- **Avsnittsnumrering** (bara v1) i innehållsmenyn, i sidrubriken, i
  prev/next-knapparna och i progressraden: "1. Relationskompassens grundkurs".
  Alla 21 avsnitt numreras i följd, Elsa och Omar som 5–8. Innehållsmenyn är
  därför en platt lista utan indragna undernivåer.
- **Bild-quizet på avsnitt 2 och 3** har basens ursprungliga design: tre foton
  på rad med etikettknapp under och Rätta-knappen centrerad. Enda tillägget är
  att alternativen går att **välja** (orange ram) — basens quiz har ingen
  valbarhet, och utan den kan spärren på obligatoriska frågor inte fungera.
- **Quiz-frågorna är svarbara och obligatoriska.** I basen är `.checkrow`
  dekorativa divar utan interaktion; v1 gör dem klickbara med mus och
  tangentbord. Nästa-knappen spärras tills alla frågor på sidan är besvarade,
  med felmeddelande både vid frågan och vid knappen, och sidan hoppar till
  första obesvarade frågan. Gäller avsnitt 2, 3 och 7. `.v1-checked` är den
  gemensamma markören för "besvarad", så samma spärr fungerar för både
  bild-quizet (avsnitt 2–3) och kryssrutorna i övningskapitlet (avsnitt 7).
- **Handritad pil** i styleguidens ikonmanér ersätter teckenpilarna (← →) i
  knappar och svarta listen. Styleguidens ikonsida innehåller ingen pil, så
  den är ritad efter manéret: en enkel bågad linje med rundade ändar.
- **En enda innehållsbredd** på kapitelsidorna: film och bildrader i
  `--v1-media` (1064px), rubriker och brödtext i `--v1-text` (800px).
  Spalten är centrerad som i betan i stället för basens vänsterindrag, och
  prev/next linjerar med innehållet. Basens inline-bredder nollas.
- **Prev/next** har transparent bakgrund och svart ram, som originalet.
- **Kursvyn** är en egen sidkontext: topheadern och brödsmulorna är borta.
  Svarta listen är sticky: orange bakåtpil + HEM till vänster, kursnamnet
  centrerat, KURSINNEHÅLL + hamburgare till höger. Innehållsmenyn fälls ut
  högerställd, ovanpå progressraden, med utgångarna "Hem" och "Min sida"
  efter sista avsnittet.
- **Stegräkning:** 21 avsnitt totalt, räknat ur `CHAPTERS`. Elsa och Omar
  del 2–4 är egna avsnitt 6, 7 och 8. Samma räkning i v1 och v2.
- **Två olika progressmått, med avsikt:**
  - *Indikatorn under svarta listen på kapitelsidor* – vilket kapitel man
    **står på**, med "X/21" inne i den orangea ytan (bara i v1 — v2 har bar
    utan siffra). Marinblå siffra: 4,8:1 mot orange och 10,5:1 mot grått,
    alltså godkänt enligt WCAG AA. Fyllningen har mjuk rundad högerkant.
  - *Kurskortet på Min sida* – hur många kapitel man **gått igenom**. Räknar
    distinkta kapitel bland de besökta, så den bara kan växa.
- **"Fortsätt"** på Min sida går till det avsnitt man nått **längst fram**,
  inte till kursens början och inte till det man senast tittade på. Backar man
  för att läsa om ett tidigare avsnitt flyttas Fortsätt alltså inte bakåt.
  Värdet är högsta besökta index ur basens besökta-lista — ingen egen
  sessionsnyckel, så det kan inte glida ifrån räkningen.
- **Progressindikatorn** i botten av kapitelsidan borttagen (prev/next kvar).

### Filerna

- `variants.js` – växlaren: registret, klasserna, prototypstämpeln och
  versionslänken i sidfoten.
- `variant-v1.js` – all logik för **både v1 och v2**. Allt som inte står här
  ärvs från `app.js` (basen).
- `variant-v2.js` – en rad: `window.RK_V2 = window.RK_V1`. v2 har ingen egen
  logik, eftersom numreringen är den enda skillnaden och den styrs av
  `V1_NUMBERS` i `variant-v1.js`. Samma kodväg i båda versionerna, så
  A/B-testet kan inte mäta något annat än numreringen.
- `variant-redesign.css` – gemensam stil för v1 och v2, scopad på
  `.rk-redesign`.

`app.js` och `styles.css` är basversionen och rörs inte när nya versioner
byggs – varje byggfunktion i `app.js` lämnar bara över till variantens egen
version om den finns.

## Att göra härnäst

1. (Valfritt) Lägg in riktiga seriestrippar i `assets/`.
2. Fas 2: heuristisk utvärdering med fokus på meny & navigation.
3. Fas 3: iterera fram förbättrad design.
