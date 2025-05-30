# TodoApp

A full-stack Todo application built with React, TypeScript, and Node.js.

## Project Structure

```
TodoApp/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── features/  # Feature-based modules
│   │   │   ├── tasks/ # Task management feature
│   │   │   └── auth/  # Authentication feature
│   │   ├── components/# Shared components
│   │   ├── hooks/     # Custom React hooks
│   │   ├── utils/     # Utility functions
│   │   └── App.tsx    # Root component
│   └── package.json   # Frontend dependencies
│
└── backend/           # Node.js backend application
    ├── src/
    │   ├── routes/    # API routes
    │   ├── services/  # Business logic
    │   ├── models/    # Data models
    │   └── server.ts  # Server entry point
    ├── prisma/        # Database schema and migrations
    └── package.json   # Backend dependencies
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TodoApp
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up the database
npx prisma migrate dev

# Start the development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Development

### Backend Development

- The backend runs on `http://localhost:3000`
- API documentation is available at `http://localhost:3000/api-docs`
- Database migrations are managed with Prisma

### Frontend Development

- The frontend runs on `http://localhost:5173`
- Uses Vite for fast development and building
- Implements feature-based architecture for better code organization

## Available Scripts

### Backend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run test`: Run tests

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run test`: Run tests

## Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/todoapp"
JWT_SECRET="your-jwt-secret"
PORT=3000
```

### Frontend (.env)

```env
VITE_API_URL="http://localhost:3000"
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT
