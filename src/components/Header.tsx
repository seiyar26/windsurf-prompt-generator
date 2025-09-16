'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-white">
      {/* Hero Section Minimaliste */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Windsurf Prompt Generator
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Turn your coding task into a perfectly crafted Windsurf prompt that generates error-free, 
          working code every single time.
        </p>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            AI-Powered
          </span>
        </div>
      </motion.div>
    </div>
  );
}
