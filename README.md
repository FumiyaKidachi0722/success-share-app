# SuccessShare

SuccessShare is a platform for users to share their problems and find solutions from others who have successfully dealt with similar situations.

## Project Structure

This repository contains two main directories:

- `frontend`: Contains the Next.js frontend application.
- `backend`: Contains the NestJS backend application.

## Getting Started

### Prerequisites

- Node.js
- Yarn

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/success-share.git
   cd success-share
   ```

2. **Setup Frontend:**

   ```sh
   cd frontend
   yarn install
   cp .env.example .env.local
   # Add your Notion API key and database IDs in .env.local
   yarn dev
   ```

3. **Setup Backend:**
   ```sh
   cd backend
   yarn install
   cp .env.example .env
   # Add your Notion API key and database IDs in .env
   yarn start:dev
   ```

### Usage

- **Frontend**: Runs on http://localhost:3000
- **Backend**: Runs on http://localhost:3001

### Environment Variables

#### Frontend

- `NOTION_API_KEY`: Your Notion API key.
- `NOTION_DATABASE_ID_POSTS`: The database ID for storing posts.
- `NOTION_DATABASE_ID_SUCCESSES`: The database ID for storing success stories.

#### Backend

- `NOTION_API_KEY`: Your Notion API key.
- `NOTION_DATABASE_ID_POSTS`: The database ID for storing posts.
- `NOTION_DATABASE_ID_SUCCESSES`: The database ID for storing success stories.

### License

[MIT](LICENSE)
