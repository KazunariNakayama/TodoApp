# TodoApp

A modern task management application built with React and Node.js, featuring task and subtask management capabilities.

## Features

- Create, read, update, and delete tasks
- Manage subtasks for each task
- Modern and responsive UI with Tailwind CSS
- RESTful API backend
- TypeScript support
- Prisma ORM for database management

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- pnpm
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd TodoApp
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
pnpm install

# Install frontend dependencies
cd ../frontend
pnpm install
```

3. Set up the database
```bash
cd backend
pnpm prisma migrate dev
```

4. Start the development servers

Backend:
```bash
cd backend
pnpm dev
```

Frontend:
```bash
cd frontend
pnpm start
```

## Project Structure

```
TodoApp/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── model/
│   │   └── utils/
│   └── prisma/
└── frontend/
    ├── src/
    │   ├── components/
    │   └── api/
    └── public/
```

## API Endpoints

### Tasks
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

### Subtasks
- GET /api/subtasks - Get all subtasks
- POST /api/subtasks - Create a new subtask
- PUT /api/subtasks/:id - Update a subtask
- DELETE /api/subtasks/:id - Delete a subtask

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
