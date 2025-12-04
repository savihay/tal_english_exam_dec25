import React from 'react';
import { motion } from 'framer-motion';
import { Star, Palette, Hash, Languages, BookOpen, User, Type } from 'lucide-react';

const Navigation = ({ onSelect, score }) => {
    const menuItems = [
        { id: 'letters', label: 'אותיות', icon: Type, color: 'bg-red-400' },
        { id: 'colors', label: 'צבעים', icon: Palette, color: 'bg-blue-400' },
        { id: 'numbers', label: 'מספרים', icon: Hash, color: 'bg-green-400' },
        { id: 'cognates', label: 'מילים דומות', icon: Languages, color: 'bg-yellow-400' },
        { id: 'vocab', label: 'אוצר מילים', icon: BookOpen, color: 'bg-purple-400' },
        { id: 'reading', label: 'קריאה', icon: BookOpen, color: 'bg-pink-400' },
        { id: 'name', label: 'השם שלי', icon: User, color: 'bg-orange-400' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemAnim = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="p-4 max-w-md mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-gray-700">הכנה למבחן באנגלית</h1>
                <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-yellow-700">{score}</span>
                </div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-4 flex-1 content-start"
            >
                {menuItems.map(item => (
                    <motion.button
                        key={item.id}
                        variants={itemAnim}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(item.id)}
                        className={`${item.color} p-6 rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 text-white aspect-square`}
                    >
                        <item.icon size={32} />
                        <span className="font-bold text-lg">{item.label}</span>
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
};

export default Navigation;
