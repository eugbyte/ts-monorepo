#!/bin/sh
dir=$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P);
cd $dir;
pwd;

npm run build;

srcFile="build/service-worker.js";
dstDir="public";
cp $srcFile $dstDir/service-worker.js;

rm -r build

echo "Successfully copied compiled build/service-worker.js file to public/service-worker.js";
