
# ---- Build stage ----
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre
WORKDIR /app

# Use wildcard to avoid filename issues
COPY --from=build /app/target/*.jar app.jar

# IMPORTANT: let Spring use Render's port
ENV PORT=8080

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
``

