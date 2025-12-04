import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DATA } from '../data/content';
import { useGameLogic } from '../hooks/useGameLogic';

const LettersGame = ({ onScore }) => {
    const { feedback, mistakes, speak, handleAnswer } = useGameLogic(onScore);
    const [target, setTarget] = useState(null);
    const [options, setOptions] = useState([]);

    // Phonetic names to avoid TTS saying "Capital A"
    const phoneticNames = {
        'A': 'a',
        'B': 'b',
        'D': 'd',
        'G': 'g',
        'N': 'n'
    };

    useEffect(() => {
        nextRound();
    }, []);

    const nextRound = () => {
        const t = DATA.letters[Math.floor(Math.random() * DATA.letters.length)];
        const targetLetter = t.char.charAt(0); // Get 'A' from 'Aa'

        setTarget({ letter: targetLetter, phonetic: phoneticNames[targetLetter] });

        // Generate distractors (3 instead of 2 for 4 total options)
        const distractors = DATA.letters
            .filter(l => l.char.charAt(0) !== targetLetter)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(l => l.char.charAt(0));

        // Create options with mixed case
        const allLetters = [targetLetter, ...distractors];
        const opts = allLetters.map(letter => {
            // Randomly choose uppercase or lowercase
            const useUpperCase = Math.random() > 0.5;
            return {
                display: useUpperCase ? letter : letter.toLowerCase(),
                letter: letter // Keep original for comparison
            };
        }).sort(() => Math.random() - 0.5);

        setOptions(opts);

        // Speak phonetic name
        setTimeout(() => speak(phoneticNames[targetLetter]), 500);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 max-w-md mx-auto">
            <motion.div
                key={target?.letter}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full bg-white rounded-3xl shadow-xl p-8 mb-12 text-center"
            >
                <button
                    onClick={() => speak(target?.phonetic)}
                    className="bg-blue-100 p-6 rounded-full inline-block hover:bg-blue-200 transition active:scale-95"
                >
                    <Volume2 size={48} className="text-blue-600" />
                </button>
                <p className="mt-4 text-gray-500 font-bold">לחץ לשמיעה</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto">
                {options.map((opt, i) => (
                    <motion.button
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(opt.letter, target.letter, nextRound)}
                        disabled={feedback === 'correct' || feedback === 'reveal'}
                        className={`aspect-square rounded-2xl text-5xl font-bold shadow-md flex items-center justify-center transition
                            ${(feedback === 'correct' || feedback === 'reveal') && opt.letter === target.letter ? 'bg-green-500 text-white' :
                                feedback === 'reveal' && opt.letter !== target.letter ? 'bg-red-400 text-white' :
                                    'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                        {opt.display}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default LettersGame;
