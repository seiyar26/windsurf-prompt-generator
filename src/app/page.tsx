'use client';

import Header from '@/components/Header';
import PromptGenerator from '@/components/PromptGenerator';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  const handleGenerate = async (task: string): Promise<string> => {
    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du prompt');
      }

      const data = await response.json();
      return data.prompt;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <PromptGenerator onGenerate={handleGenerate} />
      </div>
      
      <HowItWorks />
      <Features />
      
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 Générateur de Prompts Windsurf. Créé avec ❤️ pour les développeurs.
          </p>
        </div>
      </footer>
    </div>
  );
}
