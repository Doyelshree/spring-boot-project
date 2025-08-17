# Full Stack Professional Project

A comprehensive full-stack application built with **Spring Boot** (Java) for the backend and **React** (JavaScript/TypeScript) for the frontend. The project demonstrates modern web development practices, including RESTful APIs, database integration, authentication, and file uploads.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
    - [Frontend Setup (React)](#frontend-setup-react)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [AWS S3 Integration](#aws-s3-integration)
- [Testing](#testing)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Customer management (CRUD)
- Profile picture upload and preview
- Authentication and authorization
- Responsive UI with React
- Form validation (Yup)
- RESTful API with Spring Boot
- Database integration (SQL)
- Error handling and notifications

---

## Tech Stack

**Backend:**
- Java
- Spring Boot
- Maven
- SQL (e.g., H2, MySQL, PostgreSQL)

**Frontend:**
- React
- JavaScript / TypeScript
- npm
- react-dropzone (file uploads)
- yup (form validation)
- axios (API requests)

**Other:**
- Babel
- Webpack
- Jest (testing)
- ESLint & Prettier (linting & formatting)

---

## Getting Started

### Backend Setup (Spring Boot)

1. **Install Java (JDK 17+) and Maven**
2. Navigate to `backend/` and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
3. The API will be available at http://localhost:8080

### Frontend Setup (React)

1. Install Node.js (v16+) and npm
2. Navigate to frontend/react/ and run:
   ```bash
   npm install
   npm start
   ```
3. The app will be available at http://localhost:3000

---

### Usage

- Access the frontend in your browser.
- Register/login as a user.
- Manage customers: add, edit, delete.
- Upload and update profile pictures.
- All changes are reflected in real-time.

---

### Environment Variables
Create a .env file in frontend/react/ for frontend configuration:
`REACT_APP_API_URL=http://localhost:8080`
For backend, configure application.properties for database and other settings.

---

### AWS S3 Integration
AWS S3 is used in this project for storing and serving customer profile pictures. The backend integrates with AWS S3 to handle file uploads, retrieval, and deletion securely. When a user uploads a profile picture via the React frontend, the image is sent to the Spring Boot backend, which then uploads it to an S3 bucket. The S3 image URL is stored and used to display the profile picture in the application.
- Purpose: Used for storing customer profile pictures and other file uploads.

- Backend: Spring Boot handles file upload, retrieval, and deletion with AWS S3 SDK.

- Frontend: React fetches and displays images using S3 URLs.

- Configuration:

 - - Set AWS credentials and S3 bucket details in application.properties.

- - Ensure IAM permissions for S3 access.

Example properties:
```bash
aws.s3.bucket-name=your-bucket-name
aws.access-key=your-access-key
aws.secret-key=your-secret-key
aws.region=your-region
```

#### Note:
Do not commit sensitive AWS credentials to version control. Use environment variables or a secure secrets manager.

---

### Testing
#### Backend:
`mvn test`
#### Frontend:

`npm test`

---

### Scripts
####  Backend:
- `mvn clean install`-Build the backend
- `mvn spring-boot:run`— Run the backend server

#### Frontend
- `npm install` — Install dependencies
- `npm start` — Start development server
- `npm run build` — Build for production
- `npm test` — Run tests

---

### Contributing
1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -am 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Create a Pull Request

---

### License
This project is licensed under the MIT License. See the LICENSE file for details.
