'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Check, Loader2, Wand2 } from 'lucide-react';

interface PromptGeneratorProps {
  onGenerate: (task: string) => Promise<string>;
}

export default function PromptGenerator({ onGenerate }: PromptGeneratorProps) {
  const [task, setTask] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    if (!task.trim()) return;
    
    setIsLoading(true);
    try {
      const prompt = await onGenerate(task);
      setGeneratedPrompt(prompt);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Section de saisie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="relative">
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Décrivez votre tâche de codage... Par exemple : 'Créer un système d'authentification utilisateur avec React et Firebase' ou 'Construire une API REST pour gérer les produits avec Node.js et MongoDB'"
            className="w-full min-h-[120px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-500 shadow-sm transition-all duration-200"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-400">
            {task.length}/1000
          </div>
        </div>

        <motion.button
          onClick={handleGenerate}
          disabled={!task.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Générer le Prompt Windsurf
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Section de résultat */}
      {generatedPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Votre Prompt Optimisé
            </h3>
            <motion.button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600 font-medium">Copier</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="relative">
            <pre className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto shadow-inner">
              {generatedPrompt}
            </pre>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>💡 Conseil :</strong> Copiez ce prompt et collez-le directement dans Windsurf pour obtenir du code de qualité production !
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
