## Overview
Run the Spring Boot backend (Maven) on port `1111` and verify the `UserController` endpoints. The project has a frontend (Vite) at `http://localhost:5173` referenced by CORS.

## Prerequisites
1. Install JDK 17 and Maven.
2. Ensure MySQL is running locally and a database named `bookingmanagement` exists.
3. Use the datasource credentials defined in `demo/src/main/resources/application.properties` (do not change here). If the DB doesn’t exist, create it: `CREATE DATABASE bookingmanagement;`.

## Start Backend
1. In a terminal: `cd demo`
2. Run: `mvn spring-boot:run`
3. Confirm the app starts on `http://localhost:1111/`.

## Verify Endpoints
Base path: `http://localhost:1111/api/user`
- Register: `POST /register`
  - Example:
    ```
    curl -X POST http://localhost:1111/api/user/register \
      -H 'Content-Type: application/json' \
      -d '{"name":"Alice","email":"alice@example.com","password":"secret","role":"USER"}'
    ```
  - Expect: `201 Created` or `409 Conflict` if email exists.
- Login: `POST /login`
  - Example:
    ```
    curl -X POST http://localhost:1111/api/user/login \
      -H 'Content-Type: application/json' \
      -c cookies.txt \
      -d '{"email":"alice@example.com","password":"secret"}'
    ```
  - Expect: `200 OK` with `{ role, email }`; session cookie stored in `cookies.txt`.

## Optional: Start Frontend
1. In another terminal: `cd app`
2. Install deps: `npm install`
3. Run dev server: `npm run dev`
4. Open `http://localhost:5173` (CORS already allows this origin).

## Notes
- Backend uses `HttpSession` for login; keep cookies for subsequent authenticated calls.
- If startup fails, check MySQL connectivity and datasource values in `application.properties`.
- Packaging alternative: `cd demo && mvn clean package && java -jar target/demo-0.0.1-SNAPSHOT.jar`. 