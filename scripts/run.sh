#! /bin/bash
ACTION=$1
SERVICE=$2

if [ $ACTION = "config" ]; then
    export password=zB74MzioHxEnzMDe
    export MONGO_URL="mongodb+srv://yishai1234:${password}@cluster0.etvhefb.mongodb.net/?retryWrites=true&w=majority";
    echo "configuration complete"
elif [ $ACTION = "start" ]; then
    echo "starting..."
    npm --prefix ../server/ start
fi

echo "end run script"