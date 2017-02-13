#!/usr/bin/env bash

echo "Attempting to install node requirements..."
#npm install
echo "You need express installed globally, install? [y/N]"
read opt
if [ -z "$opt"]; then
	echo "The program will not run without express"
	exit 1
fi
