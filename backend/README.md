# LinkedIn Campaign + Messaging Backend

A Node.js backend service that powers both:

1. **LinkedIn outreach campaign management**
2. **A real-time unified LinkedIn messaging dashboard**

Built with TypeScript, MongoDB, PostgreSQL, and WebSockets, this backend handles AI-powered messaging, lead scraping, multi-account LinkedIn integration via Unipile, and live chat updates.


## ✨ Features

### 🎯 Campaign & Lead Management

- Full CRUD support for campaigns
- Bulk lead import from LinkedIn search URLs
- Google Generative AI integration to create personalized LinkedIn messages
- MongoDB for campaign & lead storage

### 📨 LinkedIn Messaging Dashboard

- JWT-based user authentication (email/password)
- LinkedIn account integration via `li_at` cookie (via Unipile)
- Initial message sync from connected LinkedIn accounts
- Webhook endpoint to receive new LinkedIn messages
- PostgreSQL for message and account data
- WebSocket setup to send live messages to frontend clients

---

## 🧰 Tech Stack

| Layer       | Tech                                          |
|------------ |-----------------------------------------------|
| Runtime     | Node.js + Express.js                          |
| Language    | TypeScript                                     |
| Databases   | MongoDB (campaigns/leads), PostgreSQL (messages/accounts) |
| Real-time   | WebSocket (`ws` library)                      |
| Auth        | JWT (email & password)                        |
| AI Engine   | Google Generative AI SDK                      |
| LinkedIn API| Unipile (via `li_at` cookie)                  |
| Deployment  | AWS EC2 Instance                              |


## 📦 API Endpoints

### 🔐 Auth Routes (`/api/users`)

- `POST /signup` – User signup
- `POST /login` – User login

### 🧠 AI Message Generation (`/api/personalized-message`)

- `POST /` – Generate LinkedIn message using Google GenAI

### 📋 Campaign Routes (`/api/campaigns`)

- `POST /` – Create a campaign
- `GET /` – Get all campaigns
- `GET /:id` – Get campaign by ID
- `PUT /:id` – Update campaign
- `DELETE /:id` – Delete campaign

### 👥 Lead Routes (`/api/leads`)

- `POST /bulk` – Bulk import leads
- `GET /` – Get all leads

### 🔗 LinkedIn Account Integration (`/api/accounts`)

- `POST /link` – Link and create a LinkedIn account using `li_at`
- `GET /` – Get user’s connected accounts
- `DELETE /` – Unlink and delete a LinkedIn an account

### 💬 Chat Routes (`/api/chats`)

- `GET /` – Get all synced chats (paginated or filtered)
- `GET /:id` – Get all synced messages by id (paginated or filtered)
- `POST /bulk` – Bulk create chats.
- `POST /:id/messages` – Send a message to a LinkedIn account.

### 💬 Messaging Routes (`/api/messages`)

- `GET /` – Get all synced messages (paginated or filtered)
- `GET /:chat_id` – Get all synced messages by chat_id (paginated or filtered)
- `POST /bulk` – Bulk create messages.

### 🪝 Webhook Endpoint (`/webhook/unipile`)

- `POST /on_new_message` – Receive new messages from Unipile webhook

## ⚙️ Project Structure

```text
linkedin_campaign_backend/
├── src/
│   ├── auth/           # JWT auth logic
│   ├── config/         # DB, Unipile, Google AI configs
│   ├── controllers/    # Request handlers
│   ├── dao/            # Data access abstraction
│   ├── dto/            # Types & interfaces
│   ├── models/         # MongoDB & PostgreSQL models
│   ├── routes/         # Express routes
│   ├── services/       # Business logic & integrations
│   ├── utils/          # Helpers (WebSocket, tokens, etc.)
│   └── index.ts        # Entry point
├── package.json
└── tsconfig.json

```

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd linkedin_campaign/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   - Copy the `.env.example` file to create your `.env`:

     ```bash
     cp .env.example .env
     ```

   - Update the values in `.env`:

     ```env
     # Server Configuration (optional)
     PORT=3000  # Default port for the server

     # Database Configuration
     MONGO_URI=mongodb://localhost:27017/linkedin_campaign_db  # Your MongoDB connection string
     
     # AI Configuration
     GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key  # Your Google AI API key
      
     # Unipile
     UNIPILE_API_KEY=your_unipile_api_key
     UNIPILE_API_BASE_URL=https://api.unipile.com
     ```

4. **Database Setup**

   - Ensure MongoDB is installed and running
   - Default connection: `mongodb://localhost:27017/linkedin_campaign_db`
   - The application will automatically create necessary collections

## Running the Server

### Development Mode

```bash
npm run dev
```

This will start the server with hot-reload using tsx.

### Production Build

```bash
npm run build
```

This will compile TypeScript and start the server.

## 🌍 Deployment

Deployed on: [https://linkedin-campaign-rest-api.onrender.com](https://github.com/vivektripaathi)
