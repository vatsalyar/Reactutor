import React from "react";
import Editor1 from "./Components/Editor";
import TutorialSteps from "./Components/TutorialSteps";

const App: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 flex w-full h-screen bg-gray-900">
      {/* Left Section - Tutorial Content */}
      <div className="w-1/2 p-4 m-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        <style>{`
          .scrollbar-thin::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: #1f2937 !important;  /* bg-gray-800 */
            border-radius: 4px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #374151 !important;  /* bg-gray-700 */
            border-radius: 4px;
            border: 2px solid #1f2937 !important;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: #4b5563 !important;  /* bg-gray-600 */
          }
        `}</style>
        <div className="pr-2"> {/* Add padding to prevent content clipping */}
          <TutorialSteps />
        </div>
      </div>
      {/* Right Section - Code Editor */}
      <div className="w-1/2 flex flex-col border-l border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-lg font-semibold text-amber-500">
            Code Playground
          </h1>
        </div>
        <div className="flex-1 overflow-hidden">
          <Editor1 currentTask="Build Tic Tac Toe components" />
        </div>
      </div>
    </div>
  );
};

export default App;