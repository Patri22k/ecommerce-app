#!/usr/bin/env sh

echo "Waiting for Postgres to be ready..."
while ! nc -z postgres 5432; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done
echo "Postgres is up - continuing..."

echo "Applying migrations..."
npx prisma migrate dev --name init

echo "Generating Prisma client..."
npx prisma generate --no-hints

echo "Running seed script..."
npx prisma db seed

echo "Starting app..."
npm run dev