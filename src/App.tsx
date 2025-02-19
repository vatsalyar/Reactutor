import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Editor1 from "./Components/Editor";

interface Step {
  step: number;
  task: string;
  teaching: string;
  title: string;
  id: string;
}

const App: React.FC = () => {
  const [teachingContent, setTeachingContent] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const data = await getDocs(collection(db, "steps"));
        const values: Step[] = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Step));
        setTeachingContent(values);
      } catch (err) {
        console.error("Error fetching steps:", err);
      }
    };

    fetchSteps();
  }, []);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, teachingContent.length - 1));
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex w-full h-screen bg-gray-950">
      {/* Left Section - Instructions & Progress */}
      <div className="w-1/2 p-8 flex flex-col">
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="bg-gray-900 p-0 rounded-full ">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{
                width:
                  teachingContent.length > 0
                    ? `${((currentStep + 1) / teachingContent.length) * 100}%`
                    : "0%",
              }}
            ></div>
          </div>
          {/* Step Information */}
          {teachingContent.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-yellow-600 text-3xl font-bold">
                Step {currentStep + 1}
              </h2>
              <h3 className="text-yellow-600 text-2xl font-semibold">
                {teachingContent[currentStep].title}
              </h3>
              <p className="text-white text-lg">
                {teachingContent[currentStep].teaching}
              </p>
              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="p-2 bg-blue-500 rounded-full hover:bg-blue-700"
                  >
                    <FaArrowLeft />
                  </button>
                )}
                {currentStep < teachingContent.length - 1 && (
                  <button
                    onClick={nextStep}
                    className="p-2 bg-blue-500 rounded-full hover:bg-blue-700"
                  >
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-yellow-600 text-2xl">Loading steps...</p>
          )}
        </div>
      </div>

      {/* Right Section - Code Editor */}
      <div className="w-1/2 p-8 flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-amber-600">
          Interactive Code Editor
        </h1>
        <div className="flex-1 border border-gray-700 rounded-md overflow-hidden">
          {teachingContent.length > 0 && (
            <Editor1 
              currentTask={teachingContent[currentStep].task}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;