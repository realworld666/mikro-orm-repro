#!/bin/bash

# Script to create tables from Mikro-ORM entities

echo "Creating database tables from Mikro-ORM entities..."

# Check if the PostgreSQL container is running
if ! docker ps | grep -q mikro-postgres; then
    echo "PostgreSQL container is not running. Please run 'npm run db:up' first."
    exit 1
fi

# Run the push-entities script
echo "Running push-entities.ts to create tables..."
npx ts-node --esm src/push-entities.ts

# Check if the script was successful
if [ $? -eq 0 ]; then
    echo "Tables created successfully!"
    echo ""
    echo "Your database is now ready to use with the following entities:"
    echo "- Player"
    echo "- Team"
    echo "- BidHistory"
    echo "- TransferListedPlayer"
    echo "- League"
    echo "- Manager"
else
    echo "Failed to create tables. Please check the error message above."
    exit 1
fi
