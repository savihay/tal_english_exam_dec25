import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

export const useGameLogic = (onScore) => {
    const [feedback, setFeedback] = useState(null);
    const [mistakes, setMistakes] = useState(0);

    const speak = useCallback((text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const isHebrew = /[\u0590-\u05FF]/.test(text);
        utterance.lang = isHebrew ? 'he-IL' : 'en-US';
        window.speechSynthesis.speak(utterance);
    }, []);

    const resetRound = useCallback(() => {
        setFeedback(null);
        setMistakes(0);
    }, []);

    const handleAnswer = useCallback((selectedId, targetId, nextRoundCallback) => {
        if (selectedId === targetId) {
            setFeedback('correct');
            onScore(1);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
            setTimeout(() => {
                resetRound();
                nextRoundCallback();
            }, 1000);
        } else {
            const newMistakes = mistakes + 1;
            setMistakes(newMistakes);

            if (newMistakes === 1) {
                speak("תנסו שוב");
            } else {
                setFeedback('reveal');
                setTimeout(() => {
                    resetRound();
                    nextRoundCallback();
                }, 2000);
            }
        }
    }, [mistakes, onScore, speak, resetRound]);

    return {
        feedback,
        mistakes,
        speak,
        handleAnswer,
        resetRound
    };
};
