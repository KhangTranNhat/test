#!/bin/bash
echo "==== START BUILD ===="
pnpm run build

echo "==== RESTART APP ===="
pm2 restart my-app

echo "==== DONE ===="
read -p "Press Enter to continue..."