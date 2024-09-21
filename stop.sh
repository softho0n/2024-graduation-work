#!/bin/bash

# PID 파일 읽기
if [ -f frontend.pid ]; then
    FRONTEND_PID=$(cat frontend.pid)
    echo "Stopping frontend with PID: $FRONTEND_PID"
    kill $FRONTEND_PID
    rm frontend.pid
fi

declare -a PORTS=(8000 8001 8002 8003 8004)

for PORT in "${PORTS[@]}"; do
    if [ -f service_${PORT}.pid ]; then
        SERVICE_PID=$(cat service_${PORT}.pid)
        echo "Stopping backend service on port $PORT with PID: $SERVICE_PID"
        kill $SERVICE_PID
        rm service_${PORT}.pid
    fi
done

# backoffice-app 종료
if [ -f backoffice.pid ]; then
    BACKOFFICE_PID=$(cat backoffice.pid)
    echo "Stopping backoffice app with PID: $BACKOFFICE_PID"
    kill $BACKOFFICE_PID
    rm backoffice.pid
fi

echo "All services stopped."
