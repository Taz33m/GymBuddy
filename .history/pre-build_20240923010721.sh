#!/bin/bash

# Function to remove socket files
remove_sockets() {
    find "$1" -type s -print -delete
}

# Remove socket files from specific directories
remove_sockets ~/Library/Application\ Support/Code
remove_sockets ~/Library/Application\ Support/Cursor
remove_sockets ~/Library/Group\ Containers/BJ4HAAB9B3.ZoomClient3rd
remove_sockets ~/Library/Containers/com.docker.docker

# Remove all socket files from the home directory
remove_sockets ~

# Kill processes that might be creating socket files
pkill -f Cursor
pkill -f Code
pkill -f Zoom

# Wait for a moment to ensure processes are terminated
sleep 2

# Remove socket files again after killing processes
remove_sockets ~
