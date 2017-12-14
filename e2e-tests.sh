#!/bin/bash

# import everything form .env
export $(cat .env | grep -v ^# | xargs)

echo "e2e tests..."
echo "starting frontend server..."

if [ -z "$1" ] || [ $1 != '-c' ];
then
  REACT_APP_SHOW_DEV_UI=true REACT_APP_SERVER_URL=http://localhost:9091 PORT=3001 npm run build
fi

echo "frontend started"
serve -p 5001 -s build & NODE_SERVE=$!
echo "------starting backend server------"
docker-compose -f $E2E_TEST_SERVER_COMPOSE up -d

./$E2E_TEST_SERVER_FOLDER/populateMongo.sh

# making sure the server has started
echo "------start sleeping------"
sleep 5
echo "------end sleeping------"

npm run selenium-setup
echo "------starting selenium server------"
npm run selenium-start &
echo "------starting tests------"
npm run e2e-tests

echo "------stopping backend server------"
docker-compose -f $E2E_TEST_SERVER_COMPOSE down
echo "------stopping selenium & server------"
pkill -f selenium-standalone
kill $NODE_SERVE
