# 1. 사용할 베이스 이미지
FROM openjdk:17-jdk-slim AS build

# 2. 작업 디렉토리 생성 및 설정
WORKDIR /app

# 3. Gradle Wrapper와 필요한 파일 복사
COPY gradlew ./
COPY gradle/ ./gradle/
COPY build.gradle.kts ./
COPY settings.gradle.kts ./
COPY src/ ./src/

# 4. Gradle 빌드
RUN ./gradlew clean build

# 5. 최종 이미지 구성
FROM openjdk:17-jdk-slim

# 6. JAR 파일 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 7. 환경 변수 설정 (기본 포트 설정)
ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=8080

EXPOSE 8080

# 8. 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app.jar", "--server.port=${SERVER_PORT}"]
