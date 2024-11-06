#!/bin/sh
while getopts m: flag
do
    case "${flag}" in
        m) message=${OPTARG};;
    esac
done
echo "Build";

ng build --configuration production --base-href 'https://clickgroup-bo.latamhosting.com.ar/'
