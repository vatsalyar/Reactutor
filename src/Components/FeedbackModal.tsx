import React from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  feedback: string;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, feedback, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4 border-0 border-amber-200 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl text-blue-400 font-medium">Code Feedback (Sample) </h2>
        </div>
        <div className="text-blue-600 text-lg max-h-[60vh] overflow-y-auto">
          <h2 className="text-red-500">Errors:</h2>
          <ul>
            <li>
              <strong className="text-red-600">stateMutation:</strong> You are directly mutating the state 
              (<code>squares</code>) which is an anti-pattern in React. State updates should be done through 
              the <code>setState</code> function.
            </li>
            <li>
              <strong className="text-red-600">eventHandler:</strong> The <code>onClick</code> event handler is 
              being called directly with <code>handleClick(index)</code> instead of passing a function reference. 
              This will trigger the function on every render.
            </li>
          </ul>
          <br/>
          <h2 className="text-green-500">Feedback:</h2>
          <ul>
            <li>
              <strong className="text-green-600">stateUpdate:</strong> Consider creating a new array based on the 
              current state and updating that instead.
            </li>
            <li>
              <strong className="text-green-600">functionalEventBinding:</strong> Pass a function that calls 
              <code>handleClick</code> with the current index when the event is triggered, not the result of 
              <code>handleClick(index)</code>.
            </li>
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
