# 🧱 Item Manager — Fullstack CRUD App with Django & React

This project is a full-stack application built as a take-home technical challenge for **MyChoice Financial**. It includes a Django REST API backend and a React TypeScript frontend to demonstrate end-to-end CRUD functionality with clean design, thoughtful structure, and developer experience in mind.

---

## ✨ Features

- 🔁 Full CRUD for managing `Item` entities
- 📦 Django REST Framework for scalable, secure APIs
- ⚛️ React + TypeScript frontend built with Vite
- 🌈 Chakra UI for accessible, clean, responsive design
- 🧠 Enforces uniqueness constraints by item group (Primary/Secondary)
- 📡 Real-time updates using optimistic UI updates
- 🧪 Easily extendable with testing, auth, or AI suggestions (next steps!)

---

## 🧩 Technologies Used

| Layer    | Stack                                                   |
|----------|---------------------------------------------------------|
| Backend  | ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white) ![DRF](https://img.shields.io/badge/Django_REST_Framework-092E20?style=for-the-badge&logo=django&logoColor=white) |
| Frontend | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                |
| UI       | ![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)                                                                                                   |


---

## 🗃️ Data Model

```ts
Item {
  id: UUID
  name: string       // unique within its group
  group: "Primary" | "Secondary"
  created_at: datetime
  updated_at: datetime
}
```

## 🚀 Getting Started
🐍 Backend Setup (Django)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
The API will run on: http://localhost:8000
```

## ⚛️ Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
The app will run on: http://localhost:5173

## 🔌 API Reference

| Method      | Endpoint	   | Description        |
|-------------|--------------|--------------------|
| GET         | /items/	     | List all items     |
| POST	      | /items/	     | Create a new item  |
| GET         |	/items/{id}/ | Retrieve item by ID|
| PATCH	      | /items/{id}/ | Update item by ID  |                


All endpoints follow standard REST and return appropriate HTTP status codes (400, 404, 201, etc.).


## 📌 Notes
Both apps run independently in dev mode

CORS is enabled via django-cors-headers to allow frontend-backend communication

Chakra UI was chosen for rapid, elegant component design


## 📮 Contact
This project was developed by [Hassan Hashmi](https://hassan-hashmi.com/) as part of the MyChoice Full Stack Developer technical challenge. Please reach out if you'd like a walkthrough or code tour.
