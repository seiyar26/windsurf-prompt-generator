'use client';

import Header from '@/components/Header';
import PromptGenerator from '@/components/PromptGenerator';
import { GenerationResult } from '@/types';

export default function Home() {
  const handleGenerate = async (task: string): Promise<GenerationResult> => {
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
      return data; // Retourne l'objet complet avec prompt, intention, etc.
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <PromptGenerator onGenerate={handleGenerate} />
      </div>
    </div>
  );
}
