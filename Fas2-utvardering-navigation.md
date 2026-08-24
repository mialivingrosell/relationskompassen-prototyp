# Fas 2 – Heuristisk utvärdering: Relationskompassen

**Fokus:** navigation & menyer. Övriga UX-fynd tas med sekundärt.
**Underlag:** betans huvudflöde (skärmdumpar) + den klickbara kopian.
**Metod:** Nielsens 10 användbarhetsheuristiker + wayfinding-/e-lärande­principer.
**Datum:** 2026-08-21

> Notera: utvärderingen bygger på betan som den syns i skärmdumpar/prototyp.
> Ett par fynd (särskilt om låsta kapitel) bör verifieras mot den live-körande
> betan innan de åtgärdas.

## Allvarlighetsgrad
- 🔴 **Hög** – stör orientering/navigation påtagligt, bör åtgärdas före lansering
- 🟠 **Medel** – återkommande friktion, åtgärda i nära anslutning
- 🟡 **Låg** – putsning / mindre förbättring

---

## Sammanfattning – topp 5 att ta tag i

1. 🔴 **Två menyer med samma hamburgarikon men olika innehåll** (MENY vs INNEHÅLL) – största källan till förvirring.
2. 🔴 **INNEHÅLL-menyn (kapitellistan) scrollar bort** – den viktigaste kursnavigationen är inte åtkomlig när man läser.
3. 🟠 **Låsta/utgråade framåtkapitel** – begränsar användarens kontroll och det förklaras inte varför.
4. 🟠 **Inkonsekvent räkning av kapitel** (22 sidor vs "x/20" vs "0 av 20/4") – undergräver känslan av överblick.
5. 🟠 **Elsa och Omar splittrat på 4 numrerade steg** – blåser upp stegräkningen och gör mentala modellen otydlig.

---

## A. Navigation & menyer (huvudfokus)

### F1 🔴 Två parallella menyer med identisk ikon
**Heuristik:** Konsekvens & standarder; Igenkänning framför minne.
**Observation:** Både den globala **MENY** (uppe till höger: *Relationskompassens grundkurs, Material, Om Relationskompassen, Kontakta oss*) och kursens **INNEHÅLL** (kapitellistan) använder samma orange hamburgarikon. De ligger dessutom på olika ställen och har olika omfattning.
**Varför det spelar roll:** Användaren kan inte förutse vad respektive ikon gör. I ett kapitel är det lätt att tro att "MENY" innehåller kapitlen (det gör den inte). Två "hamburgare" på samma sida bryter mot etablerad konvention (en hamburgare = en huvudmeny).
**Rekommendation:** Differentiera tydligt. T.ex. behåll hamburgare för global MENY och ge INNEHÅLL en egen ikon (lista/kapitel-ikon) + alltid synlig etikett "INNEHÅLL". Överväg att kalla global menyn för något mer beskrivande, eller att integrera kursinnehållet i en tydlig sidopanel.

### F2 🔴 Kapitelnavigationen (INNEHÅLL) scrollar bort
**Heuristik:** Användarens kontroll & frihet; Igenkänning framför minne.
**Observation:** Toppheadern är sticky, men **breadcrumb + INNEHÅLL-baren scrollar iväg**. På långa kapitel (film + brödtext + övning) måste man scrolla hela vägen upp för att byta kapitel eller se var man är.
**Varför det spelar roll:** I en kurs är "var är jag / hur byter jag avsnitt" en kärnfunktion som bör vara ständigt nåbar.
**Rekommendation:** Gör INNEHÅLL-baren sticky (eller lägg en beständig, hopfällbar innehållspanel/knapp). Alternativt en tunn sticky progress-/kapitelrad.

### F3 🟠 Framåtkapitel är låsta/utgråade utan förklaring
**Heuristik:** Användarens kontroll & frihet; Synlighet av systemstatus.
**Observation:** Kapitel efter det aktuella visas som grå, ihåliga och går inte att klicka på. Ingen förklaring till varför eller när de "låses upp".
**Varför det spelar roll:** Målgruppen är yrkesverksamma vuxna som ofta vill skumma, hoppa fram, eller återkomma till ett specifikt avsnitt. Påtvingad linjäritet + tyst låsning känns kontrollerande och kan tolkas som ett fel.
**Rekommendation:** Antingen (a) tillåt fri navigation i menyn (behåll ändå bock/aktuell-markering för progress), eller (b) om linjäritet är ett medvetet pedagogiskt val – kommunicera det ("Lås upp genom att gå igenom föregående avsnitt"). *Verifiera först om betan faktiskt låser, eller om det bara ser låst ut – i så fall är det en missvisande affordance (också ett fynd).*

### F4 🟠 Inkonsekvent räkning av kapitel/steg
**Heuristik:** Konsekvens & standarder; Synlighet av systemstatus.
**Observation:** Menyn listar ~22 poster, progress­raden räknar **"x/20"**, och Min sida säger **"0 av 20"** för grundkursen (samt "0 av 4" för en annan kurs). Siffrorna går inte ihop.
**Varför det spelar roll:** Progress är en förtroendefråga – när totalen skiftar mellan vyer tappar användaren känslan av överblick och hur mycket som återstår.
**Rekommendation:** Bestäm en enda "sanning" för antal steg och använd samma överallt (meny, progressbar, Min sida). Bestäm om underkapitel (Elsa del 2–4) räknas som egna steg eller ej – och räkna konsekvent.

### F5 🟠 "Elsa och Omar" splittrat på fyra numrerade steg
**Heuristik:** Matchning system/verklighet; Estetik & minimalism.
**Observation:** Seriestrippen är uppdelad på *Elsa och Omar* + *del 2, 3, 4*, där varje del är ett eget steg i progress och i prev/next-kedjan. I menyn ligger de som hopfällbar undergrupp, men i stegräkningen är de likvärdiga huvudsteg.
**Varför det spelar roll:** Dubbel mental modell (är det 1 kapitel eller 4?) och uppblåst stegantal gör kursen längre än den känns.
**Rekommendation:** Behandla berättelsen som **ett** kapitel med intern "nästa/föregående del", eller räkna delarna som delsteg (t.ex. 4a–4d) så att både meny och progress speglar samma struktur.

### F6 🟠 Fel bakåtlänk i prev/next
**Heuristik:** Felförebyggande; Konsekvens.
**Observation:** På **"Vad är våld?"** pekar bakåtknappen på *"Elsa och Omar del 2"* i stället för *del 4* (det faktiskt föregående steget). (Rättat i kopian, men finns i betan.)
**Varför det spelar roll:** Trasig sekventiell navigation skickar användaren till fel plats och bryter förtroendet för prev/next.
**Rekommendation:** Generera prev/next från kapitel­ordningen (single source of truth) i stället för manuella länkar, så att den här typen av fel inte kan uppstå.

### F7 🟠 "MENY"-etiketten är generisk
**Heuristik:** Matchning system/verklighet.
**Observation:** Global menyn heter bara "MENY". I kurskontext förväntar sig många att "meny" = kursens innehåll.
**Rekommendation:** Mer beskrivande etikett (t.ex. "Om & material" / "Webbplats") eller tydlig ikon, så att den skiljs från kursinnehållet.

### F8 🟡 Breadcrumb-nivån "Skola"
**Heuristik:** Matchning system/verklighet.
**Observation:** Brödsmulan är *Hem / Skola / Relationskompassens grundkurs / [kapitel]*. "Skola" som mellannivå är otydlig – kursen riktar sig även till socialtjänst och fritid, och det är oklart vad "Skola" leder till.
**Rekommendation:** Se över om nivån behövs/är klickbar och att etiketten matchar hela målgruppen (skola/fritid/socialtjänst).

### F9 🟡 Sökfältets omfattning oklar
**Heuristik:** Synlighet av systemstatus.
**Observation:** Ett prominent SÖK-fält finns, men det framgår inte om det söker i hela webbplatsen eller i kursen. I en linjär kurs kan söket vara lågt värde och ta uppmärksamhet.
**Rekommendation:** Förtydliga scope (placeholder "Sök i kursen/på webbplatsen") eller tona ned söket i kursvyn.

---

## B. Wayfinding & orientering

### F10 🟠 Kursens startsida = kapitel med samma namn
**Heuristik:** Igenkänning; Konsekvens.
**Observation:** Första steget heter *"Relationskompassens grundkurs"* – exakt samma som hela kursen och som breadcrumb-nivån. Oklart om man är på en introsida eller "i" kursen.
**Rekommendation:** Ge introsteget ett eget namn ("Introduktion"/"Välkommen") så titlar inte krockar.

### F11 🟡 Ingen beständig lägesindikator vid läsning
**Heuristik:** Synlighet av systemstatus.
**Observation:** Progress (x/20) syns bara längst ner. Under läsning saknas löpande "var är jag / hur långt kvar".
**Rekommendation:** Koppla ihop med F2 – en tunn sticky progress-/kapitelindikator.

---

## C. Konto & onboarding (sekundärt)

### F12 🟠 "Starta" även för påbörjad kurs
**Heuristik:** Matchning system/verklighet.
**Observation:** På Min sida står "Starta" oavsett om kursen är påbörjad. Vid pågående kurs bör det stå "Fortsätt".
**Rekommendation:** Dynamisk etikett: "Starta" (0 %) → "Fortsätt" (pågående) → "Repetera"/"Visa intyg" (klar).

### F13 🟡 Konto krävs innan man ser kursen
**Heuristik:** Användarens kontroll & frihet.
**Observation:** Man måste skapa konto/logga in för att komma igång; skapa-konto-formuläret har flera obligatoriska fält (kön, verksamhet/roll, sektor).
**Rekommendation:** Överväg att låta besökare förhandsgranska/prova första steget utan konto, eller minska antal obligatoriska fält vid registrering. (Delvis innehåll/flöde – tas med kort.)

---

## D. Övrig UX (kort)

- 🟡 **LÄTTLÄST/SPRÅK** – bra tillgänglighetsval, men aktivt tillstånd (av/på, valt språk) syns inte. Visa aktuell status.
- 🟡 **Filmer utan synlig speltid/kapitelmarkörer** – lägg gärna längd så man kan planera.
- 🟡 **Övningarnas "Rätta"-knapp** – bra med direkt facit; säkerställ att fokus/scroll hamnar vid rättningen och att flervalsfrågor tydligt visar "flera rätt möjliga".
- 🟢 **Reflektionsrutor** – tydligt kommunicerat att texten inte sparas; bra för trygghet.

---

## Det som fungerar bra (behåll)
- Tydliga **avklarat/aktuellt-tillstånd** i INNEHÅLL-menyn (bock/prick) – stark progresskänsla när menyn är öppen.
- **Breadcrumbs** och **prev/next** finns genomgående.
- **Progressbar** per kapitel.
- Genomgående **konsekvent header** och stark, igenkännbar visuell identitet.
- **Tillgänglighetsambitioner**: språk, lättläst, videotranskript.

---

## Prioriterad åtgärdslista

| # | Fynd | Allvar | Ansträngning (grov) |
|---|------|--------|---------------------|
| F1 | Två menyer, samma ikon | 🔴 Hög | Medel |
| F2 | INNEHÅLL scrollar bort | 🔴 Hög | Låg–Medel |
| F3 | Låsta framåtkapitel | 🟠 Medel | Låg |
| F4 | Inkonsekvent stegräkning | 🟠 Medel | Låg |
| F5 | Elsa och Omar splittrat | 🟠 Medel | Medel |
| F6 | Fel bakåtlänk | 🟠 Medel | Låg |
| F7 | "MENY" generisk etikett | 🟠 Medel | Låg |
| F10 | Start = kapitel med samma namn | 🟠 Medel | Låg |
| F12 | "Starta" vs "Fortsätt" | 🟠 Medel | Låg |
| F8, F9, F11, F13, D | Övrigt | 🟡 Låg | Låg |

---

## Förslag på nästa steg (Fas 3)
Utgå från topp 5 och skissa en förbättrad navigationsmodell:
1. En tydlig, **beständig kursnavigation** (sticky INNEHÅLL / sidopanel) skild från global meny.
2. **Fri men vägledd** kapitelnavigation med konsekvent progress.
3. Enhetlig **stegmodell** (inkl. Elsa och Omar).
Dessa kan itereras direkt i prototypen och A/B-jämföras mot kopian i användartest.
