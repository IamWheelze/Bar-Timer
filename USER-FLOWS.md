# User Flows & Journey Maps
## German Lawyer Deadline Management System

---

## 🎯 Primary User Flows

### Flow 1: New User Registration → First Deadline

```
START
  │
  ├─→ [Visit Homepage]
  │     │
  │     └─→ [Click "Registrieren"]
  │           │
  │           └─→ [Registration Page]
  │                 │
  │                 ├─→ Fill: Email
  │                 ├─→ Fill: Password
  │                 ├─→ Fill: First/Last Name
  │                 ├─→ Fill: Bar Admission (optional)
  │                 └─→ Select: Bundesland (dropdown)
  │                       │
  │                       └─→ [Click "Registrieren"]
  │                             │
  │                             ├─→ ❌ Error: "Email exists"
  │                             │     └─→ Return to form
  │                             │
  │                             └─→ ✅ Success
  │                                   │
  │                                   └─→ [Auto-login]
  │                                         │
  │                                         └─→ [Redirect to Calculator]
  │                                               │
  │                                               └─→ [Welcome Message]
  │                                                     "Willkommen, Max!"
  │
  └─→ [Calculator Page - Ready to Use]
        │
        ├─→ Enter: Event Date (15.01.2025)
        ├─→ Enter: Duration (1 Monat)
        ├─→ Confirm: Bundesland (pre-filled: BW)
        ├─→ Select: Deadline Type (Ereignisfrist)
        └─→ Select: Procedural Code (ZPO)
              │
              └─→ [Click "Berechnen"]
                    │
                    ├─→ [Loading Animation] (0.5s)
                    │
                    └─→ [Result Displayed]
                          │
                          ├─→ Show: Final deadline date
                          ├─→ Show: Calculation steps
                          ├─→ Show: Applied laws
                          └─→ Show: Warnings (if any)
                                │
                                └─→ [Click "Frist speichern"]
                                      │
                                      └─→ [Modal Opens]
                                            │
                                            ├─→ Fill: Case Name *
                                            ├─→ Fill: Case Number
                                            └─→ Fill: Description
                                                  │
                                                  └─→ [Click "Speichern"]
                                                        │
                                                        ├─→ ✅ Success Toast
                                                        │     "Frist gespeichert"
                                                        │
                                                        └─→ [Redirect to Dashboard]
                                                              │
                                                              └─→ [See Saved Deadline]

END - First deadline created! 🎉
Time: ~3 minutes
```

---

### Flow 2: Returning User - Quick Calculation

```
START
  │
  └─→ [Visit Homepage]
        │
        └─→ [Login Page]
              │
              ├─→ Enter: Email
              └─→ Enter: Password
                    │
                    └─→ [Click "Anmelden"]
                          │
                          ├─→ ❌ Invalid credentials
                          │     └─→ Error message
                          │         └─→ Retry
                          │
                          └─→ ✅ Success
                                │
                                └─→ [Redirect to Calculator]
                                      │
                                      └─→ [Pre-filled: Bundesland]
                                            │
                                            ├─→ Enter: Event Date
                                            ├─→ Enter: Duration
                                            └─→ [Click "Berechnen"]
                                                  │
                                                  └─→ [Result] → [Optional: Save]

END - Fast calculation! ⚡
Time: ~30 seconds
```

---

### Flow 3: Dashboard - Managing Deadlines

```
START: [Dashboard Page]
  │
  ├─→ [View Stats Cards]
  │     ├─→ See: 12 Active
  │     ├─→ See: 2 Overdue (red)
  │     ├─→ See: 3 Today (red)
  │     └─→ See: 7 This Week (yellow)
  │
  ├─→ [View Deadline List]
  │     │
  │     ├─→ Ordered by: Urgency (overdue first)
  │     │
  │     └─→ Visual indicators:
  │           ├─→ 🔴 Red card = Overdue
  │           ├─→ 🔴 Red card = Today
  │           ├─→ 🟡 Yellow = This week
  │           └─→ 🟢 Green = Future
  │
  ├─→ [Filter Deadlines]
  │     │
  │     ├─→ Click: "Aktiv" → Show active only
  │     ├─→ Click: "Überfällig" → Show overdue only
  │     ├─→ Click: "Erledigt" → Show completed only
  │     └─→ Click: "Alle" → Show all
  │
  ├─→ [Search Deadlines]
  │     │
  │     └─→ Type: "Mustermann"
  │           └─→ Filter results live
  │
  ├─→ [Complete a Deadline]
  │     │
  │     └─→ Click: "✓ Erledigen" button
  │           │
  │           ├─→ Confirmation: "Frist als erledigt markieren?"
  │           │     ├─→ "Abbrechen" → Cancel
  │           │     └─→ "Bestätigen" → Continue
  │           │
  │           └─→ ✅ Deadline marked complete
  │                 ├─→ Card turns gray
  │                 ├─→ Checkmark appears
  │                 ├─→ Moves to "Erledigt" filter
  │                 └─→ Stats update
  │
  └─→ [Delete a Deadline]
        │
        └─→ Click: "🗑️ Löschen" button
              │
              ├─→ Confirmation modal:
              │     "Diese Frist wirklich löschen?"
              │     ├─→ "Abbrechen" → Cancel
              │     └─→ "Löschen" → Continue
              │
              └─→ ✅ Deadline deleted
                    ├─→ Fade out animation
                    ├─→ Remove from list
                    └─→ Stats update

END - Deadlines managed!
```

---

### Flow 4: Edge Case - Sunday Extension

```
START: [Calculator Page]
  │
  └─→ User wants to test Sunday extension
        │
        ├─→ Enter: Event Date = 05.01.2025 (Sunday)
        ├─→ Enter: Duration = 2 weeks
        ├─→ Select: Bundesland = BW
        ├─→ Select: Type = Ereignisfrist
        └─→ Select: Code = ZPO
              │
              └─→ [Click "Berechnen"]
                    │
                    └─→ [Calculation Engine]
                          │
                          ├─→ Step 1: § 187 BGB
                          │     └─→ Start = 06.01.2025 (day after)
                          │
                          ├─→ Step 2: § 188 BGB
                          │     └─→ +2 weeks = 19.01.2025
                          │
                          ├─→ Step 3: § 193 BGB Check
                          │     ├─→ Is 19.01.2025 a Sunday? YES ✓
                          │     └─→ Extend to next working day
                          │           └─→ 20.01.2025 (Monday)
                          │
                          └─→ [Display Result]
                                │
                                ├─→ Original End: 19.01.2025 (Sunday)
                                ├─→ Final End: 20.01.2025 (Monday)
                                ├─→ Was Extended: YES
                                │
                                └─→ [Highlighted Info Box]
                                      "⚠️ Frist verlängert nach § 193 BGB
                                       (Sonntag ist kein Werktag)"

END - Sunday extension demonstrated! 📅
```

---

### Flow 5: Critical - Notfrist Warning

```
START: [Calculator Page]
  │
  └─→ User calculates a Notfrist
        │
        ├─→ Enter: Event Date = 15.01.2025
        ├─→ Enter: Duration = 1 month
        ├─→ Select: Bundesland = BW
        ├─→ Select: Type = Notfrist ⚠️  ← Critical!
        └─→ Select: Code = ZPO
              │
              └─→ [Click "Berechnen"]
                    │
                    └─→ [Calculation Complete]
                          │
                          └─→ [Display Result]
                                │
                                ├─→ Final Date: 15.02.2025
                                │
                                └─→ [⚠️ WARNING BOX - Prominent]
                                      ┌─────────────────────────┐
                                      │ 🚨 ACHTUNG: NOTFRIST!   │
                                      │ ═══════════════════════ │
                                      │                         │
                                      │ Dies ist eine Notfrist  │
                                      │ nach der ZPO.           │
                                      │                         │
                                      │ Das Versäumen führt zur │
                                      │ automatischen          │
                                      │ Zurückweisung!          │
                                      │                         │
                                      │ Empfehlung: Vorlauf von │
                                      │ 2-3 Tagen einplanen.    │
                                      └─────────────────────────┘
                                      │
                                      └─→ User sees warning CLEARLY
                                            │
                                            └─→ Can still save with warning

END - User warned about critical deadline! ⚠️
```

---

## 🗺️ User Journey Maps

### Persona: Dr. Maria Schmidt
**Role**: Partner at mid-size law firm
**Goal**: Never miss a deadline, reduce manual calculation errors
**Tech Comfort**: Medium (uses email, Word, basic software)

#### Journey: First Week Using System

**Monday - Discovery**
```
Situation: Received court decision, needs to calculate appeal deadline
Emotion:   😰 Stressed (deadline is critical)
Action:    Colleague recommends Fristenkontrolle
Touchpoint: Registration page
Experience: ✅ Quick signup, pre-fills Bundesland
Result:    ✅ Account created in 2 minutes
Emotion:   😊 Relieved (easy process)
```

**Monday - First Calculation**
```
Situation: Calculates appeal deadline
Emotion:   🤔 Skeptical (will it be accurate?)
Action:    Enters: Event date, 1 month, ZPO, Berufungsfrist
Touchpoint: Calculator page
Experience: ✅ Clear result, shows § 187-193 BGB steps
Result:    ✅ Deadline calculated: 15.02.2025
Emotion:   😌 Confident (shows legal reasoning)
Pain Point: None
```

**Monday - Verification**
```
Situation: Double-checks against manual calculation
Emotion:   🔍 Cautious (verifying accuracy)
Action:    Compares with calendar + BGB
Touchpoint: Result display with steps
Experience: ✅ MATCHES her manual calculation exactly
Result:    ✅ Trust established
Emotion:   😄 Satisfied (system is accurate!)
Key Moment: 🌟 "Wow, this saves me 10 minutes per deadline"
```

**Tuesday - Saves First Deadline**
```
Situation: Another deadline to track
Emotion:   😊 Confident (trusts system now)
Action:    Calculates + saves to dashboard
Touchpoint: Save modal → Dashboard
Experience: ✅ Easy to save, good overview
Result:    ✅ Deadline visible in dashboard
Emotion:   😃 Happy (organized system)
```

**Wednesday - Daily Check**
```
Situation: Morning routine - check deadlines
Emotion:   😌 Calm (proactive management)
Action:    Opens dashboard, reviews this week
Touchpoint: Dashboard with color coding
Experience: ✅ Instantly sees 3 urgent (yellow/red)
Result:    ✅ Addresses urgent items first
Emotion:   😊 In control
```

**Thursday - Holiday Extension Discovery**
```
Situation: Deadline falls on Fronleichnam (Bayern)
Emotion:   🤔 Curious (will it catch this?)
Action:    Calculates deadline landing on 19.06.2025
Touchpoint: Calculator result
Experience: ✅ System extends to 20.06.2025
           ✅ Explains: "Fronleichnam in Bayern"
Result:    ✅ Correctly handles state-specific holiday
Emotion:   🤩 Impressed!
Key Moment: 🌟 "This is better than my old spreadsheet!"
```

**Friday - Recommends to Colleagues**
```
Situation: Weekly team meeting
Emotion:   😄 Enthusiastic
Action:    Shows system to 3 colleagues
Touchpoint: Demo on projector
Experience: ✅ Colleagues impressed
Result:    ✅ 3 new signups
Emotion:   😁 Proud (found useful tool)
```

**Week Summary:**
- ✅ Trust established through accuracy
- ✅ Time saved: ~50 minutes (5 deadlines × 10 min)
- ✅ Zero errors (vs. manual calculation)
- ✅ Became advocate (NPS: 10/10)

---

### Persona: Robert Müller
**Role**: Solo practitioner, small criminal law practice
**Goal**: Quick, mobile-friendly deadline checks
**Tech Comfort**: High (uses apps, cloud tools)

#### Journey: Mobile Usage

**Morning - Court Hearing**
```
Time:      9:00 AM, in courthouse hallway
Device:    iPhone 13
Situation: Judge sets 3-week deadline for submission
Emotion:   ⏱️ Rushed (hearing in 5 minutes)
Action:    Opens Fristenkontrolle on phone
Touchpoint: Mobile calculator
Experience: ✅ Loads fast, big touch targets
Result:    ✅ Calculated in 20 seconds
Emotion:   😊 Satisfied (mobile-optimized)
```

**Afternoon - Office**
```
Time:      2:00 PM, at desk
Device:    Desktop
Situation: Reviews all deadlines
Emotion:   😌 Focused (planning work)
Action:    Opens dashboard
Touchpoint: Desktop dashboard
Experience: ✅ Synced from morning (cloud-based)
Result:    ✅ Sees deadline from morning
Emotion:   😃 Happy (seamless sync)
```

---

## 🔄 Error Recovery Flows

### Error Flow 1: Wrong Date Entry

```
[Calculator]
  │
  └─→ User enters: Event Date = 32.01.2025 (invalid)
        │
        └─→ [Input Validation - Real-time]
              │
              ├─→ Red border on input
              ├─→ Show error: "Ungültiges Datum"
              └─→ Disable "Berechnen" button
                    │
                    └─→ User corrects to: 15.01.2025
                          │
                          └─→ [Validation Success]
                                ├─→ Green border
                                ├─→ Error message removed
                                └─→ Button enabled

Recovery: Immediate, no page reload needed ✅
```

### Error Flow 2: Network Error During Calculation

```
[Calculator]
  │
  └─→ User clicks "Berechnen"
        │
        └─→ [API Call]
              │
              ├─→ ❌ Network timeout (5 seconds)
              │
              └─→ [Error Handler]
                    │
                    ├─→ Toast notification:
                    │     "⚠️ Verbindungsfehler. Bitte erneut versuchen."
                    │
                    ├─→ Button state: Reset (not disabled)
                    │
                    └─→ Retry available:
                          ├─→ Automatic retry? No (user control)
                          └─→ User clicks again → Success

Recovery: Clear error message, easy retry ✅
```

### Error Flow 3: Session Expired

```
[Dashboard - After 30 days]
  │
  └─→ User clicks any action
        │
        └─→ [API Call]
              │
              ├─→ ❌ 401 Unauthorized (JWT expired)
              │
              └─→ [Auth Handler]
                    │
                    ├─→ Clear local storage
                    ├─→ Show modal:
                    │     "Ihre Sitzung ist abgelaufen.
                    │      Bitte melden Sie sich erneut an."
                    │     [Zum Login →]
                    │
                    └─→ Redirect to login page
                          │
                          └─→ [After login]
                                └─→ Redirect back to original page ✅

Recovery: Graceful, preserves user intent ✅
```

---

## 📊 Success Metrics by Flow

### Flow 1: Registration → First Deadline
- **Target Time**: < 5 minutes
- **Success Rate**: > 90%
- **Drop-off Points**:
  - Registration form: < 20%
  - Calculator: < 10%
  - Save modal: < 5%

### Flow 2: Quick Calculation
- **Target Time**: < 1 minute
- **Success Rate**: > 95%
- **Repeat Usage**: > 5 times/week per user

### Flow 3: Dashboard Management
- **Target Time**: < 2 minutes to complete/delete
- **Filter Usage**: > 60% of users
- **Search Usage**: > 40% of power users

---

## 🎯 Optimization Opportunities

1. **Onboarding Tour** (Future)
   - First-time user guide
   - Highlights key features
   - Optional skip

2. **Quick Actions** (Future)
   - "Calculate from last deadline" button
   - Duplicate previous calculation
   - Favorite Bundesland/Code combinations

3. **Keyboard Shortcuts** (Future)
   - Ctrl+N: New calculation
   - Ctrl+S: Save deadline
   - Ctrl+D: Go to dashboard
   - Escape: Close modals

4. **Bulk Operations** (Future)
   - Import deadlines from CSV
   - Export to calendar (iCal)
   - Bulk complete/delete

---

**Total Flows Documented**: 5 main + 3 error recovery
**Average Completion Time**: 1-5 minutes
**User Satisfaction Target**: > 90% (NPS 9-10)
**Status**: ✅ COMPLETE USER FLOW DOCUMENTATION
