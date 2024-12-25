#!/bin/bash

# Run TypeScript type checking in watch mode in the background
npm run typecheck -- --watch &
TYPECHECK_PID=$!

# Run the development server
npm start

# When the dev server is stopped, kill the type checking process
kill $TYPECHECK_PID 