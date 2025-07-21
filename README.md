# ReadRate – Book Review API

A backend API for a book review system, built with Node.js, TypeScript, MySQL, and Redis. Users can register, authenticate, admin add books, and post one review per book. Supports secure JWT authentication, Redis caching, and is ready for CI/CD with Docker and GitHub Actions.

---

## Project Overview

**ReadRate** is a scalable and secure RESTful API for managing a book review system. It allows users to sign up, authenticate, browse books, and leave reviews — all while optimizing performance with Redis caching and safeguarding access via JWT authentication.

### Key Features

* User registration & login with JWT-based authentication
* Refresh token rotation for secure session renewal
* CRUD operations for books
* Users can leave exactly one review per book (CRUD supported)
* Automatic average rating calculation per book
* Search books by title/author with Redis caching
* Pagination for book listings
* Secure middleware-protected routes
* Dockerized for consistent local and production builds
* CI/CD setup with GitHub Actions
* Deployable to Render or similar platforms

---

## Tech Stack

| Category       | Tech                        |
| -------------- | --------------------------- |
| Runtime        | Node.js (v20)               |
| Language       | TypeScript                  |
| Framework      | Express.js                  |
| Database       | MySQL                       |
| ORM            | Sequelize                   |
| Caching        | Redis                       |
| Authentication | JWT, Refresh Token          | |
| DevOps         | Docker, GitHub Actions      |
| Deployment     | Render                      |
| Testing        | Jest                        |

---

## Getting Started

### Prerequisites

* Node.js ≥ 18.x
* MySQL ≥ 8.x
* Redis
* Docker & Docker Compose (optional)
* Git & GitHub
* [Render](https://render.com) account (for deployment)

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/chinasa056/ReadRate-.git
cd ReadRate-
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
PORT=5000

# MySQL
DATABASE_NAME=your_db
DATABASE_USERNAME=your_user
DATABASE_PASSWORD=your_pass
DATABASE_HOST=localhost
DATABASE_DIALECT=mysql

# Redis
REDIS_CLIENT_USERNAME=default
REDIS_CLIENT_PASSWORD=your_redis_password
REDIS_CLIENT_HOST=localhost
REDIS_CLIENT_PORT=6379

# JWT
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
```

4. Start MySQL and Redis (if not already running):

Or use Docker Compose:

```bash
docker-compose up --build
```

5. Run database migrations:

```bash
npx sequelize-cli db:migrate
```

6. Start the server:

```bash
npm run start:dev
```

Server runs at: [https://readrate-api.onrender.com/](https://readrate-api.onrender.com/)

---

## Base API Documentation

### Base URL

```
http://localhost:5000/api/v1 -  developmet
https://readrate-api.onrender.com/ - production
```

### Auth

```
POST /user       - Register a new user
POST /login          - Login and receive JWT + refresh token
POST /refresh-token  - Renew access token with refresh token
```

### Books

```
GET /books                - List all books (with pagination & search)
POST /books               - Create a new book
GET /books/:id            - Get single book details
PUT /books/:id            - Update book info
DELETE /books/:id         - Delete book
```

### Reviews

```
POST /reviews/:bookId     - Add a review for a book
GET /reviews/:bookId - Get all reviews for a book
DELETE /reviews/:id       - Delete your review
```

### Health

```
GET /health               - Service health check
```

---

## Caching with Redis

* Cached search results for books by title or author, get all books, reviews, refresh token etc
* TTL (time to live) for search cache: 10 minutes

---

## Security

* Hashed passwords using bcrypt
* JWT tokens for session handling
* Refresh token rotation and secure storage
* Route protection middleware
* CORS enabled
* Helmet for secure HTTP headers

---

## Testing

Run tests with:

```bash
npm test
```

---

## Docker

### Dockerfile
Start everything:

```bash
docker-compose up --build
```

---

## CI/CD with GitHub Actions

GitHub Actions workflow runs on every push to `main`:

### Workflow steps:

* Install dependencies
* Lint the code
* Run tests
* Trigger deployment to Render using Deploy Hook
```

## Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feat/feature-name`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 💬 Questions or Issues?

Open an issue in the [GitHub repository](https://github.com/chinasa056/ReadRate/issues) or reach out via discussion.
