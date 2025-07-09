# 🧱 Fullstack Dockerized App: NestJS + PostgreSQL + Nuxt

A full-featured containerized monorepo with:

- NestJS backend (TypeORM)
- PostgreSQL
- Nuxt 3 frontend with Chart.js and Pinia
- Docker Compose orchestration

---

## ⚙️ Tech Stack

### 🔧 Backend (`/backend`)

- NestJS (modular backend framework)
- TypeORM for models and inserts
- Swagger (OpenAPI docs)

### 🌐 Frontend (`/frontend`)

- Nuxt 3 (Vue 3 SSR framework)
- Pinia (state management)
- Chart.js + vue-chartjs (visualizations)
- Axios (API requests)

### 🛢️ Database

- PostgreSQL (main DB)

---

## ✅ Features

- ✅ Full Docker Compose setup
- ✅ Live reload for backend/frontend
- ✅ Swagger & ReDoc API docs
- ✅ Streaming price data (abortable)

---

## 🚀 Quick Start

```bash
git clone https://github.com/your/repo.git
cd your/repo
cp .env.example .env
docker-compose up --build
```

---

## 🌍 URLs

| Service     | URL                         |
| ----------- | --------------------------- |
| Frontend    | http://localhost:3000       |
| Backend API | http://localhost:5000       |
| Parser API  | http://localhost:5001       |
| Swagger     | http://localhost:5000/docs  |
| ReDoc       | http://localhost:5000/redoc |
