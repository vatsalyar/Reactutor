import React, { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import { 
  SandpackLayout, 
  SandpackPreview, 
  SandpackProvider, 
  SandpackStack, 
  useActiveCode, 
  useSandpack 
} from '@codesandbox/sandpack-react';
import FeedbackModal from './FeedbackModal';

interface EditorProps {
  sampleCode: string;
  currentTask: string;
}

const CodeEditor: React.FC<EditorProps> = ({ sampleCode, currentTask }) => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    try {
      updateCode(sampleCode);
    } catch(err) {
      console.error(err);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // const response = await fetch('/api/check-code', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     code,
      //     task: currentTask
      //   }),
      // });
      
      // const data = await response.json();
      const data = {
        feedback: "This is a sample feedback"
      }

      setFeedback(data.feedback);
      setIsModalOpen(true);
    } catch (error) {
      setFeedback("Error checking code. Please try again.");
      setIsModalOpen(true);
      console.error('Error:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <SandpackStack className="h-full m-0">
        <div className="flex flex-col gap-1 m-0 p-0 relative">
          <Editor
            height="350px"
            language="javascript"
            theme="vs-dark"
            defaultValue={code}
            key={sandpack.activeFile}
            onChange={(value) => updateCode(value || "")}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="
                bg-green-600 
                hover:bg-green-700 
                text-white 
                font-semibold 
                rounded-lg
                px-6
                py-2
                shadow-md
                hover:shadow-lg
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
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

function Editor1({ currentTask }: { currentTask: string }) {
  const [initialCode, setInitialCode] = useState<string>(`
// Write your React code here
import React from 'react';

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
`);

  return (
    <SandpackProvider 
      template="react" 
      theme="dark"
      options={{
        autorun: true,
        recompileMode: "immediate"
      }}
    >
      <SandpackLayout className="h-screen">
        <div className="flex flex-col w-full h-full">
          <div className="h-[350px]">
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