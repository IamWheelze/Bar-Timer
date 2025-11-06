# Deployment Guide - German Lawyer Deadline Management System

**Complete step-by-step guide to deploy and test the system**

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- **Docker & Docker Compose** installed
- **Git** installed
- **Ports available**: 3001 (backend), 3000 (frontend), 5432 (postgres)

### Step 1: Clone and Navigate
```bash
git clone <your-repo-url>
cd Bar-Timer
```

### Step 2: Configure Environment
```bash
cp .env.example .env
# Edit .env if needed (defaults work for local development)
```

### Step 3: Start Everything
```bash
docker-compose up --build
```

### Step 4: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

**That's it!** The system is now running. Jump to the [Manual Testing Checklist](#manual-testing-checklist) below.

---

## 📋 Detailed Setup Instructions

### Option A: Docker Deployment (Recommended)

#### 1. Install Docker
**macOS:**
```bash
brew install --cask docker
# Or download from https://www.docker.com/products/docker-desktop
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo systemctl start docker
sudo usermod -aG docker $USER
# Log out and back in
```

**Windows:**
Download Docker Desktop from https://www.docker.com/products/docker-desktop

#### 2. Environment Variables
The `.env.example` file contains all necessary variables:

```env
# Database
DATABASE_URL=postgresql://lawyer:lawyerpass@postgres:5432/deadline_system
POSTGRES_USER=lawyer
POSTGRES_PASSWORD=lawyerpass
POSTGRES_DB=deadline_system

# Backend
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=30d
PORT=3001

# Frontend
REACT_APP_API_URL=http://localhost:3001
```

**For production, change:**
- `JWT_SECRET` to a random 64-character string
- `POSTGRES_PASSWORD` to a strong password
- `NODE_ENV` to `production`
- `REACT_APP_API_URL` to your domain

#### 3. Start the System
```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v
```

#### 4. Verify Services
```bash
# Check all containers running
docker-compose ps

# Should show:
# - bar-timer-postgres-1 (healthy)
# - bar-timer-backend-1 (running)
# - bar-timer-frontend-1 (running)

# Test backend health
curl http://localhost:3001/health

# Should return:
# {"status":"healthy","service":"German Lawyer Deadline System"}
```

---

### Option B: Manual Deployment (No Docker)

#### 1. Install Dependencies

**PostgreSQL:**
```bash
# macOS
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt-get install postgresql-15
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

**Node.js:**
```bash
# Install Node.js 18+ and npm
# macOS
brew install node@18

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should be 18+
npm --version   # Should be 8+
```

#### 2. Setup Database
```bash
# Create database and user
psql postgres
```

```sql
CREATE USER lawyer WITH PASSWORD 'lawyerpass';
CREATE DATABASE deadline_system OWNER lawyer;
GRANT ALL PRIVILEGES ON DATABASE deadline_system TO lawyer;
\q
```

#### 3. Initialize Database Schema
```bash
# Run schema
psql -U lawyer -d deadline_system -f backend/src/db/schema.sql

# Verify tables created
psql -U lawyer -d deadline_system -c "\dt"
```

#### 4. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://lawyer:lawyerpass@localhost:5432/deadline_system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=30d
PORT=3001
NODE_ENV=development
EOF

# Build
npm run build

# Start server
npm start

# Or for development with auto-reload
npm run dev
```

Backend should now be running on http://localhost:3001

#### 5. Setup Frontend
```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:3001
EOF

# Start development server
npm start
```

Frontend should now be running on http://localhost:3000

---

## 🧪 Manual Testing Checklist

### Phase 1: User Registration & Authentication

#### Test 1.1: Register New User
- [ ] Navigate to http://localhost:3000
- [ ] Click "Register" or navigate to /register
- [ ] Fill in registration form:
  - Email: `test@example.com`
  - Password: `TestPass123!`
  - First Name: `Max`
  - Last Name: `Mustermann`
  - Bar Admission: `12345`
  - Bundesland: `BW` (Baden-Württemberg)
- [ ] Click "Register"
- [ ] **Expected**: Redirects to calculator page with welcome message
- [ ] **Verify**: JWT token stored in localStorage (F12 > Application > Local Storage)

#### Test 1.2: Logout and Login
- [ ] Click "Logout" button
- [ ] **Expected**: Redirects to login page, token cleared
- [ ] Enter credentials: `test@example.com` / `TestPass123!`
- [ ] Click "Login"
- [ ] **Expected**: Redirects to calculator page
- [ ] **Verify**: User name displayed in header

#### Test 1.3: Invalid Login
- [ ] Logout
- [ ] Try login with wrong password
- [ ] **Expected**: Error message "Invalid credentials"
- [ ] **Status**: ⬜ Pass / ⬜ Fail

---

### Phase 2: Deadline Calculator - Basic Tests

#### Test 2.1: Simple 1-Month Ereignisfrist
- [ ] Navigate to Calculator page
- [ ] Fill in form:
  - Event Date: `2025-01-15`
  - Duration: `1` month
  - Bundesland: `BW`
  - Deadline Type: `Ereignisfrist`
  - Procedural Code: `ZPO`
- [ ] Click "Calculate Deadline"
- [ ] **Expected Results**:
  - Start Date: `16.01.2025` (day after event, § 187 BGB)
  - End Date: `15.02.2025` (corresponding day, § 188 BGB)
  - Was Extended: `No`
- [ ] **Verify**: Calculation steps displayed
- [ ] **Verify**: Applied rules show § 187 and § 188 BGB
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 2.2: Sunday Extension (§ 193 BGB)
- [ ] Event Date: `2025-01-05` (Sunday)
- [ ] Duration: `2` weeks
- [ ] Calculate
- [ ] **Expected Results**:
  - Original End: `19.01.2025` (Sunday)
  - Final End: `20.01.2025` (Monday - extended!)
  - Was Extended: `Yes`
  - Extended From: `19.01.2025`
- [ ] **Verify**: Extension explanation shown
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 2.3: Saturday is Werktag (NO extension)
- [ ] Event Date: `2025-01-10` (Friday)
- [ ] Duration: `1` day
- [ ] Calculate
- [ ] **Expected Results**:
  - End Date: `11.01.2025` (Saturday)
  - Was Extended: `No`
- [ ] **Critical**: Saturday should NOT extend!
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 2.4: Holiday Extension - Neujahr
- [ ] Event Date: `2024-12-31`
- [ ] Duration: `1` day
- [ ] Bundesland: `BW` (any Bundesland works for Neujahr)
- [ ] Calculate
- [ ] **Expected Results**:
  - Original End: `01.01.2025` (Neujahr - nationwide holiday)
  - Final End: `02.01.2025` (extended to next working day)
  - Was Extended: `Yes`
- [ ] **Status**: ⬜ Pass / ⬜ Fail

---

### Phase 3: State-Specific Holiday Testing

#### Test 3.1: Heilige Drei Könige (BW only)
- [ ] Event Date: `2024-12-16`
- [ ] Duration: `3` weeks
- [ ] Bundesland: `BW` (Baden-Württemberg)
- [ ] Calculate
- [ ] **Expected**: `06.01.2025` → `07.01.2025` (extended)
- [ ] Now change Bundesland to: `BE` (Berlin)
- [ ] Calculate again
- [ ] **Expected**: `06.01.2025` (NOT extended in Berlin)
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 3.2: Fronleichnam (BY only)
- [ ] Event Date: `2025-06-18`
- [ ] Duration: `1` day
- [ ] Bundesland: `BY` (Bayern)
- [ ] Calculate
- [ ] **Expected**: `19.06.2025` (Fronleichnam) → `20.06.2025`
- [ ] Change to: `BE` (Berlin)
- [ ] **Expected**: `19.06.2025` (NOT extended)
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 3.3: All 16 Bundesländer
Test the same calculation with each Bundesland:
- [ ] BW (Baden-Württemberg)
- [ ] BY (Bayern)
- [ ] BE (Berlin)
- [ ] BB (Brandenburg)
- [ ] HB (Bremen)
- [ ] HH (Hamburg)
- [ ] HE (Hessen)
- [ ] MV (Mecklenburg-Vorpommern)
- [ ] NI (Niedersachsen)
- [ ] NW (Nordrhein-Westfalen)
- [ ] RP (Rheinland-Pfalz)
- [ ] SL (Saarland)
- [ ] SN (Sachsen)
- [ ] ST (Sachsen-Anhalt)
- [ ] SH (Schleswig-Holstein)
- [ ] TH (Thüringen)

**Expected**: Each calculates without errors

---

### Phase 4: Edge Cases

#### Test 4.1: Leap Year February
- [ ] Event Date: `2024-01-31`
- [ ] Duration: `1` month
- [ ] Calculate
- [ ] **Expected**: `29.02.2024` (leap year)
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 4.2: Month-End Adjustment
- [ ] Event Date: `2025-01-31`
- [ ] Duration: `1` month
- [ ] Calculate
- [ ] **Expected**: `28.02.2025` (Feb only has 28 days in 2025)
- [ ] **Verify**: Warning message about month-end adjustment
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 4.3: Year Transition
- [ ] Event Date: `2024-12-15`
- [ ] Duration: `1` month
- [ ] Calculate
- [ ] **Expected**: `15.01.2025` (crosses year boundary)
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 4.4: Very Long Deadline
- [ ] Event Date: `2025-01-15`
- [ ] Duration: `5` years
- [ ] Calculate
- [ ] **Expected**: `15.01.2030`
- [ ] **Status**: ⬜ Pass / ⬜ Fail

---

### Phase 5: Notfrist Warning

#### Test 5.1: Notfrist Warning Appears
- [ ] Event Date: `2025-01-15`
- [ ] Duration: `1` month
- [ ] Deadline Type: `Notfrist` (important!)
- [ ] Calculate
- [ ] **Expected**: Large warning displayed:
  - "⚠️ NOTFRIST: This is a peremptory deadline"
  - "Missing it results in automatic rejection!"
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 5.2: No Warning for Ereignisfrist
- [ ] Same calculation but with: `Ereignisfrist`
- [ ] **Expected**: NO Notfrist warning
- [ ] **Status**: ⬜ Pass / ⬜ Fail

---

### Phase 6: Save Deadline Functionality

#### Test 6.1: Save Calculated Deadline
- [ ] Calculate any deadline (e.g., 1 month from today)
- [ ] Click "Save This Deadline" button
- [ ] Fill in details:
  - Case Name: `Mustermann vs. Müller`
  - Case Number: `1 O 123/25`
  - Description: `Berufungsfrist`
- [ ] Click "Save"
- [ ] **Expected**: Success message, redirects to dashboard
- [ ] **Status**: ⬜ Pass / ⬜ Fail

---

### Phase 7: Dashboard Testing

#### Test 7.1: View Saved Deadlines
- [ ] Navigate to Dashboard
- [ ] **Expected**: Previously saved deadline appears in list
- [ ] **Verify**: Correct case name, deadline date displayed
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 7.2: Urgency Color Coding
Create deadlines with different dates to test colors:

- [ ] Create deadline: **Yesterday** (overdue)
  - **Expected Color**: Red background
- [ ] Create deadline: **Today**
  - **Expected Color**: Red background
- [ ] Create deadline: **Tomorrow**
  - **Expected Color**: Orange/Yellow background
- [ ] Create deadline: **In 5 days**
  - **Expected Color**: Yellow background
- [ ] Create deadline: **In 30 days**
  - **Expected Color**: Green background
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 7.3: Stats Cards
- [ ] Check stats at top of dashboard:
  - Active Deadlines: Should match count
  - Overdue: Should count past deadlines
  - Due Today: Should count today's deadlines
  - Due This Week: Should count next 7 days
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 7.4: Filter Deadlines
- [ ] Click "Active" filter
  - **Expected**: Shows only active deadlines
- [ ] Click "Completed" filter
  - **Expected**: Shows only completed deadlines
- [ ] Click "Overdue" filter
  - **Expected**: Shows only overdue deadlines
- [ ] Click "All" filter
  - **Expected**: Shows all deadlines
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 7.5: Complete a Deadline
- [ ] Click "Mark Complete" on any deadline
- [ ] **Expected**:
  - Status changes to "Completed"
  - Moves to completed filter
  - Green checkmark appears
- [ ] **Status**: ⬜ Pass / ⬜ Fail

#### Test 7.6: Delete a Deadline
- [ ] Click "Delete" on any deadline
- [ ] **Expected**: Confirmation dialog
- [ ] Confirm deletion
- [ ] **Expected**: Deadline removed from list
- [ ] **Status**: ⬜ Pass / ⬜ Fail

---

### Phase 8: All Procedural Codes

Test calculator with each procedural code:
- [ ] ZPO (Zivilprozessordnung)
- [ ] VwGO (Verwaltungsgerichtsordnung)
- [ ] StPO (Strafprozessordnung)
- [ ] ArbGG (Arbeitsgerichtsgesetz)
- [ ] SGG (Sozialgerichtsgesetz)
- [ ] FGO (Finanzgerichtsordnung)
- [ ] FamFG (Gesetz über das Verfahren in Familiensachen)
- [ ] InsO (Insolvenzordnung)

**Expected**: All work correctly

---

### Phase 9: API Testing (Optional)

#### Test 9.1: Health Check
```bash
curl http://localhost:3001/health
```
**Expected**: `{"status":"healthy","service":"German Lawyer Deadline System"}`

#### Test 9.2: Register via API
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api-test@example.com",
    "password": "TestPass123!",
    "first_name": "API",
    "last_name": "User",
    "bar_admission_number": "99999",
    "bundesland": "BW"
  }'
```
**Expected**: Returns user object and JWT token

#### Test 9.3: Calculate Deadline via API
```bash
# First, get token from login response above
TOKEN="your-jwt-token-here"

curl -X POST http://localhost:3001/api/deadlines/calculate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "event_date": "2025-01-15",
    "duration_value": 1,
    "duration_unit": "months",
    "bundesland": "BW",
    "deadline_type": "Ereignisfrist",
    "procedural_code": "ZPO"
  }'
```
**Expected**: Returns calculation result

---

## 📊 Test Results Summary

Fill in after completing all tests:

| Category | Total Tests | Passed | Failed | Pass Rate |
|----------|-------------|--------|--------|-----------|
| Authentication | 3 | __ | __ | __% |
| Basic Calculator | 4 | __ | __ | __% |
| State Holidays | 3 | __ | __ | __% |
| Edge Cases | 4 | __ | __ | __% |
| Notfrist Warnings | 2 | __ | __ | __% |
| Save Functionality | 1 | __ | __ | __% |
| Dashboard | 6 | __ | __ | __% |
| Procedural Codes | 8 | __ | __ | __% |
| API Tests | 3 | __ | __ | __% |
| **TOTAL** | **34** | **__** | **__** | **__%** |

---

## 🐛 Troubleshooting

### Issue: Containers won't start
```bash
# Check Docker is running
docker --version
docker-compose --version

# Check ports not in use
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Remove old containers and volumes
docker-compose down -v
docker-compose up --build
```

### Issue: Database connection fails
```bash
# Check database container
docker-compose logs postgres

# Verify database exists
docker-compose exec postgres psql -U lawyer -d deadline_system -c "\dt"

# Reinitialize database
docker-compose down -v
docker-compose up --build
```

### Issue: Frontend can't connect to backend
```bash
# Check CORS settings in backend/src/server.ts
# Verify REACT_APP_API_URL in frontend/.env
# Check browser console for errors (F12)
```

### Issue: JWT token errors
```bash
# Clear localStorage in browser (F12 > Application > Local Storage > Clear)
# Verify JWT_SECRET is set in backend/.env
# Re-register or re-login
```

---

## 🎯 Expected Final Results

After all tests pass, you should have:

✅ User can register and login
✅ Calculator correctly implements BGB §§ 187-193
✅ Saturday does NOT extend (is a Werktag)
✅ Sunday DOES extend to Monday
✅ All 16 Bundesländer work correctly
✅ State-specific holidays work (Heilige Drei Könige, Fronleichnam, etc.)
✅ Leap years handled correctly
✅ Month-end adjustments work
✅ Notfrist warnings appear
✅ Deadlines can be saved
✅ Dashboard shows all deadlines with correct urgency
✅ Deadlines can be completed and deleted
✅ All 8 procedural codes work

---

## 📝 Reporting Issues

If you find any issues during testing:

1. **Note the test number** (e.g., "Test 2.3 failed")
2. **Describe the issue**: What happened vs. what was expected
3. **Include screenshots** if possible
4. **Check browser console** (F12) for errors
5. **Check server logs**: `docker-compose logs backend`

---

**Good luck with testing! 🚀**

Once you complete the checklist, you'll have full confidence the system works correctly.
