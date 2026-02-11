import type { ScreenJSON, ScreenSection, ScreenElement } from '../types/screens';
import type { TokensJSON } from '../types/tokens';
import { TokenResolver } from './token-resolver';
import { getComponentMap } from './component-generator';
import {
  hexToRgb,
  extractOpacity,
  parseSize,
  mapFontWeight,
  findOrCreatePage,
} from '../utils/figma-helpers';
import * as logger from '../utils/logger';

const STEP = 'generate-screens';

export async function generateScreens(
  screens: ScreenJSON[],
  tokens: TokensJSON
): Promise<number> {
  const resolver = new TokenResolver(tokens);
  const screensPage = findOrCreatePage('Screens');
  let created = 0;

  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];
    logger.progress(STEP, i + 1, screens.length, `Creating ${screen._metadata.screenName}`);

    try {
      const frame = await createScreen(screen, resolver);
      screensPage.appendChild(frame);

      // Position screens side by side
      frame.x = created * (frame.width + 200);
      frame.y = 0;
      created++;
    } catch (err) {
      logger.log(`Error creating screen ${screen._metadata.screenName}: ${err}`);
    }
  }

  return created;
}

async function createScreen(
  screen: ScreenJSON,
  resolver: TokenResolver
): Promise<FrameNode> {
  const frame = figma.createFrame();
  frame.name = screen._metadata.screenName;
  frame.resize(screen.frame.width, 900); // Initial height, will auto-size

  // Background fill
  const bgColor = resolver.resolve(screen.frame.fill);
  if (bgColor && !bgColor.startsWith('{')) {
    frame.fills = [{ type: 'SOLID', color: hexToRgb(bgColor), opacity: extractOpacity(bgColor) }];
  } else {
    frame.fills = [{ type: 'SOLID', color: { r: 0.969, g: 0.969, b: 0.949 } }]; // #f7f7f2 fallback
  }

  // Auto-layout: vertical stack
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  const pad = screen.frame.padding || { top: 0, right: 0, bottom: 0, left: 0 };
  frame.paddingTop = pad.top || 0;
  frame.paddingRight = pad.right || 0;
  frame.paddingBottom = pad.bottom || 0;
  frame.paddingLeft = pad.left || 0;

  // Sort sections by order
  const sortedSections = [...screen.sections].sort((a, b) => a.order - b.order);

  for (const section of sortedSections) {
    try {
      const sectionNode = await createSection(section, resolver, screen.frame.width);
      frame.appendChild(sectionNode);
      // Set FILL after appending to auto-layout parent
      try { sectionNode.layoutSizingHorizontal = 'FILL'; } catch (_e) { /* ignore */ }
    } catch (err) {
      logger.log(`  Error in section "${section.name}": ${err}`);
      // Create placeholder for failed section
      const placeholder = figma.createFrame();
      placeholder.name = `[Error] ${section.name}`;
      placeholder.resize(screen.frame.width, 60);
      placeholder.fills = [{ type: 'SOLID', color: { r: 1, g: 0.9, b: 0.9 } }];
      frame.appendChild(placeholder);
    }
  }

  // Add metadata as plugin data
  frame.setPluginData('screenId', screen._metadata.screenId);
  frame.setPluginData('role', screen._metadata.role);
  frame.setPluginData('states', JSON.stringify(screen._metadata.states));

  return frame;
}

async function createSection(
  section: ScreenSection,
  resolver: TokenResolver,
  parentWidth: number
): Promise<FrameNode> {
  const componentMap = getComponentMap();

  // If this section references a component directly, try to instantiate it
  if (section.component && componentMap.has(section.component)) {
    const master = componentMap.get(section.component)!;
    const instance = master.createInstance();

    // Apply props
    if (section.props) {
      applyInstanceProps(instance, section.props);
    }

    // Wrap in frame for consistent handling
    const wrapper = figma.createFrame();
    wrapper.name = section.name;
    wrapper.layoutMode = 'VERTICAL';
    wrapper.primaryAxisSizingMode = 'AUTO';
    wrapper.counterAxisSizingMode = 'FIXED';
    wrapper.resize(parentWidth, instance.height);

    wrapper.fills = [];
    wrapper.appendChild(instance);

    return wrapper;
  }

  // Create a container section
  const sectionFrame = figma.createFrame();
  sectionFrame.name = section.name;
  sectionFrame.fills = [];

  // Apply size
  const width = section.size
    ? parseSize(section.size.width, parentWidth)
    : parentWidth;
  sectionFrame.resize(width, 100); // height will auto-size

  // Layout mode
  if (section.layout === 'vertical') {
    sectionFrame.layoutMode = 'VERTICAL';
  } else if (section.layout === 'horizontal' || section.layout === 'horizontal-grid') {
    sectionFrame.layoutMode = 'HORIZONTAL';
    sectionFrame.layoutWrap = 'WRAP';
  } else if (section.layout === 'two-column') {
    sectionFrame.layoutMode = 'HORIZONTAL';
  } else {
    sectionFrame.layoutMode = 'VERTICAL';
  }

  sectionFrame.primaryAxisSizingMode = 'AUTO';
  sectionFrame.counterAxisSizingMode = 'FIXED';


  // Gap
  if (section.gap) {
    sectionFrame.itemSpacing = resolver.resolveNumber(section.gap, 16);
  }

  // Padding
  if (section.padding) {
    if (section.padding.horizontal) {
      const ph = resolver.resolveNumber(section.padding.horizontal, 0);
      sectionFrame.paddingLeft = ph;
      sectionFrame.paddingRight = ph;
    }
    if (section.padding.vertical) {
      const pv = resolver.resolveNumber(section.padding.vertical, 0);
      sectionFrame.paddingTop = pv;
      sectionFrame.paddingBottom = pv;
    }
    if (section.padding.top) {
      sectionFrame.paddingTop = resolver.resolveNumber(section.padding.top, 0);
    }
    if (section.padding.bottom) {
      sectionFrame.paddingBottom = resolver.resolveNumber(section.padding.bottom, 0);
    }
    if (section.padding.left) {
      sectionFrame.paddingLeft = resolver.resolveNumber(section.padding.left, 0);
    }
    if (section.padding.right) {
      sectionFrame.paddingRight = resolver.resolveNumber(section.padding.right, 0);
    }
  }

  // Apply section-level tokens
  if (section.tokens) {
    applyFrameTokens(sectionFrame, section.tokens, resolver);
  }

  // Create children
  if (section.children) {
    for (const child of section.children) {
      const childNode = await createScreenElement(child, resolver, width);
      if (childNode) sectionFrame.appendChild(childNode);
    }
  }

  // Conditional annotation
  if (section.conditional) {
    sectionFrame.setPluginData('conditional', section.conditional);
    sectionFrame.name += ` [If: ${section.conditional}]`;
  }

  return sectionFrame;
}

async function createScreenElement(
  element: ScreenElement,
  resolver: TokenResolver,
  parentWidth: number
): Promise<SceneNode | null> {
  const componentMap = getComponentMap();

  // Handle repeating elements
  if (element.repeat) {
    const container = figma.createFrame();
    container.name = `${element.component} (repeated)`;
    container.layoutMode = 'VERTICAL';
    container.primaryAxisSizingMode = 'AUTO';
    container.counterAxisSizingMode = 'FIXED';

    container.fills = [];

    if (element.gap) {
      container.itemSpacing = resolver.resolveNumber(element.gap, 12);
    } else {
      container.itemSpacing = 12;
    }

    const count = element.maxVisible || 3;
    for (let i = 0; i < count; i++) {
      const instance = await instantiateComponent(element, componentMap, resolver);
      if (instance) container.appendChild(instance);
    }

    return container;
  }

  // Handle text primitives
  if (element.component === 'text') {
    return await createTextElement(element, resolver);
  }

  // Handle nested containers (elements with children but no component ref)
  if (element.children && !element.component) {
    const container = figma.createFrame();
    container.name = 'container';
    container.layoutMode = element.layout === 'horizontal' ? 'HORIZONTAL' : 'VERTICAL';
    container.primaryAxisSizingMode = 'AUTO';
    container.counterAxisSizingMode = 'FIXED';

    container.fills = [];

    if (element.gap) {
      container.itemSpacing = resolver.resolveNumber(element.gap, 8);
    }

    for (const child of element.children) {
      const childNode = await createScreenElement(child, resolver, parentWidth);
      if (childNode) container.appendChild(childNode);
    }

    return container;
  }

  // Component instance
  const instance = await instantiateComponent(element, componentMap, resolver);
  return instance;
}

async function instantiateComponent(
  element: ScreenElement,
  componentMap: Map<string, ComponentNode>,
  resolver: TokenResolver
): Promise<SceneNode> {
  const componentId = element.component;

  if (componentMap.has(componentId)) {
    const master = componentMap.get(componentId)!;
    const instance = master.createInstance();

    if (element.props) {
      applyInstanceProps(instance, element.props);
    }

    return instance;
  }

  // Component not found — create a labeled placeholder
  const placeholder = figma.createFrame();
  placeholder.name = `[Missing: ${componentId}]`;
  placeholder.resize(200, 48);
  placeholder.fills = [{ type: 'SOLID', color: { r: 1, g: 0.96, b: 0.88 } }];
  placeholder.cornerRadius = 8;
  placeholder.layoutMode = 'HORIZONTAL';
  placeholder.primaryAxisAlignItems = 'CENTER';
  placeholder.counterAxisAlignItems = 'CENTER';
  placeholder.paddingLeft = 12;
  placeholder.paddingRight = 12;

  try {
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    const label = figma.createText();
    label.fontName = { family: 'Inter', style: 'Regular' };
    label.characters = `[${componentId}${element.variant ? ` / ${element.variant}` : ''}]`;
    label.fontSize = 12;
    label.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.4, b: 0.2 } }];
    placeholder.appendChild(label);
  } catch (_e) {
    // If font loading fails, just use the frame name
  }

  return placeholder;
}

async function createTextElement(
  element: ScreenElement,
  resolver: TokenResolver
): Promise<TextNode> {
  const text = figma.createText();

  const fontWeight = (element.tokens && element.tokens.fontWeight)
    ? resolver.resolve(element.tokens.fontWeight)
    : '400';
  const fontStyle = mapFontWeight(fontWeight);

  try {
    await figma.loadFontAsync({ family: 'Inter', style: fontStyle });
    text.fontName = { family: 'Inter', style: fontStyle };
  } catch (_e) {
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    text.fontName = { family: 'Inter', style: 'Regular' };
  }

  text.characters = element.content || 'Text';

  if (element.tokens) {
    if (element.tokens.fontSize) {
      text.fontSize = resolver.resolveNumber(element.tokens.fontSize, 16);
    }
    if (element.tokens.fill) {
      const color = resolver.resolve(element.tokens.fill);
      if (color && !color.startsWith('{')) {
        text.fills = [{ type: 'SOLID', color: hexToRgb(color), opacity: extractOpacity(color) }];
      }
    }
    if (element.tokens.lineHeight) {
      const lh = resolver.resolveNumber(element.tokens.lineHeight, 1.5);
      if (lh <= 3) {
        text.lineHeight = { value: lh * 100, unit: 'PERCENT' };
      } else {
        text.lineHeight = { value: lh, unit: 'PIXELS' };
      }
    }
    if (element.tokens.letterSpacing) {
      text.letterSpacing = {
        value: resolver.resolveNumber(element.tokens.letterSpacing, 0),
        unit: 'PIXELS',
      };
    }
  }



  return text;
}

function applyInstanceProps(instance: InstanceNode, props: Record<string, unknown>) {
  // Figma component property API — try to set each prop
  for (const [key, value] of Object.entries(props)) {
    try {
      if (typeof value === 'string' || typeof value === 'boolean') {
        instance.setProperties({ [key]: value });
      }
    } catch (_e) {
      // Property may not exist on this component — ignore silently
    }
  }
}

function applyFrameTokens(
  frame: FrameNode,
  tokens: Record<string, string>,
  resolver: TokenResolver
) {
  if (tokens.fill) {
    const color = resolver.resolve(tokens.fill);
    if (color && !color.startsWith('{')) {
      frame.fills = [{ type: 'SOLID', color: hexToRgb(color), opacity: extractOpacity(color) }];
    }
  }
  if (tokens.borderRadius) {
    frame.cornerRadius = resolver.resolveNumber(tokens.borderRadius, 0);
  }
  if (tokens.gap) {
    frame.itemSpacing = resolver.resolveNumber(tokens.gap, 0);
  }
}
