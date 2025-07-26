#!/bin/bash

echo "Installing dependencies with pnpm..."

cd backend || { echo "ERROR backend folder not found"; exit 1; }
pnpm install || { echo "ERROR Failed to install backend dependencies"; exit 1; }

echo "🔄 Running Prisma migrations..."
pnpm exec prisma migrate dev --name init || { echo "ERROR Prisma migration failed"; exit 1; }

cd ../frontend || { echo "ERROR frontend folder not found"; exit 1; }
pnpm install || { echo " ERROR Failed to install frontend dependencies"; exit 1; }

echo "Starting frontend and backend..."

cd ../backend && pnpm run dev &
cd ../frontend && pnpm run dev