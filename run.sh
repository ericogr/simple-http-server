#!/bin/sh

PORT=8080
if [ -n "$1" ]
then
    PORT=$1
fi

node . $PORT
