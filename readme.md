# Todo App

A full-stack JavaScript todo application with a React frontend and Node.js backend.

## Overview

This project is a modern todo application that demonstrates a complete full-stack JavaScript architecture. The frontend is built with React 18 and bundled using Parcel, while the backend is a lightweight Node.js HTTP server. The application uses JSONPlaceholder as a mock REST API for persistent-like data operations.

## What the App Does

- **View Todos**: Display a list of todo items fetched from the server with pagination support (10 items per page)
- **Create Todos**: Add new todo items with a title
- **Update Todos**: Toggle the completion status of existing todos
- **Delete Todos**: Remove todo items from the list
- **Search Todos**: Filter todos by searching for text within todo titles
- **Authentication**: API endpoints require a Bearer token for authorization

## Tech Stack

### Frontend
- **React 18** - UI library with hooks (useState, useEffect)
- **Parcel** - Zero-configuration bundler for development and builds
- **Tailwind CSS** - Utility-first CSS framework for styling
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility

### Backend
- **Node.js** - Runtime environment (ES modules)
- **Native HTTP Module** - Lightweight server without Express
- **JSONPlaceholder API** - External mock REST API for todo data

### Development Tools
- **Nodemon** - Auto-restart server during development
- **Node.js Test Runner** - Built-in testing framework

## Project Structure

```
.
├── controllers/
│   └── todos.js          # Todo CRUD operations (API interactions)
├── helpers/
│   ├── http.js           # HTTP response/request utilities
│   └── index.js          # Logger utility
├── qa/
│   └── index.test.js     # Unit tests for controllers
├── src/
│   ├── app.js            # Main React application component
│   ├── index.js          # React entry point
│   └── index.html        # HTML template
├── index.js              # Node.js server entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── .postcssrc            # PostCSS configuration
├── .proxyrc              # Parcel proxy configuration for API
└── dockerfile            # Docker container configuration
```

## How to Run

### Prerequisites
- Node.js (see `.nvmrc` for version)
- npm

### Installation

```bash
npm install
```

### Development Mode

Run both the backend server and frontend development server concurrently:

```bash
npm run dev
```

This starts:
- Backend server on `http://localhost:8000`
- Frontend dev server with hot reloading (via Parcel)

### Frontend Only (Development)

```bash
npm run ui-dev
```

### Production Mode

```bash
npm start
```

Starts the backend server on `http://localhost:8000`.

## Tests

The project uses the Node.js built-in test runner for unit testing.

### Running Tests

```bash
npm test
```

### Test Coverage

Tests are located in the `qa/` directory and cover:
- Fetching todos from the API
- Creating new todo items
- Input validation for todo creation

### Test Examples

```javascript
// Verify todos are fetched correctly
test("return a list of 200 todos", async () => {
  const todos = await getTodos();
  assert.strictEqual(todos.length, 200);
});

// Verify todo creation
test("create a todo item", async () => {
  const newTodo = { title: 'test todo', completed: false };
  const createdTodo = await createTodo(newTodo);
  assert.deepEqual(createdTodo, newTodo);
});
```
