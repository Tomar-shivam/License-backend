#!/bin/sh
# build frontend production build
cd frontend && ls
pwd
echo "-->Building optimized production build for frontend..."
npm i
npm run build
# move frontend build to vcdms directory 
echo "-->Moving build to vcdms for server side rendering..."
mv build ../backend

cd ../backend
pwd
npm i
echo "-->Building production build for backend"
npm run build
echo "-->Created both backend and frontend peoduction build for building package"
pwd
# Build binary package for final app
pkg --output debian/licensing .
