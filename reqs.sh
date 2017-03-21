#!/usr/bin/env bash

echo "Attempting to install node requirements..."
#npm install
printf "You need express installed globally, install? [y/N] "
read opt
if [[ $opt == "n" || $opt == "N" || -z $opt ]]; then
	echo "The program will not run without express"
	exit 1
fi
echo "installing express..."
npm install -g express
echo "installing npm dependencies..."
npm install
echo "installing bower dependencies..."
bower install 
