# Text-to-Voice Application

This project is a web-based Text-to-Speech (TTS) application using **React** for the frontend and **Express.js** for the backend. It integrates with ElevenLabs' TTS service and supports Docker-based deployment.

## Features
- Convert text to speech with selectable voices.
- Loader animation during speech synthesis.
- Fully containerized with Docker.
- Serve the React frontend via the Express backend.

---

## Prerequisites

Ensure the following are installed on your machine:

1. **Node.js** (v18 or later)
2. **npm** (comes with Node.js)
3. **Docker** (for containerization)
4. **Git** (optional, for cloning the repository)

---

## Project Structure

```
root
├── src/            # React Frontend
├── server/         # Express Backend
├── public/         # Frontend build folder
├── Dockerfile      # Docker configuration
├── docker-compose.yml
├── babel.config.js
├── jest.config.js
└── README.md       # This file
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd text-to-voice
```

### 2. Install Dependencies
```bash
# For the frontend (src/)
npm install

```

### 3. Environment Configuration

Create an `.env` file in the `main` directory with the following environment variables:

```env
API_KEY=<your_api_key>
```

---

## Running Locally

### 1. Run the Frontend
```bash
# Build the frontend
npm run build
```

### 2. Start the Backend
```bash
npm run server
```

### 3. Access the Application
Open your browser and navigate to `http://localhost:5000`.


## Deployment Instructions

### 1. Build Docker Images
```bash
# Build the Docker image
docker build -t text-to-voice .
```

### 2. Run Docker Container
```bash
docker run -p 5000:5000 text-to-voice
```

### 3. Access the Application
Navigate to `http://localhost:5000` in your browser.

---

## Project Commands

### Frontend
- **Install Dependencies**: `npm install`
- **Build**: `npm run build`

### Backend
- **Start Server**: `npm run server`

---

## Additional Notes

- Ensure that the ElevenLabs API key is correctly set in the `.env` file.
- Dockerfile serves the frontend build files via the Express server automatically.

For any issues or contributions, please create a pull request or open an issue in the repository.
