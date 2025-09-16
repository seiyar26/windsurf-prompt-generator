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
  const basePrompt = `Tu es un expert en ingénierie de prompts spécialisé dans l'optimisation des prompts pour Windsurf AI. 

RÈGLES IMPORTANTES :
- Génère des prompts CONCIS et DIRECTS (maximum 200-300 mots)
- Évite les listes exhaustives et les spécifications trop détaillées
- Focus sur l'essentiel de la demande utilisateur
- Le prompt doit être immédiatement compréhensible par Windsurf
- Utilise un langage naturel et précis
- Adapte le niveau de détail à la complexité de la tâche`;

  const typeSpecificPrompts: Record<string, string> = {
    ui_design: `${basePrompt}

SPÉCIALISATION UI/UX DESIGN :
Tu dois créer un prompt qui génère du code pour des interfaces utilisateur parfaites. Inclus :
- Spécifications visuelles détaillées (couleurs, typographie, espacements)
- Responsive design pour tous les écrans
- Accessibilité (WCAG 2.1 AA minimum)
- Animations et micro-interactions
- États des composants (hover, focus, active, disabled)
- Structure HTML sémantique
- CSS/Tailwind optimisé
- Compatibilité navigateurs`,

    frontend: `${basePrompt}

SPÉCIALISATION FRONTEND :
Tu dois créer un prompt qui génère du code frontend robuste. Inclus :
- Architecture de composants claire
- Gestion d'état appropriée
- Hooks/lifecycle optimisés
- Performance et optimisation
- Gestion des erreurs
- Tests unitaires
- TypeScript strict
- Bundling et build optimisé`,

    backend: `${basePrompt}

SPÉCIALISATION BACKEND :
Tu dois créer un prompt qui génère du code backend sécurisé et performant. Inclus :
- Architecture API RESTful/GraphQL
- Validation des données stricte
- Authentification et autorisation
- Gestion des erreurs robuste
- Logging et monitoring
- Tests d'intégration
- Sécurité (OWASP)
- Performance et mise en cache
- Documentation API`,

    fullstack: `${basePrompt}

SPÉCIALISATION FULLSTACK :
Tu dois créer un prompt qui génère une application complète. Inclus :
- Architecture frontend/backend cohérente
- Communication API optimisée
- Base de données bien structurée
- Authentification complète
- Déploiement et CI/CD
- Tests end-to-end
- Monitoring et analytics
- Sécurité complète`,

    mobile: `${basePrompt}

SPÉCIALISATION MOBILE :
Tu dois créer un prompt qui génère du code mobile natif/cross-platform. Inclus :
- Navigation mobile optimisée
- Gestion des états offline
- Performance mobile
- Notifications push
- Intégrations natives
- Tests sur devices
- App store guidelines
- Responsive design mobile-first`,

    data: `${basePrompt}

SPÉCIALISATION DATA & ANALYTICS :
Tu dois créer un prompt qui génère du code pour l'analyse de données. Inclus :
- Visualisations interactives
- Performance avec gros datasets
- Filtres et recherche avancée
- Export de données
- Calculs en temps réel
- Caching intelligent
- Accessibilité des graphiques
- Responsive data tables`,

    auth: `${basePrompt}

SPÉCIALISATION AUTHENTIFICATION :
Tu dois créer un prompt qui génère un système d'auth sécurisé. Inclus :
- JWT/Session management
- Validation stricte des inputs
- Hachage sécurisé des mots de passe
- 2FA/MFA support
- Rate limiting
- Audit logs
- GDPR compliance
- Recovery flows
- Social login integration`,

    ecommerce: `${basePrompt}

SPÉCIALISATION E-COMMERCE :
Tu dois créer un prompt qui génère du code e-commerce professionnel. Inclus :
- Catalogue produits optimisé
- Panier et checkout sécurisé
- Intégration paiement (Stripe/PayPal)
- Gestion des stocks
- Commandes et facturation
- SEO e-commerce
- Analytics de vente
- Performance et caching
- Sécurité PCI DSS`,

    cms: `${basePrompt}

SPÉCIALISATION CMS :
Tu dois créer un prompt qui génère un système de gestion de contenu. Inclus :
- Éditeur WYSIWYG
- Gestion des médias
- SEO automatique
- Versioning du contenu
- Workflow de publication
- Multi-langue support
- Performance et caching
- Sécurité et permissions
- API headless`,

    game: `${basePrompt}

SPÉCIALISATION GAMING :
Tu dois créer un prompt qui génère du code de jeu. Inclus :
- Game loop optimisé
- Gestion des inputs
- Animations fluides
- Sound management
- Score et progression
- Performance 60fps
- Mobile touch support
- Sauvegarde locale
- Responsive canvas`,

    general: basePrompt
  };

  return typeSpecificPrompts[intention.primaryType] || typeSpecificPrompts.general;
};

const generateOptimizedPrompt = (intention: Intention) => {
  const { primaryType, technologies, complexity, originalTask } = intention;
  
  // Prompt de base simple et direct
  let prompt = `${originalTask}`;

  // Ajout de contexte technique minimal selon le type détecté
  if (primaryType === 'ui_design') {
    prompt += `\n\nCrée une interface moderne et responsive avec un design professionnel. Utilise des composants réutilisables et assure-toi que l'interface soit accessible.`;
  }

  if (technologies.includes('react')) {
    prompt += `\n\nUtilise React avec des composants fonctionnels et hooks. Assure-toi que le code soit typé avec TypeScript.`;
  }

  if (technologies.includes('tailwind')) {
    prompt += `\n\nUtilise Tailwind CSS pour le styling avec des classes utilitaires cohérentes.`;
  }

  if (primaryType === 'backend' || technologies.includes('nodejs')) {
    prompt += `\n\nCrée une API robuste avec une architecture claire, validation des données et gestion d'erreurs appropriée.`;
  }

  // Ajout d'exigences selon la complexité
  if (complexity === 'advanced') {
    prompt += `\n\nLe code doit être de niveau production avec une architecture scalable, des tests et une documentation complète.`;
  } else if (complexity === 'simple') {
    prompt += `\n\nGarde le code simple et facile à comprendre.`;
  }

  // Instruction finale
  prompt += `\n\nGénère du code complet, fonctionnel et prêt à utiliser.`;

  return prompt;
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
            content: `Analyse cette demande et génère un prompt Windsurf concis et naturel :

DEMANDE : "${task}"

INSTRUCTIONS :
- Génère un prompt court et direct (maximum 100-150 mots)
- Utilise un langage naturel et conversationnel
- Inclus seulement les détails techniques essentiels
- Évite les listes longues et les spécifications exhaustives
- Le prompt doit être immédiatement compréhensible
- Focus sur l'intention principale de l'utilisateur

Retourne UNIQUEMENT le prompt optimisé, sans explication.`
          }
        ],
        temperature: 0.3,
        max_tokens: 3000,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
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
