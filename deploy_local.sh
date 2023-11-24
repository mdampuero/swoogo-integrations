#!/bin/sh
while getopts m: flag
do
    case "${flag}" in
        m) message=${OPTARG};;
    esac
done
echo "Build";

ng build --configuration production --base-href 'http://localhost:8080/' && cp -r -f dist/clickgroup-ife/* ../swoogo-integrations-be/public
