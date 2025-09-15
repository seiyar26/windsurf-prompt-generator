# 🚀 Générateur de Prompts Windsurf

Transformez vos idées de codage en prompts parfaitement optimisés qui génèrent du code sans erreur et prêt pour la production avec Windsurf AI.

## ✨ Fonctionnalités

- 🎯 **Prompts Optimisés** : Génère des prompts détaillés et précis pour Windsurf
- 🤖 **Alimenté par l'IA** : Utilise GPT-4 via OpenRouter pour une qualité maximale
- 🎨 **Interface Moderne** : Design responsive et animations fluides
- ⚡ **Rapide et Efficace** : Génération en quelques secondes
- 📋 **Copie Facile** : Un clic pour copier le prompt généré
- 🔒 **Aucune Inscription** : Utilisez directement sans créer de compte

## 🛠️ Installation

1. **Clonez le projet**
   ```bash
   git clone <repository-url>
   cd windsurf-prompt-generator
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Configurez les variables d'environnement**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Éditez `.env.local` et ajoutez votre clé API OpenRouter :
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Obtenez votre clé API OpenRouter**
   - Rendez-vous sur [OpenRouter.ai](https://openrouter.ai/)
   - Créez un compte et obtenez votre clé API
   - Ajoutez-la dans le fichier `.env.local`

## 🚀 Utilisation

1. **Démarrez le serveur de développement**
   ```bash
   npm run dev
   ```

2. **Ouvrez votre navigateur**
   Allez sur [http://localhost:3000](http://localhost:3000)

3. **Utilisez l'application**
   - Décrivez votre tâche de codage dans le champ de texte
   - Cliquez sur "Générer le Prompt Windsurf"
   - Copiez le prompt optimisé généré
   - Collez-le dans Windsurf pour obtenir du code parfait !

## 📦 Technologies Utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Framer Motion** - Animations
- **Lucide React** - Icônes
- **OpenRouter API** - Intelligence artificielle

## 🌐 Déploiement sur Vercel

1. **Connectez votre repository à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre projet GitHub

2. **Configurez les variables d'environnement**
   - Dans les paramètres Vercel, ajoutez :
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

3. **Déployez**
   - Vercel déploiera automatiquement votre application
   - Votre app sera disponible sur une URL Vercel

## 🎯 Comment ça marche

1. **Décrivez votre tâche** : Entrez une description simple de ce que vous voulez coder
2. **IA optimise** : Notre système utilise GPT-4 pour transformer votre description en prompt détaillé
3. **Copiez et utilisez** : Le prompt optimisé est prêt à être utilisé dans Windsurf

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir des issues pour signaler des bugs
- Proposer de nouvelles fonctionnalités
- Soumettre des pull requests

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Windsurf](https://codeium.com/windsurf) pour l'inspiration
- [OpenRouter](https://openrouter.ai/) pour l'accès aux modèles IA
- [Vercel](https://vercel.com) pour l'hébergement

---

Créé avec ❤️ pour la communauté des développeurs
