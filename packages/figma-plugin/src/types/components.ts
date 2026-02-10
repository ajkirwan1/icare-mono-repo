export interface ComponentVariant {
  name: string;
  properties: Record<string, string | boolean | number>;
}

export interface ComponentProp {
  name: string;
  type: 'text' | 'boolean' | 'instanceSwap' | 'enum';
  default: string | boolean | null;
  options?: string[];
}

export interface LayerDefinition {
  name: string;
  type: 'frame' | 'rectangle' | 'text' | 'icon' | 'instance';
  position?: { x: number | string; y: number | string };
  size?: { width: number | string; height: number | string };
  tokens?: Record<string, string>;
  content?: string;
  componentRef?: string;
  visible?: string;
  children?: LayerDefinition[];
  layout?: {
    type: 'vertical' | 'horizontal';
    gap?: string;
    padding?: Record<string, string>;
    align?: string;
  };
}

export interface ComponentSchema {
  id: string;
  name: string;
  category: string;
  description: string;
  dimensions: { width: string | number; height: string | number };
  variants?: ComponentVariant[];
  props: ComponentProp[];
  layers: LayerDefinition[];
  states: string[];
  accessibility: {
    role?: string;
    label?: string;
    keyboardNav?: string;
  };
  figmaNotes: string;
}

export interface ComponentsJSON {
  _metadata: {
    generatedFrom: string;
    generatedDate: string;
    tokenSource: string;
    totalComponents: number;
    scope: string;
  };
  components: ComponentSchema[];
}
