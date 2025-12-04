import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DATA } from '../data/content';
import { useGameLogic } from '../hooks/useGameLogic';

const CognateGame = () => {
    const { feedback, mistakes, speak, handleAnswer } = useGameLogic();
    const [target, setTarget] = useState(null);

    useEffect(() => {
        nextRound();
    }, []);

    const nextRound = () => {
        const t = DATA.cognates[Math.floor(Math.random() * DATA.cognates.length)];
        setTarget(t);
        setTimeout(() => speak(t.name), 500);
    };

    return (
        <div className="h-full flex flex-col items-center p-4">
            <div className="text-center mb-8 mt-4">
                <button
                    onClick={() => speak(target?.name)}
                    className="bg-yellow-400 text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-3 mx-auto hover:bg-yellow-500 transition active:scale-95 text-xl"
                >
                    <Volume2 size={32} />
                    <span>הקשב למילה</span>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md overflow-y-auto pb-20">
                {DATA.cognates.map(item => (
                    <motion.button
                        key={item.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(item.id, target.id, nextRound)}
                        disabled={feedback === 'correct' || feedback === 'reveal'}
                        className={`p-6 rounded-2xl text-xl font-bold shadow-md transition border-2
                            ${(feedback === 'correct' || feedback === 'reveal') && item.id === target.id ? 'bg-green-500 text-white border-green-600' :
                                feedback === 'reveal' && item.id !== target.id ? 'bg-red-50 text-gray-400 border-red-100' :
                                    'bg-white text-gray-700 border-gray-100 hover:border-blue-200 hover:bg-blue-50'}`}
                    >
                        {item.name}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CognateGame;
