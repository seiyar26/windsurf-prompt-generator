'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Check, Loader2, Wand2, Brain, Code2, Palette, Server, Smartphone, BarChart3, Shield, ShoppingCart, FileText, Gamepad2 } from 'lucide-react';
import { PromptGeneratorProps, GenerationResult } from '@/types';

const getTypeIcon = (type: string) => {
  const icons = {
    ui_design: Palette,
    frontend: Code2,
    backend: Server,
    fullstack: Code2,
    mobile: Smartphone,
    data: BarChart3,
    auth: Shield,
    ecommerce: ShoppingCart,
    cms: FileText,
    game: Gamepad2,
    general: Brain
  };
  return icons[type as keyof typeof icons] || Brain;
};

const getTypeLabel = (type: string) => {
  const labels = {
    ui_design: 'UI/UX Design',
    frontend: 'Frontend',
    backend: 'Backend',
    fullstack: 'Full-Stack',
    mobile: 'Mobile',
    data: 'Data & Analytics',
    auth: 'Authentification',
    ecommerce: 'E-Commerce',
    cms: 'CMS',
    game: 'Gaming',
    general: 'Général'
  };
  return labels[type as keyof typeof labels] || 'Général';
};

const getComplexityColor = (complexity: string) => {
  const colors = {
    simple: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
    advanced: 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[complexity as keyof typeof colors] || colors.intermediate;
};

export default function PromptGenerator({ onGenerate }: PromptGeneratorProps) {
  const [task, setTask] = useState('');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    if (!task.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    try {
      const response = await onGenerate(task);
      setResult(response);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      setResult({
        prompt: 'Erreur lors de la génération du prompt. Veuillez réessayer.',
        error: 'Erreur de génération'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.prompt) return;
    
    try {
      await navigator.clipboard.writeText(result.prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Titre et description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Windsurf
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Prompt</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed font-light max-w-2xl mx-auto">
            Transform your ideas into perfect prompts that generate 
            <span className="text-white font-medium"> flawless code</span>
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
              <span className="text-white text-sm font-medium">Sonoma Dusk Alpha</span>
            </div>
          </div>
        </motion.div>

        {/* Interface de génération */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          {/* Section de saisie */}
          <div className="space-y-6">
            <div className="relative">
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Describe your coding task... For example: 'Create a user authentication system with React and Firebase' or 'Build a REST API to manage products with Node.js and MongoDB'"
                className="w-full min-h-[160px] p-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 resize-none text-white placeholder-slate-300 text-lg leading-relaxed transition-all duration-300"
                disabled={isLoading}
              />
              <div className="absolute bottom-4 right-4 text-sm text-slate-400">
                {task.length}/1000
              </div>
            </div>

            <motion.button
              onClick={handleGenerate}
              disabled={!task.trim() || isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Windsurf Prompt
                </>
              )}
            </motion.button>
          </div>

          {/* Section de résultat */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <div className="relative">
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="ml-4 text-slate-300 text-sm font-medium">Optimized Prompt</span>
                    </div>
                    <motion.button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-200 border border-blue-500/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="text-sm font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm font-medium">Copy</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                  <pre className="p-6 text-slate-200 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto leading-relaxed text-sm font-mono">
                    {result.prompt}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
