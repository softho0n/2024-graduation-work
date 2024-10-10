# 1. 사용할 베이스 이미지
FROM gradle:8.10.2-jdk-alpine AS TEMP_BUILD_IMAGE
# 2. 작업 디렉토리 생성 및 설정
WORKDIR /app

# 3. Gradle Wrapper와 필요한 파일 복사
COPY gradlew ./
COPY gradle/ ./gradle/
COPY build.gradle.kts ./
COPY settings.gradle.kts ./
COPY src/ ./src/

# 4. Gradle 빌드
RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true
COPY . /app
RUN gradle clean build --no-daemon

FROM openjdk:17-jdk-alpine AS FINAL_IMAGE
WORKDIR /app

# 6. 빌드된 JAR 파일 복사
COPY --from=TEMP_BUILD_IMAGE /app/build/libs/*.jar app.jar
ENV SPRING_PROFILES_ACTIVE=prod
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
