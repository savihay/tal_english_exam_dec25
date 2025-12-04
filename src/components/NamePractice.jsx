import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const NamePractice = () => {
    const [name, setName] = useState('');
    const [isSpelling, setIsSpelling] = useState(false);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const handleSpell = async () => {
        if (!name) return;
        setIsSpelling(true);
        const letters = name.split('');

        for (let l of letters) {
            speak(l);
            await new Promise(r => setTimeout(r, 800));
        }
        speak(name);
        confetti();
        setIsSpelling(false);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-700">כתוב את שמך</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-xs text-4xl text-center p-4 rounded-2xl border-4 border-blue-200 focus:border-blue-500 outline-none mb-6"
                placeholder="שם..."
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSpell}
                disabled={isSpelling || !name}
                className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg disabled:opacity-50 transition"
            >
                {isSpelling ? 'מאיית...' : 'איית לי!'}
            </motion.button>
        </div>
    );
};

export default NamePractice;
