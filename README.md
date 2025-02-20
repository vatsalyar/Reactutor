# Interactive Coding Tutorial Platform

An interactive web application designed to help users learn coding through step-by-step tutorials with real-time feedback from AI. Built with React, TypeScript, and Firebase.

## Features

- 🎯 Step-by-step tutorial progression
- 💻 Live code editor with real-time preview
- 🤖 AI-powered code feedback (In progress)
- 📊 Progress tracking
- 🎨 Modern, dark-themed UI
- 🔄 Automatic code execution
- 📱 Responsive design

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Code Editor**: Monaco Editor with Sandpack
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Icons**: React Icons
- **Code Preview**: Sandpack React Components

## Project Structure



## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a Firebase project and copy your configuration:
   - Go to Firebase Console
   - Create a new project
   - Enable Firestore
   - Copy the configuration object

4. Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Firebase Setup

1. Create a collection named `steps` in your Firestore database
2. Add documents with the following structure:
```typescript
interface Step {
  step: number;      // Step number
  task: string;      // Task description
  teaching: string;  // Teaching content
  title: string;     // Step title
  id: string;        // Document ID
}
```

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

### Key Components

1. **App.tsx**
   - Main application component
   - Manages tutorial steps and navigation
   - Handles layout and state management

2. **Editor Component**
   - Live code editor with preview
   - AI feedback integration
   - Auto-execution of code

3. **FeedbackModal**
   - Displays AI feedback in a modal (In progress)
   - Styled to match application theme
   - Keyboard accessible



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Sandpack](https://sandpack.codesandbox.io/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)

