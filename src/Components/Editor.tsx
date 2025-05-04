import { useEffect, useState, useCallback } from 'react';
import Editor from "@monaco-editor/react";
// import { getGroqChatCompletion } from '../services/api';
import { 
  SandpackLayout, 
  SandpackPreview, 
  SandpackProvider, 
  SandpackStack, 
  useActiveCode, 
  useSandpack 
} from '@codesandbox/sandpack-react';
import FeedbackModal from './FeedbackModal';
import { resolve } from 'path';

interface EditorProps {
  sampleCode: string;
  currentTask?: string;
}

const CodeEditor: React.FC<EditorProps> = ({ sampleCode, currentTask }) => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    updateCode(sampleCode);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {

      setFeedback(""); 
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsModalOpen(true);
    } catch (error) {
      setFeedback("Error checking code. Please try again.");
      setIsModalOpen(true);
      console.error('Error:', error);
    }
    setIsSubmitting(false);
  }, []);

  return (
    <>
      <SandpackStack className="h-full m-0">
        <div className="flex flex-col gap-1 m-0 p-0 relative h-full">
          <Editor
            height="50vh"
            language="javascript"
            theme="vs-dark"
            value={code}
            key={sandpack.activeFile}
            onChange={(value) => updateCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
              padding: { top: 16 },
            }}
          />
          <div className="absolute bottom-4 right-4 z-10">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`
                bg-emerald-600 hover:bg-emerald-700 
                text-white font-medium 
                rounded-md px-4 py-2 
                transition-all duration-200
                ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
                shadow-lg hover:shadow-xl
              `}
            >
              {isSubmitting ? 'Checking...' : 'Check Code'}
            </button>
          </div>
        </div>
      </SandpackStack>
      <FeedbackModal 
        isOpen={isModalOpen}
        feedback={feedback}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

function Editor1({ currentTask }: { currentTask?: string }) {
  const initialCode = `
// Write your React code here
import React from 'react';

export default function App() {
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold">Start Coding!</h1>
    </div>
  );
}
`.trim();

  return (
    <SandpackProvider 
      template="react"
      theme="dark"
      options={{
        autorun: true,
        recompileMode: "immediate",
        // bundlerURL: "https://cdn.jsdelivr.net/npm/sandpack-react@0.8.0"
      }}
      customSetup={{
        dependencies: {
          "react-icons": "latest"
        }
      }}
    >
      <SandpackLayout className="h-full rounded-lg overflow-hidden">
        <div className="flex flex-col w-full h-full">
          <div className="h-[50vh] border-b border-gray-700">
            <CodeEditor 
              sampleCode={initialCode} 
              currentTask={currentTask}
            />
          </div>
          <div className="flex-1 min-h-0">
            <SandpackPreview className="h-full w-full" />
          </div>
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
}

export default Editor1;
