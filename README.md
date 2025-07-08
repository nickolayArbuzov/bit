# Nestjs REST API with PostgreSQL, Typeorm & Raw SQL

This project is a fully Dockerized REST API built with **Nestjs**, using **Typeorm** for models and **raw SQL** for potential-complex `GET` queries. It includes PostgreSQL and pgAdmin for data management, and exposes interactive API documentation via Swagger and ReDoc.

## ⚙️ Stack

### 🧠 Backend

- <img src="https://image.pngaaa.com/758/7692758-middle.png" alt="NestJS" width="16" height="16" /> **NestJS** — blazing fast API framework
- <img src="https://image.pngaaa.com/758/7692758-middle.png" alt="Class-validator" width="16" height="16" /> **Class-validator** — for request/response validation
- <img src="https://avatars.githubusercontent.com/u/20165699?v=4" alt="TypeORM" width="16" /> **TypeORM** — ORM for models and inserts/updates
- <img src="https://w7.pngwing.com/pngs/525/959/png-transparent-microsoft-azure-sql-database-microsoft-sql-server-cloud-computing-text-trademark-logo.png" alt="SQL" width="24" /> **Raw SQL** — for flexible `GET` queries
- <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" alt="PostgreSQL" width="16" /> **PostgreSQL** — main relational database
- <img src="https://static-00.iconduck.com/assets.00/redis-plain-wordmark-icon-512x511-8n4kzl0q.png" alt="Redis" width="16" /> **Redis** — key-value in-memory database

### ⚙️ Dev & Tooling

- <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png" alt="Docker" width="16" /> **Docker & Docker Compose** — isolated development environment
- <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" alt="PostgreSQL" width="16" /> **pgAdmin** — GUI for PostgreSQL

---

## ✅ Features

- ✅ Fully dockerized backend
- ✅ Swagger / ReDoc out of the box
- ✅ PostgreSQL + pgAdmin integration
- ✅ Raw SQL for potential-complex selects
- ✅ Modular and scalable project layout
- ✅ Redis integration for scalable WebSocket messaging and distributed state sync

---

## 🚀 How to Run

### 🔧 1. Start the application

```bash
docker-compose up
```

## 🚀 What Will Be Launched

- <img src="https://image.pngaaa.com/758/7692758-middle.png" alt="NestJS" width="16" height="16" /> **NestJS app** — [http://localhost:5000](http://localhost:5000)
- <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" alt="PostgreSQL" width="16" /> **PostgreSQL database** — accessible on port `5432`
- <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" alt="PostgreSQL" width="16" /> **pgAdmin dashboard** — [http://localhost:5050](http://localhost:5050)

## 🚀 What Will Be Launched

> 📌 **Make sure ports** `5000`, `5050`, `5432`, `6379`, `8081` are available on your machine.

---

## <img src="https://static-00.iconduck.com/assets.00/swagger-icon-2048x2048-563qbzey.png" alt="Swagger" width="16" /> API Documentation

- **Swagger UI** → [http://localhost:5000/docs](http://localhost:5000/docs)
- **ReDoc** → [http://localhost:5000/redoc](http://localhost:5000/redoc)

---

---

## <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" alt="PostgreSQL" width="16" /> pgAdmin Access

- **URL**: [http://localhost:5050](http://localhost:5050)

### 🔐 Default Credentials

| Field    | Value             |
| -------- | ----------------- |
| Email    | `admin@admin.com` |
| Password | `admin`           |

---

### ➕ How to Add a PostgreSQL Server in pgAdmin

1. Open pgAdmin in your browser: [http://localhost:5050](http://localhost:5050)
2. Click **"Add New Server"**
3. Go to the **"Connection"** tab and enter:

| Field     | Value                |
| --------- | -------------------- |
| Name      | `postgres_container` |
| Host name | `db`                 |
| Port      | `5432`               |
| Username  | `postgres`           |
| Password  | `postgres`           |

## <img src="https://static-00.iconduck.com/assets.00/redis-plain-wordmark-icon-512x511-8n4kzl0q.png" alt="Redis" width="16" /> Redis Commander Access

- **URL**: [http://localhost:8081](http://localhost:8081)

### 🔐 Access Details

| Field    | Value          |
| -------- | -------------- |
| Host     | `redis`        |
| Port     | `6379`         |
| DB Index | `0 (default)`  |
| Password | `not required` |
