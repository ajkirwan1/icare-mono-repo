import type { TokensJSON, TypographyTokenValue } from '../types/tokens';
import { TokenResolver } from './token-resolver';
import {
  hexToRgb,
  extractOpacity,
  flattenTokens,
  parseShadow,
  toStyleName,
  mapFontWeight,
} from '../utils/figma-helpers';
import * as logger from '../utils/logger';

const STEP = 'import-tokens';

export async function importTokens(tokens: TokensJSON): Promise<{
  colorStyles: number;
  textStyles: number;
  effectStyles: number;
  variables: number;
}> {
  const resolver = new TokenResolver(tokens);
  const stats = { colorStyles: 0, textStyles: 0, effectStyles: 0, variables: 0 };

  // 1. Import color styles
  logger.log('Importing color styles...');
  stats.colorStyles = await createColorStyles(tokens.global.colors);
  logger.progress(STEP, 1, 4, `Created ${stats.colorStyles} color styles`);

  // 2. Import typography styles
  logger.log('Importing typography styles...');
  stats.textStyles = await createTextStyles(tokens.global.typography, resolver);
  logger.progress(STEP, 2, 4, `Created ${stats.textStyles} text styles`);

  // 3. Import shadow/effect styles
  logger.log('Importing effect styles...');
  stats.effectStyles = createEffectStyles(tokens.global.boxShadow);
  logger.progress(STEP, 3, 4, `Created ${stats.effectStyles} effect styles`);

  // 4. Import spacing/radius/opacity as variables
  logger.log('Importing variables...');
  stats.variables = createVariables(tokens);
  logger.progress(STEP, 4, 4, `Created ${stats.variables} variables`);

  return stats;
}

async function createColorStyles(colors: Record<string, unknown>): Promise<number> {
  const flat = flattenTokens(colors as Record<string, unknown>);
  const existingStyles = figma.getLocalPaintStyles();
  let count = 0;

  for (const [path, token] of Object.entries(flat)) {
    if (token.type !== 'color') continue;

    const styleName = `iCare/${toStyleName(path)}`;

    // Find existing or create new
    let style = existingStyles.find((s) => s.name === styleName);
    if (!style) {
      style = figma.createPaintStyle();
      style.name = styleName;
    }

    const rgb = hexToRgb(token.value);
    const opacity = extractOpacity(token.value);

    style.paints = [
      {
        type: 'SOLID',
        color: rgb,
        opacity,
      },
    ];

    if (token.description) {
      style.description = token.description;
    }

    count++;
  }

  return count;
}

async function createTextStyles(
  typography: Record<string, TypographyTokenValue>,
  resolver: TokenResolver
): Promise<number> {
  if (!typography) return 0;

  const existingStyles = figma.getLocalTextStyles();
  let count = 0;

  for (const [name, typeToken] of Object.entries(typography)) {
    if (!typeToken || !typeToken.value) continue;

    const styleName = `iCare/typography/${name}`;
    let style = existingStyles.find((s) => s.name === styleName);
    if (!style) {
      style = figma.createTextStyle();
      style.name = styleName;
    }

    const fontFamily = typeToken.value.fontFamily || 'Inter';
    const fontWeight = resolver.resolve(typeToken.value.fontWeight);
    const fontStyle = mapFontWeight(fontWeight);

    try {
      await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
      style.fontName = { family: fontFamily, style: fontStyle };
    } catch (_e) {
      // Fallback to Inter Regular
      try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        style.fontName = { family: 'Inter', style: 'Regular' };
      } catch (_e) {
        logger.log(`Warning: Could not load font ${fontFamily} ${fontStyle}`);
        continue;
      }
    }

    const fontSize = resolver.resolveNumber(typeToken.value.fontSize, 16);
    style.fontSize = fontSize;

    const lineHeight = resolver.resolve(typeToken.value.lineHeight);
    const lhNum = parseFloat(lineHeight);
    if (!isNaN(lhNum)) {
      if (lhNum <= 3) {
        // Treat as multiplier (e.g., 1.5)
        style.lineHeight = { value: lhNum * 100, unit: 'PERCENT' };
      } else {
        // Treat as pixels
        style.lineHeight = { value: lhNum, unit: 'PIXELS' };
      }
    }

    if (typeToken.value.letterSpacing) {
      const ls = resolver.resolveNumber(typeToken.value.letterSpacing, 0);
      style.letterSpacing = { value: ls, unit: 'PIXELS' };
    }

    if (typeToken.description) {
      style.description = typeToken.description;
    }

    count++;
  }

  return count;
}

function createEffectStyles(shadows: Record<string, { value: string; type: string; description?: string }>): number {
  if (!shadows) return 0;

  const existingStyles = figma.getLocalEffectStyles();
  let count = 0;

  for (const [name, shadowToken] of Object.entries(shadows)) {
    if (!shadowToken || !shadowToken.value || typeof shadowToken.value !== 'string') continue;

    const styleName = `iCare/shadow/${name}`;
    let style = existingStyles.find((s) => s.name === styleName);
    if (!style) {
      style = figma.createEffectStyle();
      style.name = styleName;
    }

    const parsed = parseShadow(shadowToken.value);

    style.effects = [
      {
        type: 'DROP_SHADOW',
        color: parsed.color,
        offset: { x: parsed.x, y: parsed.y },
        radius: parsed.blur,
        spread: parsed.spread,
        visible: true,
        blendMode: 'NORMAL',
      },
    ];

    if (shadowToken.description) {
      style.description = shadowToken.description;
    }

    count++;
  }

  return count;
}

function createVariables(tokens: TokensJSON): number {
  let count = 0;

  try {
    // Spacing variables
    const spacingCollection = figma.variables.createVariableCollection('iCare Spacing');
    const modeId = spacingCollection.modes[0].modeId;

    if (tokens.global.spacing) {
      for (const [key, token] of Object.entries(tokens.global.spacing)) {
        if (!token || !token.value) continue;
        const variable = figma.variables.createVariable(`spacing/${key}`, spacingCollection, 'FLOAT');
        variable.setValueForMode(modeId, parseFloat(String(token.value)));
        count++;
      }
    }

    // Border radius variables
    const radiusCollection = figma.variables.createVariableCollection('iCare Border Radius');
    const radiusModeId = radiusCollection.modes[0].modeId;

    if (tokens.global.borderRadius) {
      for (const [key, token] of Object.entries(tokens.global.borderRadius)) {
        if (!token || !token.value) continue;
        const variable = figma.variables.createVariable(`radius/${key}`, radiusCollection, 'FLOAT');
        variable.setValueForMode(radiusModeId, parseFloat(String(token.value)));
        count++;
      }
    }
  } catch (err) {
    logger.log(`Warning: Variable creation failed (may require Figma plan with Variables support): ${err}`);
  }

  return count;
}
