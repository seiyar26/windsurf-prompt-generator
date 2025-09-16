export interface Intention {
  primaryType: string;
  technologies: string[];
  complexity: string;
  originalTask: string;
}

export interface GenerationResult {
  prompt: string;
  intention?: Intention;
  model?: string;
  fallback?: boolean;
  error?: string;
}

// Types pour la reconnaissance vocale
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

export interface PromptGeneratorProps {
  onGenerate: (task: string) => Promise<GenerationResult>;
}
