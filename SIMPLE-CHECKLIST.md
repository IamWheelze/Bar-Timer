# ✅ Simple Windows Setup Checklist

**Print this and check off as you go!**

---

## 📥 Getting the Files

- [ ] Option 1: `git clone [repo-url]`
- [ ] Option 2: Download ZIP from GitHub
- [ ] Extract to: `C:\Users\YourName\Documents\Bar-Timer`
- [ ] Verify you see: README.md, docker-compose.yml, backend/, frontend/

---

## 🐳 Install Docker

- [ ] Go to: https://www.docker.com/products/docker-desktop
- [ ] Download Docker Desktop for Windows
- [ ] Run installer
- [ ] Restart computer
- [ ] Open Docker Desktop
- [ ] Wait for "Docker is running" status
- [ ] See whale icon in system tray ✓

---

## 🚀 Start the System

- [ ] Open Command Prompt or PowerShell
- [ ] `cd C:\Users\YourName\Documents\Bar-Timer`
- [ ] `copy .env.example .env`
- [ ] `docker-compose up --build`
- [ ] Wait 1-2 minutes for containers to start
- [ ] See: "Compiled successfully!" in logs ✓

---

## 🌐 Open in Browser

- [ ] Open Chrome/Firefox/Edge
- [ ] Go to: http://localhost:3000
- [ ] See login page ✓

---

## 👤 Test Registration

- [ ] Click "Register here"
- [ ] Fill in:
  - [ ] Email: test@example.com
  - [ ] Password: TestPass123
  - [ ] First Name: Max
  - [ ] Last Name: Mustermann
  - [ ] Bundesland: BW (Baden-Württemberg)
- [ ] Click "Registrieren" or "Register"
- [ ] Redirected to calculator ✓

---

## 🧮 Test Calculator

- [ ] Enter Event Date: (today's date)
- [ ] Duration: 1 month
- [ ] Bundesland: BW (pre-filled)
- [ ] Type: Ereignisfrist
- [ ] Code: ZPO
- [ ] Click "Berechnen" or "Calculate"
- [ ] See result with deadline date ✓
- [ ] See calculation steps ✓
- [ ] Click "Frist speichern" or "Save"
- [ ] Fill in case name: "Test Case"
- [ ] Click "Speichern" or "Save"
- [ ] Redirected to dashboard ✓

---

## 📊 Test Dashboard

- [ ] See stats cards at top:
  - [ ] Active Deadlines
  - [ ] Overdue
  - [ ] Due Today
  - [ ] Due This Week
- [ ] See your saved deadline in list ✓
- [ ] Check the color:
  - [ ] 🟢 Green = 8+ days away
  - [ ] 🟡 Yellow = 1-7 days away
  - [ ] 🔴 Red = Today or overdue
- [ ] Try clicking "Complete" ✓
- [ ] See it marked as completed ✓
- [ ] Try "Delete" ✓

---

## 🎨 Check UI/UX Colors

**Create 4 test deadlines:**

- [ ] Deadline 1: Yesterday
  - [ ] Should be RED background (overdue)
  - [ ] Says "OVERDUE" ✓

- [ ] Deadline 2: Today
  - [ ] Should be RED background (urgent)
  - [ ] Says "DUE TODAY" ✓

- [ ] Deadline 3: In 3 days
  - [ ] Should be YELLOW background (soon)
  - [ ] Says "3 days left" ✓

- [ ] Deadline 4: In 20 days
  - [ ] Should be GREEN background (safe)
  - [ ] Says "20 days left" ✓

---

## 📖 Read Documentation

**Open these files on your computer:**

- [ ] README.md - Main overview
- [ ] DOCUMENTATION-INDEX.md - All docs listed
- [ ] UI-UX-DESIGN.md - Design system (colors, fonts, layouts)
- [ ] UI-IMPLEMENTATION-STATUS.md - What's implemented (80%)
- [ ] QUICKSTART.md - 5-minute guide
- [ ] DEPLOY.md - Full deployment + 34 tests
- [ ] TESTING.md - 45 automated tests (100% passing)
- [ ] TROUBLESHOOTING.md - Common issues

---

## ✨ UI Features to Check

- [ ] **Colors match design:**
  - [ ] Primary blue buttons (#1E40AF)
  - [ ] Red urgency (overdue/today)
  - [ ] Yellow urgency (this week)
  - [ ] Green urgency (future)

- [ ] **Responsive:**
  - [ ] Resize browser window
  - [ ] Still looks good at all sizes ✓

- [ ] **Loading states:**
  - [ ] Button shows "Loading..." when clicked
  - [ ] Spinners appear during data fetch ✓

- [ ] **Error handling:**
  - [ ] Try wrong password → see error message
  - [ ] Error shown in red box ✓

---

## 🏆 Bonus Checks

- [ ] Try all 16 Bundesländer in calculator:
  - [ ] BW, BY, BE, BB, HB, HH, HE, MV
  - [ ] NI, NW, RP, SL, SN, ST, SH, TH

- [ ] Try different deadline types:
  - [ ] Ereignisfrist
  - [ ] Notfrist (should show warning!)
  - [ ] Richterliche Frist
  - [ ] Gesetzliche Frist

- [ ] Try different codes:
  - [ ] ZPO, VwGO, StPO, ArbGG
  - [ ] SGG, FGO, FamFG, InsO

---

## 🎯 Success Criteria

**You should see:**

✅ System starts without errors
✅ Login/Register works
✅ Calculator produces results
✅ Deadlines save to dashboard
✅ **Urgency colors work (RED → YELLOW → GREEN)**
✅ Complete/Delete work
✅ All 12 documentation files readable

**If all checked ✅ → System is working perfectly!** 🎉

---

## 🆘 If Something Doesn't Work

**Check:**
- [ ] Docker Desktop is running (whale icon in tray)
- [ ] No errors in terminal/PowerShell
- [ ] Can access http://localhost:3000
- [ ] All containers running: `docker-compose ps`

**Get help:**
- [ ] Read TROUBLESHOOTING.md
- [ ] Check logs: `docker-compose logs`
- [ ] Restart: `docker-compose restart`
- [ ] Fresh start: `docker-compose down -v && docker-compose up`

---

## 📸 What Success Looks Like

**You should be able to:**

1. ✅ Register account (30 seconds)
2. ✅ Calculate deadline (30 seconds)
3. ✅ Save to dashboard (15 seconds)
4. ✅ See color-coded urgency (instantly!)
5. ✅ Complete/delete deadlines (5 seconds)

**Total time:** ~2 minutes to full working system! ⚡

---

## 📊 Scorecard

**Count your checkmarks:**

- **0-10 checks:** Just getting started
- **11-20 checks:** Good progress, keep going!
- **21-30 checks:** Almost there!
- **31-40 checks:** System working well!
- **41+ checks:** Complete success! 🏆

---

## 🎉 Final Check

- [ ] I can access the system
- [ ] I can register and login
- [ ] I can calculate deadlines
- [ ] I can see urgency colors
- [ ] I've read the documentation
- [ ] **I understand the UI/UX!** ✨

**All checked? You're done!** 🚀

---

**Print this page and check boxes with a pen as you go!** 📝
