import React, { useState } from 'react';
import { Home, Star } from 'lucide-react';
import { DATA } from './data/content';
import Navigation from './components/Navigation';
import FloatingGame from './components/FloatingGame';
import CognateGame from './components/CognateGame';
import LettersGame from './components/LettersGame';
import QuizGame from './components/QuizGame';
import NamePractice from './components/NamePractice';

function App() {
    const [view, setView] = useState('home');
    const [score, setScore] = useState(0);

    const handleScore = (points) => {
        setScore(s => s + points);
    };

    const renderView = () => {
        switch (view) {
            case 'letters': return <LettersGame onScore={handleScore} />;
            case 'colors': return <FloatingGame type="colors" items={DATA.colors} onScore={handleScore} />;
            case 'numbers': return <FloatingGame type="numbers" items={DATA.numbers} onScore={handleScore} />;
            case 'cognates': return <CognateGame onScore={handleScore} />;
            case 'vocab': return <QuizGame type="vocab" onScore={handleScore} />;
            case 'reading': return <QuizGame type="reading" onScore={handleScore} />;
            case 'name': return <NamePractice />;
            default: return <Navigation onSelect={setView} score={score} />;
        }
    };

    return (
        <div className="h-[100dvh] w-full flex flex-col bg-slate-50 overflow-hidden">
            {/* Header */}
            {view !== 'home' && (
                <div className="p-4 flex justify-between items-center bg-white shadow-sm z-20">
                    <button
                        onClick={() => setView('home')}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                        <Home size={24} />
                    </button>
                    <div className="flex items-center gap-2">
                        <Star className="text-yellow-500 fill-yellow-500" size={20} />
                        <span className="font-bold text-lg">{score}</span>
                    </div>
                </div>
            )}

            <div className="flex-1 relative overflow-hidden">
                {renderView()}
            </div>
        </div>
    );
}

export default App;
