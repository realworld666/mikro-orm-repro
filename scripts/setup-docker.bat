@echo off
echo Setting up PostgreSQL Docker container for Mikro-ORM...

REM Check if Docker is installed
where docker >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Check if Docker Compose is installed
where docker-compose >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

REM Stop and remove existing container if it exists
echo Stopping any existing containers...
docker-compose down

REM Start the container
echo Starting PostgreSQL container...
docker-compose up -d

REM Wait for the container to be ready
echo Waiting for PostgreSQL to be ready...
for /l %%i in (1, 1, 30) do (
    docker exec mikro-postgres pg_isready -U mikro >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo PostgreSQL is ready!
        goto :POSTGRES_READY
    )
    echo Waiting for PostgreSQL to start... (%%i/30)
    timeout /t 1 >nul
)

echo PostgreSQL failed to start within the timeout period.
exit /b 1

:POSTGRES_READY
echo PostgreSQL container is up and running!
echo Connection details:
echo   Host: localhost
echo   Port: 5432
echo   Database: mikro_test
echo   Username: mikro
echo   Password: mikro
echo.
echo You can now run 'npm run db:push' to create your database schema.
