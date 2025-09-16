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
    <div className="w-full max-w-3xl mx-auto space-y-6">
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
            placeholder="Describe your coding task... For example: 'Create a user authentication system with React and Firebase' or 'Build a REST API to manage products with Node.js and MongoDB'"
            className="w-full min-h-[120px] p-4 border-2 border-blue-500 rounded-lg focus:outline-none focus:border-blue-600 resize-none text-gray-900 placeholder-gray-500 text-base leading-relaxed transition-all duration-200 bg-white"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {task.length}/1000
          </div>
        </div>

        <motion.button
          onClick={handleGenerate}
          disabled={!task.trim() || isLoading}
          className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-medium text-base hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generate Windsurf Prompt
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Windsurf Prompt
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Section de résultat */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="relative">
            <pre className="bg-white border-2 border-gray-200 rounded-lg p-4 text-sm text-gray-900 whitespace-pre-wrap overflow-x-auto max-h-80 overflow-y-auto leading-relaxed">
              {result.prompt}
            </pre>
            <motion.button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Copy to clipboard"
            >
              {isCopied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
