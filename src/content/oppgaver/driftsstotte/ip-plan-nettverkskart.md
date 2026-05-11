---
title: "IP-plan og nettverkskart for Nordic Cloud Solutions"
fag: driftsstotte
emne: Nettverkssegmentering og dokumentasjon
kompetansemaal:
  - Kompetansemål om nettverkssegmentering
  - Kompetansemål om nettverksprotokoller
  - Kompetansemål om planlegging og dokumentasjon
vanskelighetsgrad: middels
publisert: true
dato: 2026-05-11
tags:
  - ip-plan
  - nettverkskart
  - subnetting
  - vlan
  - topologi
  - case
---

## Case: Nordic Cloud Solutions

Du er ansatt som IT-konsulent i konsulentselskapet **NetConsult AS**. Deres nyeste kunde er **Nordic Cloud Solutions (NCS)** — en mellomstor IT-bedrift med hovedkontor i Oslo. NCS leverer skytjenester og drift til norske bedrifter og har vokst raskt det siste året.

NCS har nettopp flyttet inn i et nytt bygg og trenger et komplett design for IT-infrastrukturen. Bygget har 3 etasjer med totalt 40 ansatte. IT-sjefen hos NCS, Kari Nordmann, har gitt deg i oppdrag å lage en IP-plan og et nettverkskart for det nye kontoret.

> **Din rolle:** Du er NetConsult sin senior nettverkstekniker. Kari forventer en profesjonell og gjennomtenkt løsning som dekker NCS sine behov både nå og i overskuelig fremtid.

---

## Bedriftens behov

### Avdelinger og ansatte

| Avdeling | Antall ansatte | Plassering | Spesielle behov |
|----------|---------------|------------|-----------------|
| Ledelse/administrasjon | 5 | 3. etasje | Skjermet tilgang, sensitive dokumenter |
| Utvikling | 12 | 2. etasje | Egen testlab, trenger tilgang til servere |
| Drift/IT | 6 | 1. etasje | Serverrom, full tilgang til all infrastruktur |
| Salg/marked | 10 | 2. etasje | Mye reising, trenger trådløst og VPN |
| Økonomi/HR | 7 | 3. etasje | Personalsensitive systemer, begrenset tilgang |

### Tekniske krav

- Hver ansatt har en bærbar PC og en fasttelefon (IP-telefon)
- Det er 10 skrivere/tilbehør fordelt på etasjene
- Utviklingsavdelingen har 6 ekstra testservere i eget rack
- Driftsavdelingen har hovedserverrommet med 8 fysiske servere
- Gjeste-WiFi for besøkende og kunder (anslått 20 samtidige)
- Overvåkningskameraer (8 stk) på fellesarealer
- IP-telefoner for alle ansatte (40 stk)
- Nettverksutstyr (svitsjer, aksesspunkter) trenger eget management-nettverk

> **Tips:** Ikke alle enheter skal være på samme VLAN. Tenk på sikkerhet — en gjest på WiFi skal ikke kunne nå økonomisystemene.

---

## Oppgave

### Del 1: Behovsanalyse

Før du begynner å sette opp IP-adresser, må du forstå hva NCS trenger.

1. Lag en oversikt over **alle nettverkssegmentene** du mener er nødvendige. For hvert segment må du begrunne:
   - Hvorfor dette segmentet trengs
   - Hvilke enheter som skal være på segmentet
   - Hvilket VLAN-nummer du foreslår

   > Eksempel på et segment: «Gjest-WiFi — for besøkende som trenger internettilgang, men ikke skal nå interne systemer. Dette segmentet har 20–30 enheter.»

2. For hvert segment, beregn:
   - Hvor mange IP-adresser som trengs (inkl. 20% vekstmargin)
   - Hvilken CIDR-størrelse (/24, /25, /26, osv.) som passer
   - Hvorfor du velger akkurat denne størrelsen

3. Identifiser **sikkerhetshensyn** som påvirker hvordan du segmenterer nettverket:
   - Hvilke segmenter bør ikke kunne kommunisere direkte?
   - Hvor trenger du brannmur-regler mellom segmenter?
   - Hvordan håndterer du tilgang fra gjeste-WiFi til interne systemer?

---

### Del 2: IP-plan

Dere har fått tildelt adresseområdet **10.100.0.0/16** for hele NCS-infrastrukturen i Oslo-kontoret. Du skal fordele dette området til alle nettverkssegmentene dine.

> **Huskeregelen:** Når du beregner subnett, starter du med de største segmentene og jobber deg nedover. Dette kalles VLSM (Variable Length Subnet Mask) og hindrer at du går tom for adresser midt i planleggingen.

4. Lag en komplett IP-plan i tabellform:

   | VLAN-ID | Navn | Subnett (CIDR) | Nettverksadresse | Første host | Siste host | Broadcast | Antall verktbare adresser | Default Gateway |
   |---------|------|----------------|-----------------|-------------|------------|-----------|-------------------------|-----------------|
   | ... | ... | ... | ... | ... | ... | ... | ... | ... |

   > Du bestemmer VLAN-ID-ene selv. Velg tall som gir mening og som gjør det lett å identifisere segmentene.

5. Forklar kort hvordan du har tenkt:
   - Hvorfor starter du med det adresseområdet du valgte?
   - Hvordan har du sikret at det er plass til vekst?
   - Hvilken ruter-adresse (default gateway) har du valgt for hvert segment? Hvorfor?

---

### Del 3: Nettverkskart — fysisk topologi

Nå skal du tegne hvordan det fysiske nettverket ser ut.

6. Tegn et **fysisk nettverkskart** som viser:
   - Alle svitsjer med navn og VLAN-konfigurasjon
   - Rutere (eller layer-3-svitsj) med grensesnitt og IP-adresser
   - Aksesspunkter (WiFi) med plassering i etasjene
   - Serverne i serverrommet (1. etasje)
   - Kabling mellom etasjene (trunk-forbindelser)
   - Internettilkobling (ISP)

   > Du kan tegne for hånd, i draw.io, LucidChart, eller bruke et verktøy som Cisco Packet Tracer. Det viktigste er at det er ryddig og lesbart. Legg ved som bilde/PDF.

7. For hver svitsj, spesifiser:
   - Hvilke porter som er access-porter og hvilket VLAN de tilhører
   - Hvilke porter som er trunk-porter og hvilke VLAN som får gå over dem
   - Hvordan native VLAN er konfigurert

---

### Del 4: Nettverkskart — logisk topologi

Det fysiske kartet viser hvor ting står. Det logiske kartet viser hvordan trafikken flyter.

8. Tegn et **logisk nettverkskart** som viser:
   - VLAN-ene som logiske segmenter
   - Ruting mellom VLAN (inter-VLAN routing)
   - Brannmur-plassering og regler mellom segmenter
   - Tjenestene som kjører i hvert segment (DNS, DHCP, web, filserver, osv.)
   - Hvordan NAT fungerer for gjeste-WiFi og internettilgang

9. Lag en beskrivelse av trafikkflyten:
   - Hvordan når en ansatt i salg et webhotell på internett?
   - Hvordan når en utvikler testserverne i driftsavdelingens segment?
   - Hvordan når en gjest på WiFi internett — men **ikke** interne systemer?

---

### Del 5: Dokumentasjon og refleksjon

10. Skriv en **kort driftsdokumentasjon** (1–2 sider) som:
    - Oppsummerer IP-planen og VLAN-strukturen
    - Forklarer sikkerhetsmodellen (hvorfor segmentene er som de er)
    - Beskriver hvordan endringer skal håndteres (f.eks. en ny avdeling flytter inn)
    - Liste over forutsetninger og antagelser du har gjort

11. **Reflekter** over disse spørsmålene:
    - Hvilke sikkerhetsmessige konsekvenser får det hvis noen kobler seg til en ledig svitsjeport i et åpent møterom?
    - Hvordan påvirker valgene dine personvernet til de ansatte?
    - Hva ville du gjort annerledes hvis NCS hadde 400 ansatte i stedet for 40?
    - Hvordan påvirker denne løsningen IT-sikkerhet og personvern for enkeltmennesker, virksomheten og samfunnet? (kobling til kompetansemål om personvern)
    - Hva har du lært om å planlegge og dokumentere IT-løsninger? (kobling til kompetansemål om planlegging og dokumentasjon)

---

## Vurderingskriterier

### For å oppnå **lav måloppnåelse** må du:
- Lage en IP-plan med korrekt CIDR-notasjon for minst 3 segmenter
- Tegne et enkelt fysisk nettverkskart med navngitte komponenter
- Forklare hovedtrekkene i dine valg med enkel fagterminologi

### For å oppnå **middels måloppnåelse** må du:
- Lage en fullstendig IP-plan med 5+ segmenter som dekker alle avdelingsbehovene
- Tegne både fysisk og logisk nettverkskart med riktig bruk av symboler
- Begrunne dine valg med presis fagterminologi (subnett, CIDR, VLAN, access/trunk)
- Dokumentere løsningen i en strukturert driftsdokumentasjon

### For å oppnå **høy måloppnåelse** må du:
- Vise helhetlig forståelse gjennom gjennomtenkt segmentering med sikkerhetsbegrunnelser
- Inkludere VLSM og begrunne størrelsesvalg for hvert segment
- Beskrive trafikkflyt og brannmurregler mellom segmenter
- Reflektere kritisk over egne valg og konsekvenser for sikkerhet, personvern og bærekraft
- Vise at du kan se løsningen i et større bilde — hva som skjer ved vekst, endringer eller trusler

---

## Innlevering

- IP-plan (tabell i valgfritt format — Excel, regneark, markdown)
- Fysisk nettverkskart (PDF/bilde)
- Logisk nettverkskart (PDF/bilde)
- Driftsdokumentasjon (PDF/Word/Markdown)
- Refleksjonsnotat

> **Tips:** Kvalitet over kvantitet. Et ryddig, godt gjennomtenkt nettverkskart sier mer enn tre halvferdige skisser. Ta dere tid til å gjøre det pent.

## Kilder og ressurser

- [NDLA: IPv4](https://ndla.no/nn/r/driftsstotte-im-itk-vg2/ipv4/987eefec02) — Adresser, subnettmaske, CIDR
- [NDLA: VLAN](https://ndla.no/nb/r/driftsstotte-im-itk-vg2/virtuelt-lokalnettverk-vlan/9d865afa88) — Virtuelle lokalnettverk
- [NDLA: NAT](https://ndla.no/r/driftsstotte-im-itk-vg2/nat/1abb031ac9) — Network Address Translation
- [NDLA: Oppgaver om VLAN](https://ndla.no/nb/subject:26f1cd12-4242-486d-be22-75c3750a52a2/topic:6e8a2eaf-4983-4d42-a9b0-911b5921b44a/resource:393e4355-8d1c-4f17-978d-7763a6d6c2e7) — Eksempeloppgaver
- Driftsstøtte-vault: Segmentering og VLAN — Intern fagartikkel
- Cisco Packet Tracer — Gratis nettverkssimulator
- draw.io — Gratis diagramverktøy
