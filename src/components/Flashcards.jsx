import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DATA } from '../data/content';

const Flashcards = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const current = DATA.letters[index];

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const handleNext = () => {
        setFlipped(false);
        setTimeout(() => {
            if (index < DATA.letters.length - 1) {
                setIndex(i => i + 1);
            } else {
                confetti();
                onComplete(5);
            }
        }, 300);
    };

    const playLetter = () => {
        speak(current.char.split('')[0]);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div
                className="relative w-64 h-80 cursor-pointer perspective-1000"
                onClick={() => {
                    setFlipped(!flipped);
                    if (!flipped) playLetter();
                }}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="absolute w-full h-full bg-white rounded-3xl shadow-xl flex items-center justify-center border-4 border-blue-200 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                        <span className="text-8xl font-bold text-gray-700">{current.char}</span>
                        <Volume2 className="absolute bottom-4 right-4 text-blue-400" />
                    </div>
                    <div
                        className="absolute w-full h-full bg-blue-400 rounded-3xl shadow-xl flex items-center justify-center text-white backface-hidden"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <span className="text-6xl font-bold">Good!</span>
                    </div>
                </motion.div>
            </div>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={() => index > 0 && setIndex(i => i - 1)}
                    className="p-4 bg-gray-200 rounded-full disabled:opacity-50"
                    disabled={index === 0}
                >
                    <ArrowLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="px-8 py-4 bg-blue-500 text-white rounded-full font-bold shadow-lg active:scale-95 flex items-center gap-2"
                >
                    {index === DATA.letters.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Flashcards;
