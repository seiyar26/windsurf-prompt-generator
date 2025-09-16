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
              className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                Analyse Intelligente de Votre Tâche
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const IconComponent = getTypeIcon(result.intention.primaryType);
                    return <IconComponent className="w-6 h-6 text-blue-600" />;
                  })()}
                  <div>
                    <p className="text-sm text-gray-600">Type détecté</p>
                    <p className="font-semibold text-gray-800">
                      {getTypeLabel(result.intention.primaryType)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Complexité</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getComplexityColor(result.intention.complexity)}`}>
                    {result.intention.complexity === 'simple' && '🟢 Simple'}
                    {result.intention.complexity === 'intermediate' && '🔵 Intermédiaire'}
                    {result.intention.complexity === 'advanced' && '🟣 Avancé'}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-1">
                    {result.intention.technologies.length > 0 ? (
                      result.intention.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500 italic">Auto-détectées</span>
                    )}
                  </div>
                </div>
              </div>

              {result.model && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="w-4 h-4" />
                    <span>Généré avec {result.model}</span>
                    {result.fallback && (
                      <span className="text-orange-600 font-medium">(Mode de secours)</span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Prompt généré */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Votre Prompt Ultra-Optimisé
              </h3>
              <motion.button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="font-medium">Copier</span>
                  </>
                )}
              </motion.button>
            </div>

            <div className="relative">
              <pre className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto shadow-inner max-h-96 overflow-y-auto">
                {result.prompt}
              </pre>
              <div className="absolute top-3 right-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-gray-500 border">
                  {result.prompt.length} caractères
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>✅ Prêt à utiliser :</strong> Ce prompt est optimisé pour générer du code de qualité production immédiatement utilisable.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>💡 Conseil :</strong> Copiez et collez directement dans Windsurf pour des résultats optimaux !
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
