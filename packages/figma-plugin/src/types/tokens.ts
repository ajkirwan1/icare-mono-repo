export interface TokenValue {
  value: string | number | Record<string, string>;
  type: string;
  description?: string;
}

export interface ColorTokenGroup {
  [key: string]: TokenValue | ColorTokenGroup;
}

export interface TypographyTokenValue {
  value: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing?: string;
  };
  type: 'typography';
  description?: string;
}

export interface TokensJSON {
  _metadata: {
    generatedFrom: string;
    generatedDate: string;
    description: string;
    gapAnalysis: Record<string, unknown>;
  };
  global: {
    colors: ColorTokenGroup;
    spacing: Record<string, TokenValue>;
    fontSizes: Record<string, TokenValue>;
    fontWeights: Record<string, TokenValue>;
    lineHeights: Record<string, TokenValue>;
    letterSpacing: Record<string, TokenValue>;
    borderRadius: Record<string, TokenValue>;
    boxShadow: Record<string, TokenValue>;
    opacity: Record<string, TokenValue>;
    transitionDuration: Record<string, TokenValue>;
    transitionEasing: Record<string, TokenValue>;
    typography: Record<string, TypographyTokenValue>;
  };
  component?: Record<string, Record<string, unknown>>;
}
