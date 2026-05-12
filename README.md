# AI Resume Checker

AI-powered ATS Resume Analyzer built using:

- React
- Node.js
- Express
- MongoDB
- FastAPI
- JWT Authentication

## Features

- Resume Upload
- ATS Score
- Skill Detection
- Missing Skills Analysis
- Login/Register
- JWT Authentication
- Resume History Dashboard

## Tech Stack

Frontend:
- React
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB

AI Service:
- FastAPI
- pdfplumber

## Run Project

### Backend

cd server
npm install
npm run dev

### Frontend

cd client
npm install
npm start

### AI Service

cd ai-service
pip install fastapi uvicorn pdfplumber
uvicorn main:app --reload
