#!/usr/bin/env bash

if [[ $EUID -ne 0 ]]; then
	echo "You must run 'sudo npm run init'"
	exit 1
fi
echo "Attempting to backup hosts file..."
cp /etc/hosts .hosts.bak
echo "127.0.0.1   webscrp.dev" >> /etc/hosts
echo "127.0.0.1   api.webscrp.dev" >> /etc/hosts
echo "Hosts file updated. Backedup as .hosts.bak."

