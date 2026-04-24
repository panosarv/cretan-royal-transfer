# Polish & i18n Design Spec

**Date:** 2026-04-24  
**Status:** Approved

## Overview

Five targeted changes:
1. Fix homepage horizontal scroll
2. Remove images from "Why Choose Us" section (icons only)
3. Add gold separator between ServicesSection and AboutUsSection
4. Wire AboutUsSection text to i18n (all 4 locales)
5. Add i18n to the entire booking wizard (all 5 step files)

---

## 1. Fix Horizontal Scroll (ServicesSection.vue)

**File:** `src/components/ServicesSection.vue`

Add `overflow-x-hidden` to the carousel wrapper div (`block lg:hidden`):

```html
<div class="bg-brand-stone pb-12 block lg:hidden overflow-x-hidden">
```

This clips the carousel cards at the component boundary so they don't cause page-level horizontal scroll on mobile.

---

## 2. AboutSection — Icons Only (remove images)

**File:** `src/components/AboutSection.vue`

**Remove:**
- The entire left-column image mosaic grid (`<div class="grid grid-cols-2 grid-rows-2 gap-3 h-[420px]">` and its 3 image children)
- The 3 image imports (`reliabilityimg`, `safetyimg`, `airportimg`) from `<script setup>`

**Change layout:**
- The outer grid changes from `grid grid-cols-1 lg:grid-cols-2 gap-16 items-center` to a centered single column
- The features list div gets `max-w-2xl mx-auto` to constrain width and center it

**Result:** 4 icon-feature rows centered on the page, no images. The `bg-brand-charcoal` background and all icon/text styling unchanged.

---

## 3. AboutUsSection — Gold Top Separator

**File:** `src/components/AboutUsSection.vue`

Add `border-t-4 border-brand-gold` to the root div:

```html
<div class="bg-brand-stone py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-brand-gold">
```

This creates a clear visual break between the cream ServicesSection above and the cream AboutUsSection without changing backgrounds.

---

## 4. AboutUsSection — i18n (all 4 locales)

**File:** `src/components/AboutUsSection.vue`  
**File:** `src/i18n.js`

### Component changes
- Add `import { useI18n } from 'vue-i18n'` and `const { t } = useI18n()` to `<script setup>`
- Replace hardcoded "ABOUT US" label with `t('message.about_us_section_label')`
- Replace hardcoded "Cretan Royal Transfer" h2 with `t('message.about_us_section_heading')`
- Replace 3 hardcoded paragraphs with `t('message.about_us_para_1')`, `t('message.about_us_para_2')`, `t('message.about_us_para_3')`
- Replace hardcoded h3 with `t('message.about_us_why_title')`
- Change `bullets` from a plain `const` array to `computed(() => [t('message.about_us_bullet_1'), ... t('message.about_us_bullet_7')])`

### New i18n keys (added to all 4 locales in i18n.js)

| Key | EN | GR |
|---|---|---|
| `about_us_section_label` | ABOUT US | ΣΧΕΤΙΚΑ ΜΑΣ |
| `about_us_section_heading` | Cretan Royal Transfer | Cretan Royal Transfer |
| `about_us_para_1` | Cretan Royal Transfer operates in the field of private tourist transfers in Crete, offering high-level transportation services with consistency, professionalism and respect for every visitor. | Η Cretan Royal Transfer δραστηριοποιείται στον τομέα των ιδιωτικών μεταφορών του τουρισμού στην Κρήτη, προσφέροντας υψηλού επιπέδου υπηρεσίες μετακίνησης, με συνέπεια, επαγγελματισμό και σεβασμό προς κάθε επισκέπτη. |
| `about_us_para_2` | With many years of experience in transfers to and from airports, hotels, villas and tourist destinations, our goal is to ensure every client enjoys a comfortable, safe and pleasant journey from the first to the last moment of their stay on the island. | Με πολυετή εμπειρία στον χώρο των μεταφορών από και προς αεροδρόμια, ξενοδοχεία, βίλες και τουριστικούς προορισμούς, στόχος μας είναι να εξασφαλίζουμε σε κάθε πελάτη ένα άνετο ασφαλές και ευχάριστο ταξίδι από την πρώτη έως την τελευταία στιγμή παραμονής του στο νησί. |
| `about_us_para_3` | We place particular importance on the reliability and quality of our services. All transfers are carried out with modern, clean and fully maintained vehicles, while our drivers are experienced professionals with excellent knowledge of Crete and the needs of the modern traveller. | Δίνουμε ιδιαίτερη σημασία στην αξιοπιστία και την ποιότητα των υπηρεσιών μας. Όλες οι μεταφορές πραγματοποιούνται με σύγχρονα, καθαρά και πλήρως συντηρημένα οχήματα, ενώ οι οδηγοί μας είναι έμπειροι επαγγελματίες με άριστη γνώση της Κρήτης και των αναγκών του σύγχρονου ταξιδιώτη. |
| `about_us_why_title` | Why Choose Cretan Royal Transfer | Γιατί να επιλέξετε την Cretan Royal Transfer |
| `about_us_bullet_1` | Always on time – We monitor your flight and wait for you. | Πάντα στην ώρα μας – Παρακολουθούμε την πτήση σας και περιμένουμε. |
| `about_us_bullet_2` | In case of flight delay, your booking is not lost. | Σε περίπτωση καθυστέρησης πτήσεως, δεν χάνεται την κράτηση. |
| `about_us_bullet_3` | Safe and comfortable transfers with a modern, clean vehicle. | Ασφαλείς και άνετες μετακινήσεις με σύγχρονο καθαρό όχημα. |
| `about_us_bullet_4` | Professional and friendly drivers. | Επαγγελματίες και φιλικοί οδηγοί. |
| `about_us_bullet_5` | Fixed prices – you know exactly what you pay. | Σταθερές τιμές – ξέρετε ακριβώς τι πληρώνετε. |
| `about_us_bullet_6` | Private transfer with no waiting and no other passengers. | Ιδιωτική μεταφορά χωρίς αναμονές και χωρίς άλλους επιβάτες. |
| `about_us_bullet_7` | Available 24 hours. | Διαθέσιμοι 24 ώρες. |

**German (de) translations:**
- `about_us_section_label`: ÜBER UNS
- `about_us_section_heading`: Cretan Royal Transfer
- `about_us_para_1`: Cretan Royal Transfer ist im Bereich privater Touristentransfers auf Kreta tätig und bietet erstklassige Transportdienstleistungen mit Zuverlässigkeit, Professionalität und Respekt gegenüber jedem Gast.
- `about_us_para_2`: Mit langjähriger Erfahrung im Transfer zu und von Flughäfen, Hotels, Villen und touristischen Zielen ist es unser Ziel, jedem Kunden eine komfortable, sichere und angenehme Reise vom ersten bis zum letzten Moment seines Aufenthalts auf der Insel zu gewährleisten.
- `about_us_para_3`: Wir legen besonderen Wert auf die Zuverlässigkeit und Qualität unserer Dienstleistungen. Alle Transfers werden mit modernen, sauberen und vollständig gewarteten Fahrzeugen durchgeführt, während unsere Fahrer erfahrene Fachleute mit ausgezeichneten Kenntnissen Kretas sind.
- `about_us_why_title`: Warum Cretan Royal Transfer wählen
- `about_us_bullet_1`: Immer pünktlich – Wir verfolgen Ihren Flug und warten auf Sie.
- `about_us_bullet_2`: Bei Flugverspätung geht Ihre Buchung nicht verloren.
- `about_us_bullet_3`: Sichere und komfortable Transfers mit einem modernen, sauberen Fahrzeug.
- `about_us_bullet_4`: Professionelle und freundliche Fahrer.
- `about_us_bullet_5`: Festpreise – Sie wissen genau, was Sie zahlen.
- `about_us_bullet_6`: Privater Transfer ohne Wartezeiten und ohne andere Passagiere.
- `about_us_bullet_7`: Rund um die Uhr verfügbar.

**French (fr) translations:**
- `about_us_section_label`: À PROPOS
- `about_us_section_heading`: Cretan Royal Transfer
- `about_us_para_1`: Cretan Royal Transfer opère dans le domaine des transferts touristiques privés en Crète, offrant des services de transport de haute qualité avec cohérence, professionnalisme et respect envers chaque visiteur.
- `about_us_para_2`: Forts de nombreuses années d'expérience dans les transferts vers et depuis les aéroports, hôtels, villas et destinations touristiques, notre objectif est d'assurer à chaque client un voyage confortable, sûr et agréable du premier au dernier moment de son séjour sur l'île.
- `about_us_para_3`: Nous accordons une importance particulière à la fiabilité et à la qualité de nos services. Tous les transferts sont effectués avec des véhicules modernes, propres et entièrement entretenus, tandis que nos chauffeurs sont des professionnels expérimentés avec une excellente connaissance de la Crète.
- `about_us_why_title`: Pourquoi choisir Cretan Royal Transfer
- `about_us_bullet_1`: Toujours à l'heure – Nous suivons votre vol et vous attendons.
- `about_us_bullet_2`: En cas de retard de vol, votre réservation n'est pas perdue.
- `about_us_bullet_3`: Transferts sûrs et confortables avec un véhicule moderne et propre.
- `about_us_bullet_4`: Chauffeurs professionnels et sympathiques.
- `about_us_bullet_5`: Prix fixes – vous savez exactement ce que vous payez.
- `about_us_bullet_6`: Transfert privé sans attente et sans autres passagers.
- `about_us_bullet_7`: Disponible 24 heures sur 24.

---

## 5. Booking Wizard — i18n

**Files modified:** `src/i18n.js`, `src/components/booking/BookingWizard.vue`, `StepType.vue`, `StepRoute.vue`, `StepDetails.vue`, `StepSummary.vue`, `StepUser.vue`

Each step file gets `import { useI18n } from 'vue-i18n'` and `const { t } = useI18n()` added to `<script setup>`.

### New i18n keys

All keys added to **all 4 locales** (en/gr/de/fr) in `i18n.js`.

#### BookingWizard step labels
| Key | EN | GR | DE | FR |
|---|---|---|---|---|
| `wizard_step_type` | Type | Τύπος | Typ | Type |
| `wizard_step_route` | Route | Διαδρομή | Route | Itinéraire |
| `wizard_step_tour` | Tour | Εκδρομή | Tour | Circuit |
| `wizard_step_location` | Location | Τοποθεσία | Standort | Localisation |
| `wizard_step_details` | Details | Λεπτομέρειες | Details | Détails |
| `wizard_step_summary` | Summary | Σύνοψη | Zusammenfassung | Résumé |
| `wizard_step_your_info` | Your Info | Στοιχεία σας | Ihre Daten | Vos infos |

#### StepType
| Key | EN | GR | DE | FR |
|---|---|---|---|---|
| `wizard_type_heading` | What are you booking? | Τι θέλετε να κλείσετε; | Was möchten Sie buchen? | Que souhaitez-vous réserver? |
| `wizard_type_subtitle` | Choose the type of service you need | Επιλέξτε τον τύπο υπηρεσίας που χρειάζεστε | Wählen Sie die Art des benötigten Services | Choisissez le type de service dont vous avez besoin |
| `wizard_type_transfer_label` | Transfer | Μεταφορά | Transfer | Transfert |
| `wizard_type_transfer_desc` | Airport or point-to-point | Αεροδρόμιο ή σημείο προς σημείο | Flughafen oder Punkt-zu-Punkt | Aéroport ou point à point |
| `wizard_type_tour_label` | Tour | Εκδρομή | Tour | Circuit |
| `wizard_type_tour_desc` | Guided day trips across Crete | Καθοδηγούμενες ημερήσιες εκδρομές στην Κρήτη | Geführte Tagesausflüge durch Kreta | Excursions guidées à la journée en Crète |
| `wizard_continue` | Continue | Συνέχεια | Weiter | Continuer |
| `wizard_back` | Back | Πίσω | Zurück | Retour |

#### StepRoute
| Key | EN | GR | DE | FR |
|---|---|---|---|---|
| `wizard_route_transfer_heading` | Where are you going? | Πού πηγαίνετε; | Wohin fahren Sie? | Où allez-vous? |
| `wizard_route_tour_heading` | Choose your tour | Επιλέξτε εκδρομή | Wählen Sie Ihre Tour | Choisissez votre circuit |
| `wizard_route_transfer_subtitle` | Select your pickup and drop-off locations | Επιλέξτε σημεία παραλαβής και παράδοσης | Wählen Sie Ihre Abholung und Ihr Ziel | Sélectionnez vos lieux de prise en charge et de dépose |
| `wizard_route_tour_subtitle` | Pick a tour or describe your own | Επιλέξτε εκδρομή ή περιγράψτε τη δική σας | Wählen Sie eine Tour oder beschreiben Sie Ihre eigene | Choisissez un circuit ou décrivez le vôtre |
| `wizard_route_pickup_label` | Pickup Location | Σημείο παραλαβής | Abholort | Lieu de prise en charge |
| `wizard_route_pickup_placeholder` | Select pickup location | Επιλέξτε σημείο παραλαβής | Abholort auswählen | Sélectionnez un lieu de prise en charge |
| `wizard_route_dropoff_label` | Drop-off Location | Σημείο παράδοσης | Zielort | Lieu de dépose |
| `wizard_route_dropoff_placeholder` | Select drop-off location | Επιλέξτε σημείο παράδοσης | Zielort auswählen | Sélectionnez un lieu de dépose |
| `wizard_route_precise_pickup` | Precise Pickup Address (optional) | Ακριβής διεύθυνση παραλαβής (προαιρετικό) | Genaue Abholadresse (optional) | Adresse exacte de prise en charge (optionnel) |
| `wizard_route_precise_dropoff` | Precise Dropoff Address (optional) | Ακριβής διεύθυνση παράδοσης (προαιρετικό) | Genaue Zieladresse (optional) | Adresse exacte de dépose (optionnel) |
| `wizard_route_select_tour` | Select a Tour | Επιλέξτε εκδρομή | Tour auswählen | Sélectionnez un circuit |
| `wizard_route_choose_tour` | Choose a tour... | Επιλέξτε εκδρομή... | Tour wählen... | Choisissez un circuit... |
| `wizard_route_custom_tour_label` | Or describe your custom tour (optional) | Ή περιγράψτε τη δική σας εκδρομή (προαιρετικό) | Oder beschreiben Sie Ihre individuelle Tour (optional) | Ou décrivez votre circuit personnalisé (optionnel) |
| `wizard_route_custom_tour_placeholder` | Tell us where you'd like to go... | Πείτε μας πού θέλετε να πάτε... | Sagen Sie uns, wohin Sie möchten... | Dites-nous où vous aimeriez aller... |

#### StepDetails
| Key | EN | GR | DE | FR |
|---|---|---|---|---|
| `wizard_details_heading` | Trip Details | Λεπτομέρειες ταξιδιού | Reisedetails | Détails du trajet |
| `wizard_details_subtitle` | Tell us about your group and when you need us | Πείτε μας για την ομάδα σας και πότε χρειάζεστε | Erzählen Sie uns von Ihrer Gruppe und wann Sie uns brauchen | Parlez-nous de votre groupe et de quand vous avez besoin de nous |
| `wizard_details_date` | Date | Ημερομηνία | Datum | Date |
| `wizard_details_time` | Time | Ώρα | Uhrzeit | Heure |
| `wizard_details_passengers` | Passengers | Επιβάτες | Passagiere | Passagers |
| `wizard_details_passport_label` | Passenger {n} — Passport / ID number | Επιβάτης {n} — Αριθμός διαβατηρίου / ΑΔΤ | Passagier {n} — Reisepass- / Ausweisnummer | Passager {n} — Numéro de passeport / pièce d'identité |
| `wizard_details_passport_optional` | (optional) | (προαιρετικό) | (optional) | (optionnel) |
| `wizard_details_passport_placeholder` | e.g. AB123456 | π.χ. AB123456 | z.B. AB123456 | ex. AB123456 |
| `wizard_details_luggage` | Luggage bags | Αποσκευές | Gepäckstücke | Bagages |
| `wizard_details_baby_seats` | Baby seats | Καθίσματα μωρού | Babyschalen | Sièges bébé |
| `wizard_details_booster_seats` | Booster seats | Προσαρμοστές καθίσματος | Sitzerhöhungen | Rehausseurs |

#### StepSummary
| Key | EN | GR | DE | FR |
|---|---|---|---|---|
| `wizard_summary_heading` | Review Your Booking | Ελέγξτε την κράτησή σας | Buchung überprüfen | Vérifiez votre réservation |
| `wizard_summary_subtitle` | Check the details below before submitting | Ελέγξτε τις παρακάτω λεπτομέρειες πριν υποβάλετε | Überprüfen Sie die Details unten vor dem Absenden | Vérifiez les détails ci-dessous avant de soumettre |
| `wizard_summary_service_type` | Service Type | Τύπος υπηρεσίας | Serviceart | Type de service |
| `wizard_summary_route` | Route | Διαδρομή | Route | Itinéraire |
| `wizard_summary_tour` | Tour | Εκδρομή | Tour | Circuit |
| `wizard_summary_datetime` | Date & Time | Ημερομηνία & Ώρα | Datum & Uhrzeit | Date et heure |
| `wizard_summary_group` | Group | Ομάδα | Gruppe | Groupe |
| `wizard_summary_passengers` | Passengers | Επιβάτες | Passagiere | Passagers |
| `wizard_summary_luggage` | Luggage | Αποσκευές | Gepäck | Bagages |
| `wizard_summary_baby_seats` | Baby seats | Καθίσματα μωρού | Babyschalen | Sièges bébé |
| `wizard_summary_booster_seats` | Booster seats | Προσαρμοστές | Sitzerhöhungen | Rehausseurs |
| `wizard_summary_price` | Estimated Price | Εκτιμώμενη τιμή | Geschätzter Preis | Prix estimé |
| `wizard_summary_price_tbc` | Price will be confirmed — we will contact you shortly. | Η τιμή θα επιβεβαιωθεί — θα επικοινωνήσουμε μαζί σας σύντομα. | Der Preis wird bestätigt — wir werden uns bald bei Ihnen melden. | Le prix sera confirmé — nous vous contacterons prochainement. |

#### StepUser
| Key | EN | GR | DE | FR |
|---|---|---|---|---|
| `wizard_user_heading` | Your Details | Τα στοιχεία σας | Ihre Angaben | Vos coordonnées |
| `wizard_user_subtitle` | Almost there — we just need your contact information | Σχεδόν έτοιμο — χρειαζόμαστε μόνο τα στοιχεία επικοινωνίας σας | Fast fertig — wir benötigen nur Ihre Kontaktdaten | Presque terminé — nous avons juste besoin de vos coordonnées |
| `wizard_user_first_name` | First Name | Όνομα | Vorname | Prénom |
| `wizard_user_last_name` | Last Name | Επώνυμο | Nachname | Nom de famille |
| `wizard_user_email` | Email | Email | E-Mail | Email |
| `wizard_user_phone` | Phone | Τηλέφωνο | Telefon | Téléphone |
| `wizard_user_additional_info` | Additional Information | Πρόσθετες πληροφορίες | Zusätzliche Informationen | Informations supplémentaires |
| `wizard_user_additional_placeholder` | Flight number, special requests, accessibility needs... | Αριθμός πτήσης, ειδικά αιτήματα, ανάγκες προσβασιμότητας... | Flugnummer, besondere Wünsche, Barrierefreiheitsbedürfnisse... | Numéro de vol, demandes spéciales, besoins d'accessibilité... |
| `wizard_user_submit` | Submit Booking | Υποβολή κράτησης | Buchung absenden | Soumettre la réservation |

Note: `wizard_continue` and `wizard_back` are shared keys used across all step files.

---

## Files Affected

| File | Change |
|---|---|
| `src/components/ServicesSection.vue` | Add `overflow-x-hidden` to carousel wrapper |
| `src/components/AboutSection.vue` | Remove image mosaic, center icons-only layout |
| `src/components/AboutUsSection.vue` | Add gold top border; wire all text to i18n |
| `src/i18n.js` | Add ~60 new keys across all 4 locales |
| `src/components/booking/BookingWizard.vue` | Use i18n keys for step labels |
| `src/components/booking/StepType.vue` | Wire all strings to i18n |
| `src/components/booking/StepRoute.vue` | Wire all strings to i18n |
| `src/components/booking/StepDetails.vue` | Wire all strings to i18n |
| `src/components/booking/StepSummary.vue` | Wire all strings to i18n |
| `src/components/booking/StepUser.vue` | Wire all strings to i18n |

## Files NOT affected
- `src/pages/Home.vue`
- `src/pages/ToursAirports.vue`
- `src/components/HeroBanner.vue`
- `src/components/MeetTheTeam.vue`
- `src/components/Navbar.vue`
- `src/components/ContactSection.vue`
- `src/components/booking/LocationPicker.vue`
- `src/components/booking/StepMap.vue`
- `src/components/booking/WizardProgress.vue`
