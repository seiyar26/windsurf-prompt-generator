'use client';

import Header from '@/components/Header';
import PromptGenerator from '@/components/PromptGenerator';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
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
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PromptGenerator onGenerate={handleGenerate} />
      </div>
      
      <HowItWorks />
      <Features />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Free Tools</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">ChatGPT Image Prompt Generator</a></li>
                <li><a href="#" className="hover:text-white">Bolt Prompt Generator</a></li>
                <li><a href="#" className="hover:text-white">ChatGPT Prompt Improver</a></li>
                <li><a href="#" className="hover:text-white">Lovable Prompt Generator</a></li>
                <li><a href="#" className="hover:text-white">v0 Prompt Generator</a></li>
                <li><a href="#" className="hover:text-white">Cursor Prompt Generator</a></li>
                <li><a href="#" className="hover:text-white">Windsurf Prompt Generator</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold">Windsurf Prompt Generator</span>
              </div>
              <p className="text-gray-300 mb-4">
                Generate high-quality prompts for Windsurf AI and other AI models.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Prompt Engine, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
