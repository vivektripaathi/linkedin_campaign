# LinkedIn Campaign Backend

This is the frontend of linkedin Campaign built with React-Router framework. It serves as the UI for managing outreach campaigns and exporting leads from linkedin search and generating AI-powered personalized LinkedIn messages.

## 🚀 Features

- ✅ Campaign Dashboard: List all active/inactive campaigns
- ➕ Create/Edit/Delete Campaigns
- 🔀 Toggle campaign status between ACTIVE and INACTIVE
- 🧠 LinkedIn Message Generator UI
- 🔎 Lead Search: Display scraped LinkedIn profiles from the local database

## 🧱 Tech Stack

- React-Router
- TypeScript
- ShadCn UI with Tailwind CSS
- Hosted on Vercel

## 📸 UI Screens

1. **Campaign Management:**

    - Dashboard with campaign list
    - Add/Edit forms
    - Toggle button for ACTIVE/INACTIVE status

2. **Lead Management:**

    - Dashboard with campaign list
    - Form to generate linked outreach message for leads.

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
