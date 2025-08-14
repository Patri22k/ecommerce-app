#!/usr/bin/env sh

echo "Waiting for Postgres to be ready..."

while ! nc -z postgres 5432; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - continuing..."

echo "Generating Prisma client..."
npx prisma generate

echo "Running prisma migrations..."
npx prisma migrate dev --name init --skip-seed

echo "Running seed script..."
npx prisma db seed

echo "Starting app..."
npm run dev