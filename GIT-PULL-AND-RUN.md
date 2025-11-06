# 🔄 Git Pull and Run - Simple Guide

**Pull the latest code from Git and run it on your Windows machine**

---

## ✅ Simple 4-Step Process

### **Step 1: Pull from Git** 📥
### **Step 2: Check What You Got** 📂
### **Step 3: Start Docker** 🐳
### **Step 4: Run the App** 🚀

---

## 📥 Step 1: Pull from Git

### **If you already have the folder:**

```cmd
# Open Command Prompt or PowerShell
cd C:\Users\YourName\Documents\Bar-Timer

# Pull latest changes
git pull origin claude/german-lawyer-deadline-system-spec-011CUpsDCtuJBBWTXpJPH9Cm
```

### **If you DON'T have it yet:**

```cmd
# Go to your Documents folder
cd C:\Users\YourName\Documents

# Clone the repository
git clone [your-repository-url] Bar-Timer

# Go into the folder
cd Bar-Timer

# You're ready!
```

---

## 📂 Step 2: Check What You Got

```cmd
# List all files
dir

# You should see:
# - README.md
# - docker-compose.yml
# - backend/
# - frontend/
# - UI-UX-DESIGN.md
# - ... (14 total .md files)
```

**Verify you have everything:**
```cmd
# Count .md files (should be 14)
dir *.md

# Check folders exist
dir backend
dir frontend
```

---

## 🐳 Step 3: Start Docker

### **Option A: Docker Desktop (Easiest)**

1. Click Start Menu
2. Search for "Docker Desktop"
3. Click to open
4. Wait for "Docker is running" (green dot)
5. Done! ✅

### **Option B: Check if Docker is running**

```cmd
# Check Docker status
docker --version

# Should show: Docker version 20.x.x or higher

# Test Docker is working
docker ps

# Should show empty list (or running containers)
```

---

## 🚀 Step 4: Run the App

### **Quick Start (One Command):**

```cmd
# In Bar-Timer folder
docker-compose up
```

**Wait for this message:**
```
webpack compiled successfully
Database connected successfully
```

**Then open browser:**
```
http://localhost:3000
```

**That's it!** 🎉

---

## 📋 Complete Command List

```cmd
# 1. Navigate to project
cd C:\Users\YourName\Documents\Bar-Timer

# 2. Pull latest code
git pull

# 3. Start Docker (if not running)
# → Click Docker Desktop icon

# 4. Run the application
docker-compose up

# 5. Open browser
# → http://localhost:3000
```

---

## 🎯 What Happens When You Run

```
docker-compose up
  ↓
Downloads/Builds 3 containers:
  1. PostgreSQL database
  2. Node.js backend
  3. React frontend
  ↓
Starts all services
  ↓
Backend: http://localhost:3001
Frontend: http://localhost:3000
  ↓
READY! 🎉
```

**Time:** 2-3 minutes first time, 30 seconds after that

---

## 🔍 Verify It's Working

### **Check 1: Containers Running**
```cmd
# In new Command Prompt window
docker ps

# Should show 3 containers:
# - bar-timer-postgres-1
# - bar-timer-backend-1
# - bar-timer-frontend-1
```

### **Check 2: Backend Health**
```cmd
# Test the API
curl http://localhost:3001/health

# Should return: {"status":"healthy"}
```

### **Check 3: Frontend Loading**
Open browser: http://localhost:3000
- ✅ Should see login page
- ✅ Blue "Sign in" button
- ✅ "Register here" link

---

## 🎨 Now Check the UI!

### **Test the Full Flow:**

```
1. Register Account
   ├→ Click "Register here"
   ├→ Fill in: Email, Password, Name, Bundesland
   └→ Click "Register"

2. Calculate Deadline
   ├→ Event Date: Today's date
   ├→ Duration: 1 month
   ├→ Bundesland: BW
   └→ Click "Calculate"

3. Save Deadline
   ├→ Click "Save This Deadline"
   ├→ Case Name: "Test Case"
   └→ Click "Save"

4. View Dashboard
   ├→ Click "Dashboard"
   ├→ See your saved deadline
   └→ CHECK THE COLOR! 🎨

5. Test Urgency Colors
   Create deadlines with different dates:
   ├→ Yesterday = 🔴 RED (overdue)
   ├→ Today = 🔴 RED (urgent)
   ├→ In 3 days = 🟡 YELLOW (soon)
   └→ In 20 days = 🟢 GREEN (safe)
```

---

## 🛑 How to Stop

```cmd
# In the terminal where docker-compose is running:
Ctrl + C

# Or in new terminal:
cd C:\Users\YourName\Documents\Bar-Timer
docker-compose down
```

---

## 🔄 How to Restart

```cmd
# Simple restart
docker-compose restart

# Stop and start fresh
docker-compose down
docker-compose up

# Rebuild everything (if you changed code)
docker-compose down
docker-compose up --build
```

---

## 📦 What Got Pulled from Git

When you `git pull`, you get:

```
✅ All 14 documentation files:
   - README.md
   - UI-UX-DESIGN.md
   - UI-IMPLEMENTATION-STATUS.md
   - DOCUMENTATION-INDEX.md
   - WINDOWS-SETUP.md
   - SIMPLE-CHECKLIST.md
   - DEPLOY.md
   - TESTING.md
   - TROUBLESHOOTING.md
   - USER-FLOWS.md
   - VERIFICATION.md
   - QUICKSTART.md
   - GIT-PULL-AND-RUN.md (this file!)
   - REMOTE-UI-DEMO.md

✅ All code:
   - backend/ (18 files, Node.js/TypeScript)
   - frontend/ (12 files, React/TypeScript)

✅ Configuration:
   - docker-compose.yml
   - .env.example
   - start.sh
   - verify.sh

✅ Tests:
   - 45 automated tests (100% passing)
```

---

## 🆘 Common Issues

### **"git pull" fails**

```cmd
# Make sure you're on the right branch
git status

# Should show: On branch claude/german-lawyer-deadline-system-spec-011CUpsDCtuJBBWTXpJPH9Cm

# If not, checkout the branch:
git checkout claude/german-lawyer-deadline-system-spec-011CUpsDCtuJBBWTXpJPH9Cm

# Then pull:
git pull
```

### **"docker-compose not found"**

```cmd
# Try with space instead of hyphen
docker compose up

# Or install Docker Desktop from:
# https://www.docker.com/products/docker-desktop
```

### **"Port 3000 already in use"**

```cmd
# Find what's using it
netstat -ano | findstr :3000

# Kill it
taskkill /PID [number] /F

# Then try again
docker-compose up
```

### **"Can't access localhost:3000"**

- ✅ Wait 2 minutes for containers to fully start
- ✅ Check Docker Desktop shows all containers running
- ✅ Try refreshing browser
- ✅ Try http://127.0.0.1:3000 instead

---

## ✅ Success Checklist

- [ ] Git pulled successfully
- [ ] See all files (dir shows 14 .md files)
- [ ] Docker Desktop running
- [ ] `docker-compose up` completed
- [ ] Can access http://localhost:3000
- [ ] Can register account
- [ ] Can calculate deadline
- [ ] Can see dashboard
- [ ] **Can see urgency colors!** 🎨

**All checked? You're running!** 🎉

---

## 📖 Read the Documentation

Now that you have everything, read these files:

```cmd
# Open in Notepad
notepad UI-UX-DESIGN.md

# Or VS Code (better)
code UI-UX-DESIGN.md

# Or drag to browser
# (works in Chrome/Edge)
```

**Essential files to read:**
1. README.md - Overview
2. UI-UX-DESIGN.md - Design system
3. UI-IMPLEMENTATION-STATUS.md - What's implemented
4. SIMPLE-CHECKLIST.md - Test checklist

---

## 🎯 Quick Reference

```
PULL:  git pull
START: docker-compose up
OPEN:  http://localhost:3000
STOP:  Ctrl+C or docker-compose down
```

**4 commands to see your UI!** ⚡

---

## 🌟 The Best Part

Once you see the dashboard with deadline cards in **different colors** (red/yellow/green) based on urgency - that's when you'll see the magic!

**The color-coded urgency system is the killer feature!** 🎨

---

**Ready?**
```cmd
cd Bar-Timer
git pull
docker-compose up
```

**Then open:** http://localhost:3000

**Enjoy!** 🚀
