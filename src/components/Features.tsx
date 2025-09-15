'use client';

import { motion } from 'framer-motion';
import { Target, Shield, Zap, Code } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Spécifications Techniques',
    description: 'Ajoute automatiquement le contexte technique et les détails spécifiques au framework pour éliminer les approximations.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Code,
    title: 'Guidance Structurelle',
    description: 'Fournit un cadre clair pour organiser le code selon les meilleures pratiques et patterns reconnus.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Shield,
    title: 'Gestion des Exceptions',
    description: 'Anticipe les problèmes potentiels et inclut la gestion d&apos;erreurs, validation et cas limites.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Zap,
    title: 'Standards de Code',
    description: 'Applique les patterns préférés et les pratiques professionnelles pour un code maintenable.',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Comment Fonctionne Notre Générateur
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre algorithme applique automatiquement quatre éléments essentiels qui font que les prompts Windsurf génèrent du code fonctionnel
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
