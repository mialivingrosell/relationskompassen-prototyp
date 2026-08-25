# Relationskompassen – klickbar prototyp (kopia av beta)

Statisk HTML/CSS/JS-prototyp som kopierar den befintliga webbkursens huvudflöde.
Byggd för att sedan utvärderas (med fokus på meny & navigation) och itereras vidare.

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

## Versioner (v0 / v1)

Prototypen innehåller flera designversioner i samma kod. Valet sparas per
flik, så det följer med när man klickar sig vidare i kursen.

| Adress | Version |
|---|---|
| `index.html` | **v0 – basversionen.** Kopian av befintliga Relationskompassen, oförändrad. |
| `index.html?nav=v1` | **v1 – ny meny & navigation.** |

Nere till höger sitter en stämpel där man klickar mellan versionerna och
nollställer sessionen. Dölj den inför skarpa användartest med `?stamp=off`.
Öppna v0 i en flik och v1 i en annan för att jämföra sida vid sida.

Basversionen är låst i git som taggen `v0-bas`.

### Vad v1 ändrar

- **Större rubriker** på artikel- och kapitelsidor. Brödtexten är oförändrad.
- **Bredare videoruta** på kapitelsidor, medan rubriker och brödtext hålls i
  en smalare spalt (ca 800px) för läsbar radlängd.
- **Min sida:** två helbreda plattor med skarpa hörn. Den blå kursplattan har
  luft ovanför så den läses som en ruta på sidan. Under den en creme platta
  med "Mina uppgifter" som sektionsrubrik och "Byt lösenord" +
  "Ta bort användarkontot" som undersektioner.
- **Logga ut** flyttad till svarta listen, längst upp till höger.
- **Kurskort:** ett vitt kort per kurs på den blå ytan med kursnamn, introtext,
  beräknad tid, procent i stor siffra, kapitelantal, kort orange
  progressstreck och knapp. Pågående kurs först, genomförd sist. Två kort i
  bredd, tre eller fler staplas. "Ladda ner intyg" är vit så den inte
  konkurrerar med "Fortsätt".
- **Byt lösenord:** halverad fältbredd med ögonikon i fältet.
- **Kapitelnumrering** i innehållsmenyn, från 1 (basen börjar på 0), direkt
  bredvid kapitelnamnet: "1. Relationskompassens grundkurs". Underkapitlen
  ärver förälderns nummer: 5.1, 5.2, 5.3.
- **Handritad pil** i styleguidens ikonmanér ersätter teckenpilarna (← →) i
  knappar och svarta listen. Styleguidens ikonsida innehåller ingen pil, så
  den är ritad efter manéret: en enkel bågad linje med rundade ändar.
- **En enda innehållsbredd** på kapitelsidorna: film och bildrader i
  `--v1-media` (1064px), rubriker och brödtext i `--v1-text` (800px).
  Spalten är centrerad som i betan i stället för basens vänsterindrag, och
  prev/next linjerar med innehållet. Basens inline-bredder nollas.
- **Prev/next** har transparent bakgrund och svart ram, som originalet.
- **Kursvyn** är en egen sidkontext: topheadern och brödsmulorna är borta.
  Svarta listen är sticky och innehåller vit bakåtpil till Min sida,
  ett litet lodrätt streck, kursnamnet, och INNEHÅLL + hamburgare längst till
  höger. Innehållsmenyn fälls ut högerställd, ovanpå progressraden, med en
  knapp "Till Min sida" efter sista kapitlet.
- **Tunn progressindikator** direkt under svarta listen, med samma värde som
  progressen på Min sida.
- **Progressindikatorn** i botten av kapitelsidan borttagen (prev/next kvar).

### Filerna

- `variants.js` – växlaren. Toppen av filen beskriver hur en v2 läggs till.
- `variant-v1.js` – v1:s avvikelser. Allt som inte står här ärvs från
  `app.js` (basen), så v1 skiljer sig bara där vi aktivt byggt något.
- `variant-v1.css` – v1:s stil, laddas bara när v1 är aktiv.

`app.js` och `styles.css` är basversionen och rörs inte när nya versioner
byggs – varje byggfunktion i `app.js` lämnar bara över till variantens egen
version om den finns.

## Att göra härnäst

1. (Valfritt) Lägg in riktiga seriestrippar i `assets/`.
2. Fas 2: heuristisk utvärdering med fokus på meny & navigation.
3. Fas 3: iterera fram förbättrad design.
