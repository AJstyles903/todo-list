# To-Do List Application

A modern, full-stack to-do list application built with React, Node.js, Express, and MySQL. This application provides a clean, intuitive interface for managing tasks with a robust backend API and Docker support for easy deployment.

## 🚀 Features

- **Modern Frontend**: Built with React and Vite for fast development and optimal performance
- **Robust Backend**: RESTful API using Node.js and Express
- **Database Integration**: MySQL database for persistent data storage
- **Docker Support**: Containerized application for easy deployment
- **Environment Management**: Configurable environments for development and production
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Updates**: Dynamic task management without page refreshes

## 🛠️ Tech Stack

### Frontend

- **React** - User interface library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling and responsive design

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **Docker** - Containerization platform

## 📁 Project Structure

```
todo-app/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (22 or higher)
- npm or yarn
- MySQL (v8.0)
- Docker and Docker Compose (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AJstyles903/todo-list.git
   cd todo-app
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=todo_app

   # Server
   PORT=3000
   NODE_ENV=development

   # Frontend
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Install dependencies**

   Backend:

   ```bash
   cd backend
   npm install
   ```

   Frontend:

   ```bash
   cd frontend
   npm install
   ```

4. **Set up the database**

   ```bash
   # Create database and tables
   cd backend
   npm run db:setup
   ```

5. **Start the application**

   Backend:

   ```bash
   cd backend
   npm run dev
   ```

   Frontend (in a new terminal):

   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## 🐳 Docker Setup

For easy deployment using Docker:

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

2. **Run in detached mode**

   ```bash
   docker-compose up -d
   ```

3. **Stop the application**
   ```bash
   docker-compose down
   ```

## 📚 API Endpoints

### Tasks

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/tasks`            | Get all tasks          |
| GET    | `/api/tasks/:id`        | Get a specific task    |
| POST   | `/api/tasks`            | Create a new task      |
| PUT    | `/api/tasks/:id`        | Update a task          |
| DELETE | `/api/tasks/:id`        | Delete a task          |
| PATCH  | `/api/tasks/:id/toggle` | Toggle task completion |

### Example API Usage

**Get all tasks:**

```bash
curl http://localhost:3000/api/tasks
```

## 📝 Usage

1. **Add Tasks**: Click the "Add Task" button to create new to-do items
2. **Mark Complete**: Click the checkbox to mark tasks as completed
3. **Edit Tasks**: Click on a task to edit its title or description
4. **Delete Tasks**: Use the delete button to remove unwanted tasks
5. **Filter**: Use the filter options to view all, completed, or pending tasks

### Run All Tests

```bash
npm run test:all
```

### Environment Variables for Production

Ensure these environment variables are set in production:

- `NODE_ENV=production`
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `PORT` (default: 3000)
<h3 style="text-align: center;">
  <span style="color: pink;">&#9829;</span> Thank you for visiting! <span style="color: pink;">&#9829;</span> 
</h3>
