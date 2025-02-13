# SportyShoes E-Commerce Platform

## Overview
SportyShoes is a modern full-stack e-commerce platform specializing in athletic footwear. Built with React and Spring Boot, it offers a seamless shopping experience for customers and robust management tools for administrators.

## Key Features
- User authentication with role-based access control
- Product catalog with advanced filtering and search
- Shopping cart and secure checkout process
- Admin dashboard for inventory and order management
- Real-time order tracking
- Analytics and sales reporting
- Responsive design for mobile and desktop

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Vitest for testing
- Storybook for component documentation

### Backend
- Spring Boot 3.0
- MySQL Database
- Spring Security
- OpenAPI (Swagger) documentation
- JPA/Hibernate

## Project Structure

### Frontend Structure
```
ecommerce-frontend/
├── .storybook/
├── node_modules/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AuthContext/
│   │   ├── ColorSchemeToggle/
│   │   ├── Dashboard/
│   │   ├── Header/
│   │   ├── LoggedOut/
│   │   └── Router/
│   ├── pages/
│   │   └── Home.page.tsx
│   ├── _DS_Store
│   ├── App.tsx
│   ├── favicon.svg
│   ├── main.tsx
│   ├── Router.tsx
│   ├── theme.ts
│   └── vite-env.d.ts
├── yarn.lock
└── package.json
```

### Backend Structure
```
ecommerce-site/
├── .idea/
├── .mvn/
├── src/
│   ├── main/
│   │   ├── java/org/example/ecommercesite/
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── model/
│   │   │   ├── repo/
│   │   │   ├── service/
│   │   │   └── EcommerceSiteApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       ├── templates/
│   │       ├── _DS_Store
│   │       └── application.properties
│   └── test/
├── target/
│   ├── classes/
│   ├── generated-sources/
│   ├── generated-test-sources/
│   └── test-classes/
├── .gitattributes
├── .gitignore
├── ecommerce-site.iml
├── HELP.md
├── mvnw
├── mvnw.cmd
└── pom.xml
```

## Setup Instructions

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd ecommerce-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Available scripts:
```json
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "npm run eslint && npm run stylelint",
    "eslint": "eslint . --cache",
    "stylelint": "stylelint '**/*.css' --cache",
    "prettier": "prettier --check \"**/*.{ts,tsx}\"",
    "prettier:write": "prettier --write \"**/*.{ts,tsx}\"",
    "vitest": "vitest run",
    "vitest:watch": "vitest",
    "test": "npm run typecheck && npm run prettier && npm run lint && npm run vitest && npm run build",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build"
}
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd ecommerce-site
```

2. Configure MySQL database in `application.properties`:
```properties
spring.application.name=SpringImage
server.port=8091
cors.allowed.origins=http://localhost:5173

spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/dbnew
spring.datasource.username=root
spring.datasource.password=12345

springdoc.api-docs.path=/api-docs
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. Build the project:
```bash
./mvnw clean install
```

4. Run the application:
```bash
./mvnw spring-boot:run
```

## Development Environment

### Frontend
- Default development server: `http://localhost:5173`
- Storybook: `http://localhost:6006`

### Backend
- API server: `http://localhost:8091`
- Swagger UI: `http://localhost:8091/swagger-ui.html`
- API docs: `http://localhost:8091/api-docs`

## Testing
- Frontend: Run `npm run test` for complete test suite
- Backend: Run `./mvnw test` for Java tests

## Build and Deployment
1. Build frontend:
```bash
cd ecommerce-frontend
npm run build
```

2. Build backend:
```bash
cd ecommerce-site
./mvnw package
```

3. Run the application:
```bash
java -jar target/ecommerce-site-0.0.1-SNAPSHOT.jar
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## License
This project is licensed under the MIT License.# Ecommerce-FullStack
