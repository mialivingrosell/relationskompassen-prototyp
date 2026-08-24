# Fas 3 – Designförslag för omdesign av Relationskompassen

**Underlag:** Fas 2-utvärderingen (`Fas2-utvardering-navigation.md`) + best practice för webbutbildningar.
**Fokus:** navigation & menyer, med kringliggande UX/pedagogik.
**Status:** förslag att prioritera – inga ändringar gjorda i prototypen än.
**Datum:** 2026-08-21

Fynd-referenser (F#) syftar på Fas 2-rapporten.

---

## Förslag per tema

### 1. Kursnavigation & innehållsmeny
- Beständig, sammanfällbar **innehållspanel** (eller sticky INNEHÅLL-bar) som alltid går att nå. *(F2)*
- **Egen ikon + etikett för INNEHÅLL**, tydligt skild från den globala hamburgaren. *(F1, F7)*
- **Fri men vägledd navigation:** klickbara kapitel, markera "rekommenderad nästa" i stället för att låsa. *(F3)*
- Om linjäritet krävs: **visa varför** och vad som låser upp.
- **Auto-scrolla till aktuellt kapitel** när menyn öppnas.
- **Sök i kursen** som eget, tydligt scope. *(F9)*

### 2. Global meny & struktur
- **Byt namn/ikon på globala MENY** ("Om & material" e.d.). *(F1, F7)*
- **Rensa breadcrumb** – se över nivån "Skola" mot hela målgruppen. *(F8)*
- Ge introsteget **eget namn** ("Introduktion"/"Välkommen"). *(F10)*

### 3. Progress & stegmodell
- **En enda sanning för antal steg** – samma siffra i meny, progressbar och Min sida. *(F4)*
- **Enhetlig hantering av Elsa och Omar** – ett kapitel med interna delar, eller tydliga delsteg (4a–4d). *(F5)*
- **Prev/next genereras från kapitelordningen** (single source of truth). *(F6)*
- **Uppskattad tid** per kapitel och totalt.

### 4. Wayfinding – "var är jag / hur långt kvar"
- **Beständig, tunn progressindikator** under läsning. *(F11)*
- **Sektionsindelning** i moduler/teman om kursen växer.
- **Tydlig avslutning:** sammanfattning + nästa steg/intyg.

### 5. Onboarding, konto & Min sida
- **Förhandsvisning utan konto** – prova första kapitlet innan registrering. *(F13)*
- **Minska registreringsfriktion** – färre obligatoriska fält. *(F13)*
- **Dynamisk knapptext:** "Starta" → "Fortsätt" → "Repetera / Visa intyg". *(F12)*
- **Fortsätt-där-du-slutade** tydligt på Min sida och som ingång i kursen.

### 6. Pedagogik & engagemang
- **Lärandemål** i början av varje kapitel.
- **Konsekvent kapitelmall:** film → nyckelpunkter → reflektion/övning → sammanfattning.
- **Direkt, konstruktiv feedback** i övningar; säkerställ att rättningen syns.
- **Spara reflektionssvar** (valfritt), behåll tydlighet om vad som lagras.
- **Mikrolärande:** korta, fristående kapitel.

### 7. Tillgänglighet
- **Visa aktivt tillstånd** för SPRÅK och LÄTTLÄST.
- **Transkript & undertext** genomgående + textalternativ till bild/serie.
- **Tydlig fokusmarkering & tangentbordsnavigation.**
- **Kontrastkontroll** av utgråade menytillstånd.

### 8. Mobil & responsivt
- **Mobilanpassad kursnavigation** (en tydlig innehållsknapp/panel). *(F1)*
- **Tumvänliga prev/next** + sticky progress på mobil.

---

## Prioritering: effekt × ansträngning

### 🟢 Quick wins – hög effekt, låg ansträngning (börja här)
- Egen ikon + tydlig etikett för INNEHÅLL, byt namn/ikon på global MENY *(F1, F7)*
- Lås upp / fri kapitelnavigation *(F3)*
- Enhetlig stegräkning i meny/progress/Min sida *(F4)*
- Prev/next från kapitelordningen *(F6)*
- "Starta" → "Fortsätt"-logik *(F12)*
- Eget namn på introsteget *(F10)*
- Visa aktivt tillstånd för SPRÅK/LÄTTLÄST
- Förtydliga sök-scope *(F9)*; se över breadcrumb "Skola" *(F8)*
- Kontrastkontroll av utgråade tillstånd

### 🔵 Större grepp – hög effekt, mer arbete (planera in)
- Beständig/sticky innehållsnavigation *(F2)*
- Enhetlig stegmodell för Elsa och Omar *(F5)*
- Modul-/sektionsindelning + tydlig kursavslutning/intyg
- Konsekvent kapitelmall + lärandemål
- Mobilanpassad kursnavigation *(F1)*
- Uppskattad tid per kapitel

### 🟡 Beroende av system/innehåll (kräver mer beslut)
- Förhandsvisning utan konto + minskad registreringsfriktion *(F13)*
- Spara reflektionssvar
- "Fortsätt där du slutade" över hela plattformen

### ⚪ Löpande putsning
- Transkript/undertext genomgående, textalternativ till serie
- Feedback-förbättringar i övningar
- Fokus/tangentbordsnavigation

---

## Föreslagen ordning för prototyp-iteration (Fas 3)
1. **Quick wins** – snabbt lyft, låg risk, bra att A/B-testa mot kopian.
2. **Beständig kursnavigation (F2)** + **enhetlig stegmodell (F4, F5)** – de två största navigations­greppen.
3. **Kapitelmall + wayfinding** (lärandemål, tid, avslutning).
4. Utvärdera onboarding/konto separat (systemberoende).

> Nästa steg när du säger till: välj vilka förslag som ska in i en ny prototyp­iteration
> så bygger vi dem och ställer den nya designen sida vid sida mot kopian i användartest.
