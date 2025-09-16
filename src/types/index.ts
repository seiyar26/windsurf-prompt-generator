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

export interface PromptGeneratorProps {
  onGenerate: (task: string) => Promise<GenerationResult>;
}
