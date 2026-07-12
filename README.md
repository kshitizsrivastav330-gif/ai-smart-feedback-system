# 🍽️ AI Smart Feedback System

An AI-powered restaurant feedback management system that helps restaurants collect customer feedback using QR codes, generate professional AI reviews, and analyze customer satisfaction through an interactive dashboard.

---

## 🚀 Live Demo

### Frontend
https://ai-smart-feedback-system.vercel.app

### Backend API
https://ai-smart-feedback-system.onrender.com

---

# ✨ Features

- 🔐 JWT Authentication (Login & Register)
- 🤖 AI Review Generation using Groq AI
- ⭐ Customer Rating System (1–5 Stars)
- 📱 QR Code Based Feedback Collection
- 📊 Interactive Analytics Dashboard
- 📈 Rating Distribution Charts
- 💾 Cloud Database (TiDB Cloud)
- 🌐 REST APIs using Spring Boot
- ☁️ Backend deployed on Render
- ⚡ Frontend deployed on Vercel
- 📱 Responsive UI

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Axios
- React Router
- Recharts
- React QR Code
- CSS

## Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- Maven

## Database
- TiDB Cloud (MySQL Compatible)

## AI
- Groq API

## Deployment
- Vercel
- Render

---

# 📸 Screenshots

## Home Page

<img width="842" height="617" alt="image" src="https://github.com/user-attachments/assets/ba477ac7-d749-4a3e-999c-4ae16abfa8a9" />



---

## Dashboard

<img width="619" height="504" alt="image" src="https://github.com/user-attachments/assets/6b042e2d-da74-4efc-b932-7b761f80e123" />

<img width="587" height="425" alt="image" src="https://github.com/user-attachments/assets/7d1559cf-3270-403e-8b01-b5d9276a7a1e" />




---

## Login

<img width="556" height="629" alt="image" src="https://github.com/user-attachments/assets/4cdc0cd9-acd6-4483-b83f-a4498709ccc0" />


---

## Register

<img width="558" height="589" alt="image" src="https://github.com/user-attachments/assets/d45e19d9-b575-4c3f-87c9-dc9c5720b344" />


---

## QR Code

<img width="700" height="700" alt="Kshitiz_WowLife-QR-Code" src="https://github.com/user-attachments/assets/24ad9f87-1477-4f83-8c71-bf3b575a14a9" />



---

## Customer Feedback

<img width="309" height="207" alt="image" src="https://github.com/user-attachments/assets/f193dafc-67a0-41fa-b02b-e3f773eda54d" />


---

# 🏗️ Project Architecture

```
React (Vercel)
       │
       ▼
Spring Boot REST API (Render)
       │
       ▼
TiDB Cloud Database
       │
       ▼
Groq AI API
```

---

# 📂 Project Structure

```
ai-smart-feedback-system
│
├── ai-smart-feedback-backend
│   ├── src
│   ├── pom.xml
│
├── ai-smart-feedback-frontend
│   ├── src
│   ├── public
│   ├── package.json
│
└── README.md
```

---

# 🔑 Main API Endpoints

## Authentication

```
POST /auth/register
```

```
POST /auth/login
```

---

## AI Review

```
GET /comments/generate?rating=5
```

---

## Dashboard

```
GET /comments/dashboard
```

---

## Customer Feedback

```
POST /feedback
```

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/kshitizsrivastav330-gif/ai-smart-feedback-system.git
```

Backend

```bash
cd ai-smart-feedback-backend
```

```bash
./mvnw spring-boot:run
```

Frontend

```bash
cd ai-smart-feedback-frontend
```

```bash
npm install
```

```bash
npm run dev
```

---

# Future Improvements

- Email Notifications
- Export Feedback PDF
- Admin Profile
- Multi Restaurant Support
- Docker Deployment
- Dark Mode
- Pagination
- Search & Filters

---

# 👨‍💻 Author

**Kshitiz Srivastava**

GitHub

https://github.com/kshitizsrivastav330-gif

LinkedIn

https://www.linkedin.com/in/kshitiz-srivastava-673223315

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub.

---
