# Google-Ads-Kampagne „Lackiererei" – Setup-Vorlage

Stand: 2026-10-12. Landingpage: `https://www.kd-car.de/lackierung`.
Zweite Kampagne „Fahrzeugverkauf" folgt später (Landingpage `/inventory`).

## 0. Voraussetzungen (vor dem Start erledigen)

1. **Google-Ads-Konto anlegen** unter https://ads.google.com → „Neues Google Ads-Konto",
   mit dem Google-Konto, das auch das Unternehmensprofil verwaltet (ertugrul.kuscu@gmail.com).
   Beim Einrichten „Expertenmodus" wählen, nicht die geführte Smart-Kampagne.
2. **Unternehmensprofil verknüpfen**: Ads → Tools → Datenmanager (bzw. „Verknüpfte Konten")
   → Google Unternehmensprofil → verknüpfen. Nur das Hauptprofil (Fahrzeuglackiererei,
   Mülheimer Str. 33). Vorher prüfen, ob der Merge des Duplikats (Fall 9-6694000041580)
   abgeschlossen ist.
3. Im Unternehmensprofil **Zweitkategorie „Autohändler"** ergänzen (für Kampagne 2).
4. **Conversion-Aktionen anlegen** (Ziele → Conversions → Neue Conversion-Aktion → Website):
   | Name | Kategorie | Typ | Wert | Zählung |
   |---|---|---|---|---|
   | Lead-Formular | Lead senden | Ereignis `generate_lead` oder Tag-Snippet | 30 € | Einmal |
   | Anruf-Klick | Telefon-Leads | Ereignis `phone_call` | 20 € | Einmal |
   | WhatsApp-Klick | Kontakt | Ereignis `whatsapp_click` | 15 € | Einmal |
   Die Konversions-ID (`AW-…`) und ggf. Labels in `.env.local` bzw. Vercel eintragen:
   `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`,
   `NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL`, `NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL`.
   Das Tag wird nur geladen, wenn die ID gesetzt ist, und meldet erst nach
   „Alle akzeptieren" im Cookie-Banner (Consent Mode v2).
5. **Zahlungsmethode** hinterlegen (macht Hasan / der Kontoinhaber).

## 1. Kampagne

| Einstellung | Wert |
|---|---|
| Name | `Lackiererei – Oberhausen Suche` |
| Typ | Suchnetzwerk |
| Ziel | Leads |
| Netzwerke | **nur Google-Suche**, Suchnetzwerk-Partner AUS, Displaynetzwerk AUS |
| Standorte | Umkreis 25 km um „Mülheimer Str. 33, 46045 Oberhausen" |
| Standortoption | „Präsenz: Nutzer, die sich in den Zielregionen befinden" (nicht „Interesse") |
| Sprache | Deutsch |
| Budget | 15 €/Tag zum Start (≈ 450 €/Monat); nach 2 Wochen anhand CPL anpassen |
| Gebotsstrategie | Start: „Klicks maximieren" mit max. CPC-Limit 2,50 €; nach ≥ 15 Conversions auf „Conversions maximieren" umstellen |
| Anzeigenzeitplan | Mo–Fr 7–20 Uhr, Sa 8–16 Uhr (Anrufe nur, wenn jemand abhebt) |
| Assets | Standort-Asset (Unternehmensprofil) **aktivieren** → damit erscheint die Anzeige in Google Maps; Anruf-Asset `0177 3225218`; Sitelinks; Callouts; Snippets |

### Assets (Erweiterungen)

- **Sitelinks**: Smart Repair → `/lackierung#angebot` · Unfallinstandsetzung → `/leistungen/unfallinstandsetzung` · Beulendoktor → `/leistungen/beulendoktor` · Angebot anfordern → `/lackierung#angebot`
- **Callouts**: Kostenloses Angebot · Farbgenau nach Farbcode · 4,9 Sterne bei Google · Mo–Sa geöffnet · Alles aus einer Hand
- **Strukturierte Snippets** (Leistungen): Smart Repair, Teillackierung, Komplettlackierung, Stoßstange, Unfallinstandsetzung, Felgen
- **Anruf-Asset**: +49 177 3225218, Anrufberichte EIN

## 2. Anzeigengruppen & Keywords

Match-Type: `[exakt]`, `"Wortgruppe"`. Keine weitgehend passenden Keywords zum Start.

### AG 1 – Autolackiererei (allgemein, lokal)
```
[autolackiererei oberhausen]
[lackiererei oberhausen]
[autolackierer oberhausen]
[auto lackieren oberhausen]
"autolackiererei mülheim"
"lackiererei mülheim an der ruhr"
"autolackiererei essen"
"lackiererei duisburg"
"lackiererei bottrop"
"autolackiererei in der nähe"
"lackiererei in der nähe"
"auto lackieren lassen"
"auto lackieren kosten"
```

### AG 2 – Smart Repair / Kratzer
```
"smart repair oberhausen"
"smart repair mülheim"
"smart repair essen"
"kratzer auto entfernen lassen"
"lackschaden reparieren"
"kratzer lackieren kosten"
"kratzer im lack entfernen"
```

### AG 3 – Stoßstange / Einzelteile
```
"stoßstange lackieren"
"stoßstange lackieren kosten"
"stoßstange lackieren oberhausen"
"kotflügel lackieren"
"motorhaube lackieren"
"tür lackieren auto"
"spiegel lackieren"
```

### AG 4 – Unfallinstandsetzung
```
"unfallinstandsetzung oberhausen"
"unfallreparatur oberhausen"
"karosseriewerkstatt oberhausen"
"karosserie und lack oberhausen"
"unfallschaden reparieren mülheim"
"karosseriebau essen"
```

### Auszuschließende Keywords (Kampagnenebene)
```
kostenlos, gratis, selber, selbst, anleitung, youtube, spraydose, sprühdose,
folie, folierung, folieren, job, jobs, stellenangebot, ausbildung, gehalt,
lackierpistole, kompressor, kaufen, ebay, amazon, obi, bauhaus, hornbach,
fahrrad, motorrad, möbel, wand, felgen pulverbeschichten, lackstift
```

## 3. Responsive Suchanzeige (pro Anzeigengruppe, Final-URL `https://www.kd-car.de/lackierung`)

**Anzeigentitel** (max. 30 Zeichen, bis zu 15 eintragen; Pin 1 = Standort-Titel):
1. Autolackiererei Oberhausen *(Pin Position 1)*
2. Lackiererei Oberhausen *(Pin Position 1)*
3. Auto lackieren in Oberhausen
4. Kostenloses Angebot anfordern
5. Smart Repair & Lackierung
6. Stoßstange lackieren lassen
7. Fair, sauber, farbgenau
8. Fester Preis vorab
9. 4,9 Sterne bei Google
10. Unfallinstandsetzung inkl.
11. Kratzer schnell beseitigt
12. Jetzt anrufen: 0177 3225218
13. Mülheimer Str. 33, Oberhausen
14. Komplett- & Teillackierung
15. Lackiererei im Ruhrgebiet

**Beschreibungen** (max. 90 Zeichen, 4 eintragen):
1. Kratzer, Stoßstange oder Komplettlackierung – hochwertige Materialien, klarer Preis vorab.
2. Fahrzeuglackiererei in Oberhausen. Kostenloses Angebot per Foto, Termin in wenigen Tagen.
3. Smart Repair, Teil- und Komplettlackierung sowie Unfallinstandsetzung aus einer Hand.
4. Farbgenau nach Farbcode gemischt. Kunden aus Oberhausen, Mülheim, Essen und Duisburg.

**Angezeigter Pfad**: `kd-car.de/Lackiererei/Oberhausen`

AG-spezifische Varianten: In AG 2 Titel 1 → „Smart Repair Oberhausen", in AG 3 → „Stoßstange lackieren Oberhausen" (zu lang → „Stoßstange lackieren"), in AG 4 → „Unfallinstandsetzung OB".

## 4. Nach dem Start

- Woche 1–2: täglich Suchbegriffe-Bericht prüfen, unpassende Begriffe ausschließen.
- Ziel-CPL: unter 25 € pro Anruf/Formular. Liegt der CPC über 3 €, Keywords weiter auf „Oberhausen/Mülheim" eingrenzen.
- Anrufe nur zu Zeiten schalten, in denen abgehoben wird – sonst Budget weg.
- Nach 4 Wochen: Kampagne 2 „Fahrzeugverkauf" (Performance Max mit Standort-Asset + Fahrzeug-Feed aus CARMS) ergänzen.
