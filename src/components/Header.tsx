'use client';

import { motion } from 'framer-motion';
import { Code2, Star } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-6 mb-12"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <Code2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Générateur de Prompts Windsurf
        </h1>
      </div>

      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Transformez vos idées de codage en prompts parfaitement optimisés qui génèrent du code 
        <span className="font-semibold text-gray-800"> sans erreur et prêt pour la production</span> à chaque fois.
      </p>

      <div className="flex items-center justify-center gap-2 text-yellow-500">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <span className="text-gray-700 font-medium">4.9</span>
        <span className="text-gray-500">Basé sur 1,239 avis utilisateurs</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Alimenté par l&apos;IA - Aucune inscription requise
        </div>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium border border-purple-200">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          Modèle Sonoma Dusk Alpha
        </div>
      </div>
    </motion.header>
  );
}
