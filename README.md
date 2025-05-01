# Task Management Application

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

A full-stack task management application built with Node.js, Express, MongoDB, and React. This application allows users to create, track, update, and delete tasks with an intuitive user interface.

## Features

- **User Authentication:** Secure registration and login system
- **Task Management:** Create, view, update, and delete tasks
- **Task Filtering:** Filter tasks by status or search by title
- **Task Sorting:** Sort tasks by due date or status
- **Responsive Design:** Works on desktop and mobile devices

## Tech Stack

### Backend

- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- CORS support

### Frontend

- React 19
- React Router v7
- TailwindCSS v4
- Context API for state management

## Prerequisites

- Node.js v16+ and npm
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/task-management.git
cd task-management
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the backend server:

   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. For production build:
   ```bash
   npm run build
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user (requires authentication)

### Tasks

- `GET /api/tasks` - Get all tasks (requires authentication)
- `GET /api/tasks/:id` - Get a specific task (requires authentication)
- `POST /api/tasks` - Create a new task (requires authentication)
- `PUT /api/tasks/:id` - Update a task (requires authentication)
- `DELETE /api/tasks/:id` - Delete a task (requires authentication)

## Project Structure

```
task-management/
├── backend/                # Backend code
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── app.js          # Express app setup
│   ├── .env                # Environment variables (create this)
│   ├── package.json        # Backend dependencies
│   └── server.js           # Server entry point
│
└── frontend/               # Frontend code
    ├── src/
    │   ├── components/     # React components
    │   ├── context/        # Context providers
    │   ├── pages/          # Page components
    │   ├── services/       # API service functions
    │   ├── utils/          # Utility functions
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # React entry point
    ├── .env                # Environment variables (create this)
    └── package.json        # Frontend dependencies
```

## Authentication Flow

1. User registers or logs in
2. Server validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Token is included in Authorization header for subsequent API requests
5. Protected routes check for valid token before processing requests

## Task Model

```javascript
{
  title: String,         // Required, max 100 chars
  description: String,   // Required
  status: String,        // "To Do", "In Progress", or "Done"
  dueDate: Date,         // Required
  userId: ObjectId,      // Reference to User model
  createdAt: Date        // Automatically set
}
```

## Deployment

### Backend Deployment

The backend can be deployed to any Node.js hosting service like Heroku, Render, Railway, or DigitalOcean.

### Frontend Deployment

The frontend is configured to be deployed on Vercel, as indicated by the CORS configuration in the backend.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Express.js for the backend framework
- React for the frontend library
- MongoDB for the database
- TailwindCSS for styling
