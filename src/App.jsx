import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Star } from 'lucide-react';
import { DATA } from './data/content';
import Navigation from './components/Navigation';
import FloatingGame from './components/FloatingGame';
import CognateGame from './components/CognateGame';
import LettersGame from './components/LettersGame';
import QuizGame from './components/QuizGame';
import NumbersGame from './components/NumbersGame';
import NamePractice from './components/NamePractice';

function App() {
    const navigate = useNavigate();
    const location = useLocation();



    const isHome = location.pathname === '/';

    return (
        <div className="h-[100dvh] w-full flex flex-col bg-slate-50 overflow-hidden">
            {/* Header */}
            {!isHome && (
                <div className="p-4 flex justify-between items-center bg-white shadow-sm z-20">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                        <Home size={24} />
                    </button>
                </div>
            )}

            <div className="flex-1 relative overflow-hidden">
                <Routes>
                    <Route path="/" element={<Navigation onSelect={(id) => navigate(`/${id}`)} />} />
                    <Route path="/letters" element={<LettersGame />} />
                    <Route path="/colors" element={<FloatingGame type="colors" items={DATA.colors} />} />
                    <Route path="/numbers" element={<NumbersGame />} />
                    <Route path="/cognates" element={<CognateGame />} />
                    <Route path="/vocab" element={<QuizGame type="vocab" />} />
                    <Route path="/reading" element={<QuizGame type="reading" />} />
                    <Route path="/name" element={<NamePractice />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
