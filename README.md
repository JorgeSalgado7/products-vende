# 🛒 Sistema de Productos para Vende

Este sistema está compuesto por un **microservicio backend** y un **microfrontend** que permiten gestionar productos y categorías de forma modular, escalable y desacoplada.

---

## 📦 ms-products (Microservicio de Productos)

`ms-products` es un microservicio desarrollado con **NestJS** y **TypeScript**, responsable de gestionar el catálogo de productos y sus categorías.

- Expone una **API RESTful**.
- Aplica principios de **Clean Architecture** y **SOLID**.
- Permite operaciones **CRUD** sobre productos, categorías y sus relaciones.
- Utiliza **Prisma ORM** para la gestión de base de datos.
- Se ejecuta de forma independiente y puede ser containerizado con **Docker**.

---

## 🧩 mfe-products-vende (Microfrontend de Productos)

`mfe-products-vende` es una aplicación frontend desarrollada con **Vue 3** y **PrimeVue**, enfocada en la administración visual del catálogo de productos.

- Interactúa con el microservicio `ms-products`.
- Implementa **Clean Architecture** y principios **SOLID** en su estructura.
- Soporta funcionalidades como:
  - Listado de productos y categorías.
  - Creación, edición y eliminación.
  - Validaciones en formularios.
- Diseñado como **Micro Frontend** (MFE), lo que permite su despliegue independiente o integrado.

---
## Requerimientos del sistema
- Node 20
- Docker (Solo se usa para levantar la base de datos)


## 🚀 Instalación del Proyecto

1. Clona el repositorio:

	```bash
	git clone https://github.com/JorgeSalgado7/products-vende.git
	

2. Configura el backend:

	```bash
	cd ms-products
	npm i

3. Crea el archivo .env en la raíz del proyecto con lo siguiente
	```bash
	DATABASE_URL="postgresql://postgres:postgres@localhost:5432/testdb"
	

3. Crea tu DB

	```bash
	docker run --name test-postgres \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_PASSWORD=postgres \
	-e POSTGRES_DB=testdb \
	-p 5432:5432 \
	-d postgres
	```

4. Realiza las migraciones

	```bash
	npx prisma migrate dev
	npx prisma db push
	```

5. Ejecuta el proyecto

	```bash
	npm run start
	```

6. Configura el front

	```bash
	cd ..
	cd mfe-products-vende
	npm i
	npm run serve