#!/usr/bin/env bash

echo "installing npm reqs..."
npm install
echo "installing bower reqs..."
node_modules/.bin/bower install
echo "done."
exit 0
