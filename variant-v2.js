/* ==========================================================================
   VARIANT v2 – samma prototyp som v1, utan numrering
   Byggd för A/B-test: numreringen är den ENDA skillnaden mellan v1 och v2.

   Därför finns ingen egen logik här. v2 pekar rakt på v1:s funktionspaket,
   och numreringen styrs av V1_NUMBERS i variant-v1.js, som läser vilken
   variant som är aktiv:

     v1  "5. Elsa och Omar"   i meny, sidrubrik, prev/next och progressrad
     v2  "Elsa och Omar"      inga siffror någonstans, progressraden utan tal

   Räkningen är identisk: 21 avsnitt, Elsa och Omar del 2–4 som egna avsnitt
   6, 7 och 8, och Min sida i basversionens design i båda.

   Att peka på samma paket i stället för att kopiera det är avsiktligt: med
   två kopior skulle en framtida ändring behöva göras dubbelt, och glöms den
   i en av dem skiljer sig versionerna på mer än numreringen – då mäter
   A/B-testet inte längre det det ska mäta.
   ========================================================================== */

window.RK_V2 = window.RK_V1;
