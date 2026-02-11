import type { ComponentSchema, ComponentsJSON, LayerDefinition } from '../types/components';
import { TokenResolver } from './token-resolver';
import type { TokensJSON } from '../types/tokens';
import {
  hexToRgb,
  extractOpacity,
  parseSize,
  mapFontWeight,
  findOrCreatePage,
} from '../utils/figma-helpers';
import * as logger from '../utils/logger';

const STEP = 'generate-components';
const COMPONENT_MAP = new Map<string, ComponentNode>();

export function getComponentMap(): Map<string, ComponentNode> {
  return COMPONENT_MAP;
}

export async function generateComponents(
  data: ComponentsJSON,
  tokens: TokensJSON
): Promise<number> {
  const resolver = new TokenResolver(tokens);
  const total = data.components.length;
  COMPONENT_MAP.clear();

  // Group components by category for page organization
  const byCategory = new Map<string, ComponentSchema[]>();
  for (const schema of data.components) {
    const cat = schema.category || 'other';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(schema);
  }

  let created = 0;

  for (const [category, schemas] of byCategory) {
    const page = findOrCreatePage(`Components - ${capitalize(category)}`);

    let xOffset = 0;
    let yOffset = 0;
    let rowMaxHeight = 0;

    for (const schema of schemas) {
      created++;
      logger.progress(STEP, created, total, `Creating ${schema.name}`);

      try {
        const component = await createComponent(schema, resolver);
        page.appendChild(component);

        // Layout components in a grid on the page
        component.x = xOffset;
        component.y = yOffset;
        rowMaxHeight = Math.max(rowMaxHeight, component.height);

        xOffset += component.width + 100;
        if (xOffset > 2400) {
          xOffset = 0;
          yOffset += rowMaxHeight + 100;
          rowMaxHeight = 0;
        }

        // Store for screen generation
        COMPONENT_MAP.set(schema.id, component);

        // If variants exist, create a ComponentSet
        if (schema.variants && schema.variants.length > 1) {
          await createVariantSet(component, schema, resolver, page);
        }
      } catch (err) {
        logger.log(`Error creating ${schema.name}: ${err}`);
      }
    }
  }

  return created;
}

async function createComponent(
  schema: ComponentSchema,
  resolver: TokenResolver
): Promise<ComponentNode> {
  const component = figma.createComponent();
  component.name = schema.name;

  const width = parseSize(schema.dimensions.width, 360);
  const height = parseSize(schema.dimensions.height, 64);
  component.resize(Math.max(width, 200), Math.max(height, 40));

  // Use absolute positioning (NONE layout) — the JSON uses x,y coords
  component.layoutMode = 'NONE';
  component.fills = [];

  // Build layers
  if (schema.layers && schema.layers.length > 0) {
    for (const layer of schema.layers) {
      try {
        const node = await createLayer(layer, resolver, width);
        if (node) component.appendChild(node);
      } catch (err) {
        logger.log(`  Warning: Failed to create layer "${layer.name}": ${err}`);
      }
    }
  }

  // Add component description
  component.description = schema.description || '';

  return component;
}

async function createLayer(
  layer: LayerDefinition,
  resolver: TokenResolver,
  parentWidth: number = 360
): Promise<SceneNode | null> {
  let node: SceneNode;

  switch (layer.type) {
    case 'frame': {
      const frame = figma.createFrame();
      frame.name = layer.name;
      frame.fills = [];

      // Determine frame size — resolve "100%" to parentWidth
      const sizeW = layer.size ? resolveSizeValue(layer.size.width, parentWidth, 200) : parentWidth;
      const sizeH = layer.size ? resolveSizeValue(layer.size.height, 48, 48) : 48;
      frame.resize(Math.max(sizeW, 1), Math.max(sizeH, 1));

      // Apply layout only if explicitly defined or has tokens with gap/padding
      const hasGap = layer.tokens && layer.tokens.gap;
      const hasPadding = layer.tokens && (layer.tokens.paddingHorizontal || layer.tokens.paddingVertical || layer.tokens.padding);

      if (layer.layout) {
        frame.layoutMode = layer.layout.type === 'horizontal' ? 'HORIZONTAL' : 'VERTICAL';
        frame.primaryAxisSizingMode = 'AUTO';
        frame.counterAxisSizingMode = 'FIXED';

        if (layer.layout.gap) {
          frame.itemSpacing = resolver.resolveNumber(layer.layout.gap, 8);
        }
        if (layer.layout.padding) {
          const ph = resolver.resolveNumber(layer.layout.padding.horizontal, 0);
          const pv = resolver.resolveNumber(layer.layout.padding.vertical, 0);
          frame.paddingLeft = ph;
          frame.paddingRight = ph;
          frame.paddingTop = pv;
          frame.paddingBottom = pv;
        }
      } else if (hasGap || hasPadding || (layer.children && layer.children.length > 0)) {
        // Use auto-layout for frames with gap/padding or children
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisSizingMode = 'AUTO';
        frame.counterAxisSizingMode = 'FIXED';
      }
      // Otherwise leave as NONE (absolute positioning)

      // Apply tokens
      applyFrameTokens(frame, layer.tokens, resolver);

      // Recursively create children
      if (layer.children) {
        for (const child of layer.children) {
          const childNode = await createLayer(child, resolver, sizeW);
          if (childNode) frame.appendChild(childNode);
        }
      }

      node = frame;
      break;
    }

    case 'rectangle': {
      const rect = figma.createRectangle();
      rect.name = layer.name;

      if (layer.size) {
        rect.resize(
          resolveSizeValue(layer.size.width, parentWidth, 200),
          resolveSizeValue(layer.size.height, 48, 48)
        );
      } else {
        rect.resize(parentWidth, 48);
      }

      applyRectTokens(rect, layer.tokens, resolver);
      node = rect;
      break;
    }

    case 'text': {
      const text = figma.createText();
      text.name = layer.name;

      // Load font
      const fontFamily = (layer.tokens && layer.tokens.fontFamily)
        ? resolver.resolve(layer.tokens.fontFamily)
        : 'Inter';
      const fontWeight = (layer.tokens && layer.tokens.fontWeight)
        ? resolver.resolve(layer.tokens.fontWeight)
        : '400';
      const fontStyle = mapFontWeight(fontWeight);

      try {
        await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
        text.fontName = { family: fontFamily, style: fontStyle };
      } catch (_e) {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        text.fontName = { family: 'Inter', style: 'Regular' };
      }

      text.characters = layer.content || layer.name || 'Text';

      applyTextTokens(text, layer.tokens, resolver);
      node = text;
      break;
    }

    case 'icon': {
      // Placeholder rectangle for icons
      const icon = figma.createFrame();
      icon.name = `[Icon] ${layer.name}`;
      const size = layer.size
        ? parseSize(layer.size.width, 24)
        : 24;
      icon.resize(size, size);
      icon.fills = [{ type: 'SOLID', color: { r: 0.85, g: 0.85, b: 0.85 } }];
      icon.cornerRadius = 4;
      node = icon;
      break;
    }

    case 'instance': {
      // Reference to another component — will be resolved during screen generation
      const placeholder = figma.createFrame();
      placeholder.name = `[Instance] ${layer.componentRef || layer.name}`;
      placeholder.fills = [
        { type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.98 }, opacity: 0.5 },
      ];
      if (layer.size) {
        placeholder.resize(
          parseSize(layer.size.width, 100),
          parseSize(layer.size.height, 40)
        );
      }
      node = placeholder;
      break;
    }

    default:
      return null;
  }

  // Apply position if not in auto-layout
  if (layer.position) {
    node.x = parseSize(layer.position.x, 0);
    node.y = parseSize(layer.position.y, 0);
  }

  // Store conditional visibility as plugin data
  if (layer.visible) {
    node.setPluginData('visibilityCondition', layer.visible);
    node.name += ` [Cond: ${layer.visible}]`;
  }

  return node;
}

function applyFrameTokens(
  frame: FrameNode,
  tokens: Record<string, string> | undefined,
  resolver: TokenResolver
) {
  if (!tokens) return;

  if (tokens.fill) {
    const color = resolver.resolve(tokens.fill);
    const rgb = hexToRgb(color);
    const opacity = extractOpacity(color);
    frame.fills = [{ type: 'SOLID', color: rgb, opacity }];
  }

  if (tokens.stroke || tokens.borderColor) {
    const color = resolver.resolve(tokens.stroke || tokens.borderColor);
    frame.strokes = [{ type: 'SOLID', color: hexToRgb(color), opacity: extractOpacity(color) }];
    frame.strokeWeight = resolver.resolveNumber(tokens.strokeWidth || tokens.borderWidth, 1);
  }

  if (tokens.borderRadius) {
    frame.cornerRadius = resolver.resolveNumber(tokens.borderRadius, 0);
  }

  if (tokens.gap) {
    frame.itemSpacing = resolver.resolveNumber(tokens.gap, 0);
  }

  if (tokens.paddingHorizontal || tokens.paddingVertical) {
    const ph = resolver.resolveNumber(tokens.paddingHorizontal, 0);
    const pv = resolver.resolveNumber(tokens.paddingVertical, 0);
    frame.paddingLeft = ph;
    frame.paddingRight = ph;
    frame.paddingTop = pv;
    frame.paddingBottom = pv;
  }

  if (tokens.padding) {
    const p = resolver.resolveNumber(tokens.padding, 0);
    frame.paddingLeft = p;
    frame.paddingRight = p;
    frame.paddingTop = p;
    frame.paddingBottom = p;
  }
}

function applyRectTokens(
  rect: RectangleNode,
  tokens: Record<string, string> | undefined,
  resolver: TokenResolver
) {
  if (!tokens) return;

  if (tokens.fill) {
    const color = resolver.resolve(tokens.fill);
    rect.fills = [{ type: 'SOLID', color: hexToRgb(color), opacity: extractOpacity(color) }];
  }

  if (tokens.borderRadius) {
    rect.cornerRadius = resolver.resolveNumber(tokens.borderRadius, 0);
  }

  if (tokens.stroke || tokens.borderColor) {
    const color = resolver.resolve(tokens.stroke || tokens.borderColor);
    rect.strokes = [{ type: 'SOLID', color: hexToRgb(color), opacity: extractOpacity(color) }];
    rect.strokeWeight = resolver.resolveNumber(tokens.strokeWidth, 1);
  }
}

function applyTextTokens(
  text: TextNode,
  tokens: Record<string, string> | undefined,
  resolver: TokenResolver
) {
  if (!tokens) return;

  if (tokens.fontSize) {
    text.fontSize = resolver.resolveNumber(tokens.fontSize, 16);
  }

  if (tokens.lineHeight) {
    const lh = resolver.resolveNumber(tokens.lineHeight, 1.5);
    if (lh <= 3) {
      text.lineHeight = { value: lh * 100, unit: 'PERCENT' };
    } else {
      text.lineHeight = { value: lh, unit: 'PIXELS' };
    }
  }

  if (tokens.letterSpacing) {
    text.letterSpacing = {
      value: resolver.resolveNumber(tokens.letterSpacing, 0),
      unit: 'PIXELS',
    };
  }

  if (tokens.fill || tokens.color) {
    const color = resolver.resolve(tokens.fill || tokens.color);
    text.fills = [{ type: 'SOLID', color: hexToRgb(color), opacity: extractOpacity(color) }];
  }
}

async function createVariantSet(
  baseComponent: ComponentNode,
  schema: ComponentSchema,
  resolver: TokenResolver,
  page: PageNode
) {
  if (!schema.variants || schema.variants.length <= 1) return;

  const components: ComponentNode[] = [baseComponent];

  // Name the base component with its variant info
  baseComponent.name = `${schema.name} / ${schema.variants[0].name}`;

  for (let i = 1; i < schema.variants.length; i++) {
    const variant = schema.variants[i];
    const clone = baseComponent.clone();
    clone.name = `${schema.name} / ${variant.name}`;
    clone.x = baseComponent.x + (baseComponent.width + 40) * i;
    clone.y = baseComponent.y;
    page.appendChild(clone);
    components.push(clone);
  }

  try {
    const componentSet = figma.combineAsVariants(components, page);
    componentSet.name = schema.name;
    // Store the component set too
    COMPONENT_MAP.set(schema.id, components[0]);
  } catch (err) {
    logger.log(`Warning: Could not create variant set for ${schema.name}: ${err}`);
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Resolve a size value: "100%" → parentSize, "64px" → 64, "auto" → fallback, number → number */
function resolveSizeValue(value: string | number | undefined, parentSize: number, fallback: number): number {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'number') return value;
  if (value === '100%' || value === 'fill') return parentSize;
  if (value === 'auto') return fallback;
  var num = parseFloat(value);
  return isNaN(num) ? fallback : num;
}
