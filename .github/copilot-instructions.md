# GitHub Copilot Instructions - SolidarianID Project

Act as a Senior Software Engineer expert in Full-Stack development with TypeScript and Nestjs. This repository contains the source code of **SolidarianID**, a platform for managing volunteering and charitable causes for the organization "Voluntarios Sin Fronteras" (Volunteers Without Borders).

Use the following context, architecture rules, and coding standards for all code suggestions and generation.

## 1. Technology Stack

- **Language:** TypeScript (Frontend and Backend).
- **Backend:** Node.js, NestJS.
- **Web Frontend:**
  - Nest.js and Express (for the administration application) with MVC approach (monolithic application).
  - React, Next.js (with PWA approach) for the main user application.
- **Mobile Frontend:** React Native.
- **Database:** Hybrid (SQL for transactional relationships, NoSQL for flexible documents).
- **API:** REST (OpenAPI/Swagger) and GraphQL.
- **Authentication:** OAuth2 and JWT.

## 2. System Architecture and Design

### Backend (NestJS)

The backend follows an advanced modular architecture. Do not suggest simple MVC structures unless explicitly requested for prototypes.

- **Patterns:** Clean Architecture, Hexagonal Architecture (Ports and Adapters), and Domain-Driven Design (DDD).
- **Microservices:** The system is organized into microservices communicated by events.
- **Advanced Patterns:** Implement **CQRS** (Command Query Responsibility Segregation) and **Event Sourcing** in modules requiring high scalability or auditing.
- **Folder Structure (DDD):**
  - `Domain`: Entities, Value Objects, Ports (Repository Interfaces), Business Rules. **No framework dependencies.**
  - `Application`: Use Cases, Commands, Queries, DTOs.
  - `Infrastructure`: Repository implementation (TypeORM/Mongoose), API Controllers, GraphQL Resolvers, External Adapters.

### Frontend (React/Next.js)

- **Components:** Functional with Hooks.
- **State:** Context API or global state managers depending on complexity.
- **Styles:** Responsive and accessible design.
- **Accessibility:** Strict compliance with **WCAG 2.2 Level AA**.

## 3. Business and Domain Rules (SolidarianID)

Consider the following entities and relationships when generating business logic:

- **Users:** Have a "Unique ID" (digital identity) and a history (volunteer resume). Can be volunteers or administrators.
- **Communities:** Groups of users with common interests (e.g., "Friends for Africa"). Require an Administrator.
- **Charitable Causes:**
  - Must be validated by administrators.
  - Must be explicitly related to one or more **SDGs (Sustainable Development Goals)** from the UN.
  - Can receive donations or support without registration.
- **Charitable Actions:** Concrete projects within a cause (e.g., "Food Collection"). Must have quantifiable objectives.
- **Events:** In-person activities with date, time, and location to give visibility to causes.

## 4. Coding and Quality Standards

- **Code Style:** Follow the **Airbnb Style Guide** for JavaScript/TypeScript.
- **Linter:** Strict ESLint rules. Avoid `any` in TypeScript whenever possible.
- **Quality:** Code must be clean ("Clean Code"), modular, and prepared for static analysis with **SonarQube** (avoid Code Smells).
- **Security:**
  - Strict input validation.
  - Personal data protection (GDPR).
  - JWT authentication to protect endpoints.

## 5. Testing Strategy

When generating tests, use the following tools and approaches defined in the test plan:

- **Unit Tests:** Use **Jest**. Apply white-box techniques (basic paths, conditions).
- **Mutation:** Code must be robust against mutation testing with **Stryker** (avoid false positives).
- **Integration/API:** Use **Supertest** with in-memory or dockerized test database. `.rest` files in `request` folder.
- **Frontend:** Use **jest-dom** and React Testing Library.
- **E2E:** Complete scenarios using **Cypress**.
- **Performance:** Keep in mind APDEX metrics (similar to JMeter) for critical endpoints.

## 6. Specific Generation Instructions

- When creating a **Charitable Cause**, make sure to include the field to link the SDGs.
- If generating a **Controller** in NestJS, use Swagger/OpenAPI decorators to document the response.
- If generating data access logic, justify whether to use a Relational or NoSQL database based on the CAP theorem (Consistency vs Availability) described in the design.
- For the Frontend, ensure all interactive elements have ARIA labels and are keyboard navigable.
