import type { TokensJSON } from './tokens';
import type { ComponentsJSON } from './components';
import type { ScreenJSON } from './screens';

export type UIMessage =
  | { type: 'import-tokens'; payload: TokensJSON }
  | { type: 'generate-components'; payload: ComponentsJSON }
  | { type: 'generate-screens'; payload: { screens: ScreenJSON[]; tokens: TokensJSON } };

export type SandboxMessage =
  | { type: 'progress'; payload: { step: string; message: string; percent: number } }
  | { type: 'error'; payload: { step: string; message: string } }
  | { type: 'complete'; payload: { step: string; message: string; stats?: Record<string, number> } }
  | { type: 'log'; payload: { message: string } };
