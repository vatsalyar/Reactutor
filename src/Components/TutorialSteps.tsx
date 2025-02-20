import React from "react";
import{ useEffect, useState } from "react";
import { db } from "../../firebaseConfig"
import { getDocs, collection } from "firebase/firestore";
import { FaArrowLeft, FaArrowRight,FaChevronDown } from "react-icons/fa";

interface Step {
    step: number;
    task: string;
    teaching: string;
    title: string;
    bestPractices: string[];
    commonPitfalls: string[];
    implementationGuide: string[];
    codeHint: string;
}

export default function TutorialSteps() {
    const [teachingContent, setTeachingContent] = useState<Step[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [showCodeHint, setShowCodeHint] = useState(false);

    useEffect(() => {
        const fetchSteps = async () => {
            try {
                setLoading(true);
                const data = await getDocs(collection(db, "instructions"));
                const values: Step[] = data.docs.map((doc) => ({
                    ...doc.data(),
                } as Step)).sort((a, b) => a.step - b.step);
                setTeachingContent(values);
                setError(null);
            } catch (err) {
                setError("Failed to load tutorial content");
                console.error("Error fetching steps:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSteps();
    }, []);

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, teachingContent.length - 1));
        setShowCodeHint(false);
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
        setShowCodeHint(false);
    };

    return (
        <div className="max-w-4xl mx-auto mt pl-4 pr-4 pb-0 ">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1f2937;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #374151;
                    border-radius: 4px;
                    border: 2px solid #1f2937;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #4b5563;
                }
            `}</style>

            <h1 className="text-lg font-bold text-amber-500 mb-6 pb-4 border-b border-gray-700">
                Tic Tac Toe Tutorial
            </h1>

            {/* Progress Bar */}
            <div className="m-3">
                <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                        className="h-full bg-amber-500 rounded-full transition-all duration-300"
                        style={{
                            width: `${((currentStep + 1) / teachingContent.length) * 100}%`
                        }}
                    ></div>
                </div>
            </div>

            {loading && (
                <div className="text-center py-8 text-gray-400">
                    <div className="animate-pulse">Loading tutorial content...</div>
                </div>
            )}

            {error && (
                <div className="text-center py-8 text-red-400">
                    ⚠️ {error}
                </div>
            )}

            {!loading && !error && teachingContent.length > 0 && (
                <div className="custom-scrollbar overflow-y-auto" style={{ maxHeight: '70vh' }}>
                    <section className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-amber-500 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                                {teachingContent[currentStep].step}
                            </div>
                            <h2 className="text-2xl font-semibold text-amber-100 mt-1">
                                {teachingContent[currentStep].title}
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-amber-400 mb-2 flex items-center gap-2">
                                    <span>📋</span>
                                    What You'll Do
                                </h3>
                                <p className="text-gray-300 pl-8">{teachingContent[currentStep].task}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-amber-400 mb-2 flex items-center gap-2">
                                    <span>🎓</span>
                                    Key Concepts
                                </h3>
                                <pre className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-gray-300 whitespace-pre-wrap border border-gray-700">
                                    {teachingContent[currentStep].teaching}
                                </pre>
                            </div>

                            {/* Implementation Guide Section */}
                            <div>
                                <h3 className="text-lg font-medium text-blue-400 mb-2 flex items-center gap-2">
                                    <span>🛠️</span>
                                    Implementation Guide
                                </h3>
                                <ol className="space-y-3 pl-8 list-decimal text-gray-300">
                                    {teachingContent[currentStep].implementationGuide.map((guide, index) => (
                                        <li key={index} className="pl-2">
                                            {guide}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-green-900/20 p-5 rounded-xl">
                                    <h3 className="text-lg font-medium text-green-400 mb-3 flex items-center gap-2">
                                        <span>✅</span>
                                        Best Practices
                                    </h3>
                                    <ul className="space-y-2 pl-6 list-disc text-green-300">
                                        {teachingContent[currentStep].bestPractices.map((practice, index) => (
                                            <li key={index} className="text-gray-300">
                                                {practice}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-red-900/20 p-5 rounded-xl">
                                    <h3 className="text-lg font-medium text-red-400 mb-3 flex items-center gap-2">
                                        <span>⚠️</span>
                                        Common Pitfalls
                                    </h3>
                                    <ul className="space-y-2 pl-6 list-disc text-red-300">
                                        {teachingContent[currentStep].commonPitfalls.map((pitfall, index) => (
                                            <li key={index} className="text-gray-300">
                                                {pitfall}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Code Hint Section */}
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowCodeHint(!showCodeHint)}
                                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all"
                                >
                                    <span>{showCodeHint ? 'Hide Hint' : 'Show Hint'}</span>
                                    <FaChevronDown className={`transition-transform ${showCodeHint ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {showCodeHint && (
                                    <div className="mt-4">
                                        <h3 className="text-lg font-medium text-purple-400 mb-2 flex items-center gap-2">
                                            <span>💻</span>
                                            Code Hint
                                        </h3>
                                        <pre className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-gray-300 whitespace-pre-wrap border border-gray-700">
                                            {teachingContent[currentStep].codeHint}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Navigation Controls */}
            {!loading && !error && teachingContent.length > 0 && (
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg
                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <FaArrowLeft className="text-lg" />
                        Previous Step
                    </button>
                    
                    <button
                        onClick={handleNext}
                        disabled={currentStep === teachingContent.length - 1}
                        className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg
                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Next Step
                        <FaArrowRight className="text-lg" />
                    </button>
                </div>
            )}
        </div>
    );
}