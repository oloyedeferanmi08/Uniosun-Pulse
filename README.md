# Uniosun Pulse - Anonymous Messaging Website

A modern anonymous messaging platform where users can receive and read anonymous messages securely.

## Features

- 🔐 Anonymous message submission
- 📸 Image attachment support (max 5MB)
- 🎨 Modern dark-themed UI
- ⚡ Built with React + Vite
- 🚀 Express backend with MongoDB
- 🔒 Privacy-focused design

## Project Structure

```
uniosun-pulse/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend (Node.js + Express)
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/oloyedeferanmi08/uniosun-pulse.git
cd uniosun-pulse
```

2. Install client dependencies
```bash
cd client
npm install
```

3. Install server dependencies
```bash
cd ../server
npm install
```

### Environment Variables

Create `.env` file in the server directory:
```
MONGODB_URI=mongodb://localhost:27017/uniosun-pulse
PORT=5000
NODE_ENV=development
```

### Running the Application

1. Start MongoDB
2. Start the backend server
```bash
cd server
npm start
```

3. Start the frontend (in another terminal)
```bash
cd client
npm run dev
```

## Tech Stack

- **Frontend**: React, Vite, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Upload**: Multer

## License

MIT
