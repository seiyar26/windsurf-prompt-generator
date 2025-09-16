'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">Windsurf Prompt Generator</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#reviews" className="text-gray-600 hover:text-gray-900">Reviews</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">Sign in</button>
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Windsurf Prompt Generator
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Turn your coding task into a perfectly crafted Windsurf prompt that generates error-free, 
          working code and helps you build better products every single time.
        </p>

        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            AI-Powered
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 text-yellow-500 mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-gray-700 font-medium">4.9</span>
        </div>

        <p className="text-sm text-gray-500 mb-2">Based on 1,239 user reviews</p>
        
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">B</span>
            </div>
            <span>Created By</span>
          </div>
          <span>Bernard Bado</span>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Last Update: April 15, 2025
        </div>
      </motion.div>
    </div>
  );
}
