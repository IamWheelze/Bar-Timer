# Troubleshooting Guide

Quick reference for common issues and solutions.

---

## 🚨 Common Issues

### 1. Containers Won't Start

**Symptoms:**
- `docker-compose up` fails
- Containers exit immediately
- "Port already in use" errors

**Solutions:**

```bash
# Check if Docker is running
docker --version
docker info

# Check if ports are already in use
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
lsof -i :5432  # PostgreSQL

# Kill processes using the ports
kill -9 $(lsof -ti:3000)
kill -9 $(lsof -ti:3001)
kill -9 $(lsof -ti:5432)

# Remove old containers and start fresh
docker-compose down -v
docker-compose up --build
```

---

### 2. Database Connection Errors

**Symptoms:**
- Backend logs show "database connection failed"
- "Connection refused" errors
- "role does not exist" errors

**Solutions:**

```bash
# Check PostgreSQL container
docker-compose logs postgres | tail -50

# Verify database is healthy
docker-compose ps postgres

# Check if database exists
docker-compose exec postgres psql -U lawyer -d deadline_system -c "\dt"

# Reinitialize database (WARNING: deletes all data)
docker-compose down -v
docker-compose up --build -d

# Verify connection
docker-compose exec backend npm run db:init
```

---

### 3. Frontend Can't Connect to Backend

**Symptoms:**
- "Network Error" in browser console
- "Failed to fetch" errors
- API calls return 404 or CORS errors

**Solutions:**

```bash
# Check backend is running
curl http://localhost:3001/health

# Check CORS configuration
docker-compose logs backend | grep CORS

# Verify environment variable
cat frontend/.env | grep REACT_APP_API_URL

# Should be: REACT_APP_API_URL=http://localhost:3001

# Rebuild frontend
docker-compose restart frontend

# Check browser console (F12) for specific errors
```

---

### 4. JWT Authentication Errors

**Symptoms:**
- "Invalid token" errors
- "Token expired" errors
- Can't stay logged in

**Solutions:**

```bash
# Clear browser localStorage
# Open browser console (F12):
localStorage.clear()
# Then reload page

# Verify JWT_SECRET is set
cat backend/.env | grep JWT_SECRET

# Restart backend with fresh secret
docker-compose down
# Edit .env and change JWT_SECRET
docker-compose up -d
```

---

### 5. Deadline Calculations Are Wrong

**Symptoms:**
- Incorrect deadline dates
- Saturday extending (should NOT extend)
- Sunday not extending (should extend)
- Wrong holiday calculations

**Solutions:**

```bash
# Run unit tests to verify core logic
docker-compose exec backend npm test

# Should show 45/45 tests passing

# Check specific test
docker-compose exec backend npm test -- --testPathPattern=deadline-calculator.test.ts

# Verify holidays data is loaded
docker-compose exec backend node -e "
const { germanHolidays } = require('./dist/data/holidays');
console.log('Total holidays:', germanHolidays.length);
console.log('Sample:', germanHolidays.slice(0, 3));
"

# Check backend logs for calculation details
docker-compose logs backend | grep "Executed query"
```

---

### 6. Page Loads Blank/White Screen

**Symptoms:**
- Frontend shows white screen
- React errors in console
- "Unexpected token" errors

**Solutions:**

```bash
# Check frontend build
docker-compose logs frontend | tail -50

# Rebuild frontend
docker-compose down
docker-compose build --no-cache frontend
docker-compose up -d

# Check browser console (F12) for React errors

# Verify environment variables
docker-compose exec frontend env | grep REACT_APP

# Clear browser cache
# In browser: Ctrl+Shift+Delete (Chrome/Firefox)
# Or hard refresh: Ctrl+Shift+R
```

---

### 7. Registration/Login Fails

**Symptoms:**
- "User already exists" (but shouldn't)
- "Invalid credentials" (correct password)
- Registration succeeds but can't login

**Solutions:**

```bash
# Check backend logs
docker-compose logs backend | grep -i "error\|registration\|login"

# Verify database user table
docker-compose exec postgres psql -U lawyer -d deadline_system -c "SELECT * FROM users;"

# Reset database (WARNING: deletes all data)
docker-compose down -v
docker-compose up --build -d

# Try with different email
# Check password requirements (min 8 chars recommended)
```

---

### 8. Slow Performance

**Symptoms:**
- Slow API responses
- Slow page loads
- Database queries taking too long

**Solutions:**

```bash
# Check container resource usage
docker stats

# Check database query performance
docker-compose logs backend | grep "Executed query"

# Restart containers
docker-compose restart

# Check disk space
df -h

# Optimize Docker
docker system prune -a
# WARNING: Removes unused images/containers
```

---

### 9. TypeScript Compilation Errors

**Symptoms:**
- Backend won't start
- "Cannot find module" errors
- Type errors in logs

**Solutions:**

```bash
# Rebuild backend
cd backend
npm install
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Verify tsconfig.json is correct
cat tsconfig.json

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

### 10. Frontend Build Fails

**Symptoms:**
- `npm run build` fails
- "Module not found" errors
- Webpack errors

**Solutions:**

```bash
# Rebuild frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build

# Check for conflicting dependencies
npm list

# Verify React version compatibility
npm list react react-dom

# Clear npm cache
npm cache clean --force
npm install
```

---

## 🔧 Diagnostic Commands

### Quick Health Check
```bash
# All-in-one verification
./verify.sh

# Or manual checks:
curl http://localhost:3001/health
curl http://localhost:3000
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Last 50 lines
docker-compose logs --tail=50 backend

# Follow with timestamp
docker-compose logs -ft backend
```

### Container Status
```bash
# List all containers
docker-compose ps

# Detailed container info
docker inspect bar-timer-backend-1

# Container resource usage
docker stats
```

### Database Inspection
```bash
# Connect to database
docker-compose exec postgres psql -U lawyer -d deadline_system

# List tables
\dt

# View users
SELECT * FROM users;

# View deadlines
SELECT * FROM deadlines;

# Count records
SELECT COUNT(*) FROM deadlines;

# Exit
\q
```

### Network Debugging
```bash
# Test backend from host
curl http://localhost:3001/health

# Test backend from frontend container
docker-compose exec frontend curl http://backend:3001/health

# Check network connectivity
docker network ls
docker network inspect bar-timer_default
```

---

## 🆘 Emergency Recovery

### Complete Reset (Nuclear Option)
```bash
# WARNING: This deletes EVERYTHING - all data, containers, volumes

# Stop everything
docker-compose down -v

# Remove all related Docker resources
docker system prune -a --volumes

# Rebuild from scratch
docker-compose up --build

# Verify
./verify.sh
```

### Backup Before Reset
```bash
# Backup database
docker-compose exec postgres pg_dump -U lawyer deadline_system > backup.sql

# Restore after reset
docker-compose up -d postgres
# Wait for postgres to start
sleep 5
cat backup.sql | docker-compose exec -T postgres psql -U lawyer -d deadline_system
```

---

## 📞 Getting Help

### Gather Diagnostic Info
Before asking for help, gather this information:

```bash
# System info
uname -a
docker --version
docker-compose --version
node --version

# Container status
docker-compose ps

# Logs (last 100 lines of each service)
docker-compose logs --tail=100 > logs.txt

# Environment
cat .env (remove sensitive values like JWT_SECRET)

# Test results
npm test > test-results.txt
```

### Check Documentation
1. README.md - System overview
2. DEPLOY.md - Deployment guide
3. TESTING.md - Testing documentation
4. QUICKSTART.md - 5-minute setup

### Common Error Messages

**"EADDRINUSE: address already in use"**
- Another process is using the port
- Solution: Kill the process or change port in docker-compose.yml

**"Cannot connect to the Docker daemon"**
- Docker is not running
- Solution: Start Docker Desktop or `sudo systemctl start docker`

**"database 'deadline_system' does not exist"**
- Database not initialized
- Solution: `docker-compose down -v && docker-compose up --build`

**"Invalid token" or "jwt malformed"**
- JWT secret changed or token expired
- Solution: Clear localStorage and login again

**"NetworkError" in browser**
- Backend not running or wrong URL
- Solution: Check `REACT_APP_API_URL` in frontend/.env

---

## ✅ Prevention Checklist

Before starting, ensure:
- [ ] Docker is installed and running
- [ ] Ports 3000, 3001, 5432 are available
- [ ] `.env` file exists with correct values
- [ ] Enough disk space (at least 2GB free)
- [ ] No firewall blocking local ports

---

## 🎯 Still Having Issues?

1. **Check the error message carefully** - often contains the solution
2. **Search in logs** - `docker-compose logs | grep ERROR`
3. **Run verification** - `./verify.sh`
4. **Try fresh start** - `docker-compose down -v && docker-compose up --build`
5. **Check documentation** - README.md, DEPLOY.md, TESTING.md
6. **Run tests** - `npm test` to verify core logic

---

**Last Updated:** November 6, 2025
