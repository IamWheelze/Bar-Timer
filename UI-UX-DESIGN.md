# UI/UX Design System
## German Lawyer Deadline Management System (Fristenkontrolle)

**Design Philosophy**: Professional, trustworthy, precise, and accessible. Reflects the precision and reliability expected in the German legal profession.

---

## 🎨 Design System

### Color Palette

#### Primary Colors
```
Primary (Justice Blue):     #1E40AF  ███████  - Trust, professionalism
Primary Light:              #3B82F6  ███████  - Interactive elements
Primary Dark:               #1E3A8A  ███████  - Headers, emphasis

Secondary (Legal Gray):     #64748B  ███████  - Body text
Secondary Light:            #94A3B8  ███████  - Borders, dividers
Secondary Dark:             #334155  ███████  - Dark text
```

#### Semantic Colors
```
Success (Safe Green):       #10B981  ███████  - Completed, safe deadlines
Warning (Attention Yellow): #F59E0B  ███████  - Upcoming deadlines (1-7 days)
Danger (Urgent Red):        #EF4444  ███████  - Overdue, critical deadlines
Info (Neutral Blue):        #06B6D4  ███████  - Information, help text

Background:                 #FFFFFF  ███████  - Main background
Background Alt:             #F8FAFC  ███████  - Cards, sections
Background Dark:            #0F172A  ███████  - Dark mode (optional)
```

#### Status Colors (Deadline Urgency)
```
Overdue:                    #DC2626  ███████  - Red (past due)
Today:                      #EF4444  ███████  - Bright red (due today)
Tomorrow:                   #F97316  ███████  - Orange (due tomorrow)
This Week:                  #F59E0B  ███████  - Amber (1-7 days)
Future:                     #10B981  ███████  - Green (8+ days)
Completed:                  #6B7280  ███████  - Gray (done)
```

### Typography

#### Font Stack
```css
/* Primary Font: Clean, professional sans-serif */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Monospace (for dates, numbers, legal references) */
font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code',
             'Courier New', monospace;
```

#### Type Scale
```
Heading 1 (Page Titles):        36px / 2.25rem  - font-weight: 700
Heading 2 (Section Headers):    30px / 1.875rem - font-weight: 600
Heading 3 (Card Titles):        24px / 1.5rem   - font-weight: 600
Heading 4 (Subsections):        20px / 1.25rem  - font-weight: 600

Body Large:                     18px / 1.125rem - font-weight: 400
Body (Default):                 16px / 1rem     - font-weight: 400
Body Small:                     14px / 0.875rem - font-weight: 400
Caption:                        12px / 0.75rem  - font-weight: 400

Button Text:                    16px / 1rem     - font-weight: 600
Label Text:                     14px / 0.875rem - font-weight: 500
```

#### Line Height
```
Tight (Headers):    1.2
Normal (Body):      1.5
Relaxed (Large):    1.75
```

### Spacing System

```
xs:   4px   - 0.25rem  - Tight spacing, icon padding
sm:   8px   - 0.5rem   - Small gaps, input padding
md:   16px  - 1rem     - Default spacing
lg:   24px  - 1.5rem   - Section spacing
xl:   32px  - 2rem     - Large gaps
2xl:  48px  - 3rem     - Page section spacing
3xl:  64px  - 4rem     - Hero sections
```

### Border Radius
```
sm:   4px   - Small elements (badges, tags)
md:   8px   - Cards, inputs, buttons
lg:   12px  - Large cards
xl:   16px  - Modal dialogs
full: 9999px - Pills, avatar
```

### Shadows
```
sm:   0 1px 2px rgba(0,0,0,0.05)              - Subtle lift
md:   0 4px 6px rgba(0,0,0,0.1)               - Cards
lg:   0 10px 15px rgba(0,0,0,0.1)             - Elevated cards
xl:   0 20px 25px rgba(0,0,0,0.1)             - Modals
```

---

## 📱 Page Designs & Layouts

### 1. Login Page

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                    [Centered on viewport]                      │
│                                                                │
│         ┌──────────────────────────────────┐                  │
│         │                                  │                  │
│         │    ⚖️  FRISTENKONTROLLE         │                  │
│         │    German Lawyer Deadline Mgmt   │                  │
│         │                                  │                  │
│         ├──────────────────────────────────┤                  │
│         │                                  │                  │
│         │  👤 Email                        │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │ Email eingeben...        │   │                  │
│         │  └──────────────────────────┘   │                  │
│         │                                  │                  │
│         │  🔒 Passwort                     │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │ ••••••••••               │   │                  │
│         │  └──────────────────────────┘   │                  │
│         │                                  │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │     Anmelden             │   │  <- Primary btn  │
│         │  └──────────────────────────┘   │                  │
│         │                                  │                  │
│         │  ───────── oder ─────────       │                  │
│         │                                  │                  │
│         │  Noch kein Konto?               │                  │
│         │  → Jetzt registrieren           │  <- Link         │
│         │                                  │                  │
│         └──────────────────────────────────┘                  │
│                                                                │
│              © 2025 Fristenkontrolle                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Card Width**: 400px max-width, centered
- **Background**: Gradient from #F8FAFC to #E2E8F0
- **Card**: White background, shadow-lg, rounded-xl
- **Logo**: 48px, centered, Justice Blue
- **Inputs**:
  - Height: 48px
  - Border: 1px solid #E2E8F0
  - Focus: 2px solid Primary Blue, shadow
  - Padding: 12px 16px
- **Button**:
  - Full width
  - Height: 48px
  - Background: Primary Blue
  - Hover: Primary Dark
  - Font weight: 600
- **Link**: Primary Blue, underline on hover

---

### 2. Register Page

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│         ┌──────────────────────────────────┐                  │
│         │  ⚖️  Neues Konto erstellen      │                  │
│         ├──────────────────────────────────┤                  │
│         │                                  │                  │
│         │  Persönliche Daten              │  <- Section      │
│         │  ─────────────────────          │                  │
│         │                                  │                  │
│         │  Vorname                         │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │ z.B. Max                 │   │                  │
│         │  └──────────────────────────┘   │                  │
│         │                                  │                  │
│         │  Nachname                        │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │ z.B. Mustermann          │   │                  │
│         │  └──────────────────────────┘   │                  │
│         │                                  │                  │
│         │  Berufliche Daten               │  <- Section      │
│         │  ─────────────────────          │                  │
│         │                                  │                  │
│         │  Zulassungsnummer (optional)    │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │ z.B. 12345               │   │                  │
│         │  └──────────────────────────┘   │                  │
│         │                                  │                  │
│         │  Bundesland                      │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │ ▼ Baden-Württemberg      │   │  <- Dropdown    │
│         │  └──────────────────────────┘   │                  │
│         │                                  │                  │
│         │  Zugangsdaten                    │  <- Section      │
│         │  ─────────────────────          │                  │
│         │                                  │                  │
│         │  Email                           │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │ max@kanzlei.de           │   │                  │
│         │  └──────────────────────────┘   │                  │
│         │                                  │                  │
│         │  Passwort                        │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │ ••••••••••               │   │                  │
│         │  └──────────────────────────┘   │                  │
│         │  ℹ️  Mindestens 8 Zeichen        │  <- Hint         │
│         │                                  │                  │
│         │  ┌──────────────────────────┐   │                  │
│         │  │  Registrieren            │   │  <- Primary btn  │
│         │  └──────────────────────────┘   │                  │
│         │                                  │                  │
│         │  Bereits registriert?           │                  │
│         │  → Jetzt anmelden               │  <- Link         │
│         │                                  │                  │
│         └──────────────────────────────────┘                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Card Width**: 480px max-width
- **Sections**: Visual separators with lighter text
- **Dropdown (Bundesland)**: All 16 states:
  - BW (Baden-Württemberg)
  - BY (Bayern)
  - BE (Berlin)
  - BB (Brandenburg)
  - HB (Bremen)
  - HH (Hamburg)
  - HE (Hessen)
  - MV (Mecklenburg-Vorpommern)
  - NI (Niedersachsen)
  - NW (Nordrhein-Westfalen)
  - RP (Rheinland-Pfalz)
  - SL (Saarland)
  - SN (Sachsen)
  - ST (Sachsen-Anhalt)
  - SH (Schleswig-Holstein)
  - TH (Thüringen)
- **Validation**: Real-time with icons (✓ green, ✗ red)
- **Hint Text**: 12px, gray, with info icon

---

### 3. Navigation / Header

```
┌────────────────────────────────────────────────────────────────┐
│  ⚖️ Fristenkontrolle    [Rechner] [Dashboard]    [Max M. ▼]   │
│  ─────────────────────────────────────────────────────────────  │
└────────────────────────────────────────────────────────────────┘
```

**Desktop Navigation (Expanded):**
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  ⚖️  Fristenkontrolle                          Max Mustermann│
│                                                         (BW) ▼ │
│  ──────────────────────────────────────────────────────────── │
│                                                                │
│   🧮 Fristenrechner     📋 Dashboard                          │
│   ════════════                                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**User Dropdown Menu:**
```
┌──────────────────────────┐
│  Max Mustermann         │
│  max@kanzlei.de         │
│  ────────────────────   │
│  👤 Profil              │
│  ⚙️  Einstellungen      │
│  📘 Hilfe               │
│  ────────────────────   │
│  🚪 Abmelden            │
└──────────────────────────┘
```

**Specifications:**
- **Height**: 64px fixed
- **Background**: White with bottom shadow
- **Logo**: Left-aligned, 32px icon + text
- **Nav Items**:
  - Horizontal layout
  - Active: Bottom border (3px, Primary Blue)
  - Hover: Background #F8FAFC
  - Padding: 12px 24px
- **User Menu**: Right-aligned
- **Mobile**: Hamburger menu (≡) at 768px breakpoint

---

### 4. Deadline Calculator Page (Main Page)

```
┌────────────────────────────────────────────────────────────────┐
│  [Header Navigation - see above]                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  🧮  Fristenrechner                                      │ │
│  │                                                          │ │
│  │  Berechnen Sie Fristen nach §§ 187-193 BGB              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐│
│  │                     │  │                                  ││
│  │  EINGABE            │  │  ERGEBNIS                        ││
│  │  ═════════          │  │  ════════                        ││
│  │                     │  │                                  ││
│  │  📅 Ereignisdatum   │  │  (Berechnung erscheint hier     ││
│  │  ┌────────────────┐ │  │   nach "Berechnen")             ││
│  │  │ 15.01.2025     │ │  │                                  ││
│  │  └────────────────┘ │  │                                  ││
│  │                     │  │                                  ││
│  │  ⏱️  Fristdauer     │  │                                  ││
│  │  ┌───┐ ┌─────────┐ │  │                                  ││
│  │  │ 1 │ │ Monate▼ │ │  │                                  ││
│  │  └───┘ └─────────┘ │  │                                  ││
│  │                     │  │                                  ││
│  │  📍 Bundesland      │  │                                  ││
│  │  ┌────────────────┐ │  │                                  ││
│  │  │ Baden-Württ.▼  │ │  │                                  ││
│  │  └────────────────┘ │  │                                  ││
│  │                     │  │                                  ││
│  │  ⚖️  Fristtyp       │  │                                  ││
│  │  ┌────────────────┐ │  │                                  ││
│  │  │ Ereignisfrist▼ │ │  │                                  ││
│  │  └────────────────┘ │  │                                  ││
│  │                     │  │                                  ││
│  │  📖 Verfahrensart   │  │                                  ││
│  │  ┌────────────────┐ │  │                                  ││
│  │  │ ZPO          ▼ │ │  │                                  ││
│  │  └────────────────┘ │  │                                  ││
│  │                     │  │                                  ││
│  │  ┌────────────────┐ │  │                                  ││
│  │  │ Berechnen      │ │  │                                  ││
│  │  └────────────────┘ │  │                                  ││
│  │                     │  │                                  ││
│  └─────────────────────┘  └──────────────────────────────────┘│
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**After Calculation - Result Display:**

```
┌──────────────────────────────────────────────────────────────┐
│  ERGEBNIS                                          ✅ Berechnet│
│  ════════                                                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  🎯  FRISTENDE                                       │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │                                                      │   │
│  │        15. Februar 2025                             │   │
│  │        (Samstag)                                    │   │
│  │                                                      │   │
│  │  📌 Keine Verlängerung nach § 193 BGB               │   │
│  │     (Samstag ist ein Werktag)                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  📋 BERECHNUNGSSCHRITTE                                     │
│  ─────────────────────────────────────────────────          │
│                                                              │
│  1️⃣  Ereignis am 15.01.2025                                 │
│                                                              │
│  2️⃣  Gemäß § 187 Abs. 1 BGB:                                │
│     Fristbeginn am 16.01.2025                               │
│     (Tag nach dem Ereignis)                                 │
│                                                              │
│  3️⃣  Gemäß § 188 Abs. 2 BGB:                                │
│     +1 Monat = 15.02.2025                                   │
│     (Entsprechender Tag im Folgemonat)                      │
│                                                              │
│  4️⃣  § 193 BGB Prüfung:                                     │
│     15.02.2025 = Samstag (Werktag)                          │
│     ✅ Keine Verlängerung erforderlich                       │
│                                                              │
│  ⚖️  ANGEWANDTE RECHTSNORMEN                                 │
│  ─────────────────────────────────────────────────          │
│  • § 187 Abs. 1 BGB - Fristbeginn                           │
│  • § 188 Abs. 2 BGB - Fristende bei Monaten                 │
│  • § 193 BGB - Fristende an Samstag/Sonntag/Feiertag       │
│                                                              │
│  ┌────────────────────┐  ┌────────────────────┐            │
│  │ 💾 Frist speichern │  │ 🔄 Neu berechnen   │            │
│  └────────────────────┘  └────────────────────┘            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**With Warning (Notfrist Example):**

```
┌──────────────────────────────────────────────────────────────┐
│  🚨 ACHTUNG: NOTFRIST!                                       │
│  ══════════════════════════════════════════════════════════  │
│                                                              │
│  ⚠️  Dies ist eine Notfrist nach der ZPO.                    │
│  Das Versäumen führt zur automatischen Zurückweisung!       │
│                                                              │
│  Empfehlung: Setzen Sie einen Vorlauf von mindestens       │
│  2-3 Tagen für die Übermittlung ein.                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Layout**: Two-column (400px form, rest for result)
- **Input Card**:
  - White background
  - Shadow-md
  - Padding: 32px
  - Sticky on scroll
- **Date Picker**: Calendar widget, German locale
- **Result Card**:
  - Initially empty/placeholder
  - After calc: Animated slide-in from right
  - Large date display: 32px, bold
  - Steps: Numbered list, 14px
  - Icons: 24px, semantic colors
- **Warning Box**:
  - Yellow background (#FEF3C7)
  - Yellow border (2px)
  - Warning icon (⚠️)
  - Bold text

---

### 5. Dashboard Page

```
┌────────────────────────────────────────────────────────────────┐
│  [Header Navigation]                                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📋  Meine Fristen                                             │
│  ═══════════════════════════════════════════════════════════  │
│                                                                │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐               │
│  │  AKTIV │ │ ÜBER-  │ │ HEUTE  │ │ DIESE  │               │
│  │   12   │ │ FÄLLIG │ │   3    │ │ WOCHE  │               │
│  │        │ │   2    │ │        │ │   7    │               │
│  └────────┘ └────────┘ └────────┘ └────────┘               │
│    Green      Red       Red       Yellow                      │
│                                                                │
│  Filter: [Alle ✓] [Aktiv] [Erledigt] [Überfällig]           │
│         ┌───────────────────────────────┐  🔍               │
│         │ Suche nach Fall/Mandant...    │                    │
│         └───────────────────────────────┘                    │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 🔴 ÜBERFÄLLIG                              Mustermann RA │ │
│  │    Berufungsfrist                           1 O 123/25   │ │
│  │    Frist: 03.11.2025 (vor 3 Tagen)                      │ │
│  │    ZPO • Ereignisfrist • BY                              │ │
│  │    [✓ Erledigen] [🗑️ Löschen] [👁️ Details]              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 🔴 HEUTE                                   Schmidt GmbH  │ │
│  │    Widerspruchsfrist                        VG 45/24    │ │
│  │    Frist: 06.11.2025 (heute!)                           │ │
│  │    VwGO • Notfrist • BW                                  │ │
│  │    ⚠️  NOTFRIST - Keine Verlängerung möglich!            │ │
│  │    [✓ Erledigen] [🗑️ Löschen] [👁️ Details]              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 🟡 IN 3 TAGEN                              Müller KG    │ │
│  │    Klagefrist                               AG 789/25    │ │
│  │    Frist: 09.11.2025 (in 3 Tagen)                       │ │
│  │    ZPO • Gesetzliche Frist • HE                          │ │
│  │    [✓ Erledigen] [🗑️ Löschen] [👁️ Details]              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 🟢 IN 15 TAGEN                             Wagner & Co  │ │
│  │    Revisionsbegründung                      BGH II/234   │ │
│  │    Frist: 21.11.2025 (in 15 Tagen)                      │ │
│  │    ZPO • Richterliche Frist • BE                         │ │
│  │    [✓ Erledigen] [🗑️ Löschen] [👁️ Details]              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌────────────────────────────────────────────────────────  │
│  │  ← Vorherige  |  Seite 1 von 3  |  Nächste →           │
│  └────────────────────────────────────────────────────────  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Deadline Card Specifications:**

**Overdue (Red):**
```
┌──────────────────────────────────────────────────────────────┐
│ Background: #FEE2E2 (light red)                              │
│ Border-Left: 4px solid #DC2626 (red)                         │
│ Icon: 🔴 Red circle                                           │
│ Status: Bold, uppercase, red                                 │
└──────────────────────────────────────────────────────────────┘
```

**Today (Bright Red):**
```
┌──────────────────────────────────────────────────────────────┐
│ Background: #FECACA (lighter red)                            │
│ Border-Left: 4px solid #EF4444 (bright red)                  │
│ Icon: 🔴 Red circle                                           │
│ Pulse animation on status text                               │
└──────────────────────────────────────────────────────────────┘
```

**This Week (Yellow/Amber):**
```
┌──────────────────────────────────────────────────────────────┐
│ Background: #FEF3C7 (light yellow)                           │
│ Border-Left: 4px solid #F59E0B (amber)                       │
│ Icon: 🟡 Yellow circle                                        │
└──────────────────────────────────────────────────────────────┘
```

**Future (Green):**
```
┌──────────────────────────────────────────────────────────────┐
│ Background: #D1FAE5 (light green)                            │
│ Border-Left: 4px solid #10B981 (green)                       │
│ Icon: 🟢 Green circle                                         │
└──────────────────────────────────────────────────────────────┘
```

**Completed (Gray):**
```
┌──────────────────────────────────────────────────────────────┐
│ Background: #F3F4F6 (gray)                                   │
│ Border-Left: 4px solid #9CA3AF (gray)                        │
│ Icon: ✅ Checkmark                                            │
│ Text: Strikethrough, muted                                   │
└──────────────────────────────────────────────────────────────┘
```

---

### 6. Save Deadline Modal

```
┌────────────────────────────────────────────────────────────────┐
│ ███████████████████████████████████████████████████████████  │
│ █                                                           █ │
│ █  ┌────────────────────────────────────────────────┐      █ │
│ █  │  💾  Frist speichern                     [✕]   │      █ │
│ █  ├────────────────────────────────────────────────┤      █ │
│ █  │                                                │      █ │
│ █  │  📊 Berechnete Frist                           │      █ │
│ █  │  ──────────────────────────                   │      █ │
│ █  │  Fristende: 15.02.2025                        │      █ │
│ █  │  (in 70 Tagen)                                 │      █ │
│ █  │                                                │      █ │
│ █  │  📝 Falldaten                                  │      █ │
│ █  │  ──────────────────────────                   │      █ │
│ █  │                                                │      █ │
│ █  │  Fallname *                                    │      █ │
│ █  │  ┌──────────────────────────────────────────┐ │      █ │
│ █  │  │ z.B. Mustermann gegen Müller           │ │      █ │
│ █  │  └──────────────────────────────────────────┘ │      █ │
│ █  │                                                │      █ │
│ █  │  Aktenzeichen                                  │      █ │
│ █  │  ┌──────────────────────────────────────────┐ │      █ │
│ █  │  │ z.B. 1 O 123/25                        │ │      █ │
│ █  │  └──────────────────────────────────────────┘ │      █ │
│ █  │                                                │      █ │
│ █  │  Beschreibung                                  │      █ │
│ █  │  ┌──────────────────────────────────────────┐ │      █ │
│ █  │  │ z.B. Berufungsfrist nach Urteilszustellung│      █ │
│ █  │  │                                          │ │      █ │
│ █  │  │                                          │ │      █ │
│ █  │  └──────────────────────────────────────────┘ │      █ │
│ █  │                                                │      █ │
│ █  │  🔔 Erinnerungen (optional)                   │      █ │
│ █  │  ──────────────────────────                   │      █ │
│ █  │  ☐ 7 Tage vorher                              │      █ │
│ █  │  ☐ 3 Tage vorher                              │      █ │
│ █  │  ☐ 1 Tag vorher                               │      █ │
│ █  │                                                │      █ │
│ █  │  ┌───────────────┐  ┌───────────────┐        │      █ │
│ █  │  │ Abbrechen     │  │ Speichern     │        │      █ │
│ █  │  └───────────────┘  └───────────────┘        │      █ │
│ █  │                                                │      █ │
│ █  └────────────────────────────────────────────────┘      █ │
│ █                                                           █ │
│ ███████████████████████████████████████████████████████████  │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Overlay**: rgba(0,0,0,0.5) - dark semi-transparent
- **Modal Width**: 600px max
- **Animation**: Fade in + scale up (0.95 → 1.0)
- **Close**: ✕ button + click outside + ESC key
- **Buttons**:
  - Cancel: Secondary (gray border)
  - Save: Primary blue
  - Both 48px height

---

## 🎯 Component Library

### Buttons

```
┌─────────────────────┐     Primary (default)
│   Button Text       │     Background: #1E40AF
└─────────────────────┘     Hover: #1E3A8A
                            Color: White

┌─────────────────────┐     Secondary
│   Button Text       │     Background: Transparent
└─────────────────────┘     Border: 2px #64748B
                            Hover: Background #F8FAFC

┌─────────────────────┐     Danger
│   Löschen           │     Background: #EF4444
└─────────────────────┘     Hover: #DC2626

┌─────────────────────┐     Success
│   Gespeichert ✓     │     Background: #10B981
└─────────────────────┘     Hover: #059669

┌───────────────┐           Small
│  Action       │           Height: 36px
└───────────────┘           Padding: 8px 16px

┌─────────────────────┐     Medium (default)
│   Action            │     Height: 48px
└─────────────────────┘     Padding: 12px 24px

┌────────────────────────┐  Large
│    Action              │  Height: 56px
└────────────────────────┘  Padding: 16px 32px
```

### Form Inputs

```
Standard Input:
┌────────────────────────────────┐
│ Placeholder text...            │
└────────────────────────────────┘
  Height: 48px
  Border: 1px #E2E8F0
  Focus: 2px #1E40AF + shadow

With Icon:
┌────────────────────────────────┐
│ 📧  Email eingeben...          │
└────────────────────────────────┘

With Label:
Feldname *
┌────────────────────────────────┐
│ Eingabe...                     │
└────────────────────────────────┘
  * = Required indicator (red)

Error State:
Feldname *
┌────────────────────────────────┐
│ Ungültige Eingabe              │ ← Red border
└────────────────────────────────┘
❌ Bitte korrigieren Sie dieses Feld
  Error text: 12px, red

Success State:
Feldname
┌────────────────────────────────┐
│ Gültige Eingabe                │ ← Green border
└────────────────────────────────┘
✓ Eingabe akzeptiert
  Success text: 12px, green

Disabled:
┌────────────────────────────────┐
│ Deaktiviert                    │
└────────────────────────────────┘
  Background: #F3F4F6
  Cursor: not-allowed
```

### Cards

```
Standard Card:
┌────────────────────────────────┐
│  Card Title                    │
│  ────────────────────────      │
│                                │
│  Content goes here...          │
│                                │
│  [Action Button]               │
└────────────────────────────────┘
  Background: White
  Shadow: md
  Border-radius: 12px
  Padding: 24px

Elevated Card (hover):
┌────────────────────────────────┐
│  Interactive Card              │ ← Shadow grows on hover
│  ────────────────────────      │
│  Clickable content...          │
└────────────────────────────────┘
  Transform: translateY(-2px)
  Shadow: lg
  Cursor: pointer

Info Card:
┌────────────────────────────────┐
│ ℹ️  Information                 │
│  ────────────────────────      │
│  Helpful tip or information... │
└────────────────────────────────┘
  Background: #DBEAFE (blue tint)
  Border-left: 4px #3B82F6

Warning Card:
┌────────────────────────────────┐
│ ⚠️  Warnung                     │
│  ────────────────────────      │
│  Important warning message...  │
└────────────────────────────────┘
  Background: #FEF3C7 (yellow tint)
  Border-left: 4px #F59E0B

Error Card:
┌────────────────────────────────┐
│ ❌ Fehler                       │
│  ────────────────────────      │
│  Error message...              │
└────────────────────────────────┘
  Background: #FEE2E2 (red tint)
  Border-left: 4px #EF4444
```

### Badges & Tags

```
🟢 Aktiv      Green background
🟡 Ausstehend Yellow background
🔴 Überfällig Red background
⚫ Erledigt   Gray background

Size: 24px height
Padding: 4px 12px
Border-radius: 12px (pill)
Font-size: 12px
Font-weight: 600
```

### Loading States

```
Button Loading:
┌─────────────────────┐
│ ⟳ Wird geladen...   │ ← Spinning icon
└─────────────────────┘

Skeleton Card:
┌────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓                    │ ← Animated shimmer
│ ▓▓▓▓▓▓▓                        │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓                 │
└────────────────────────────────┘

Spinner (Center Page):
        ⟳
   Lädt...
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
xs: 0px      /* Mobile portrait */
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet portrait */
lg: 1024px   /* Tablet landscape / Small desktop */
xl: 1280px   /* Desktop */
2xl: 1536px  /* Large desktop */
```

### Mobile Layout (< 768px)

**Navigation:**
```
┌──────────────────────────┐
│ ☰  Fristenkontrolle   [M]│ ← Hamburger + User initial
└──────────────────────────┘

Expanded Menu:
┌──────────────────────────┐
│ ✕  Menü                  │
├──────────────────────────┤
│  🧮  Fristenrechner      │
│  📋  Dashboard           │
│  ──────────────────      │
│  👤  Max Mustermann      │
│  📧  max@kanzlei.de      │
│  ──────────────────      │
│  ⚙️   Einstellungen       │
│  📘  Hilfe               │
│  🚪  Abmelden            │
└──────────────────────────┘
```

**Calculator (Stacked):**
```
┌──────────────────────────┐
│  🧮 Fristenrechner       │
├──────────────────────────┤
│                          │
│  EINGABE                 │
│  [Full width form]       │
│                          │
│  [Berechnen Button]      │
│                          │
├──────────────────────────┤
│                          │
│  ERGEBNIS                │
│  [Full width result]     │
│                          │
└──────────────────────────┘
```

**Dashboard Cards (Full Width):**
```
┌──────────────────────────┐
│ Stats (2x2 Grid)         │
│ ┌──────┐ ┌──────┐       │
│ │ 12   │ │  2   │       │
│ └──────┘ └──────┘       │
│ ┌──────┐ ┌──────┐       │
│ │  3   │ │  7   │       │
│ └──────┘ └──────┘       │
├──────────────────────────┤
│ Deadline Card 1          │
│ (Full width)             │
├──────────────────────────┤
│ Deadline Card 2          │
├──────────────────────────┤
│ ...                      │
└──────────────────────────┘
```

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Normal text: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Icons: Minimum 3:1 ratio

**Keyboard Navigation:**
- All interactive elements: Tab order
- Skip to main content link
- Focus indicators: 2px solid blue outline
- Modal: Trap focus, ESC to close

**Screen Readers:**
- Semantic HTML (header, nav, main, article)
- ARIA labels on icons
- ARIA live regions for dynamic content
- Alt text on all images/icons

**Example ARIA Labels:**
```html
<button aria-label="Frist berechnen">
  Berechnen
</button>

<div role="alert" aria-live="polite">
  Frist wurde gespeichert
</div>

<input
  type="date"
  aria-label="Ereignisdatum auswählen"
  aria-required="true"
/>
```

---

## 🎭 Animations & Transitions

```css
/* Smooth transitions (default) */
transition: all 0.2s ease-in-out;

/* Button hover */
transform: translateY(-1px);
box-shadow: larger;

/* Card hover */
transform: translateY(-2px);
box-shadow: xl;

/* Modal open */
animation: fadeIn 0.2s, scaleUp 0.2s;

/* Toast notifications */
animation: slideInRight 0.3s;

/* Loading spinner */
animation: spin 1s linear infinite;

/* Pulse (urgent items) */
animation: pulse 2s ease-in-out infinite;
```

---

## 🌍 German Localization

### Date Format
```
Short:  15.01.2025
Long:   15. Januar 2025
Full:   Donnerstag, 15. Januar 2025
```

### Number Format
```
Integer:  1.234
Decimal:  1.234,56
```

### Text Labels (All in German)
```
Login:        Anmelden
Register:     Registrieren
Calculate:    Berechnen
Save:         Speichern
Delete:       Löschen
Cancel:       Abbrechen
Back:         Zurück
Next:         Weiter
Submit:       Absenden
Close:        Schließen
```

---

**Total Pages**: 5 main pages + modals
**Total Components**: 20+ reusable components
**Design Files Ready**: All specifications provided
**Status**: ✅ COMPLETE UI/UX SYSTEM

This design system provides everything needed to build a professional, accessible, and user-friendly German lawyer deadline management system! 🎨⚖️
