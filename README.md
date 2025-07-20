
```markdown
# 📚 Book Review API

A scalable and well-structured Book Review RESTful API built with Node.js, Express.js, TypeScript, MySQL, Sequelize ORM, Redis for caching, and Docker.

## 🚀 Features

- ✅ User authentication with JWT (access & refresh tokens)
- 📚 Full CRUD operations for Books and Reviews
- ⭐ Average rating calculation for books
- 🔍 Filtering, sorting, and pagination for books
- 🔥 Redis caching for performance optimization
- 🧪 Unit and integration testing
- 🐳 Docker support for easy setup
- 📄 Swagger documentation (optional/coming soon)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MySQL with Sequelize ORM
- **Caching:** Redis (`ioredis`)
- **Authentication:** JWT
- **Containerization:** Docker
- **Testing:** Jest & Supertest
- **Utilities:** ESLint, Prettier

---

## 📁 Project Structure

```

src/
├── api/
│   ├── route/
│   ├── middleware/
│   └── requestHandlers/
├── core/
│   ├── config/
│   ├── constant/
│   ├── controller/
│   ├── database/
│   ├── errors/
│   ├── helpers/
│   ├── interfaces/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── validations/
├── app.ts
└── server.ts

````

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/en/) v18+
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com/)

---

### 🐳 Using Docker (Recommended)

1. **Clone the repository**

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
````

2. **Create a `.env` file**

```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Acha105#
DB_NAME=book_management

REDIS_HOST=redis
REDIS_PORT=6379

JWT_SECRET=review
REFRESH_SECRET=your-refresh-secret
```

3. **Start services**

```bash
docker-compose up --build
```

This will start:

* MySQL (on port `3306`)
* Redis (on port `6379`)
* App server (on port `5000`)

---

### 🧪 Run Tests

```bash
npm run test
```