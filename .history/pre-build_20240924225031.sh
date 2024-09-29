#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Function to remove socket files and log the action
remove_sockets() {
    echo "Removing socket files from $1"
    find "$1" -type s -print -delete || echo "No socket files found in $1"
}

# Check if we're in a safe environment to run this script
if [ "$CI" = "true" ] || [ "$EAS_BUILD" = "true" ]; then
    echo "Running in a CI/CD or EAS Build environment. Proceeding with caution."
else
    echo "Not running in a known CI/CD environment. Please ensure this is safe to run."
    read -p "Do you want to continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborting."
        exit 1
    fi
fi

# Remove socket files from specific directories
remove_sockets ~/Library/Application\ Support/Code
remove_sockets ~/Library/Application\ Support/Cursor
remove_sockets ~/Library/Group\ Containers/BJ4HAAB9B3.ZoomClient3rd
remove_sockets ~/Library/Containers/com.docker.docker

# Remove all socket files from the home directory
remove_sockets ~

# Safely terminate processes that might be creating socket files
for proc in Cursor "Visual Studio Code" Zoom; do
    echo "Attempting to terminate $proc"
    pkill -x "$proc" || echo "$proc is not running"
done

# Wait for a moment to ensure processes are terminated
sleep 2

# Remove socket files again after terminating processes
remove_sockets ~

echo "Socket file cleanup completed successfully."