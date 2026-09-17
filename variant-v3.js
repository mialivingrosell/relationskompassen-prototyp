/* ==========================================================================
   VARIANT v3 – som v1, men med quizalternativen på vita kort
   Enda skillnaden mot v1 är hur svarsalternativen på avsnitt 2 och 3 ser ut:
   bild och etikettknapp ligger på ett vitt kort med tunn ram och får en
   hover-effekt, så att de känns klickbara.

   Ingen egen logik behövs. Flaggorna i variant-v1.js ger v3 rätt beteende
   av sig själva:
     V1_NUMBERS    === 'v2'  -> false, alltså onumrerade avsnitt som v1
     V1_IMAGE_QUIZ !== 'v2'  -> true,  alltså originalets bildquiz som v1

   Skillnaden ligger helt i CSS, scopad med .rk-v3 i variant-redesign.css.
   ========================================================================== */

window.RK_V3 = window.RK_V1;
