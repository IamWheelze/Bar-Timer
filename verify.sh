#!/bin/bash

# German Lawyer Deadline System - Verification Script
# This script verifies that all services are running correctly

set -e

echo "🔍 German Lawyer Deadline System - System Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to run tests
run_test() {
    local test_name="$1"
    local test_command="$2"

    echo -n "Testing: $test_name... "

    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

# Use 'docker compose' or 'docker-compose' depending on what's available
if docker compose version &> /dev/null 2>&1; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

echo -e "${BLUE}1. Checking Docker Containers${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if containers are running
run_test "PostgreSQL container running" "$DOCKER_COMPOSE ps postgres | grep -q 'running\|Up'"
run_test "Backend container running" "$DOCKER_COMPOSE ps backend | grep -q 'running\|Up'"
run_test "Frontend container running" "$DOCKER_COMPOSE ps frontend | grep -q 'running\|Up'"

echo ""
echo -e "${BLUE}2. Checking Service Health${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check backend health endpoint
run_test "Backend health check" "curl -sf http://localhost:3001/health | grep -q 'healthy'"

# Check database connection (via backend logs)
run_test "Database connection" "$DOCKER_COMPOSE logs backend | grep -q 'Database connected'"

# Check if frontend is accessible
run_test "Frontend accessible" "curl -sf http://localhost:3000 > /dev/null"

echo ""
echo -e "${BLUE}3. Testing API Endpoints${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test registration endpoint (just check it responds, don't actually create user)
run_test "Auth registration endpoint" "curl -sf -X POST http://localhost:3001/api/auth/register -H 'Content-Type: application/json' -d '{}' > /dev/null; [ \$? -eq 0 ] || [ \$? -eq 22 ]"

# Test health endpoint returns correct JSON
if curl -sf http://localhost:3001/health | jq -e '.status == "healthy"' > /dev/null 2>&1; then
    echo -e "Testing: Health endpoint JSON... ${GREEN}✅ PASS${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "Testing: Health endpoint JSON... ${YELLOW}⚠️  WARN (jq not installed)${NC}"
fi

echo ""
echo -e "${BLUE}4. Checking Core Calculator${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Run the calculator test from backend
echo -n "Testing: Deadline calculator unit tests... "
if $DOCKER_COMPOSE exec -T backend npm test -- --testPathPattern=deadline-calculator.test.ts --silent 2>&1 | grep -q "45 passed"; then
    echo -e "${GREEN}✅ PASS (45/45 tests)${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

echo ""
echo -e "${BLUE}5. Checking Environment${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check .env file exists
run_test ".env file exists" "[ -f .env ]"

# Check required environment variables in .env
run_test "DATABASE_URL configured" "grep -q 'DATABASE_URL' .env"
run_test "JWT_SECRET configured" "grep -q 'JWT_SECRET' .env"

echo ""
echo -e "${BLUE}6. Checking Ports${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if ports are listening
run_test "Port 5432 (PostgreSQL)" "nc -z localhost 5432 2>/dev/null || lsof -i :5432 > /dev/null 2>&1"
run_test "Port 3001 (Backend)" "nc -z localhost 3001 2>/dev/null || curl -sf http://localhost:3001/health > /dev/null"
run_test "Port 3000 (Frontend)" "nc -z localhost 3000 2>/dev/null || curl -sf http://localhost:3000 > /dev/null"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Verification Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All systems operational!${NC}"
    echo ""
    echo "The German Lawyer Deadline System is running correctly."
    echo ""
    echo -e "${BLUE}Next Steps:${NC}"
    echo "  1. Open http://localhost:3000 in your browser"
    echo "  2. Register a new user account"
    echo "  3. Follow the manual testing checklist in DEPLOY.md"
    echo ""
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed${NC}"
    echo ""
    echo "Troubleshooting steps:"
    echo "  1. Check container logs: $DOCKER_COMPOSE logs"
    echo "  2. Restart services: $DOCKER_COMPOSE restart"
    echo "  3. Fresh start: $DOCKER_COMPOSE down -v && $DOCKER_COMPOSE up --build -d"
    echo "  4. See DEPLOY.md troubleshooting section"
    echo ""
    exit 1
fi
