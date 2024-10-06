#!/bin/bash

# 프론트엔드 버전 입력 받기
echo "사용할 프론트엔드 버전을 입력하세요 (frontend-v1-app 또는 frontend-v2-app): "
read FRONTEND_VERSION

# 프론트엔드 디렉토리 경로
FRONTEND_DIR="../frontend/$FRONTEND_VERSION"

# 입력된 디렉토리 확인
if [[ ! -d $FRONTEND_DIR ]]; then
    echo "오류: 디렉토리 '$FRONTEND_DIR'이(가) 존재하지 않습니다."
    exit 1
fi

# 프론트엔드 시작
echo "Starting frontend..."
cd "$FRONTEND_DIR"

# npm install이 처음인지 확인
if [[ ! -d "node_modules" ]]; then
    echo "필요한 패키지를 설치합니다..."
    npm install
fi

npm run dev &  # 백그라운드에서 실행
FRONTEND_PID=$!
cd -  # 이전 디렉토리로 돌아감

# 백엔드 서비스 시작
echo "Starting backend services..."
SERVICES=("user-backend-app" "payments-backend-app" "audio-streaming-backend-app" "subscription-backend-app" "audio-storage-backend-app" "download-backend-app" "search-backend-app")
PORTS=(8000 8001 8002 8003 8004 8005 8006)

for i in ${!SERVICES[@]}; do
    SERVICE=${SERVICES[$i]}
    SERVICE_DIR="../servers/$SERVICE"  # 각 서비스의 경로 설정
    PORT=${PORTS[$i]}
    
    cd $SERVICE_DIR  # 각 백엔드 서비스 폴더로 이동

    # requirements.txt가 있는지 확인 후 설치
    if [[ -f "requirements.txt" ]]; then
        echo "필요한 백엔드 패키지를 설치합니다 ($SERVICE)..."
        pip3 install -r requirements.txt
    fi

    uvicorn main:app --host 0.0.0.0 --port $PORT &  # 백그라운드에서 실행
    eval "SERVICE_${PORT}_PID=\$!"  # 각 서비스 PID 저장
    cd -  # 이전 디렉토리로 돌아감
done

# backoffice-app 시작
echo "Starting backoffice app..."
cd ../servers/backoffice-app  # backoffice-app의 경로 수정

# Streamlit이 처음인지 확인
if [[ ! -d ".streamlit" ]]; then
    echo "필요한 백오피스 패키지를 설치합니다..."
    pip3 install -r requirements.txt  # 요구 사항 파일이 있다면 설치
fi

streamlit run main.py dev &  # 백그라운드에서 실행
BACKOFFICE_PID=$!
cd -  # 이전 디렉토리로 돌아감

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
