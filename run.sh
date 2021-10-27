#!/bin/bash

cd /home

echo 'RUN WITH ENV: ' $STAGE
if [ "$STAGE" == "dev" ]; then
    yarn dev
else
    yarn start
fi
