# MERN Project Setup

Follow these instructions to set up the MERN project locally on your machine.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <your-repo-url>
```

### 2. Setup the Backend

Navigate to the backend folder:

```bash
cd backend
```

- Rename the .env.example file to .env:
- Open the .env file and add your MongoDB URI and any other required environment variables.
- Install the required dependencies:

```bash
npm install
```

### 3. Setup the Frontend

Navigate to the frontend folder:

```bash
cd frontend
```

- Rename the .env.example file to .env:
- Open the .env file and add your backend URL.

### 4. Run the Project

To start the backend, run the following command:

```bash
cd backend
npm run dev
```

To start the frontend, run the following command:

```bash
cd frontend
npm run dev
```

This will start the backend and frontend servers.
