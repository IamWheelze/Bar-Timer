# ⚡ QUICKSTART - Get Running in 5 Minutes!

## Step 1: Prerequisites
```bash
# Make sure you have Docker installed
docker --version
docker-compose --version
```

## Step 2: Setup Environment
```bash
# Copy environment file
cp .env.example .env

# The defaults are fine for local development
```

## Step 3: Start Everything
```bash
# Start all services (database, backend, frontend)
docker-compose up --build
```

**Wait for:**
- ✅ `deadline-db` - Database ready
- ✅ `deadline-backend` - Backend running on :3001
- ✅ `deadline-frontend` - Frontend running on :3000

## Step 4: Initialize Database
```bash
# In a NEW terminal window:
docker-compose exec backend npm run db:init
```

You should see:
```
✅ Database schema created successfully!
✅ Database initialized successfully!
```

## Step 5: Open Your Browser!
```
Frontend: http://localhost:3000
Backend API: http://localhost:3001/health
```

## Step 6: Register & Test!

1. **Register** at http://localhost:3000/register
   - First Name: Max
   - Last Name: Mustermann
   - Email: max@example.com
   - Password: password123
   - Bundesland: Bayern (BY)
   - Click "Create account"

2. **Calculate a Deadline**:
   - Go to "Calculator"
   - Event Date: Today's date
   - Duration: 1 month
   - Bundesland: Bayern
   - Deadline Type: Ereignisfrist
   - Procedural Code: ZPO
   - Click "Calculate Deadline"
   - See the magic! ✨

3. **Save the Deadline**:
   - Click "Save This Deadline"
   - Case Name: Test Case
   - Click "Save"

4. **View Dashboard**:
   - Go to "Dashboard"
   - See your deadline with urgency indicator!

---

## 🎉 That's It!

**You now have:**
- ✅ Working German lawyer deadline calculator
- ✅ Complete database with user & deadlines
- ✅ Full API backend
- ✅ React frontend
- ✅ All running in Docker

---

## Troubleshooting

**Port already in use?**
```bash
# Stop any services using ports 3000, 3001, 5432
docker-compose down
# Try again
docker-compose up
```

**Database connection error?**
```bash
# Check database is running
docker-compose ps
# Restart everything
docker-compose restart
```

**Frontend not loading?**
```bash
# Check frontend logs
docker-compose logs -f frontend
# Usually just needs time to compile
```

---

## Useful Commands

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop everything
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v

# Restart a service
docker-compose restart backend
```

---

**Ready for more?** Read the full [README.md](README.md)
