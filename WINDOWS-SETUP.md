# 🪟 Windows Setup Guide - Simple Steps

**Quick guide to get the German Lawyer Deadline System running on Windows**

---

## ✅ Simple Checklist

### **Step 1: Pull the Project** 📥

**Option A: If you have Git installed**
```cmd
# Open Command Prompt or PowerShell
cd C:\Users\YourName\Documents

# Clone the repository
git clone https://github.com/YourUsername/Bar-Timer.git
cd Bar-Timer

# Pull latest changes
git pull
```

**Option B: Download as ZIP**
1. Go to your GitHub repository
2. Click the green "Code" button
3. Click "Download ZIP"
4. Extract to `C:\Users\YourName\Documents\Bar-Timer`

---

### **Step 2: Install Docker Desktop** 🐳

1. **Download Docker Desktop for Windows**
   - Go to: https://www.docker.com/products/docker-desktop
   - Click "Download for Windows"
   - Run the installer (`Docker Desktop Installer.exe`)

2. **Install**
   - Follow the installation wizard
   - Enable WSL 2 if prompted
   - Restart your computer when done

3. **Start Docker Desktop**
   - Open Docker Desktop from Start Menu
   - Wait for it to say "Docker Desktop is running"
   - You'll see a whale icon in your system tray

---

### **Step 3: Start the System** 🚀

**Option A: Using the script** (Easy!)
```cmd
cd C:\Users\YourName\Documents\Bar-Timer
start.sh
```

**Option B: Manual commands** (If script doesn't work)
```cmd
cd C:\Users\YourName\Documents\Bar-Timer

# Copy environment file
copy .env.example .env

# Start everything with Docker
docker-compose up --build
```

---

### **Step 4: Open in Browser** 🌐

1. Wait for containers to start (about 1-2 minutes)
2. Open your browser
3. Go to: **http://localhost:3000**

**You should see the login page!** 🎉

---

### **Step 5: Test the UI** ✨

**Create a test account:**
1. Click "Register here"
2. Fill in:
   - Email: test@example.com
   - Password: TestPass123
   - First Name: Max
   - Last Name: Mustermann
   - Bundesland: BW (Baden-Württemberg)
3. Click "Sign in"

**Calculate a deadline:**
1. Enter Event Date: Today's date
2. Duration: 1 month
3. Click "Calculate"
4. See the result!
5. Click "Save This Deadline"

**Check the Dashboard:**
1. Click "Dashboard" in nav
2. See your saved deadline
3. **Look at the colors!** 🎨
   - Green = safe (8+ days)
   - Yellow = coming up (1-7 days)
   - Red = urgent (today/overdue)

---

## 📋 What You'll See

### **All Files on Your Computer:**
```
C:\Users\YourName\Documents\Bar-Timer\
│
├── 📄 README.md                    ← Start here
├── 📄 DOCUMENTATION-INDEX.md       ← All docs catalog
├── 📄 UI-UX-DESIGN.md             ← Design system
├── 📄 UI-IMPLEMENTATION-STATUS.md ← What's implemented
│
├── 📄 QUICKSTART.md
├── 📄 DEPLOY.md
├── 📄 TESTING.md
├── 📄 TROUBLESHOOTING.md
├── 📄 USER-FLOWS.md
├── 📄 VERIFICATION.md
│
├── 🔧 start.sh
├── 🔧 verify.sh
├── 🔧 docker-compose.yml
├── 🔧 .env.example
│
├── 📁 backend/                     (Node.js code)
├── 📁 frontend/                    (React code)
└── 📁 .git/                        (Git repository)
```

---

## 🎨 Quick UI Check

**Open these files in Notepad or VS Code:**

### **1. See the Design System:**
```
C:\Users\YourName\Documents\Bar-Timer\UI-UX-DESIGN.md
```
**Shows:** Colors, fonts, page layouts, components

### **2. See What's Implemented:**
```
C:\Users\YourName\Documents\Bar-Timer\UI-IMPLEMENTATION-STATUS.md
```
**Shows:** Design vs. reality comparison (80% match!)

### **3. See All Documentation:**
```
C:\Users\YourName\Documents\Bar-Timer\DOCUMENTATION-INDEX.md
```
**Shows:** Complete list of all 12 docs

---

## 🐳 Docker Commands (Windows)

**In Command Prompt or PowerShell:**

```cmd
# Start everything
docker-compose up

# Start in background
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs

# Restart
docker-compose restart

# Fresh start (deletes data!)
docker-compose down -v
docker-compose up --build
```

---

## 🆘 Troubleshooting Windows

### **"Docker is not running"**
→ Open Docker Desktop from Start Menu
→ Wait for whale icon in system tray

### **"Port already in use"**
```cmd
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with number from above)
taskkill /PID [number] /F
```

### **"start.sh doesn't work"**
→ Use Git Bash instead of Command Prompt
→ Or use manual docker-compose commands

### **"Can't access localhost:3000"**
→ Wait 2 minutes for containers to start
→ Check Docker Desktop shows all containers running
→ Try `docker-compose logs` to see errors

---

## 📊 Simple Summary

**To check your UI/UX on Windows:**

```
☑️ Step 1: Pull project
   → Git clone OR Download ZIP
   → Extract to Documents folder

☑️ Step 2: Install Docker
   → Download from docker.com
   → Install & restart
   → Open Docker Desktop

☑️ Step 3: Start system
   → Open Command Prompt
   → cd Bar-Timer
   → docker-compose up

☑️ Step 4: Open browser
   → Go to http://localhost:3000
   → Register account
   → Test features

☑️ Step 5: Check colors!
   → Create deadlines with different dates
   → See urgency colors: 🔴 🟡 🟢
```

---

## 🎯 TL;DR - Super Simple

**3 Commands to get running:**

```cmd
git clone [your-repo-url]
cd Bar-Timer
docker-compose up
```

**Then open:** http://localhost:3000

**Done!** 🎉

---

## 📱 What to Check in the UI

Once running, check these:

**✅ Login Page**
- Centered layout
- Blue button
- Professional look

**✅ Dashboard**
- Stats cards at top (Active, Overdue, Today, This Week)
- Deadline cards with colors:
  - 🔴 Red = Urgent
  - 🟡 Yellow = Soon
  - 🟢 Green = Safe
- Complete/Delete buttons

**✅ Calculator**
- Date picker
- Duration dropdown
- Calculate button
- Result shows steps

---

## 📁 Files to Read

**In Windows Explorer, open:**

```
1. README.md
   → Overview of whole project

2. UI-UX-DESIGN.md
   → See design colors, layouts, components

3. UI-IMPLEMENTATION-STATUS.md
   → See what's implemented (80% match!)

4. DOCUMENTATION-INDEX.md
   → Master list of all docs
```

**Double-click any .md file** → Opens in Notepad/VS Code/Browser

---

## ⚡ Quick Tips

**Viewing .md files:**
- Notepad: Shows raw markdown
- VS Code: Shows formatted with preview
- Chrome: Drag .md file to browser (with markdown extension)

**Best markdown viewer for Windows:**
1. Install VS Code (free)
2. Right-click .md file → Open with → VS Code
3. Press `Ctrl+Shift+V` for preview

**Or read online:**
- Push to GitHub
- View files in browser (GitHub renders markdown)

---

## 🎉 You're All Set!

**You now have:**
- ✅ All project files on Windows
- ✅ Documentation to read
- ✅ Way to start the system
- ✅ Way to check the UI

**Next:** Start Docker and open http://localhost:3000 to see it running! 🚀

---

**Need help?** Check TROUBLESHOOTING.md for common Windows issues!
