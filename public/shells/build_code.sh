#!/bin/bash
#
cd $1;
logpath=$2;
git pull 1> /dev/null 2>> "$logpath/error.log";
npm run pc_release 1> /dev/null 2>> "$logpath/error.log";
pm2 reload all 1> /dev/null 2>> "$logpath/error.log";
if [ "x$?" == "x0" ];
then
  echo 0;
else
  cat "$logpath/error.log" | xargs -0;
fi
