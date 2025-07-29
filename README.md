# Fullstack Ecommerce Application

## Status

This project is currently in development. If you want to test it, please add `.env` file to `backend/` directory
with the following content:
```dotenv
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://user:password@postgres:5432/ecommerceapp"
JWT_TOKEN="your-jwt-secret"

# The following env variables are used for Prisma seeding.
INITIAL_ADMIN_EMAIL="your@email.sk"
INITIAL_ADMIN_PASSWORD="your-password"
```