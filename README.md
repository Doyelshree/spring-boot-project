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

## Project Structure

full-stack-professional/
├── backend/
│ ├── src/
│ ├── pom.xml
│ └── ...
├── frontend/
│ └── react/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
├── .gitignore
└── README.md

---

## Getting Started

### Backend Setup (Spring Boot)

1. **Install Java (JDK 17+) and Maven**
2. Navigate to `backend/` and run:
`mvn clean install`
`mvn spring-boot:run`
3. The API will be available at `http://localhost:8080`

### Frontend Setup (React)

1. **Install Node.js (v16+) and npm**
2. Navigate to `frontend/react/` and run:
`npm install`
`npm start`
3. The app will be available at `http://localhost:3000`

---

## Usage

- Access the frontend in your browser.
- Register/login as a user.
- Manage customers: add, edit, delete.
- Upload and update profile pictures.
- All changes are reflected in real-time.

---

## Environment Variables

Create a `.env` file in `frontend/react/` for frontend configuration:

REACT_APP_API_URL=http://localhost:8080

For backend, configure `application.properties` for database and other settings.

---

## Testing

**Backend:**
`mvn test`

**Frontend:**
`npm test`

---

## Scripts

**Backend:**
- `mvn clean install` — Build the backend
- `mvn spring-boot:run` — Run the backend server

**Frontend:**
- `npm install` — Install dependencies
- `npm start` — Start development server
- `npm run build` — Build for production
- `npm test` — Run tests

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a Pull Request

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For questions or support, open an issue on GitHub or contact the maintainer.

---

**Happy Coding!**
