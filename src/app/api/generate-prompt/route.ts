import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('OPENROUTER_API_KEY n\'est pas définie dans les variables d\'environnement');
}

const SYSTEM_PROMPT = `Tu es un expert en ingénierie de prompts spécialisé dans l'optimisation des prompts pour Windsurf AI. Ton rôle est de transformer des descriptions simples de tâches de codage en prompts détaillés et précis qui génèrent du code de qualité production.

Quand un utilisateur décrit une tâche de codage, tu dois créer un prompt optimisé qui inclut :

1. **Spécifications techniques détaillées** :
   - Technologies et frameworks spécifiques
   - Architecture et patterns recommandés
   - Dépendances et configurations nécessaires

2. **Contexte et contraintes** :
   - Bonnes pratiques du langage/framework
   - Standards de sécurité
   - Performance et optimisation

3. **Gestion des erreurs et cas limites** :
   - Validation des données
   - Gestion des exceptions
   - Tests et vérifications

4. **Structure et organisation** :
   - Organisation des fichiers
   - Séparation des responsabilités
   - Documentation du code

Le prompt généré doit être clair, précis et suffisamment détaillé pour que Windsurf puisse générer du code fonctionnel immédiatement utilisable en production.

Réponds UNIQUEMENT avec le prompt optimisé, sans explication supplémentaire.`;

export async function POST(request: NextRequest) {
  try {
    const { task } = await request.json();

    if (!task || typeof task !== 'string' || task.trim().length === 0) {
      return NextResponse.json(
        { error: 'La description de la tâche est requise' },
        { status: 400 }
      );
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'Configuration API manquante' },
        { status: 500 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: `Transforme cette tâche de codage en prompt optimisé pour Windsurf : "${task}"`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erreur OpenRouter:', response.status, errorData);
      return NextResponse.json(
        { error: 'Erreur lors de la génération du prompt' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Réponse OpenRouter invalide:', data);
      return NextResponse.json(
        { error: 'Réponse invalide de l\'API' },
        { status: 500 }
      );
    }

    const generatedPrompt = data.choices[0].message.content;

    return NextResponse.json({ prompt: generatedPrompt });

  } catch (error) {
    console.error('Erreur lors de la génération du prompt:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
