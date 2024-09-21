#!/bin/bash

# 프론트엔드 시작
echo "Starting frontend..."
cd frontend-v1-app
npm run dev &  # 백그라운드에서 실행
FRONTEND_PID=$!
cd ..

# 백엔드 서비스 시작
echo "Starting backend services..."
SERVICES=("user-backend-app" "payments-backend-app" "audio-streaming-backend-app" "subscription-backend-app" "audio-storage-backend-app" "download-backend-app" "search-backend-app")
PORTS=(8000 8001 8002 8003 8004 8005 8006)

for i in ${!SERVICES[@]}; do
    SERVICE=${SERVICES[$i]}
    PORT=${PORTS[$i]}
    cd $SERVICE  # 각 백엔드 서비스 폴더로 이동
    uvicorn main:app --host 0.0.0.0 --port $PORT &  # 백그라운드에서 실행
    eval "SERVICE_${PORT}_PID=\$!"  # 각 서비스 PID 저장
    cd ..
done

# backoffice-app 시작
echo "Starting backoffice app..."
cd backoffice-app
streamlit run main.py dev &  # 백그라운드에서 실행
BACKOFFICE_PID=$!
cd ..

# 모든 서비스 PID 출력
echo "Frontend PID: $FRONTEND_PID"
for PORT in "${PORTS[@]}"; do
    eval "echo Backend service on port $PORT PID: \$SERVICE_${PORT}_PID"
done
echo "Backoffice app PID: $BACKOFFICE_PID"

# PID를 파일에 저장 (종료 시 사용)
echo $FRONTEND_PID > frontend.pid
for PORT in "${PORTS[@]}"; do
    eval "echo \$SERVICE_${PORT}_PID > service_${PORT}.pid"
done
echo $BACKOFFICE_PID > backoffice.pid

echo "All services started."
