#!/bin/bash

# German Lawyer Deadline System - Quick Start Script
# This script will start the entire system with Docker Compose

set -e  # Exit on any error

echo "🚀 German Lawyer Deadline Management System - Quick Start"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo ""
    echo "Please install Docker first:"
    echo "  macOS:   brew install --cask docker"
    echo "  Ubuntu:  sudo apt-get install docker.io docker-compose"
    echo "  Windows: https://www.docker.com/products/docker-desktop"
    echo ""
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

# Use 'docker compose' or 'docker-compose' depending on what's available
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

echo -e "${GREEN}✅ Docker found${NC}"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env file from template...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ .env file created${NC}"
    else
        echo -e "${RED}❌ .env.example not found${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi
echo ""

# Ask user if they want to start fresh
echo -e "${YELLOW}Do you want to start with a fresh database? (y/N)${NC}"
read -r FRESH_START
if [[ $FRESH_START =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🗑️  Removing old containers and volumes...${NC}"
    $DOCKER_COMPOSE down -v
    echo -e "${GREEN}✅ Cleaned up${NC}"
fi
echo ""

# Build and start services
echo -e "${BLUE}🔨 Building and starting services...${NC}"
echo "This may take a few minutes on first run..."
echo ""

$DOCKER_COMPOSE up --build -d

echo ""
echo -e "${GREEN}✅ Services started!${NC}"
echo ""

# Wait for services to be healthy
echo -e "${BLUE}⏳ Waiting for services to be ready...${NC}"

# Wait for backend health check
MAX_ATTEMPTS=30
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend is ready${NC}"
        break
    fi
    ATTEMPT=$((ATTEMPT + 1))
    if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
        echo -e "${RED}❌ Backend failed to start${NC}"
        echo "Check logs with: $DOCKER_COMPOSE logs backend"
        exit 1
    fi
    echo -n "."
    sleep 2
done

# Wait for frontend (check if port 3000 is accepting connections)
sleep 3
echo -e "${GREEN}✅ Frontend is ready${NC}"
echo ""

# Show service status
echo -e "${BLUE}📊 Service Status:${NC}"
$DOCKER_COMPOSE ps
echo ""

# Show URLs
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 System is ready!${NC}"
echo ""
echo -e "📱 Frontend:  ${BLUE}http://localhost:3000${NC}"
echo -e "🔧 Backend:   ${BLUE}http://localhost:3001${NC}"
echo -e "💚 Health:    ${BLUE}http://localhost:3001/health${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Offer to open browser
echo -e "${YELLOW}Open browser to http://localhost:3000? (Y/n)${NC}"
read -r OPEN_BROWSER
if [[ ! $OPEN_BROWSER =~ ^[Nn]$ ]]; then
    echo "Opening browser..."

    # Detect OS and open browser
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open http://localhost:3000
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open &> /dev/null; then
            xdg-open http://localhost:3000
        else
            echo "Please open http://localhost:3000 in your browser"
        fi
    else
        # Windows or other
        echo "Please open http://localhost:3000 in your browser"
    fi
fi

echo ""
echo -e "${BLUE}📋 Useful Commands:${NC}"
echo "  View logs:        $DOCKER_COMPOSE logs -f"
echo "  Stop system:      $DOCKER_COMPOSE down"
echo "  Restart:          $DOCKER_COMPOSE restart"
echo "  Fresh start:      $DOCKER_COMPOSE down -v && $DOCKER_COMPOSE up --build -d"
echo ""
echo -e "${GREEN}Next Steps:${NC}"
echo "  1. Register a new user account"
echo "  2. Calculate your first deadline"
echo "  3. Follow the manual testing checklist in DEPLOY.md"
echo ""
echo -e "${BLUE}📖 Documentation:${NC}"
echo "  Deployment Guide:  DEPLOY.md"
echo "  Testing Guide:     TESTING.md"
echo "  Quick Start:       QUICKSTART.md"
echo "  README:            README.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}Happy testing! 🎯${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
