# Stage 1: Build Spring Boot JAR using official Maven + Java 21
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml from backend
COPY backend/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B || true

# Copy source code and build JAR
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Lightweight JRE 21 Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["java", "-jar", "app.jar"]
