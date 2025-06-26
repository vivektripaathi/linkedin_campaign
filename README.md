# LinkedIn Campaign

A full-stack application to manage LinkedIn outreach campaigns with AI-powered personalized message generation and scraped lead integration.

## 📌 Overview

This project is built as part of the OutFlo Founding Tech Internship Task, aimed at demonstrating the ability to build a scalable, production-grade microservice-based system with:

- 🔧 A Node.js + Express + MongoDB backend
- 🎨 A React + TypeScript frontend
- 🤖 AI integration for message generation (using Google Generative AI)
- 🕸️ Web scraping and lead management via LinkedIn

## 📂 Project Structure

```text
linkedin-campaign/
├── backend/      # Express.js + TypeScript + MongoDB backend
├── frontend/     # React + TypeScript frontend
└── README.md     # Root readme (you are here)
```

## 🧰 Tech Stack

| Layer      | Tech Details                               |
| ---------- | ------------------------------------------ |
| Frontend   | React, TypeScript, ShadCn UI, Tailwind CSS |
| Backend    | Node.js, Express, TypeScript, MongoDB      |
| AI Engine  | Google Generative AI SDK                   |
| Deployment | Frontend: Vercel · Backend: Render         |

## ✨ Features

- 📋 Campaign management with full CRUD support
- 🔄 Campaign status toggle: ACTIVE, INACTIVE, DELETED
- 🤖 Personalized LinkedIn message generation using AI
- 🔎 Lead scraping from LinkedIn search URL
- 📥 Lead storage and searchable UI display

📦 Individual Service Documentation

- `/frontend` → [Live Demo](https://campaign-pro.vercel.app/)
- `/backend` → [Live API](https://linkedin-campaign-rest-api.onrender.com)

## 🤝 Author & Contact

- Developed by [Vivek Tripathi](https://github.com/vivektripaathi)
- For queries, reach out via [vivektripathi8005@gmail.com](https://github.com/vivektripaathi)
