# Stage 1: Build the application
FROM gradle:8.4-jdk21 AS build
WORKDIR /app
COPY . .
RUN gradle bootJar --no-daemon

# Stage 2: Run the application
FROM openjdk:21
WORKDIR /app
COPY --from=build /app/build/libs/*jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]