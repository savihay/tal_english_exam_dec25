import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { DATA } from '../data/content';
import { useGameLogic } from '../hooks/useGameLogic';

const NumbersGame = () => {
    const { feedback, speak, handleAnswer } = useGameLogic();
    const [target, setTarget] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Initialize options once - we want to show all numbers 0-12 sorted
        setOptions(DATA.numbers);
        nextRound();
    }, []);

    const nextRound = () => {
        const t = DATA.numbers[Math.floor(Math.random() * DATA.numbers.length)];
        setTarget(t);
        setTimeout(() => speak(t.text), 500);
    };

    return (
        <div className="h-full flex flex-col items-center p-4">
            <div className="text-center mb-8 mt-4">
                <button
                    onClick={() => speak(target?.text)}
                    className="bg-yellow-400 text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-3 mx-auto hover:bg-yellow-500 transition active:scale-95 text-xl"
                >
                    <Volume2 size={32} />
                    <span>הקשב למספר</span>
                </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full max-w-md overflow-y-auto pb-20" dir="ltr">
                {options.map(item => (
                    <motion.button
                        key={item.val}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(item.val, target.val, nextRound)}
                        disabled={feedback === 'correct' || feedback === 'reveal'}
                        className={`aspect-square rounded-2xl text-4xl font-bold shadow-md transition border-2 flex items-center justify-center
                            ${(feedback === 'correct' || feedback === 'reveal') && item.val === target.val ? 'bg-green-500 text-white border-green-600' :
                                feedback === 'reveal' && item.val !== target.val ? 'bg-red-50 text-gray-400 border-red-100' :
                                    'bg-white text-gray-700 border-gray-100 hover:border-blue-200 hover:bg-blue-50'}`}
                    >
                        {item.text}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default NumbersGame;
