import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DATA } from '../data/content';

const CognateGame = ({ onScore }) => {
    const [target, setTarget] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        nextRound();
    }, []);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const isHebrew = /[\u0590-\u05FF]/.test(text);
        utterance.lang = isHebrew ? 'he-IL' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const nextRound = () => {
        const t = DATA.cognates[Math.floor(Math.random() * DATA.cognates.length)];
        setTarget(t);
        setShowModal(false);
        setTimeout(() => speak(t.name), 500);
    };

    const handleItemClick = (item) => {
        if (item.id === target.id) {
            setShowModal(true);
            speak("What is the first letter?");
        } else {
            speak("Try again");
        }
    };

    const checkLetter = (letter) => {
        if (letter === target.first) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            onScore(2);
            setTimeout(nextRound, 1500);
        } else {
            speak("Try again");
        }
    };

    return (
        <div className="h-full flex flex-col p-4">
            <div className="text-center mb-4">
                <button
                    onClick={() => speak(target?.name)}
                    className="bg-yellow-400 text-white px-6 py-2 rounded-full font-bold shadow-md flex items-center gap-2 mx-auto hover:bg-yellow-500 transition"
                >
                    <Volume2 /> הקשב
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto pb-20">
                {DATA.cognates.map(item => (
                    <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleItemClick(item)}
                        className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 text-6xl aspect-square"
                    >
                        <div>{item.icon}</div>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl"
                        >
                            <h3 className="text-2xl font-bold mb-6">מהי האות הראשונה?</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {['A', 'B', 'D', 'G', 'N'].map(l => (
                                    <button
                                        key={l}
                                        onClick={() => checkLetter(l)}
                                        className="bg-blue-100 p-4 rounded-xl text-2xl font-bold text-blue-600 active:bg-blue-500 active:text-white transition"
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CognateGame;
