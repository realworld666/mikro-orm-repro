# Database Setup Guide

This guide explains how to set up and use the PostgreSQL database with Mikro-ORM for this project.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js and npm installed

## Setting Up the Database

### 1. Start the PostgreSQL Docker Container

Run the following command to start the PostgreSQL container:

```bash
npm run db:up
```

This will:
- Start a PostgreSQL container with the following configuration:
  - Database name: `mikro_test`
  - Username: `mikro`
  - Password: `mikro`
  - Port: `5432`
  - Host: `localhost`

### 2. Create Database Tables

After the PostgreSQL container is running, you can create the database tables from your Mikro-ORM entities:

```bash
npm run db:push
```

This will:
- Connect to the PostgreSQL database
- Drop any existing schema
- Create a new schema based on your entity definitions

### 3. Stopping the Database

When you're done, you can stop the PostgreSQL container:

```bash
npm run db:down
```

## Entity Information

The following entities are included in the schema:

- `Player`: Player information
- `Team`: Team information
- `BidHistory`: Bid history for player transfers
- `TransferListedPlayer`: Players listed for transfer
- `League`: League information
- `Manager`: Manager information

## Troubleshooting

If you encounter any issues:

1. Make sure Docker is running
2. Check if the PostgreSQL container is running with `docker ps`
3. If the container is not running, try starting it again with `npm run db:up`
4. If you need to reset the database, run `npm run db:down` followed by `npm run db:up` and `npm run db:push`
