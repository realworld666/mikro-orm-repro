@echo off
echo Creating database tables from Mikro-ORM entities...

REM Check if the PostgreSQL container is running
docker ps | findstr mikro-postgres >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo PostgreSQL container is not running. Please run 'npm run db:up' first.
    exit /b 1
)

REM Run the push-entities script
echo Running push-entities.ts to create tables...
npx ts-node --esm src/push-entities.ts

REM Check if the script was successful
if %ERRORLEVEL% equ 0 (
    echo Tables created successfully!
    echo.
    echo Your database is now ready to use with the following entities:
    echo - Player
    echo - Team
    echo - BidHistory
    echo - TransferListedPlayer
    echo - League
    echo - Manager
) else (
    echo Failed to create tables. Please check the error message above.
    exit /b 1
)
