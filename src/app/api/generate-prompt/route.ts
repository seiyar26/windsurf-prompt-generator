import { NextRequest, NextResponse } from 'next/server';
import { Intention } from '@/types';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('OPENROUTER_API_KEY n\'est pas définie dans les variables d\'environnement');
}

// Système de détection d'intention avancé
const detectIntention = (task: string) => {
  const taskLower = task.toLowerCase();
  
  // Détection des types de projets
  const projectTypes = {
    ui_design: ['design', 'interface', 'ui', 'ux', 'layout', 'style', 'css', 'tailwind', 'bootstrap', 'responsive', 'mobile', 'desktop'],
    frontend: ['react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'frontend', 'client', 'spa', 'pwa'],
    backend: ['api', 'server', 'backend', 'node.js', 'express', 'fastapi', 'django', 'flask', 'spring', 'database', 'mongodb', 'postgresql', 'mysql'],
    fullstack: ['fullstack', 'full-stack', 'complet', 'application complète', 'app complète'],
    mobile: ['mobile', 'ios', 'android', 'react native', 'flutter', 'swift', 'kotlin'],
    data: ['data', 'analyse', 'visualisation', 'dashboard', 'graphique', 'chart', 'analytics', 'machine learning', 'ai'],
    auth: ['authentification', 'login', 'register', 'auth', 'jwt', 'oauth', 'session', 'utilisateur'],
    ecommerce: ['ecommerce', 'e-commerce', 'boutique', 'shop', 'panier', 'paiement', 'stripe', 'paypal'],
    cms: ['cms', 'blog', 'article', 'contenu', 'éditeur', 'admin'],
    game: ['jeu', 'game', 'gaming', 'canvas', 'webgl', 'three.js']
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
  const basePrompt = `Tu es un expert en ingénierie de prompts spécialisé dans l'optimisation des prompts pour Windsurf AI. Tu dois analyser parfaitement l'intention de l'utilisateur et créer un prompt ultra-précis qui génère du code de qualité production.`;

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
  
  let prompt = `ANALYSE DE LA TÂCHE :
Type détecté : ${primaryType}
Technologies : ${technologies.join(', ') || 'Non spécifiées'}
Complexité : ${complexity}
Tâche originale : "${originalTask}"

PROMPT WINDSURF OPTIMISÉ :

Crée ${originalTask}`;

  // Ajout des spécifications techniques selon le type
  if (primaryType === 'ui_design') {
    prompt += `

SPÉCIFICATIONS DESIGN :
- Design moderne et professionnel avec une palette de couleurs cohérente
- Interface responsive (mobile-first) avec breakpoints : 320px, 768px, 1024px, 1440px
- Typographie hiérarchisée avec des tailles et poids appropriés
- Espacements cohérents basés sur une grille 8px
- États interactifs : hover, focus, active, disabled avec transitions fluides
- Accessibilité WCAG 2.1 AA : contrastes, navigation clavier, ARIA labels
- Animations subtiles et performantes (CSS transforms, pas de layout shifts)
- Composants réutilisables avec variants et props configurables`;
  }

  if (technologies.includes('react')) {
    prompt += `

SPÉCIFICATIONS REACT :
- Composants fonctionnels avec hooks TypeScript
- Props typées avec interfaces strictes
- Gestion d'état avec useState/useReducer/Context selon la complexité
- useEffect avec dépendances correctes et cleanup
- Mémorisation avec useMemo/useCallback pour les performances
- Gestion d'erreurs avec Error Boundaries
- Tests avec React Testing Library
- Code splitting et lazy loading pour les performances`;
  }

  if (technologies.includes('tailwind')) {
    prompt += `

SPÉCIFICATIONS TAILWIND :
- Classes utilitaires optimisées et cohérentes
- Responsive design avec préfixes sm:, md:, lg:, xl:
- Variables CSS custom pour les couleurs et espacements
- Composants avec @apply pour éviter la répétition
- Dark mode support avec classe 'dark:'
- Purge CSS configuré pour la production
- Plugin forms et typography si nécessaire`;
  }

  if (primaryType === 'backend' || technologies.includes('nodejs')) {
    prompt += `

SPÉCIFICATIONS BACKEND :
- Architecture MVC ou Clean Architecture
- Validation des données avec Joi/Zod
- Authentification JWT avec refresh tokens
- Middleware de sécurité : helmet, cors, rate-limiting
- Gestion d'erreurs centralisée avec logging
- Base de données avec migrations et seeds
- Tests d'intégration avec supertest
- Documentation API avec Swagger/OpenAPI
- Variables d'environnement sécurisées`;
  }

  // Ajout des bonnes pratiques selon la complexité
  if (complexity === 'advanced') {
    prompt += `

EXIGENCES AVANCÉES :
- Architecture scalable et maintenable
- Patterns de design appropriés (Factory, Observer, etc.)
- Performance optimisée (lazy loading, caching, compression)
- Monitoring et logging complets
- Tests automatisés (unit, integration, e2e)
- CI/CD pipeline ready
- Sécurité enterprise (OWASP Top 10)
- Documentation technique complète
- Internationalisation (i18n) si applicable`;
  }

  prompt += `

STRUCTURE DE FICHIERS :
- Organisation claire et logique des dossiers
- Séparation des responsabilités (components, hooks, utils, types)
- Index files pour les exports propres
- Configuration centralisée (constants, config)

QUALITÉ DU CODE :
- Code lisible avec nommage explicite
- Commentaires JSDoc pour les fonctions complexes
- Gestion d'erreurs exhaustive avec messages utilisateur
- Validation des inputs côté client et serveur
- Performance optimisée (éviter les re-renders inutiles)
- Accessibilité native (semantic HTML, ARIA)

DÉPLOIEMENT :
- Configuration pour l'environnement de production
- Variables d'environnement documentées
- Build optimisé et minifié
- Prêt pour le déploiement sur Vercel/Netlify/AWS

Le code généré doit être immédiatement utilisable en production, sans bugs, avec toutes les fonctionnalités demandées implémentées et testées.`;

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
        model: 'openrouter/sonoma-dusk-alpha',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Analyse cette tâche et génère le prompt Windsurf le plus optimisé possible :

TÂCHE : "${task}"

Tu dois retourner UNIQUEMENT le prompt optimisé final, sans explication préliminaire. Le prompt doit être ultra-précis et générer du code parfait du premier coup.`
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
      model: 'openrouter/sonoma-dusk-alpha'
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
