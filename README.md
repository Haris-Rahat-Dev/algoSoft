ToDo App with Voice Recording
=============================

Overview
--------

This project is a simple ToDo application that allows users to manage their tasks and record voice notes. The application is divided into two main parts: the frontend and the backend.

-   **Frontend**: Built with React, Material-UI (MUI), React Query, Axios, and Vite.
-   **Backend**: Built with NestJS, Prisma, and MySQLite.

Features
--------

-   Add, edit, delete, and mark tasks as complete.
-   Record and attach voice notes to tasks.
-   View and manage tasks through an intuitive user interface.
-   Persistent storage using SQLite (via Prisma ORM).

* * * * *

Frontend
--------

### Technologies

-   **React**: A JavaScript library for building user interfaces.
-   **Material-UI (MUI)**: A popular React UI framework for responsive and customizable components.
-   **React Query**: A data-fetching library for managing server state in React applications.
-   **Axios**: A promise-based HTTP client for making API requests.
-   **Vite**: A fast build tool and development server for modern web applications.

### Getting Started

#### Prerequisites

-   **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

#### Installation

1. **Navigate to the frontend folder:**

    ```bash
    cd frontend
    ```

2. **Install dependencies:**

    Using npm:
    ```bash
    npm install
    ```

    Or using yarn:
    ```bash
    yarn
    ```

3. **Start the development server:**

    Using npm:
    ```bash
    npm run dev
    ```

    Or using yarn:
    ```bash
    yarn dev
    ```

4. **Open your browser and navigate to `http://localhost:5173` to view the app.**

* * * * *

Backend
-------

### Technologies

-   **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
-   **Prisma**: A modern database toolkit and ORM.
-   **MySQLite**: A lightweight, file-based database engine.

### Getting Started

#### Prerequisites

-   **Node.js**: Ensure you have Node.js installed.
-   **MySQLite**: No additional installation is needed; it will be set up automatically by Prisma.

#### Installation

### Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Install dependencies:**

    Using npm:
    ```bash
    npm install
    ```

    Or using yarn:
    ```bash
    yarn
    ```

3. **Set up the database with Prisma:**

    - **Run migrations to set up your database:**
      ```bash
      npx prisma migrate dev --name init
      ```
  
    - **Generate the Prisma client:**
      ```bash
      npx prisma generate
      ```

4. **Start the backend server:**

    Using npm:
    ```bash
    npm start:dev
    ```

    Or using yarn:
    ```bash
    yarn start:dev
    ```

5. **The server should be running at `http://localhost:3000`.**

### Environment Variables

The backend uses environment variables to manage configuration settings. Create a `.env` file in the `backend` directory and define the following variables as needed:

```bash
`DATABASE_URL="file:./dev.db"`
```

