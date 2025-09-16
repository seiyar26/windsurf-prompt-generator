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
            placeholder="Describe your coding task... For example: 'Create a user authentication system with React and Firebase' or 'Build a REST API to manage products with Node.js and MongoDB'"
            className="w-full min-h-[150px] p-6 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 text-lg leading-relaxed transition-all duration-200"
            disabled={isLoading}
          />
          <div className="absolute bottom-4 right-4 text-sm text-gray-400">
            {task.length}/1000
          </div>
        </div>

        <motion.button
          onClick={handleGenerate}
          disabled={!task.trim() || isLoading}
          className="w-full bg-black text-white py-4 px-8 rounded-lg font-medium text-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Windsurf Prompt
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
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
          className="space-y-6"
        >
          {/* Analyse de l'intention */}
          {result.intention && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Task Analysis
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Detected Type</p>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const IconComponent = getTypeIcon(result.intention.primaryType);
                      return <IconComponent className="w-5 h-5 text-gray-700" />;
                    })()}
                    <p className="font-medium text-gray-900">
                      {getTypeLabel(result.intention.primaryType)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Complexity</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white border border-gray-200 text-gray-900">
                    {result.intention.complexity === 'simple' && 'Simple'}
                    {result.intention.complexity === 'intermediate' && 'Intermediate'}
                    {result.intention.complexity === 'advanced' && 'Advanced'}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-1">
                    {result.intention.technologies.length > 0 ? (
                      result.intention.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white border border-gray-200 text-gray-900"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">Auto-detected</span>
                    )}
                  </div>
                </div>
              </div>

              {result.model && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="w-4 h-4" />
                    <span>Generated with {result.model}</span>
                    {result.fallback && (
                      <span className="text-orange-600 font-medium">(Fallback mode)</span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Prompt généré */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Your Optimized Prompt
              </h3>
              <motion.button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="font-medium">Copy</span>
                  </>
                )}
              </motion.button>
            </div>

            <div className="relative">
              <pre className="bg-white border-2 border-gray-200 rounded-lg p-6 text-sm text-gray-900 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto leading-relaxed">
                {result.prompt}
              </pre>
              <div className="absolute top-4 right-4">
                <div className="bg-gray-100 rounded-md px-2 py-1 text-xs text-gray-600">
                  {result.prompt.length} characters
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 text-sm">
                <strong>💡 Developer insider tip:</strong> Copy this prompt and paste it directly into Windsurf for optimal results!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
