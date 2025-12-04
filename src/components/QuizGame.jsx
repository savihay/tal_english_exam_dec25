import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DATA } from '../data/content';

const QuizGame = ({ type }) => {
    const [index, setIndex] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedback, setFeedback] = useState(null);

    const items = type === 'vocab' ? DATA.vocab : DATA.reading;
    const current = items[index];

    useEffect(() => {
        if (!current) return;
        const opts = [current.heb, ...current.distractors]
            .sort(() => Math.random() - 0.5);
        setShuffledOptions(opts);
        setFeedback(null);
        if (type === 'vocab') setTimeout(() => speak(current.eng), 500);
    }, [index, type]);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const isHebrew = /[\u0590-\u05FF]/.test(text);
        utterance.lang = isHebrew ? 'he-IL' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const handleAnswer = (ans) => {
        if (ans === current.heb) {
            setFeedback('correct');
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
            setTimeout(() => {
                if (index < items.length - 1) {
                    setIndex(i => i + 1);
                } else {
                    setIndex(0); // Loop
                }
            }, 1000);
        } else {
            setFeedback('wrong');
            speak("תנסו שוב");
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 max-w-md mx-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={current.eng || current.text}
                className="w-full bg-white rounded-3xl shadow-xl p-8 mb-8 text-center"
            >
                {type === 'vocab' && (
                    <button
                        onClick={() => speak(current.eng)}
                        className="mb-4 bg-blue-100 p-4 rounded-full inline-block hover:bg-blue-200 transition"
                    >
                        <Volume2 size={32} className="text-blue-600" />
                    </button>
                )}
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    {type === 'vocab' ? current.eng : current.text}
                </h2>
            </motion.div>

            <div className="w-full space-y-3">
                {shuffledOptions.map((opt, i) => (
                    <motion.button
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(opt)}
                        disabled={feedback === 'correct'}
                        className={`w-full p-4 rounded-xl text-xl font-bold transition transform
                            ${feedback === 'correct' && opt === current.heb ? 'bg-green-500 text-white' :
                                feedback === 'wrong' && opt !== current.heb ? 'bg-red-100 text-gray-400' :
                                    'bg-white text-gray-700 shadow-md hover:bg-gray-50'}`}
                    >
                        {opt}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default QuizGame;
