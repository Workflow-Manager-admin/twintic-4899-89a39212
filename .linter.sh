#!/bin/bash
cd /home/kavia/workspace/code-generation/twintic-4899-89a39212/twin_tic_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

