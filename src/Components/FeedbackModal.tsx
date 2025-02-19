import React from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  feedback: string;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, feedback, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4 border border-amber-200">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl text-blue-400 font-medium">Code Feedback</h2>
        </div>
        <div className="text-blue-600 max-h-[60vh] overflow-y-auto">
          {feedback}
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