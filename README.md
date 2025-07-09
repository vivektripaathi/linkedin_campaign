# LinkedIn Campaign + Messaging Dashboard

A full-stack application to manage LinkedIn outreach campaigns and unify all LinkedIn messages across accounts — with AI-powered personalized messaging, web scraping, and real-time conversation updates.

## 📌 Overview

This project is built as part of the OutFlo Founding Tech Internship Task. It demonstrates a scalable MERN stack application with:

- 🎯 Campaign management for LinkedIn outreach
- 📨 Unified LinkedIn messaging dashboard
- 🤖 AI-generated personalized messages
- 🕸️ Lead scraping and integration
- ⚡ Real-time WebSocket updates and webhook ingestion
- ☁️ Fully deployed and production-ready

---

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
| Real-time  | WebSockets via ws                          |
| LinkedIn API | Unipile (for message sync via li_at cookie) |
| Deployment | Frontend: Vercel · Backend: AWS EC2        |

## ✨ Features

### 🎯 Campaign Management

- 📋 Campaign management with full CRUD support
- 🔄 Campaign status toggle: ACTIVE, INACTIVE, DELETED
- 🤖 Personalized LinkedIn message generation using AI
- 🔎 Lead scraping from LinkedIn search URL
- 📥 Lead storage and searchable UI display

### 📨 Unified LinkedIn Messaging Dashboard (Unibox)

- 🔐 JWT-based user authentication (email/password)
- 🔗 Connect multiple LinkedIn accounts using li_at cookie (via Unipile)
- 📨 Initial message sync from all connected accounts
- 🌐 Webhook endpoint for real-time new message ingestion
- ⚡ WebSocket setup for pushing new messages live to the UI
- 🧾 Unified, chronological message feed across accounts

### 🔗 Live Links

- `/frontend` → [Live Demo](https://campaign-pro.vercel.app/)
- `/backend` → [Live API](https://linkedin-campaign-rest-api.onrender.com)

## 🤝 Author & Contact

- Developed by [Vivek Tripathi](https://github.com/vivektripaathi)
- For queries, reach out via [vivektripathi8005@gmail.com](https://github.com/vivektripaathi)
