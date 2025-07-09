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
    
   |View | Campaign Dashbard | Create Campaign Form |
   |--|--|--| 
   |Desktop| <img width="1680" alt="Screenshot 2025-07-10 at 04 44 31" src="https://github.com/user-attachments/assets/80392b24-46a1-4249-a325-39fc68f5d118" /> | <img width="614" alt="Screenshot 2025-07-10 at 04 47 13" src="https://github.com/user-attachments/assets/66286a66-03ca-451c-810e-5f89d8093fa7" /> |
   | Mobile | ![image](https://github.com/user-attachments/assets/9934e0b4-bc74-4141-b372-96d12fcb3b21) | ![image](https://github.com/user-attachments/assets/5c7aca09-9879-4c7b-bf58-b2bda7782122) |


2. **Lead Management**
   - Per-campaign lead table
   - Message preview and personalization

   |View | Leads Dashbard | Generate Outreach Message Form |
   |--|--|--| 
   | Desktop | <img width="1680" alt="Screenshot 2025-07-10 at 04 53 55" src="https://github.com/user-attachments/assets/88f30b92-2906-4c8a-aebc-d7e3ed04a4cc" /> | <img width="711" alt="Screenshot 2025-07-10 at 04 54 39" src="https://github.com/user-attachments/assets/5f18a579-b009-4c55-bf74-5331e190b9d1" /> |
   | Mobile | ![image](https://github.com/user-attachments/assets/377d896a-cd79-4d9e-a913-0b0757e54960) | ![image](https://github.com/user-attachments/assets/3c4d1610-af24-4d04-bb12-944c7b0dc787) |



3. **Account Management**
   - Connect LinkedIn accounts
   - View Connected LinkedIn accounts
   - Delete Connected LinkedIn account
  
   |View | Accounts Dashbard | Connect Account Form |
   |--|--|--|
   | Desktop | <img width="1680" alt="Screenshot 2025-07-10 at 04 55 46" src="https://github.com/user-attachments/assets/30e9b104-15b0-4022-966e-4346e53b2628" /> | <img width="709" alt="Screenshot 2025-07-10 at 04 56 00" src="https://github.com/user-attachments/assets/a4f13a35-72b9-4d0e-b742-66bab299915d" /> |
   | Mobile | ![image](https://github.com/user-attachments/assets/0a7a8d3c-cd8e-4d44-99c9-fc0425de7f24) | ![image](https://github.com/user-attachments/assets/5c63b422-f89f-44af-b556-a2279761a7be) |

5. **Messaging**
   - Connect LinkedIn accounts
   - Real-time unified message feed
   - Auto-scroll and reply tracking (optional)
  
   |View | Chat List | Chat Box |
   |--|--|--|
   | Desktop |<img width="1680" alt="Screenshot 2025-07-10 at 05 00 05" src="https://github.com/user-attachments/assets/70594d53-74da-468f-9346-c3805865ede8" /> | <img width="1680" alt="Screenshot 2025-07-10 at 05 00 29" src="https://github.com/user-attachments/assets/1f5f0e92-f514-419d-8b35-0c987ad5a2a9" /> |
   | Mobile | ![image](https://github.com/user-attachments/assets/906560b1-edc7-46cc-beed-97d9af6ee240) | ![image](https://github.com/user-attachments/assets/940ce42e-7a40-4223-98cb-b961dae7b922) |

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
