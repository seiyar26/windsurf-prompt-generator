'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-6 max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Windsurf
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Prompt</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed font-light">
          Transform your ideas into perfect prompts that generate 
          <span className="text-white font-medium"> flawless code</span>
        </p>

        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
            <span className="text-white text-sm font-medium">Sonoma Dusk Alpha</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
