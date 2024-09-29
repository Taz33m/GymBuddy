#!/bin/bash
find . -type s -print0 | xargs -0 rm -f
