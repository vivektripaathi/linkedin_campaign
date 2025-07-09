# LinkedIn Campaign + Messaging Frontend (Unibox)

This is the frontend for a LinkedIn outreach and unified messaging system. Built with **React Router + TypeScript + ShadCn UI**, it allows users to:

- Manage LinkedIn outreach campaigns
- Scrape and view leads
- Generate AI-based personalized LinkedIn messages
- Connect multiple LinkedIn accounts
- View and interact with all LinkedIn messages in a unified inbox — in real-time

## ✨ Features

### 🎯 Campaign Management

- ✅ Campaign dashboard to view all campaigns
- ➕ Create / Edit / Delete campaigns
- 🔀 Toggle status between ACTIVE / INACTIVE
- 🎯 Link each campaign with leads and messages

### 🧠 AI-Powered LinkedIn Messaging

- UI to generate personalized messages for each lead
- Messages powered by Google GenAI

### 🔎 Lead Search & Display

- List leads scraped from LinkedIn search URLs
- Campaign-wise lead display
- Dynamic outreach message generation

### 📨 Unified LinkedIn Messaging (Unibox)

- 🔐 User authentication (email/password)
- 🔗 Connect LinkedIn accounts via `li_at` cookie
- 📨 View all messages across accounts in a single inbox
- ⚡ Live updates using WebSocket
- 🧾 Optional filters (by account, unread, replied, etc.)

## 🧱 Tech Stack

| Layer     | Tech Used                       |
|---------- |---------------------------------|
| Framework | React + React Router            |
| Language  | TypeScript                      |
| Styling   | Tailwind CSS + ShadCn UI        |
| State     | React Context + Hooks           |
| Auth      | Cookie-based JWT auth           |
| Live Data | WebSocket (`ws`)                |
| Hosting   | Vercel                          |

## 📸 UI Screens (Highlights)

1. **Campaign Management**
   - Dashboard list with status toggles
   - Add/Edit modal forms

2. **Lead Management**
   - Per-campaign lead table
   - Message preview and personalization

3. **Account Management**
   - Connect LinkedIn accounts
   - View Connected LinkedIn accounts
   - Delete Connected LinkedIn account

4. **Messaging**
   - Connect LinkedIn accounts
   - Real-time unified message feed
   - Auto-scroll and reply tracking (optional)

## 🔧 Getting Started

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
     # Backend API URL configuration
     VITE_API_BASE_URL=http://localhost:3000 # if started backend locally
     ```

4. **Run the Dev Server**

    ```bash
    npm run dev
    ```

    Make sure the backend service is running on the expected URL.

## 🌍 Deployment

Deployed on: [https://campaign-pro.vercel.app](https://github.com/vivektripaathi)
