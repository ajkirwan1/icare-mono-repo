/** Convert hex color string to Figma RGB (0-1 range) */
export function hexToRgb(hex: string): RGB {
  // Handle rgba() format
  if (hex.startsWith('rgba(') || hex.startsWith('rgb(')) {
    return parseRgbString(hex);
  }

  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return {
    r: parseInt(hex.substring(0, 2), 16) / 255,
    g: parseInt(hex.substring(2, 4), 16) / 255,
    b: parseInt(hex.substring(4, 6), 16) / 255,
  };
}

/** Extract opacity from rgba() string, returns 1 for rgb/hex */
export function extractOpacity(color: string): number {
  if (color.startsWith('rgba(')) {
    const match = color.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
    if (match) return parseFloat(match[4]);
  }
  return 1;
}

function parseRgbString(rgb: string): RGB {
  const match = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!match) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(match[1]) / 255,
    g: parseInt(match[2]) / 255,
    b: parseInt(match[3]) / 255,
  };
}

/** Parse a size value like "64px", "100%", "auto", or a number */
export function parseSize(value: string | number | undefined, fallback = 100): number {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'number') return value;
  if (value === 'auto' || value === 'fill' || value === '100%') return fallback;
  const num = parseFloat(value);
  return isNaN(num) ? fallback : num;
}

/** Map numeric font weight to Figma font style name */
export function mapFontWeight(weight: string | number): string {
  const w = typeof weight === 'string' ? parseInt(weight) : weight;
  if (isNaN(w)) {
    // Handle string weights
    const map: Record<string, string> = {
      normal: 'Regular',
      regular: 'Regular',
      medium: 'Medium',
      semibold: 'Semi Bold',
      bold: 'Bold',
      extrabold: 'Extra Bold',
      black: 'Black',
      light: 'Light',
      thin: 'Thin',
    };
    return map[String(weight).toLowerCase()] || 'Regular';
  }
  if (w <= 100) return 'Thin';
  if (w <= 200) return 'Extra Light';
  if (w <= 300) return 'Light';
  if (w <= 400) return 'Regular';
  if (w <= 500) return 'Medium';
  if (w <= 600) return 'Semi Bold';
  if (w <= 700) return 'Bold';
  if (w <= 800) return 'Extra Bold';
  return 'Black';
}

/** Parse CSS shadow string: "0 4px 12px rgba(0,0,0,0.12)" */
export function parseShadow(value: string): {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: RGBA;
} {
  // Match: offsetX offsetY blur spread? color
  const parts = value.trim().split(/\s+/);
  const x = parseFloat(parts[0]) || 0;
  const y = parseFloat(parts[1]) || 0;
  const blur = parseFloat(parts[2]) || 0;

  // Check if there's a spread value (number before rgba/rgb/#)
  let spread = 0;
  let colorStr = '';

  const remaining = parts.slice(3).join(' ');
  if (remaining.match(/^[\d.-]/)) {
    spread = parseFloat(remaining) || 0;
    colorStr = parts.slice(4).join(' ');
  } else {
    colorStr = remaining;
  }

  if (!colorStr) colorStr = 'rgba(0,0,0,0.12)';

  const rgb = hexToRgb(colorStr);
  const opacity = extractOpacity(colorStr);

  return {
    x,
    y,
    blur,
    spread,
    color: { r: rgb.r, g: rgb.g, b: rgb.b, a: opacity },
  };
}

/** Flatten a nested token object into dot-notation paths */
export function flattenTokens(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, { value: string; type: string; description?: string }> {
  const result: Record<string, { value: string; type: string; description?: string }> = {};

  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (val && typeof val === 'object' && 'value' in val && 'type' in val) {
      // This is a leaf token
      const token = val as { value: unknown; type: string; description?: string };
      if (typeof token.value === 'string' || typeof token.value === 'number') {
        result[path] = {
          value: String(token.value),
          type: token.type,
          description: token.description,
        };
      }
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      // Nested group — recurse
      Object.assign(result, flattenTokens(val as Record<string, unknown>, path));
    }
  }

  return result;
}

/** Find or create a page by name */
export function findOrCreatePage(name: string): PageNode {
  const existing = figma.root.findOne(
    (n) => n.type === 'PAGE' && n.name === name
  ) as PageNode | null;
  if (existing) return existing;
  const page = figma.createPage();
  page.name = name;
  return page;
}

/** Convert a dot-path to a slash-path for Figma style naming */
export function toStyleName(dotPath: string): string {
  return dotPath.replace(/\./g, '/');
}
