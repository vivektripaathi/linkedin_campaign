# LinkedIn Campaign Backend

A Node.js backend service for managing LinkedIn outreach campaigns with AI-powered personalized messaging.

## Features

- Campaign management (CRUD operations)
- AI-powered personalized LinkedIn message generation
- Error handling middleware
- Async operation wrapper
- Type-safe DTOs and data validation

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **AI Integration**: Google AI SDK
- **Validation**: class-validator, class-transformer
- **Other Tools**: UUID for IDs

## API Endpoints

### Campaign Routes (`/api/campaigns`)

- `POST /` - Create a new campaign
- `GET /` - Get all campaigns
- `GET /:id` - Get campaign by ID
- `PUT /:id` - Update campaign by ID
- `DELETE /:id` - Delete campaign by ID

### LinkedIn Message Routes (`/api/personalized-message`)

- `POST /` - Generate personalized LinkedIn message using AI

## Project Structure

```text
linkedin_campaign_backend/
├── src/
│ ├── config/ # Configuration files (DB, AI)
│ ├── controllers/ # Request handlers
│ ├── dao/ # Data Access Objects
│ ├── dto/ # Data Transfer Objects
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── utils/ # Utility functions
│ ├── app.ts # Express app setup
│ └── index.ts # Entry point
├── package.json
└── tsconfig.json
```

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd linkedin_campaign_backend
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
