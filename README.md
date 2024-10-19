# 2024-graduation-work

---

성균관대학교 소프트웨어학과 졸업작품

# How to start

---

```sh
# start
cd scripts
./start.sh

# stop
./stop.sh
```

# What is chaning point?

---

### As is

- 로컬 minikube에서 모든 서비스를 배포하고 테스트 하는 방식을 이용하고 있었음

### To be

- GKE 클러스터로 이관
- 기존 버킷에서 GKE 클러스터를 생성한 프로젝트로 버킷또한 이관
- 만약 에러 발생 시 개인 연락 바랍니다.

# Remaining Tasks

---

- Apply Circuit breaking onto Audio Streaming SVC (K8s level)
- Attach HPA rules on Audio Streaming SVC (Istio level)
- Migration Servers Stack from FastAPI to SpringBoot
- Implementation of API Gateway

# Todo List

---

- ~~Frontend Service - version1 (For Canary Deploy)~~
- ~~Frontend Service - version2 (For Canary Deploy)~~
- ~~Payments Service~~
- ~~Backoffice Service (For Polyglot Programming)~~
- ~~Search Service~~
- ~~Download Service~~
- ~~Audio Streaming Service (Healthy - For Circuit Breaking)~~
- ~~Audio Streaming Service (Risky - For Circuit Breaking)~~
- ~~Audio Storage Service~~
- ~~Subscription Service~~
