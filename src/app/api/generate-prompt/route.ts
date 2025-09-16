import { NextRequest, NextResponse } from 'next/server';
import { Intention } from '@/types';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('OPENROUTER_API_KEY n\'est pas définie dans les variables d\'environnement');
}

// Système de détection d'intention avancé
const detectIntention = (task: string) => {
  const taskLower = task.toLowerCase();
  
  // Détection des types de projets (élargie pour une meilleure compréhension)
  const projectTypes = {
    ui_design: ['design', 'interface', 'ui', 'ux', 'layout', 'style', 'css', 'tailwind', 'bootstrap', 'responsive', 'mobile', 'desktop', 'maquette', 'wireframe', 'prototype', 'figma', 'sketch', 'adobe', 'couleur', 'typographie', 'animation', 'transition', 'hover', 'gradient', 'shadow', 'border', 'card', 'button', 'form', 'modal', 'navbar', 'sidebar', 'footer', 'hero', 'landing', 'theme', 'dark mode', 'light mode', 'glassmorphism', 'neumorphism', 'material design', 'flat design'],
    frontend: ['react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'frontend', 'client', 'spa', 'pwa', 'component', 'hook', 'state', 'props', 'jsx', 'tsx', 'routing', 'navigation', 'redux', 'context', 'zustand', 'recoil', 'vite', 'webpack', 'parcel'],
    backend: ['api', 'server', 'backend', 'node.js', 'express', 'fastapi', 'django', 'flask', 'spring', 'database', 'mongodb', 'postgresql', 'mysql', 'prisma', 'sequelize', 'mongoose', 'orm', 'sql', 'nosql', 'redis', 'cache', 'middleware', 'route', 'controller', 'service', 'model', 'schema', 'migration', 'seed'],
    fullstack: ['fullstack', 'full-stack', 'complet', 'application complète', 'app complète', 'mern', 'mean', 'lamp', 'jamstack', 'serverless', 'microservices'],
    mobile: ['mobile', 'ios', 'android', 'react native', 'flutter', 'swift', 'kotlin', 'expo', 'cordova', 'phonegap', 'ionic', 'xamarin', 'native', 'hybrid', 'cross-platform', 'app store', 'play store'],
    data: ['data', 'analyse', 'visualisation', 'dashboard', 'graphique', 'chart', 'analytics', 'machine learning', 'ai', 'ml', 'deep learning', 'neural network', 'tensorflow', 'pytorch', 'pandas', 'numpy', 'matplotlib', 'plotly', 'd3.js', 'tableau', 'power bi', 'big data', 'etl', 'pipeline'],
    auth: ['authentification', 'login', 'register', 'auth', 'jwt', 'oauth', 'session', 'utilisateur', 'user', 'signin', 'signup', 'password', 'token', 'refresh token', 'security', 'authorization', 'permission', 'role', 'rbac', 'acl', '2fa', 'mfa', 'biometric', 'sso'],
    ecommerce: ['ecommerce', 'e-commerce', 'boutique', 'shop', 'panier', 'paiement', 'stripe', 'paypal', 'cart', 'checkout', 'product', 'catalog', 'inventory', 'order', 'invoice', 'shipping', 'tax', 'discount', 'coupon', 'marketplace', 'vendor', 'multi-vendor'],
    cms: ['cms', 'blog', 'article', 'contenu', 'éditeur', 'admin', 'content management', 'wordpress', 'drupal', 'strapi', 'sanity', 'contentful', 'ghost', 'headless cms', 'wysiwyg', 'markdown', 'rich text', 'media library'],
    game: ['jeu', 'game', 'gaming', 'canvas', 'webgl', 'three.js', 'unity', 'unreal', 'godot', 'phaser', 'pixi.js', 'babylon.js', '2d', '3d', 'sprite', 'animation', 'physics', 'collision', 'score', 'leaderboard', 'multiplayer']
  };

  // Détection des technologies
  const technologies = {
    react: ['react', 'jsx', 'tsx'],
    vue: ['vue', 'vuejs'],
    angular: ['angular'],
    svelte: ['svelte'],
    nextjs: ['next.js', 'nextjs'],
    nodejs: ['node.js', 'nodejs', 'express'],
    python: ['python', 'django', 'flask', 'fastapi'],
    typescript: ['typescript', 'ts'],
    javascript: ['javascript', 'js'],
    tailwind: ['tailwind', 'tailwindcss'],
    mongodb: ['mongodb', 'mongo'],
    postgresql: ['postgresql', 'postgres'],
    mysql: ['mysql']
  };

  // Détection du type principal
  let primaryType = 'general';
  let maxScore = 0;
  
  for (const [type, keywords] of Object.entries(projectTypes)) {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (taskLower.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > maxScore) {
      maxScore = score;
      primaryType = type;
    }
  }

  // Détection des technologies utilisées
  const detectedTechs = [];
  for (const [tech, keywords] of Object.entries(technologies)) {
    if (keywords.some(keyword => taskLower.includes(keyword))) {
      detectedTechs.push(tech);
    }
  }

  // Détection de la complexité
  const complexityIndicators = ['simple', 'basique', 'basic'];
  const advancedIndicators = ['avancé', 'complexe', 'professionnel', 'enterprise', 'scalable', 'production'];
  
  let complexity = 'intermediate';
  if (complexityIndicators.some(indicator => taskLower.includes(indicator))) {
    complexity = 'simple';
  } else if (advancedIndicators.some(indicator => taskLower.includes(indicator))) {
    complexity = 'advanced';
  }

  return {
    primaryType,
    technologies: detectedTechs,
    complexity,
    originalTask: task
  };
};

// Prompts système spécialisés par type
const getSystemPrompt = (intention: Intention) => {
  const basePrompt = `Tu es un expert en amélioration de prompts pour Windsurf AI. 

MISSION :
- Améliore légèrement les demandes utilisateur sans les transformer
- Garde l'intention EXACTE et originale
- Ajoute seulement la clarté nécessaire
- Reste très concis (50-80 mots maximum)
- N'invente jamais de nouvelles fonctionnalités
- Respecte parfaitement ce que l'utilisateur veut vraiment`;

  // On utilise toujours le même prompt de base, simple et efficace
  return basePrompt;
};

const generateOptimizedPrompt = (intention: Intention) => {
  const { originalTask } = intention;
  
  // Fallback simple : juste la tâche originale avec une petite amélioration
  return `${originalTask}\n\nAssure-toi que le code soit propre, fonctionnel et bien structuré.`;
};

export async function POST(request: NextRequest) {
  let task = '';
  
  try {
    const body = await request.json();
    task = body.task;

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

    // Analyse de l'intention de l'utilisateur
    const intention = detectIntention(task);
    const systemPrompt = getSystemPrompt(intention);
    const optimizedPrompt = generateOptimizedPrompt(intention);

    console.log('Intention détectée:', intention);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://windsurf-prompt-generator.vercel.app',
        'X-Title': 'Générateur de Prompts Windsurf'
      },
      body: JSON.stringify({
        model: 'openrouter/sonoma-sky-alpha',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Analyse cette demande et améliore-la légèrement pour Windsurf :

DEMANDE ORIGINALE : "${task}"

RÈGLES STRICTES :
- Garde l'intention EXACTE de l'utilisateur
- Améliore seulement la clarté et la précision
- Maximum 50-80 mots (très court !)
- Utilise un langage simple et direct
- N'ajoute PAS de détails techniques non demandés
- N'invente PAS de nouvelles fonctionnalités
- Reste fidèle à la demande originale

EXEMPLE :
Demande : "crée un bouton"
Prompt amélioré : "Crée un bouton moderne et responsive avec des états hover et focus appropriés."

Retourne UNIQUEMENT le prompt amélioré, rien d'autre.`
          }
        ],
        temperature: 0.2,
        max_tokens: 200,
        top_p: 0.8,
        frequency_penalty: 0.2,
        presence_penalty: 0.2
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erreur OpenRouter:', response.status, errorData);
      
      // Fallback avec le prompt généré localement si l'API échoue
      return NextResponse.json({ 
        prompt: optimizedPrompt,
        fallback: true,
        intention: intention
      });
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Réponse OpenRouter invalide:', data);
      
      // Fallback avec le prompt généré localement
      return NextResponse.json({ 
        prompt: optimizedPrompt,
        fallback: true,
        intention: intention
      });
    }

    const generatedPrompt = data.choices[0].message.content;

    return NextResponse.json({ 
      prompt: generatedPrompt,
      intention: intention,
      model: 'openrouter/sonoma-sky-alpha'
    });

  } catch (error) {
    console.error('Erreur lors de la génération du prompt:', error);
    
    // En cas d'erreur, on essaie de générer un prompt basique
    try {
      const intention = detectIntention(task);
      const fallbackPrompt = generateOptimizedPrompt(intention);
      
      return NextResponse.json({ 
        prompt: fallbackPrompt,
        fallback: true,
        intention: intention,
        error: 'Utilisation du système de fallback'
      });
    } catch {
      return NextResponse.json(
        { error: 'Erreur interne du serveur' },
        { status: 500 }
      );
    }
  }
}
