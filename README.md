# Reactutor

An interactive web application designed to help users learn React through step-by-step tutorials with real-time AI feedback. Built with React, TypeScript, and Firebase.

![Reactutor](https://img.shields.io/badge/Reactutor-Learning%20Platform-blue)
![React](https://img.shields.io/badge/React-v18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v4-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌐 Live Demo

Try it out: [https://reactutor-aws.vatsalya.wiki](https://reactutor.vatsalya.wiki)

## 📦 Features

* 🎯 Step-by-step React tutorial progression
* 💻 Monaco-based code editor with real-time preview
* 🤖 AI-powered code feedback (**in progress**)
* 📊 Progress tracking with persistent state
* 🎨 Sleek dark-mode responsive UI
* 🔄 Auto-execution of code in Sandpack
* 🐳 Dockerized for easy deployment

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React + TypeScript |
| **Editor** | Monaco + Sandpack |
| **Styling** | Tailwind CSS |
| **Backend** | Firebase (managed by admin) |
| **Icons** | React Icons |
| **DevOps** | Docker, NGINX, Vite |

## ⚙️ Getting Started

### Prerequisites

* Node.js (v14+)
* npm or yarn

### Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/vatsalyar/Reactutor.git
cd Reactutor
```

2. **Install dependencies**

```bash
npm install # or yarn install
```

3. **Run the app**

```bash
npm run dev
```

## 🐳 Docker Deployment

Reactutor is fully containerized and can be deployed easily using Docker.

### Build and Run

```bash
# Build the Docker image
docker build -t reactutor .

# Run the container
docker run -d -p 80:80 reactutor
```

### Files Involved

* `Dockerfile`: Builds production-ready app using Vite
* `nginx.conf`: Custom NGINX config to serve the app
* `.dockerignore`: Ensures a clean and efficient build

## 📁 Project Structure (Highlights)

```
📦 src/
┣ 📜 App.tsx           # Main app logic
┣ 📜 Editor.tsx        # Monaco + Sandpack integration
┣ 📜 firebaseConfig.ts # Firebase setup (abstracted from users)
┣ 📜 index.html
┣ 📜 vite.config.ts
┣ 📜 nginx.conf
┣ 📜 Dockerfile
```

## 🧪 Development Scripts

* `npm run dev` – Start dev server
* `npm run build` – Build for production
* `npm run preview` – Preview production build
* `npm run lint` – Run ESLint
* `npm run type-check` – Run TypeScript checks

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes
4. Push to GitHub
5. Open a Pull Request

## 📄 License

MIT © Vatsalya Rastogi

## 🙏 Acknowledgments

* Monaco Editor
* Sandpack
* Firebase
* Tailwind CSS
* Docker
