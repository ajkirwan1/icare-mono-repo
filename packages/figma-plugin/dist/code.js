// src/modules/token-resolver.ts
var TokenResolver = class {
  constructor(tokens) {
    this.cache = /* @__PURE__ */ new Map();
    this.resolving = /* @__PURE__ */ new Set();
    this.tokens = tokens;
  }
  /** Resolve a single value. If it's a {reference}, look it up. Otherwise return as-is. */
  resolve(value) {
    if (value === void 0 || value === null)
      return "";
    if (typeof value === "number")
      return String(value);
    if (!value.startsWith("{") || !value.endsWith("}"))
      return value;
    const path = value.slice(1, -1);
    if (this.cache.has(path))
      return String(this.cache.get(path));
    if (this.resolving.has(path)) {
      console.warn(`Circular token reference detected: ${path}`);
      return value;
    }
    this.resolving.add(path);
    const result = this.lookupPath(path);
    this.resolving.delete(path);
    if (result !== void 0) {
      const resolved = typeof result === "string" && result.startsWith("{") ? this.resolve(result) : String(result);
      this.cache.set(path, resolved);
      return resolved;
    }
    console.warn(`Token not found: ${path}`);
    return value;
  }
  /** Resolve a number value (parse the resolved string as float) */
  resolveNumber(value, fallback = 0) {
    const resolved = this.resolve(value);
    const num = parseFloat(resolved);
    return isNaN(num) ? fallback : num;
  }
  lookupPath(path) {
    const parts = path.split(".");
    let current = this.tokens.global;
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        current = this.tokens;
        let found = true;
        for (const p of parts) {
          if (current && typeof current === "object" && p in current) {
            current = current[p];
          } else {
            found = false;
            break;
          }
        }
        if (!found)
          return void 0;
        break;
      }
    }
    if (current && typeof current === "object" && "value" in current) {
      const val = current.value;
      if (typeof val === "string" || typeof val === "number")
        return val;
    }
    if (typeof current === "string" || typeof current === "number")
      return current;
    return void 0;
  }
};

// src/utils/figma-helpers.ts
function hexToRgb(hex) {
  if (hex.startsWith("rgba(") || hex.startsWith("rgb(")) {
    return parseRgbString(hex);
  }
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return {
    r: parseInt(hex.substring(0, 2), 16) / 255,
    g: parseInt(hex.substring(2, 4), 16) / 255,
    b: parseInt(hex.substring(4, 6), 16) / 255
  };
}
function extractOpacity(color) {
  if (color.startsWith("rgba(")) {
    const match = color.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
    if (match)
      return parseFloat(match[4]);
  }
  return 1;
}
function parseRgbString(rgb) {
  const match = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!match)
    return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(match[1]) / 255,
    g: parseInt(match[2]) / 255,
    b: parseInt(match[3]) / 255
  };
}
function parseSize(value, fallback = 100) {
  if (value === void 0 || value === null)
    return fallback;
  if (typeof value === "number")
    return value;
  if (value === "auto" || value === "fill" || value === "100%")
    return fallback;
  const num = parseFloat(value);
  return isNaN(num) ? fallback : num;
}
function mapFontWeight(weight) {
  const w = typeof weight === "string" ? parseInt(weight) : weight;
  if (isNaN(w)) {
    const map = {
      normal: "Regular",
      regular: "Regular",
      medium: "Medium",
      semibold: "Semi Bold",
      bold: "Bold",
      extrabold: "Extra Bold",
      black: "Black",
      light: "Light",
      thin: "Thin"
    };
    return map[String(weight).toLowerCase()] || "Regular";
  }
  if (w <= 100)
    return "Thin";
  if (w <= 200)
    return "Extra Light";
  if (w <= 300)
    return "Light";
  if (w <= 400)
    return "Regular";
  if (w <= 500)
    return "Medium";
  if (w <= 600)
    return "Semi Bold";
  if (w <= 700)
    return "Bold";
  if (w <= 800)
    return "Extra Bold";
  return "Black";
}
function parseShadow(value) {
  const parts = value.trim().split(/\s+/);
  const x = parseFloat(parts[0]) || 0;
  const y = parseFloat(parts[1]) || 0;
  const blur = parseFloat(parts[2]) || 0;
  let spread = 0;
  let colorStr = "";
  const remaining = parts.slice(3).join(" ");
  if (remaining.match(/^[\d.-]/)) {
    spread = parseFloat(remaining) || 0;
    colorStr = parts.slice(4).join(" ");
  } else {
    colorStr = remaining;
  }
  if (!colorStr)
    colorStr = "rgba(0,0,0,0.12)";
  const rgb = hexToRgb(colorStr);
  const opacity = extractOpacity(colorStr);
  return {
    x,
    y,
    blur,
    spread,
    color: { r: rgb.r, g: rgb.g, b: rgb.b, a: opacity }
  };
}
function flattenTokens(obj, prefix = "") {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && "value" in val && "type" in val) {
      const token = val;
      if (typeof token.value === "string" || typeof token.value === "number") {
        result[path] = {
          value: String(token.value),
          type: token.type,
          description: token.description
        };
      }
    } else if (val && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flattenTokens(val, path));
    }
  }
  return result;
}
function findOrCreatePage(name) {
  const existing = figma.root.findOne(
    (n) => n.type === "PAGE" && n.name === name
  );
  if (existing)
    return existing;
  const page = figma.createPage();
  page.name = name;
  return page;
}
function toStyleName(dotPath) {
  return dotPath.replace(/\./g, "/");
}

// src/utils/logger.ts
function send(msg) {
  figma.ui.postMessage(msg);
}
function progress(step, current, total, message) {
  const percent = total > 0 ? Math.round(current / total * 100) : 0;
  send({ type: "progress", payload: { step, message, percent } });
}
function log(message) {
  send({ type: "log", payload: { message } });
}
function error(step, message) {
  send({ type: "error", payload: { step, message } });
}
function complete(step, message, stats) {
  send({ type: "complete", payload: { step, message, stats } });
}

// src/modules/token-importer.ts
var STEP = "import-tokens";
async function importTokens(tokens) {
  const resolver = new TokenResolver(tokens);
  const stats = { colorStyles: 0, textStyles: 0, effectStyles: 0, variables: 0 };
  log("Importing color styles...");
  stats.colorStyles = await createColorStyles(tokens.global.colors);
  progress(STEP, 1, 4, `Created ${stats.colorStyles} color styles`);
  log("Importing typography styles...");
  stats.textStyles = await createTextStyles(tokens.global.typography, resolver);
  progress(STEP, 2, 4, `Created ${stats.textStyles} text styles`);
  log("Importing effect styles...");
  stats.effectStyles = createEffectStyles(tokens.global.boxShadow);
  progress(STEP, 3, 4, `Created ${stats.effectStyles} effect styles`);
  log("Importing variables...");
  stats.variables = createVariables(tokens);
  progress(STEP, 4, 4, `Created ${stats.variables} variables`);
  return stats;
}
async function createColorStyles(colors) {
  const flat = flattenTokens(colors);
  const existingStyles = figma.getLocalPaintStyles();
  let count = 0;
  for (const [path, token] of Object.entries(flat)) {
    if (token.type !== "color")
      continue;
    const styleName = `iCare/${toStyleName(path)}`;
    let style = existingStyles.find((s) => s.name === styleName);
    if (!style) {
      style = figma.createPaintStyle();
      style.name = styleName;
    }
    const rgb = hexToRgb(token.value);
    const opacity = extractOpacity(token.value);
    style.paints = [
      {
        type: "SOLID",
        color: rgb,
        opacity
      }
    ];
    if (token.description) {
      style.description = token.description;
    }
    count++;
  }
  return count;
}
async function createTextStyles(typography, resolver) {
  if (!typography)
    return 0;
  const existingStyles = figma.getLocalTextStyles();
  let count = 0;
  for (const [name, typeToken] of Object.entries(typography)) {
    if (!typeToken || !typeToken.value)
      continue;
    const styleName = `iCare/typography/${name}`;
    let style = existingStyles.find((s) => s.name === styleName);
    if (!style) {
      style = figma.createTextStyle();
      style.name = styleName;
    }
    const fontFamily = typeToken.value.fontFamily || "Inter";
    const fontWeight = resolver.resolve(typeToken.value.fontWeight);
    const fontStyle = mapFontWeight(fontWeight);
    try {
      await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
      style.fontName = { family: fontFamily, style: fontStyle };
    } catch (_e) {
      try {
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        style.fontName = { family: "Inter", style: "Regular" };
      } catch (_e2) {
        log(`Warning: Could not load font ${fontFamily} ${fontStyle}`);
        continue;
      }
    }
    const fontSize = resolver.resolveNumber(typeToken.value.fontSize, 16);
    style.fontSize = fontSize;
    const lineHeight = resolver.resolve(typeToken.value.lineHeight);
    const lhNum = parseFloat(lineHeight);
    if (!isNaN(lhNum)) {
      if (lhNum <= 3) {
        style.lineHeight = { value: lhNum * 100, unit: "PERCENT" };
      } else {
        style.lineHeight = { value: lhNum, unit: "PIXELS" };
      }
    }
    if (typeToken.value.letterSpacing) {
      const ls = resolver.resolveNumber(typeToken.value.letterSpacing, 0);
      style.letterSpacing = { value: ls, unit: "PIXELS" };
    }
    if (typeToken.description) {
      style.description = typeToken.description;
    }
    count++;
  }
  return count;
}
function createEffectStyles(shadows) {
  if (!shadows)
    return 0;
  const existingStyles = figma.getLocalEffectStyles();
  let count = 0;
  for (const [name, shadowToken] of Object.entries(shadows)) {
    if (!shadowToken || !shadowToken.value || typeof shadowToken.value !== "string")
      continue;
    const styleName = `iCare/shadow/${name}`;
    let style = existingStyles.find((s) => s.name === styleName);
    if (!style) {
      style = figma.createEffectStyle();
      style.name = styleName;
    }
    const parsed = parseShadow(shadowToken.value);
    style.effects = [
      {
        type: "DROP_SHADOW",
        color: parsed.color,
        offset: { x: parsed.x, y: parsed.y },
        radius: parsed.blur,
        spread: parsed.spread,
        visible: true,
        blendMode: "NORMAL"
      }
    ];
    if (shadowToken.description) {
      style.description = shadowToken.description;
    }
    count++;
  }
  return count;
}
function createVariables(tokens) {
  let count = 0;
  try {
    const spacingCollection = figma.variables.createVariableCollection("iCare Spacing");
    const modeId = spacingCollection.modes[0].modeId;
    if (tokens.global.spacing) {
      for (const [key, token] of Object.entries(tokens.global.spacing)) {
        if (!token || !token.value)
          continue;
        const variable = figma.variables.createVariable(`spacing/${key}`, spacingCollection, "FLOAT");
        variable.setValueForMode(modeId, parseFloat(String(token.value)));
        count++;
      }
    }
    const radiusCollection = figma.variables.createVariableCollection("iCare Border Radius");
    const radiusModeId = radiusCollection.modes[0].modeId;
    if (tokens.global.borderRadius) {
      for (const [key, token] of Object.entries(tokens.global.borderRadius)) {
        if (!token || !token.value)
          continue;
        const variable = figma.variables.createVariable(`radius/${key}`, radiusCollection, "FLOAT");
        variable.setValueForMode(radiusModeId, parseFloat(String(token.value)));
        count++;
      }
    }
  } catch (err) {
    log(`Warning: Variable creation failed (may require Figma plan with Variables support): ${err}`);
  }
  return count;
}

// src/modules/component-generator.ts
var STEP2 = "generate-components";
var COMPONENT_MAP = /* @__PURE__ */ new Map();
function getComponentMap() {
  return COMPONENT_MAP;
}
async function generateComponents(data, tokens) {
  const resolver = new TokenResolver(tokens);
  const total = data.components.length;
  COMPONENT_MAP.clear();
  const byCategory = /* @__PURE__ */ new Map();
  for (const schema of data.components) {
    const cat = schema.category || "other";
    if (!byCategory.has(cat))
      byCategory.set(cat, []);
    byCategory.get(cat).push(schema);
  }
  let created = 0;
  for (const [category, schemas] of byCategory) {
    const page = findOrCreatePage(`Components - ${capitalize(category)}`);
    let xOffset = 0;
    let yOffset = 0;
    let rowMaxHeight = 0;
    for (const schema of schemas) {
      created++;
      progress(STEP2, created, total, `Creating ${schema.name}`);
      try {
        const component = await createComponent(schema, resolver);
        page.appendChild(component);
        component.x = xOffset;
        component.y = yOffset;
        rowMaxHeight = Math.max(rowMaxHeight, component.height);
        xOffset += component.width + 100;
        if (xOffset > 2400) {
          xOffset = 0;
          yOffset += rowMaxHeight + 100;
          rowMaxHeight = 0;
        }
        COMPONENT_MAP.set(schema.id, component);
        if (schema.variants && schema.variants.length > 1) {
          await createVariantSet(component, schema, resolver, page);
        }
      } catch (err) {
        log(`Error creating ${schema.name}: ${err}`);
      }
    }
  }
  return created;
}
async function createComponent(schema, resolver) {
  const component = figma.createComponent();
  component.name = schema.name;
  const width = parseSize(schema.dimensions.width, 360);
  const height = parseSize(schema.dimensions.height, 64);
  component.resize(Math.max(width, 200), Math.max(height, 40));
  component.layoutMode = "NONE";
  component.fills = [];
  if (schema.layers && schema.layers.length > 0) {
    for (const layer of schema.layers) {
      try {
        const node = await createLayer(layer, resolver, width);
        if (node)
          component.appendChild(node);
      } catch (err) {
        log(`  Warning: Failed to create layer "${layer.name}": ${err}`);
      }
    }
  }
  component.description = schema.description || "";
  return component;
}
async function createLayer(layer, resolver, parentWidth = 360) {
  let node;
  switch (layer.type) {
    case "frame": {
      const frame = figma.createFrame();
      frame.name = layer.name;
      frame.fills = [];
      const sizeW = layer.size ? resolveSizeValue(layer.size.width, parentWidth, 200) : parentWidth;
      const sizeH = layer.size ? resolveSizeValue(layer.size.height, 48, 48) : 48;
      frame.resize(Math.max(sizeW, 1), Math.max(sizeH, 1));
      const hasGap = layer.tokens && layer.tokens.gap;
      const hasPadding = layer.tokens && (layer.tokens.paddingHorizontal || layer.tokens.paddingVertical || layer.tokens.padding);
      if (layer.layout) {
        frame.layoutMode = layer.layout.type === "horizontal" ? "HORIZONTAL" : "VERTICAL";
        frame.primaryAxisSizingMode = "AUTO";
        frame.counterAxisSizingMode = "FIXED";
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
      } else if (hasGap || hasPadding || layer.children && layer.children.length > 0) {
        frame.layoutMode = "HORIZONTAL";
        frame.primaryAxisSizingMode = "AUTO";
        frame.counterAxisSizingMode = "FIXED";
      }
      applyFrameTokens(frame, layer.tokens, resolver);
      if (layer.children) {
        for (const child of layer.children) {
          const childNode = await createLayer(child, resolver, sizeW);
          if (childNode)
            frame.appendChild(childNode);
        }
      }
      node = frame;
      break;
    }
    case "rectangle": {
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
    case "text": {
      const text = figma.createText();
      text.name = layer.name;
      const fontFamily = layer.tokens && layer.tokens.fontFamily ? resolver.resolve(layer.tokens.fontFamily) : "Inter";
      const fontWeight = layer.tokens && layer.tokens.fontWeight ? resolver.resolve(layer.tokens.fontWeight) : "400";
      const fontStyle = mapFontWeight(fontWeight);
      try {
        await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
        text.fontName = { family: fontFamily, style: fontStyle };
      } catch (_e) {
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        text.fontName = { family: "Inter", style: "Regular" };
      }
      text.characters = layer.content || layer.name || "Text";
      applyTextTokens(text, layer.tokens, resolver);
      node = text;
      break;
    }
    case "icon": {
      const icon = figma.createFrame();
      icon.name = `[Icon] ${layer.name}`;
      const size = layer.size ? parseSize(layer.size.width, 24) : 24;
      icon.resize(size, size);
      icon.fills = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } }];
      icon.cornerRadius = 4;
      node = icon;
      break;
    }
    case "instance": {
      const placeholder = figma.createFrame();
      placeholder.name = `[Instance] ${layer.componentRef || layer.name}`;
      placeholder.fills = [
        { type: "SOLID", color: { r: 0.95, g: 0.95, b: 0.98 }, opacity: 0.5 }
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
  if (layer.position) {
    node.x = parseSize(layer.position.x, 0);
    node.y = parseSize(layer.position.y, 0);
  }
  if (layer.visible) {
    node.setPluginData("visibilityCondition", layer.visible);
    node.name += ` [Cond: ${layer.visible}]`;
  }
  return node;
}
function applyFrameTokens(frame, tokens, resolver) {
  if (!tokens)
    return;
  if (tokens.fill) {
    const color = resolver.resolve(tokens.fill);
    const rgb = hexToRgb(color);
    const opacity = extractOpacity(color);
    frame.fills = [{ type: "SOLID", color: rgb, opacity }];
  }
  if (tokens.stroke || tokens.borderColor) {
    const color = resolver.resolve(tokens.stroke || tokens.borderColor);
    frame.strokes = [{ type: "SOLID", color: hexToRgb(color), opacity: extractOpacity(color) }];
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
function applyRectTokens(rect, tokens, resolver) {
  if (!tokens)
    return;
  if (tokens.fill) {
    const color = resolver.resolve(tokens.fill);
    rect.fills = [{ type: "SOLID", color: hexToRgb(color), opacity: extractOpacity(color) }];
  }
  if (tokens.borderRadius) {
    rect.cornerRadius = resolver.resolveNumber(tokens.borderRadius, 0);
  }
  if (tokens.stroke || tokens.borderColor) {
    const color = resolver.resolve(tokens.stroke || tokens.borderColor);
    rect.strokes = [{ type: "SOLID", color: hexToRgb(color), opacity: extractOpacity(color) }];
    rect.strokeWeight = resolver.resolveNumber(tokens.strokeWidth, 1);
  }
}
function applyTextTokens(text, tokens, resolver) {
  if (!tokens)
    return;
  if (tokens.fontSize) {
    text.fontSize = resolver.resolveNumber(tokens.fontSize, 16);
  }
  if (tokens.lineHeight) {
    const lh = resolver.resolveNumber(tokens.lineHeight, 1.5);
    if (lh <= 3) {
      text.lineHeight = { value: lh * 100, unit: "PERCENT" };
    } else {
      text.lineHeight = { value: lh, unit: "PIXELS" };
    }
  }
  if (tokens.letterSpacing) {
    text.letterSpacing = {
      value: resolver.resolveNumber(tokens.letterSpacing, 0),
      unit: "PIXELS"
    };
  }
  if (tokens.fill || tokens.color) {
    const color = resolver.resolve(tokens.fill || tokens.color);
    text.fills = [{ type: "SOLID", color: hexToRgb(color), opacity: extractOpacity(color) }];
  }
}
async function createVariantSet(baseComponent, schema, resolver, page) {
  if (!schema.variants || schema.variants.length <= 1)
    return;
  const components = [baseComponent];
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
    COMPONENT_MAP.set(schema.id, components[0]);
  } catch (err) {
    log(`Warning: Could not create variant set for ${schema.name}: ${err}`);
  }
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function resolveSizeValue(value, parentSize, fallback) {
  if (value === void 0 || value === null)
    return fallback;
  if (typeof value === "number")
    return value;
  if (value === "100%" || value === "fill")
    return parentSize;
  if (value === "auto")
    return fallback;
  var num = parseFloat(value);
  return isNaN(num) ? fallback : num;
}

// src/modules/screen-generator.ts
var STEP3 = "generate-screens";
async function generateScreens(screens, tokens) {
  const resolver = new TokenResolver(tokens);
  const screensPage = findOrCreatePage("Screens");
  let created = 0;
  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];
    progress(STEP3, i + 1, screens.length, `Creating ${screen._metadata.screenName}`);
    try {
      const frame = await createScreen(screen, resolver);
      screensPage.appendChild(frame);
      frame.x = created * (frame.width + 200);
      frame.y = 0;
      created++;
    } catch (err) {
      log(`Error creating screen ${screen._metadata.screenName}: ${err}`);
    }
  }
  return created;
}
async function createScreen(screen, resolver) {
  const frame = figma.createFrame();
  frame.name = screen._metadata.screenName;
  frame.resize(screen.frame.width, 900);
  const bgColor = resolver.resolve(screen.frame.fill);
  if (bgColor && !bgColor.startsWith("{")) {
    frame.fills = [{ type: "SOLID", color: hexToRgb(bgColor), opacity: extractOpacity(bgColor) }];
  } else {
    frame.fills = [{ type: "SOLID", color: { r: 0.969, g: 0.969, b: 0.949 } }];
  }
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "FIXED";
  const pad = screen.frame.padding || { top: 0, right: 0, bottom: 0, left: 0 };
  frame.paddingTop = pad.top || 0;
  frame.paddingRight = pad.right || 0;
  frame.paddingBottom = pad.bottom || 0;
  frame.paddingLeft = pad.left || 0;
  const sortedSections = [...screen.sections].sort((a, b) => a.order - b.order);
  for (const section of sortedSections) {
    try {
      const sectionNode = await createSection(section, resolver, screen.frame.width);
      frame.appendChild(sectionNode);
      try {
        sectionNode.layoutSizingHorizontal = "FILL";
      } catch (_e) {
      }
    } catch (err) {
      log(`  Error in section "${section.name}": ${err}`);
      const placeholder = figma.createFrame();
      placeholder.name = `[Error] ${section.name}`;
      placeholder.resize(screen.frame.width, 60);
      placeholder.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0.9 } }];
      frame.appendChild(placeholder);
    }
  }
  frame.setPluginData("screenId", screen._metadata.screenId);
  frame.setPluginData("role", screen._metadata.role);
  frame.setPluginData("states", JSON.stringify(screen._metadata.states));
  return frame;
}
async function createSection(section, resolver, parentWidth) {
  const componentMap = getComponentMap();
  if (section.component && componentMap.has(section.component)) {
    const master = componentMap.get(section.component);
    const instance = master.createInstance();
    if (section.props) {
      applyInstanceProps(instance, section.props);
    }
    const wrapper = figma.createFrame();
    wrapper.name = section.name;
    wrapper.layoutMode = "VERTICAL";
    wrapper.primaryAxisSizingMode = "AUTO";
    wrapper.counterAxisSizingMode = "FIXED";
    wrapper.resize(parentWidth, instance.height);
    wrapper.fills = [];
    wrapper.appendChild(instance);
    return wrapper;
  }
  const sectionFrame = figma.createFrame();
  sectionFrame.name = section.name;
  sectionFrame.fills = [];
  const width = section.size ? parseSize(section.size.width, parentWidth) : parentWidth;
  sectionFrame.resize(width, 100);
  if (section.layout === "vertical") {
    sectionFrame.layoutMode = "VERTICAL";
  } else if (section.layout === "horizontal" || section.layout === "horizontal-grid") {
    sectionFrame.layoutMode = "HORIZONTAL";
    sectionFrame.layoutWrap = "WRAP";
  } else if (section.layout === "two-column") {
    sectionFrame.layoutMode = "HORIZONTAL";
  } else {
    sectionFrame.layoutMode = "VERTICAL";
  }
  sectionFrame.primaryAxisSizingMode = "AUTO";
  sectionFrame.counterAxisSizingMode = "FIXED";
  if (section.gap) {
    sectionFrame.itemSpacing = resolver.resolveNumber(section.gap, 16);
  }
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
  if (section.tokens) {
    applyFrameTokens2(sectionFrame, section.tokens, resolver);
  }
  if (section.children) {
    for (const child of section.children) {
      const childNode = await createScreenElement(child, resolver, width);
      if (childNode)
        sectionFrame.appendChild(childNode);
    }
  }
  if (section.conditional) {
    sectionFrame.setPluginData("conditional", section.conditional);
    sectionFrame.name += ` [If: ${section.conditional}]`;
  }
  return sectionFrame;
}
async function createScreenElement(element, resolver, parentWidth) {
  const componentMap = getComponentMap();
  if (element.repeat) {
    const container = figma.createFrame();
    container.name = `${element.component} (repeated)`;
    container.layoutMode = "VERTICAL";
    container.primaryAxisSizingMode = "AUTO";
    container.counterAxisSizingMode = "FIXED";
    container.fills = [];
    if (element.gap) {
      container.itemSpacing = resolver.resolveNumber(element.gap, 12);
    } else {
      container.itemSpacing = 12;
    }
    const count = element.maxVisible || 3;
    for (let i = 0; i < count; i++) {
      const instance2 = await instantiateComponent(element, componentMap, resolver);
      if (instance2)
        container.appendChild(instance2);
    }
    return container;
  }
  if (element.component === "text") {
    return await createTextElement(element, resolver);
  }
  if (element.children && !element.component) {
    const container = figma.createFrame();
    container.name = "container";
    container.layoutMode = element.layout === "horizontal" ? "HORIZONTAL" : "VERTICAL";
    container.primaryAxisSizingMode = "AUTO";
    container.counterAxisSizingMode = "FIXED";
    container.fills = [];
    if (element.gap) {
      container.itemSpacing = resolver.resolveNumber(element.gap, 8);
    }
    for (const child of element.children) {
      const childNode = await createScreenElement(child, resolver, parentWidth);
      if (childNode)
        container.appendChild(childNode);
    }
    return container;
  }
  const instance = await instantiateComponent(element, componentMap, resolver);
  return instance;
}
async function instantiateComponent(element, componentMap, resolver) {
  const componentId = element.component;
  if (componentMap.has(componentId)) {
    const master = componentMap.get(componentId);
    const instance = master.createInstance();
    if (element.props) {
      applyInstanceProps(instance, element.props);
    }
    return instance;
  }
  const placeholder = figma.createFrame();
  placeholder.name = `[Missing: ${componentId}]`;
  placeholder.resize(200, 48);
  placeholder.fills = [{ type: "SOLID", color: { r: 1, g: 0.96, b: 0.88 } }];
  placeholder.cornerRadius = 8;
  placeholder.layoutMode = "HORIZONTAL";
  placeholder.primaryAxisAlignItems = "CENTER";
  placeholder.counterAxisAlignItems = "CENTER";
  placeholder.paddingLeft = 12;
  placeholder.paddingRight = 12;
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    const label = figma.createText();
    label.fontName = { family: "Inter", style: "Regular" };
    label.characters = `[${componentId}${element.variant ? ` / ${element.variant}` : ""}]`;
    label.fontSize = 12;
    label.fills = [{ type: "SOLID", color: { r: 0.6, g: 0.4, b: 0.2 } }];
    placeholder.appendChild(label);
  } catch (_e) {
  }
  return placeholder;
}
async function createTextElement(element, resolver) {
  const text = figma.createText();
  const fontWeight = element.tokens && element.tokens.fontWeight ? resolver.resolve(element.tokens.fontWeight) : "400";
  const fontStyle = mapFontWeight(fontWeight);
  try {
    await figma.loadFontAsync({ family: "Inter", style: fontStyle });
    text.fontName = { family: "Inter", style: fontStyle };
  } catch (_e) {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    text.fontName = { family: "Inter", style: "Regular" };
  }
  text.characters = element.content || "Text";
  if (element.tokens) {
    if (element.tokens.fontSize) {
      text.fontSize = resolver.resolveNumber(element.tokens.fontSize, 16);
    }
    if (element.tokens.fill) {
      const color = resolver.resolve(element.tokens.fill);
      if (color && !color.startsWith("{")) {
        text.fills = [{ type: "SOLID", color: hexToRgb(color), opacity: extractOpacity(color) }];
      }
    }
    if (element.tokens.lineHeight) {
      const lh = resolver.resolveNumber(element.tokens.lineHeight, 1.5);
      if (lh <= 3) {
        text.lineHeight = { value: lh * 100, unit: "PERCENT" };
      } else {
        text.lineHeight = { value: lh, unit: "PIXELS" };
      }
    }
    if (element.tokens.letterSpacing) {
      text.letterSpacing = {
        value: resolver.resolveNumber(element.tokens.letterSpacing, 0),
        unit: "PIXELS"
      };
    }
  }
  return text;
}
function applyInstanceProps(instance, props) {
  for (const [key, value] of Object.entries(props)) {
    try {
      if (typeof value === "string" || typeof value === "boolean") {
        instance.setProperties({ [key]: value });
      }
    } catch (_e) {
    }
  }
}
function applyFrameTokens2(frame, tokens, resolver) {
  if (tokens.fill) {
    const color = resolver.resolve(tokens.fill);
    if (color && !color.startsWith("{")) {
      frame.fills = [{ type: "SOLID", color: hexToRgb(color), opacity: extractOpacity(color) }];
    }
  }
  if (tokens.borderRadius) {
    frame.cornerRadius = resolver.resolveNumber(tokens.borderRadius, 0);
  }
  if (tokens.gap) {
    frame.itemSpacing = resolver.resolveNumber(tokens.gap, 0);
  }
}

// src/code.ts
figma.showUI(__html__, { width: 480, height: 640 });
var tokensData = null;
figma.ui.onmessage = async (msg) => {
  try {
    switch (msg.type) {
      case "import-tokens": {
        log("Starting token import...");
        tokensData = msg.payload;
        const stats = await importTokens(msg.payload);
        complete("import-tokens", "Token import complete", stats);
        break;
      }
      case "generate-components": {
        if (!tokensData) {
          error("generate-components", "Please import tokens first");
          return;
        }
        log("Starting component generation...");
        const count = await generateComponents(msg.payload, tokensData);
        complete("generate-components", `Generated ${count} components`, { components: count });
        break;
      }
      case "generate-screens": {
        if (!tokensData) {
          error("generate-screens", "Please import tokens first");
          return;
        }
        log("Starting screen generation...");
        const screenCount = await generateScreens(
          msg.payload.screens,
          msg.payload.tokens
        );
        complete("generate-screens", `Generated ${screenCount} screens`, { screens: screenCount });
        break;
      }
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    error(msg.type, `Unexpected error: ${errorMsg}`);
  }
};
