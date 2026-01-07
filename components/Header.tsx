import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Paintbrush, Home as HomeIcon, Star } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const isStudio = location.pathname === '/studio';

  return (
    <header className="h-20 glass-header fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 shadow-sm transition-all duration-300">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-indigo-500 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white p-2.5 rounded-2xl border border-white/50 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Paintbrush className="w-6 h-6 text-indigo-600 transform -rotate-12" />
            </div>
        </div>
        <div className="flex flex-col">
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 tracking-tight leading-none">
                إبداع
            </span>
            <span className="text-[0.65rem] font-bold text-slate-500 tracking-wider">استوديو الفن</span>
        </div>
      </Link>

      <nav className="flex items-center gap-4">
        {isStudio ? (
            <Link 
                to="/" 
                className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-indigo-700 hover:bg-white hover:text-indigo-800 font-bold text-sm transition-all shadow-sm hover:shadow-md"
            >
                <HomeIcon className="w-4 h-4" />
                الرئيسية
            </Link>
        ) : (
            <div className="hidden md:flex gap-2">
                 {['المميزات', 'المعرض', 'عن الموقع'].map((item) => (
                    <a 
                        key={item}
                        href="#" 
                        className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:bg-white/50 hover:text-indigo-700 transition-all"
                    >
                        {item}
                    </a>
                 ))}
            </div>
        )}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-200 cursor-pointer hover:scale-110 transition-transform">
            <Star className="w-5 h-5 fill-current" />
        </div>
      </nav>
    </header>
  );
};