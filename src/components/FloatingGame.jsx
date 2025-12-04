import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const FloatingGame = ({ type, items, onScore }) => {
    const [targets, setTargets] = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [gameActive, setGameActive] = useState(false);

    // Sound effects
    const playSuccess = () => {
        const audio = new AudioContext();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.frequency.setValueAtTime(500, audio.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audio.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.1);
        osc.start();
        osc.stop(audio.currentTime + 0.1);
    };

    const playError = () => {
        const audio = new AudioContext();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, audio.currentTime);
        osc.frequency.linearRampToValueAtTime(100, audio.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.1);
        osc.start();
        osc.stop(audio.currentTime + 0.1);
    };

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        // Detect Hebrew characters
        const isHebrew = /[\u0590-\u05FF]/.test(text);
        utterance.lang = isHebrew ? 'he-IL' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    // Game Loop
    useEffect(() => {
        setGameActive(true);
        pickNewPrompt();
        return () => {
            setGameActive(false);
        };
    }, []);

    // Start spawning only after currentPrompt is set
    useEffect(() => {
        if (!currentPrompt) return;

        // Spawn first target immediately
        spawnTarget();

        const interval = setInterval(() => {
            spawnTarget();
        }, 700); // Spawn rate

        return () => {
            clearInterval(interval);
        };
    }, [currentPrompt]);

    const pickNewPrompt = () => {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        setCurrentPrompt(randomItem);
        speak(type === 'colors' ? randomItem.name : randomItem.text);
    };

    const spawnTarget = () => {
        // Weighted random: 90% chance to spawn the target, 10% random distractor
        let item;
        if (Math.random() < 0.9 && currentPrompt) {
            // 90% chance: spawn the target
            item = currentPrompt;
        } else {
            // 10% chance: spawn random distractor
            item = items[Math.floor(Math.random() * items.length)];
        }

        const id = Date.now() + Math.random();
        // Ensure it spawns within width minus item width (approx 80px)
        const startX = Math.random() * (window.innerWidth - 100) + 10;

        setTargets(prev => [...prev, {
            id,
            item,
            x: startX,
            duration: 5 + Math.random() * 1 // Slower: 5-6 seconds
        }]);

        // Cleanup old targets
        setTimeout(() => {
            setTargets(prev => prev.filter(t => t.id !== id));
        }, 7000);
    };

    const handleTap = (target) => {
        const isMatch = type === 'colors'
            ? target.item.name === currentPrompt.name
            : target.item.val === currentPrompt.val;

        if (isMatch) {
            playSuccess();
            onScore(1);
            setTargets(prev => prev.filter(t => t.id !== target.id));
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { x: target.x / window.innerWidth, y: 0.5 }
            });
            setTimeout(pickNewPrompt, 500);
        } else {
            playError();
            speak("תנסו שוב");
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-blue-200 to-blue-50 touch-none">
            <div className="absolute top-4 left-0 right-0 text-center z-20 pointer-events-none">
                <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full inline-flex items-center shadow-lg pointer-events-auto gap-3">
                    <span className="text-xl font-bold text-gray-700">
                        {type === 'colors' ? 'מצא את הצבע:' : 'מצא את המספר:'}
                    </span>
                    <button
                        onClick={() => speak(type === 'colors' ? currentPrompt?.name : currentPrompt?.text)}
                        className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 active:scale-95 transition"
                    >
                        <Volume2 size={24} className="text-blue-600" />
                    </button>
                </div>
            </div>

            <AnimatePresence mode="popLayout">
                {targets.map(t => (
                    <motion.div
                        key={t.id}
                        initial={{ y: '100vh', x: t.x, opacity: 1, scale: 0.5 }}
                        animate={{ y: '-20vh', scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                            y: { duration: t.duration, ease: "linear" },
                            scale: { duration: 0.5 }
                        }}
                        onClick={() => handleTap(t)}
                        whileTap={{ scale: 0.9 }}
                        className={`absolute cursor-pointer flex items-center justify-center shadow-lg z-10
                            ${type === 'colors' ? 'w-24 h-28 rounded-[50%]' : 'w-20 h-20 rounded-full bg-white/40 border-2 border-white/80 backdrop-blur-sm'}`}
                        style={{
                            backgroundColor: type === 'colors' ? t.item.hex : undefined,
                            border: type === 'colors' && t.item.name === 'White' ? '1px solid #ddd' : undefined,
                            left: 0 // Position controlled by motion x
                        }}
                    >
                        {type === 'colors' && (
                            <div className="absolute bottom-[-10px] left-1/2 w-0.5 h-5 bg-black/20 -translate-x-1/2" />
                        )}
                        {type === 'numbers' && (
                            <span className="text-3xl font-bold text-gray-800">{t.item.text}</span>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default FloatingGame;
