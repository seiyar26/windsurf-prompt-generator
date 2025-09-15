'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Clock, Copy } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Décrivez Votre Tâche de Codage',
    description: 'Vous avez une fonctionnalité à implémenter ou une fonction à créer ? Décrivez-la simplement en langage naturel—de &quot;construire un système d&apos;authentification utilisateur&quot; à &quot;créer un tableau de bord de visualisation de données avec filtrage&quot;. Pas besoin de trop réfléchir !',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Clock,
    title: 'Attendez Juste Deux Secondes',
    description: 'En coulisses, notre algorithme effectue la magie d&apos;ingénierie de prompts que les développeurs expérimentés ont perfectionnée à travers d&apos;innombrables heures d&apos;utilisation de Windsurf. Il analyse vos exigences, ajoute des détails techniques et optimise pour un code propre.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Copy,
    title: 'Copiez, Collez et Admirez la Magie',
    description: 'Votre prompt expertement conçu apparaît instantanément. Copiez-le, collez-le dans Windsurf, et observez à quel point le code généré devient meilleur. Fini les sessions de débogage interminables ou les réécritures complètes !',
    color: 'from-green-500 to-green-600'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Transformez des Idées Simples en Code Prêt pour la Production
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Obtenir du code sans erreur de Windsurf est étonnamment simple
          </p>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100"
        >
          <p className="text-lg text-gray-700 italic text-center">
            <strong>Conseil d&apos;initié développeur :</strong> Bien que notre générateur fonctionne avec n&apos;importe quelle description de tâche, 
            mentionner votre stack technique améliore encore la qualité. &quot;Créer un formulaire de paiement&quot; fonctionne très bien, 
            mais &quot;Créer un formulaire de paiement React avec intégration Stripe et validation de formulaire&quot; générera un code 
            presque parfait, prêt à l&apos;implémentation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
