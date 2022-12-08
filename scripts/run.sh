#! /bin/bash
ACTION=$1;
SERVICE=$2;

if [ $ACTION = "config" ]; then
    export PASSWORD="1vsKIr6P7bJe30mH";
    export MONGO_URL="mongodb+srv://yishai1234:${PASSWORD}@cluster0.etvhefb.mongodb.net/?retryWrites=true&w=majority";
    echo $MONGO_URL;
    echo "configuration complete"
elif [ $ACTION = "start" ]; then
    echo "starting..."
    npm --prefix ../server/ start
fi

echo "end run script"