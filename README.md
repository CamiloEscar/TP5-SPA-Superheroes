# TP5 - SPA Superhéroes

Proyecto full-stack con frontend en React, backend en FastAPI y base de datos MongoDB, todo orquestado con Docker Compose.

---

![alt text](<spa.png>)

## 🚀 Tecnologías utilizadas

- Frontend: React + Vite
- Backend: FastAPI (Python)
- Base de datos: MongoDB
- Contenedores: Docker + Docker Compose

---

## 📁 Estructura del proyecto

TP5-SPA-Superheroes/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

---

## ⚙️ Requisitos previos

- Docker instalado  
  <https://www.docker.com/>
- Docker Compose (incluido en Docker Desktop)

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPO>
cd TP5-SPA-Superheroes
```

1. Levantar los servicios:

```bash
docker compose up --build
```

1. Acceso a la aplicación
    - Frontend → <http://localhost:3000>
    - Backend → <http://localhost:8000>
    - MongoDB → mongodb://localhost:27017

2. Arquitectura
React consume la API del backend
FastAPI expone endpoints REST
MongoDB almacena datos
Docker Compose conecta todo

Conexión a base de datos
El backend usa: mongodb://mongo:27017
