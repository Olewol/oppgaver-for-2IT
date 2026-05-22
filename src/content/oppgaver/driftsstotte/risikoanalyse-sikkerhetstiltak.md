---
title: "Risikoanalyse og sikkerhetstiltak for Oslofjord Helse"
fag: driftsstotte
emne: Risikoanalyse, trusselbildet og innebygd sikkerhet
kompetansemaal:
  - Kompetansemål om trusler mot datasikkerhet
  - Kompetansemål om risikoanalyse
  - Kompetansemål om sikre IT-løsninger
  - Kompetansemål om personvern
vanskelighetsgrad: avansert
publisert: true
dato: 2026-05-22
relatert-teori:
  - tittel: "Risikoanalyse"
    url: "https://olewol.github.io/driftsstotte-vg2/sikkerhet/risikoanalyse"
  - tittel: "Trusselbildet"
    url: "https://olewol.github.io/driftsstotte-vg2/sikkerhet/trusselbildet"
  - tittel: "Personvern og GDPR"
    url: "https://olewol.github.io/driftsstotte-vg2/sikkerhet/personvern"
  - tittel: "IT-løsninger med innebygd sikkerhet"
    url: "https://olewol.github.io/driftsstotte-vg2/sikkerhet/it-losninger-med-sikkerhet"
  - tittel: "Brannmur og nettverkssikkerhet"
    url: "https://olewol.github.io/driftsstotte-vg2/sikkerhet/brannmur"
tags:
  - risikoanalyse
  - trusselbildet
  - personvern
  - gdpr
  - sikkerhetstiltak
  - ros-analyse
  - case
---

## Case: Oslofjord Helse AS

Du er ansatt som IT-sikkerhetskonsulent i konsulentselskapet **NetConsult AS**. Deres nye kunde er **Oslofjord Helse AS** — en mellomstor privat helseaktør med hovedkontor i Drammen og tre avdelingskontorer på Østlandet.

Oslofjord Helse driver et pasientjournalsystem som inneholder sensitive helseopplysninger for over 30 000 pasienter. De tilbyr fysioterapi, psykisk helsevern og allmennlegetjenester. I tillegg håndterer de avtaler, fakturering og kommunikasjon med NAV og HELFO — noe som innebærer systematisk behandling av personopplysninger.

For tre uker siden oppdaget IT-avdelingen mistenkelig aktivitet i systemene sine. En foreløpig analyse viste at en ansatt hadde klikket på en phishing-e-post og ved et uhell gitt tilgang til en angriper. Angriperen hadde tilgang til pasientjournalsystemet i 72 timer før den ble oppdaget og stengt ute. Oslofjord Helse har foreløpig **ikke** varslet Datatilsynet.

> **Din rolle:** Du er NetConsult sin senior IT-sikkerhetskonsulent. IT-sjefen hos Oslofjord Helse, Per Berg, har bedt om din hjelp til å gjennomføre en komplett risikovurdering og foreslå konkrete sikkerhetstiltak. «Vi kan ikke leve med at pasientjournaler lekkes,» sier Per. «Jeg trenger en plan — både for hva vi skal gjøre nå, og hvordan vi skal sikre oss fremover.»

---

## Bedriftens IT-infrastruktur

### Systemer og tjenester

Oslofjord Helse AS har følgende systemer i drift:

| System | Beskrivelse | Plassering |
|--------|------------|------------|
| Pasientjournalsystem (PJS) | Sensitive helseopplysninger for 30 000+ pasienter | Lokal server (Drammen) |
| Avtale- og bookingsystem | Timebestilling, avbestilling, påminnelser | Sky (SaaS-leverandør) |
| Fakturasystem | Fakturering mot pasienter, NAV, HELFO | Lokal server (Drammen) |
| E-postsystem | Microsoft 365 for alle 80 ansatte | Sky (Microsoft) |
| Fellesområde (filserver) | Delte dokumenter, maler, interne rutiner | Lokal server (Drammen) |
| Personal- og lønnssystem | Ansattopplysninger, lønn, kontrakter | Sky (SaaS-leverandør) |
| Nettverksinfrastruktur | Rutere, svitsjer, brannmur, WiFi | Lokalt på alle kontorer |

### Kontorer og ansatte

- **Hovedkontoret i Drammen:** 45 ansatte — administrasjon, ledelse, IT-avdeling, pasientbehandling. Serverrom med 6 fysiske servere + 10 virtuelle servere.
- **Avdelingskontor Lillestrøm:** 15 ansatte — pasientbehandling, fakturering. Koblet til hovedkontor via VPN.
- **Avdelingskontor Tønsberg:** 12 ansatte — pasientbehandling. Koblet til hovedkontor via VPN.
- **Avdelingskontor Fredrikstad:** 8 ansatte — pasientbehandling. Koblet til hovedkontor via VPN.

Alle avdelingskontor har egne rutere, brannmur (stateful), trådløst gjestenettverk og ansattnettverk.

### Utstyr

| Type | Antall | Merknad |
|------|--------|---------|
| Ansatt-PC (Windows) | 80 | Hybrid Azure AD-joined |
| Mobiltelefon (iOS/Android) | 65 | BYOD + firmatelefoner |
| Skrivere | 15 | Nettverkstilkoblede |
| Pasientterminaler (nettbrett) | 10 | For timeinnsjekk i resepsjon |
| Overvåkningskameraer | 20 | IP-kameraer på fellesarealer |

---

### Hendelsen: Tidslinje

For tre uker siden skjedde følgende:

1. **Dag 1:** En ansatt i administrasjonen mottar en e-post som utgir seg for å være fra Microsoft 365-support. E-posten hevder at kontoen hennes sperres om 24 timer og ber henne klikke på en lenke for å «bekrefte kontoen».
2. **Dag 1:** Den ansatte klikker på lenken og skriver inn e-postadresse og passord på en falsk innloggingsside (spear phishing).
3. **Dag 1–3:** Angriperen logger seg på den ansattes e-postkonto og finner en e-post med vedlegg som inneholder en gammel eksport av pasientjournaldata. Angriperen laster ned hele filen (2,4 GB).
4. **Dag 2:** Angriperen prøver å bruke den samme e-postkontos pålogging på pasientjournalsystemet. Systemet krever MFA — en kode sendes til den ansattes telefon. Den ansatte tror det er en feil og godkjenner MFA-forespørselen. Angriperen får tilgang til PJS i 20 minutter før IT-avdelingen oppdager uvanlig påloggingsmønster.
5. **Dag 3:** IT-avdelingen sperrer den ansattes konto, tilbakestiller passord og starter undersøkelser. De oppdager at pasientdata ble lastet ned.
6. **I dag (tre uker senere):** IT-avdelingen har foreløpig ikke varslet Datatilsynet, pasientene eller politiet. Per Berg sier: «Vi vet ikke helt hva vi skal gjøre, og vi har ikke tid til å følge opp akkurat nå.»

> **Merk:** Det er ikke nødvendig å gjøre research utover det som står i oppgaveteksten og fagstoffet. Alle opplysningene du trenger for å løse oppgaven finnes i caset og i ressursene som er lenket.

---

## Oppgave

### Del 1: Vurdering av avvik og personvernbrudd

Før du begynner på risikoanalysen må du vurdere den akutte situasjonen.

1. Oslofjord Helse har **ikke varslet Datatilsynet** om hendelsen — selv om det har gått tre uker.
   - Hvilket krav i GDPR gjelder for varsling av personvernbrudd?
   - Hva burde Oslofjord Helse ha gjort, og innen hvilken frist?
   - Hvilke konsekvenser kan det få at de **ikke** har varslet?
   - Hva må et varsel til Datatilsynet inneholde?

2. Identifiser hvilke **personvernprinsipper** (GDPR art. 5) som ble brutt i denne hendelsen. Begrunn for hvert prinsipp:
   - Ble prinsippet brutt? Hvordan?
   - Hvilke tekniske eller organisatoriske svikt førte til bruddet?

3. Vurder om hendelsen skal varsles direkte til de **berørte pasientene**.
   - Hva sier GDPR om varsling til registrerte (art. 34)?
   - Hvilken risiko vurderer du at pasientene står overfor?

---

### Del 2: Risikoanalyse (ROS-analyse)

Nå skal du gjennomføre en strukturert risikoanalyse for Oslofjord Helse. Bruk 4-stegsmodellen fra fagstoffet.

#### Steg 1: Identifiser verdier og trusler

4. Lag en oversikt over Oslofjord Helse sine **viktigste verdier** som må beskyttes. Tenk bredt — ikke bare tekniske systemer, men også immaterielle verdier som omdømme og tillit.

5. For hver verdi, identifiser **minst én konkret trussel** som kan ramme den. Bruk fagstoffet om trusselbildet som inspirasjon — men tilpass truslene til denne spesifikke virksomheten. Eksempler på trusler du bør vurdere:
   - Ransomware mot pasientjournalsystemet
   - Phishing mot ansatte
   - Innsidetrussel (utilsiktet eller tilsiktet)
   - Brann, vannskade eller strømbrudd i serverrom
   - Datatap hos skyleverandør
   - Mangelfull tilgangsstyring
   - Kompromittert VPN-tilkobling til avdelingskontor
   - Manglende kryptering av pasientdata

Lag en ryddig tabell:

| Verdi | Trussel | Hvorfor relevant for Oslofjord Helse? |
|-------|---------|--------------------------------------|
| ... | ... | ... |

#### Steg 2: Identifiser sårbarheter

6. For identifiserte trusler, beskriv hvilke **sårbarheter** som finnes i Oslofjord Helse sitt system. Tenk på sårbarheter som ble avslørt av hendelsen (manglende MFA, phishing-sårbarhet, manglende logging) og andre sårbarheter som er typiske i en helsevirksomhet.

Lag en tabell:

| Trussel | Sårbarhet | Hvordan kan denne utnyttes? |
|---------|-----------|---------------------------|
| ... | ... | ... |

#### Steg 3: Vurder og ranger risiko

7. Bruk **risikomatrisen** (5×5) til å rangere risikoscenarioene dine. Hvert scenario får en risikoverdi = sannsynlighet × konsekvens.

> <details>
> <summary><strong>📊 Risikomatrise 5×5 — referanse</strong></summary>
>
> | | **1 Ubetydelig** | **2 Liten** | **3 Moderat** | **4 Alvorlig** | **5 Svært alvorlig** |
> |---|---|---|---|---|---|
> | **5 Svært stor** | 5 | 10 | 15 | 20 | **25** |
> | **4 Stor** | 4 | 8 | 12 | **16** | **20** |
> | **3 Middels** | 3 | 6 | **9** | 12 | 15 |
> | **2 Liten** | 2 | 4 | 6 | 8 | 10 |
> | **1 Svært liten** | 1 | 2 | 3 | 4 | 5 |
>
> **Fargekoder:** 1–4 = lav (grønn), 5–9 = middels (gul), 10–19 = høy (oransje), 20–25 = kritisk (rød)
> </details>

   For hvert scenario vurderer du:
   - **Sannsynlighet** (1–5): Hvor trolig er det at denne hendelsen inntreffer hos Oslofjord Helse?
   - **Konsekvens** (1–5): Hvor alvorlig vil skaden være for virksomheten og pasientene?

   Lag en tabell med følgende kolonner og fyll ut for **minst 6 scenarioer**:

   | Scenario | Sannsynlighet (1–5) | Konsekvens (1–5) | Risikoverdi | Fargekode |
   |----------|--------------------|------------------|-------------|-----------|
   | ... | ... | ... | S × K = ... | ... |

   > **Husk:** En risiko med høy konsekvens og lav sannsynlighet kan være like viktig som en med middels sannsynlighet og middels konsekvens. Risikoverdien = S × K. Bruk fargekodene over for å visualisere alvorlighetsgraden.

8. Ranger scenarioene fra **høyest til lavest risiko**. Hvilke tre scenarioer bør Oslofjord Helse prioritere å håndtere først? Begrunn hvorfor.

#### Steg 4: Foreslå tiltak og vurder restrisiko

9. For hvert av de **tre høyest rangerte scenarioene**, foreslå konkrete tiltak:
   - Hvilken **tiltakstype** er det (forebyggende, oppdagende, reaktivt)?
   - Hvordan reduserer tiltaket sannsynlighet og/eller konsekvens?
   - Hva er **restrisikoen** etter tiltaket (ny risikoverdi)?
   - Hvem bør godkjenne restrisikoen?

   Lag en tabell:

   | Scenario | Tiltak | Type | Ny sannsynlighet | Ny konsekvens | Ny risiko | Restrisiko godkjent av |
   |----------|--------|------|-----------------|--------------|----------|----------------------|
   | ... | ... | ... | ... | ... | ... | ... |

10. Velg **ett scenario** der du mener riktig strategi er å **unngå** eller **overføre** risikoen i stedet for å redusere. Forklar hvorfor.

---

### Del 3: Sikkerhetstiltak og Security by Design

Nå skal du foreslå helhetlige sikkerhetstiltak — både tekniske og organisatoriske.

11. Basert på risikoanalysen, lag en **handlingsplan** med tiltak fordelt på tre kategorier:

    | Kategori | Eksempler på tiltak |
    |----------|-------------------|
    | **Tekniske tiltak** | Brannmurregler, MFA, kryptering, logging, VLAN-segmentering, patchhåndtering, tilgangskontroll |
    | **Organisatoriske tiltak** | Opplæring, rutiner, policyer, beredskapsplan |
    | **Juridiske/etterlevelse** | Databehandleravtaler, DPIA, varslingsrutiner |

    Skriv minst 2 tiltak i hver kategori, og forklar **hvordan** hvert tiltak adresserer risiko som ble identifisert i del 2.

12. Oslofjord Helse har i dag **ikke segregert nettverket** — pasientjournalsystemet, gjeste-WiFi, fakturasystem og overvåkningskameraer er alle på samme flatnettverk.
    - Hvorfor er dette et problem?
    - Foreslå en minimumssegmentering (VLAN-struktur) med begrunnelse for hvert segment.
    - Hvilke brannmurregler bør gjelde mellom segmentene?

13. **Privacy by Design / Security by Design:**
    - Hvis Oslofjord Helse skulle bygge et nytt pasientjournalsystem fra bunnen av — hvilke sikkerhetskrav ville du stilt allerede i designfasen?
    - Hvordan skiller «innebygd sikkerhet» seg fra å «legge til sikkerhet etterpå»?

---

### Del 4: Beredskap og respons

En god sikkerhetsstrategi handler ikke bare om å forebygge — men også om å være forberedt når noe likevel skjer.

14. Lag en **enkel incident response-plan** for Oslofjord Helse med følgende faser:

    | Fase | Hva skal skje? | Hvem er ansvarlig? |
    |------|---------------|-------------------|
    | **1. Oppdagelse** | Hvordan oppdager man et brudd raskere enn 72 timer? | ... |
    | **2. Vurdering** | Hvordan vurderer man alvorlighetsgraden? | ... |
    | **3. Håndtering** | Hvordan stoppes angrepet og begrenses skaden? | ... |
    | **4. Gjenoppretting** | Hvordan gjenopprettes normale operasjoner? | ... |
    | **5. Varsling** | Hvem skal varsles (Datatilsynet, pasienter, politi)? | ... |
    | **6. Evaluering** | Hvordan sikrer man at det ikke skjer igjen? | ... |

#### Umiddelbare tiltak

15. Før en full incident response-plan er på plass — hva bør Oslofjord Helse gjøre **akkurat nå**? Lag en prioritert liste over tiltak som må gjennomføres innen 48 timer.

---

### Del 5: Refleksjon og dokumentasjon

16. Skriv en **kort risikorapport** (1–2 sider) rettet mot Oslofjord Helse sin ledelse. Rapporten skal:
    - Oppsummere hendelsen og konsekvensene
    - Presentere de viktigste funnene fra risikoanalysen
    - Anbefale 3–5 prioriterte tiltak med kortsiktig og langsiktig tidshorisont
    - Forklare hvorfor ledelsen må involveres i risikoaksept

17. **Reflekter** — velg 3–4 av følgende spørsmål og svar grundig:
    - Hva kunne Oslofjord Helse ha gjort annerledes for å **forebygge** phishing-angrepet?
    - Hvordan påvirker pasientjournalsystemets sårbarhet **personvernet** til 30 000 pasienter?
    - Hvilke samfunnsmessige konsekvenser har det når helsedata lekkes? Hvorfor er helsesektoren et spesielt attraktivt mål for angripere?
    - Hvis du var IT-sjef — hva ville du prioritert først: tekniske tiltak eller opplæring av ansatte? Begrunn.
    - Hvordan kan Zero Trust-arkitektur (aldri stol — alltid verifiser) forhindre en lignende hendelse i fremtiden?
    - Hva har du lært om sammenhengen mellom risikoanalyse, personvern og sikker arkitektur?

---

## Vurderingskriterier

### For å oppnå **lav måloppnåelse** må du:
- Gjennomføre en enkel risikoanalyse med minst 3 scenarioer (sannsynlighet, konsekvens, risikoverdi)
- Foreslå minst 2 konkrete sikkerhetstiltak
- Forklare hovedtrekkene i GDPR-regelverket med enkel fagterminologi

### For å oppnå **middels måloppnåelse** må du:
- Gjennomføre en fullstendig risikovurdering for Oslofjord Helse med alle 4 steg (verdier, trusler, sårbarheter, risikomatrise, tiltak)
- Inkludere vurdering av personvernbrudd og varslingsplikt
- Foreslå en helhetlig handlingsplan med både tekniske og organisatoriske tiltak
- Bruke presis fagterminologi (risiko, sårbarhet, trussel, konsekvens, sannsynlighet, restrisiko, GDPR, DPIA, Privacy by Design)

### For å oppnå **høy måloppnåelse** må du:
- Vise helhetlig forståelse gjennom en velfundert risikoanalyse med prioritering av tiltak basert på risikoverdi
- Koble risikovurderingen til konkrete GDPR-krav (artikkelnummer, prinsipper, frister)
- Inkludere refleksjon rundt Zero Trust, nettverkssegmentering og Security by Design
- Reflektere kritisk over samfunnsmessige konsekvenser av svak IT-sikkerhet i helsesektoren
- Lage en incident response-plan som dekker hele hendelsesforløpet
- Vise at du kan anvende kunnskap om trusselbildet, risikoanalyse og personvern i en realistisk, tverrfaglig oppgave

---

## Innlevering

- Risikovurdering (risikomatrise + tabeller) — valgfritt format
- Handlingsplan for sikkerhetstiltak (PDF/Markdown)
- Incident response-plan (PDF/Markdown)
- Risikorapport til ledelsen (PDF/Word/Markdown)
- Refleksjonsnotat

> **Tips:** En god risikoanalyse er verdifull fordi den er strukturert, gjennomtenkt og ærlig om hva man **ikke** vet. Bruk tid på å begrunne valgene dine — «hvorfor» er viktigere enn «hva».

---

## Kilder og ressurser

- [NDLA: Trusler mot datasikkerhet](https://ndla.no/) — Om trusler som phishing, ransomware og DDoS
- [NDLA: Risikovurdering](https://ndla.no/) — Risikoanalyseprosessen
- [NDLA: GDPR og personvern](https://ndla.no/) — Personvernforordningen
- [Driftsstøtte VG2 — fagstoff](https://olewol.github.io/driftsstotte-vg2/) — Komplett fagressurs
- [NDLA: Sikkerhet i IT-løsninger](https://ndla.no/) — Security by Design og innebygd sikkerhet
- [NSM Grunnprinsipper for IKT-sikkerhet](https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/)
- [Datatilsynet — Risikovurdering og personvern](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/vurdere-risiko-og-personvernkonsekvenser/risikovurdering/)
- [Datatilsynet — Varsling av brudd](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/melde-og-varsle-om-brudd/)
- [OWASP Top 10:2021](https://owasp.org/Top10/) — Vanligste sårbarheter i webapplikasjoner
- [Digdir — Nulltillitsarkitektur (Zero Trust)](https://www.digdir.no/nasjonal-arkitektur/nulltillitsarkitektur/4054)
- [GDPR art. 32 — Sikkerhet ved behandling av personopplysninger](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
