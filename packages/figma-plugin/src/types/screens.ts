export interface ScreenSection {
  id: string;
  name: string;
  order: number;
  component?: string;
  variant?: string;
  props?: Record<string, unknown>;
  layout?: 'vertical' | 'horizontal' | 'horizontal-grid' | 'two-column';
  columns?: number;
  gap?: string;
  padding?: Record<string, string>;
  position?: { x: number | string; y: number | string };
  size?: { width: string | number; height: string | number };
  children?: ScreenElement[];
  conditional?: string;
  tokens?: Record<string, string>;
  accessibility?: Record<string, string>;
}

export interface ScreenElement {
  component: string;
  variant?: string;
  props?: Record<string, unknown>;
  tokens?: Record<string, string>;
  content?: string;
  repeat?: string;
  maxVisible?: number;
  gap?: string;
  children?: ScreenElement[];
  layout?: string;
  size?: { width: string | number; height: string | number };
  conditional?: string;
}

export interface ScreenJSON {
  _metadata: {
    screenId: string;
    screenName: string;
    wireframeSource: string;
    generatedDate: string;
    role: string;
    breakpoints: Record<string, number>;
    states: string[];
  };
  frame: {
    width: number;
    height: string | number;
    fill: string;
    padding: { top: number; right: number; bottom: number; left: number };
  };
  sections: ScreenSection[];
}
