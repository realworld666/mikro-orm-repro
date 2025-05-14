#!/bin/bash

# Script to set up Docker container for PostgreSQL

echo "Setting up PostgreSQL Docker container for Mikro-ORM..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop and remove existing container if it exists
echo "Stopping any existing containers..."
docker-compose down

# Start the container
echo "Starting PostgreSQL container..."
docker-compose up -d

# Wait for the container to be ready
echo "Waiting for PostgreSQL to be ready..."
for i in {1..30}; do
    if docker exec mikro-postgres pg_isready -U mikro &> /dev/null; then
        echo "PostgreSQL is ready!"
        break
    fi
    echo "Waiting for PostgreSQL to start... ($i/30)"
    sleep 1
done

# Check if PostgreSQL is ready
if ! docker exec mikro-postgres pg_isready -U mikro &> /dev/null; then
    echo "PostgreSQL failed to start within the timeout period."
    exit 1
fi

echo "PostgreSQL container is up and running!"
echo "Connection details:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  Database: mikro_test"
echo "  Username: mikro"
echo "  Password: mikro"
echo ""
echo "You can now run 'npm run db:push' to create your database schema."
