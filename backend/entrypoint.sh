#!/usr/bin/env sh

echo "Generating Prisma client..."
npx prisma generate

echo "Running prisma migrations..."
npx prisma migrate dev --name init

echo "Starting app..."
npm start