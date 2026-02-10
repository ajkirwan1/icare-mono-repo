#!/usr/bin/env node
/**
 * SVG Wireframe Generator
 *
 * Reads screen JSONs + tokens.json and produces SVG wireframes
 * that can be imported directly into Figma (File → Import or drag-and-drop).
 *
 * Usage:
 *   node generate.js                    # desktop only (1440px)
 *   node generate.js --viewport mobile  # mobile only (375px)
 *   node generate.js --viewport tablet  # tablet only (768px)
 *   node generate.js --viewport all     # all three viewports
 *
 * Output: docs/tiers/tier1/figma/svg-output/[viewport/]*.svg
 */

const fs = require('fs');
const path = require('path');

// ── Viewport State ─────────────────────────────────────────────────────────
const VIEWPORT_WIDTHS = { desktop: 1440, tablet: 768, mobile: 375 };
let VIEWPORT = 'desktop';
function isMobile() { return VIEWPORT === 'mobile'; }
function isTablet() { return VIEWPORT === 'tablet'; }
function padH() { return isMobile() ? 16 : 24; }

// ── Token Resolver ──────────────────────────────────────────────────────────

class TokenResolver {
  constructor(tokens) {
    this.tokens = tokens;
    this.cache = {};
  }

  resolve(value) {
    if (value === undefined || value === null) return '';
    if (typeof value === 'number') return String(value);
    if (typeof value !== 'string') return String(value);
    if (!value.startsWith('{') || !value.endsWith('}')) return value;

    const tokenPath = value.slice(1, -1);
    if (this.cache[tokenPath] !== undefined) return this.cache[tokenPath];

    const result = this._lookup(tokenPath);
    if (result !== undefined) {
      const resolved =
        typeof result === 'string' && result.startsWith('{')
          ? this.resolve(result)
          : String(result);
      this.cache[tokenPath] = resolved;
      return resolved;
    }
    return value; // unresolved — return as-is
  }

  resolveNumber(value, fallback) {
    if (fallback === undefined) fallback = 0;
    const resolved = this.resolve(value);
    const num = parseFloat(resolved);
    return isNaN(num) ? fallback : num;
  }

  color(value) {
    if (!value) return null;
    const resolved = this.resolve(value);
    if (resolved.startsWith('{')) return null;
    return resolved;
  }

  _lookup(dotPath) {
    const parts = dotPath.split('.');

    // Try global first
    let cur = this.tokens.global;
    for (let i = 0; i < parts.length; i++) {
      if (cur && typeof cur === 'object' && parts[i] in cur) {
        cur = cur[parts[i]];
      } else {
        // Fallback: try from root
        cur = this.tokens;
        for (let j = 0; j < parts.length; j++) {
          if (cur && typeof cur === 'object' && parts[j] in cur) {
            cur = cur[parts[j]];
          } else {
            return undefined;
          }
        }
        break;
      }
    }
    if (cur && typeof cur === 'object' && 'value' in cur) {
      const v = cur.value;
      if (typeof v === 'string' || typeof v === 'number') return v;
    }
    if (typeof cur === 'string' || typeof cur === 'number') return cur;
    return undefined;
  }
}

// ── SVG Helpers ─────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Template String Resolver (sampleData interpolation) ─────────────────────

function _lookupSamplePath(dotPath, sampleData) {
  var parts = dotPath.split('.');
  var cur = sampleData;
  for (var i = 0; i < parts.length; i++) {
    if (cur && typeof cur === 'object' && parts[i] in cur) {
      cur = cur[parts[i]];
    } else {
      return undefined;
    }
  }
  return cur;
}

function resolveTemplateStrings(obj, sampleData) {
  if (!sampleData || !obj) return obj;
  if (typeof obj === 'string') {
    // If the entire string is a single ${...} pattern, return the raw resolved value
    // (preserves arrays/objects instead of coercing to string)
    var singleMatch = obj.match(/^\$\{([^}]+)\}$/);
    if (singleMatch) {
      var resolved = _lookupSamplePath(singleMatch[1], sampleData);
      return resolved !== undefined ? resolved : obj;
    }
    // Otherwise interpolate inline ${...} patterns as strings
    return obj.replace(/\$\{([^}]+)\}/g, function (match, path) {
      var resolved = _lookupSamplePath(path, sampleData);
      if (resolved !== undefined && (typeof resolved === 'string' || typeof resolved === 'number' || typeof resolved === 'boolean')) {
        return String(resolved);
      }
      return match;
    });
  }
  if (Array.isArray(obj)) {
    return obj.map(function (item) { return resolveTemplateStrings(item, sampleData); });
  }
  if (typeof obj === 'object') {
    var result = {};
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = resolveTemplateStrings(obj[key], sampleData);
      }
    }
    return result;
  }
  return obj;
}

function c(resolver, token) {
  return resolver.color(token) || '#cccccc';
}

function n(resolver, token, fb) {
  return resolver.resolveNumber(token, fb);
}

// ── Section Renderers ───────────────────────────────────────────────────────
// Each renderer returns { svg: string, height: number }

function renderNavHeader(section, R, W) {
  const H = 64;
  const bg = c(R, '{colors.brand.primary}');
  const border = c(R, '{colors.border.soft}');
  const txt = c(R, '{colors.text.primary}');
  const brand = c(R, '{colors.brand.secondary}');
  const userName = (section.props && section.props.userName) || 'User';
  const role = (section.props && section.props.role) || 'care-receiver';
  const hasSearch = section.props && section.props.hasSearch;
  const notifCount = (section.props && section.props.notificationCount) || '0';

  let s = '';
  // Background
  s += `<rect width="${W}" height="${H}" fill="${bg}"/>`;
  s += `<line x1="0" y1="${H}" x2="${W}" y2="${H}" stroke="${border}" stroke-width="1"/>`;

  if (isMobile()) {
    // Mobile: Logo left, bell + avatar right, hamburger far-right
    s += `<rect x="16" y="14" width="80" height="36" rx="8" fill="${brand}" opacity="0.25"/>`;
    s += `<text x="32" y="38" font-family="Inter,sans-serif" font-size="15" font-weight="700" fill="${txt}">iCare</text>`;
    // Notification bell
    s += `<rect x="${W - 100}" y="16" width="32" height="32" rx="8" fill="${txt}" opacity="0.06"/>`;
    s += `<text x="${W - 91}" y="38" font-family="Inter,sans-serif" font-size="16" fill="${txt}" opacity="0.6">&#x1F514;</text>`;
    if (notifCount !== '0') {
      s += `<circle cx="${W - 68}" cy="20" r="9" fill="#dc2626"/>`;
      s += `<text x="${W - 72}" y="24" font-family="Inter,sans-serif" font-size="10" fill="white" font-weight="700">${notifCount}</text>`;
    }
    // Hamburger icon (3 lines)
    s += `<rect x="${W - 52}" y="22" width="20" height="2" rx="1" fill="${txt}" opacity="0.6"/>`;
    s += `<rect x="${W - 52}" y="30" width="20" height="2" rx="1" fill="${txt}" opacity="0.6"/>`;
    s += `<rect x="${W - 52}" y="38" width="20" height="2" rx="1" fill="${txt}" opacity="0.6"/>`;
    return { svg: s, height: H };
  }

  // Desktop: full nav
  // Logo
  s += `<rect x="24" y="14" width="100" height="36" rx="8" fill="${brand}" opacity="0.25"/>`;
  s += `<text x="46" y="38" font-family="Inter,sans-serif" font-size="15" font-weight="700" fill="${txt}">iCare</text>`;

  // Nav links
  const items =
    role === 'admin'
      ? ['Dashboard', 'Users', 'Bookings', 'Reports']
      : role === 'caregiver'
        ? ['Dashboard', 'Bookings', 'Calendar', 'Profile']
        : ['Dashboard', 'Bookings', 'Messages', 'Profile'];
  items.forEach((item, i) => {
    s += `<text x="${160 + i * 105}" y="38" font-family="Inter,sans-serif" font-size="14" fill="${txt}" opacity="0.65">${item}</text>`;
  });

  // Search bar (admin)
  if (hasSearch) {
    const sx = 560;
    s += `<rect x="${sx}" y="16" width="240" height="32" rx="8" fill="${txt}" opacity="0.06"/>`;
    s += `<text x="${sx + 12}" y="37" font-family="Inter,sans-serif" font-size="13" fill="${txt}" opacity="0.35">Search...</text>`;
  }

  // Notification bell area
  const bellX = W - 120;
  s += `<rect x="${bellX - 16}" y="16" width="32" height="32" rx="8" fill="${txt}" opacity="0.06"/>`;
  s += `<text x="${bellX - 7}" y="38" font-family="Inter,sans-serif" font-size="16" fill="${txt}" opacity="0.6">&#x1F514;</text>`;
  if (notifCount !== '0') {
    s += `<circle cx="${bellX + 12}" cy="20" r="9" fill="#dc2626"/>`;
    s += `<text x="${bellX + 8}" y="24" font-family="Inter,sans-serif" font-size="10" fill="white" font-weight="700">${notifCount}</text>`;
  }

  // Avatar + name
  s += `<circle cx="${W - 56}" cy="32" r="16" fill="${brand}" opacity="0.35"/>`;
  s += `<text x="${W - 36}" y="37" font-family="Inter,sans-serif" font-size="13" fill="${txt}">${esc(userName)}</text>`;

  return { svg: s, height: H };
}

function renderPageHeader(section, R, W) {
  const padH = isMobile() ? 16 : n(R, section.padding && section.padding.horizontal, 24);
  const padTop = n(R, section.padding && section.padding.top, 32);
  const padBottom = n(R, section.padding && section.padding.bottom, 16);

  let s = '';
  let y = padTop;

  if (section.children) {
    for (const child of section.children) {
      if (child.component === 'text') {
        const fs = n(R, child.tokens && child.tokens.fontSize, 16);
        const fw = n(R, child.tokens && child.tokens.fontWeight, 400);
        const fill = c(R, child.tokens && child.tokens.fill);
        const weight = fw >= 600 ? 'bold' : fw >= 500 ? '500' : 'normal';
        s += `<text x="${padH}" y="${y + fs * 0.8}" font-family="Inter,sans-serif" font-size="${fs}" font-weight="${weight}" fill="${fill}">${esc(child.content || '')}</text>`;
        y += fs * 1.5;
      }
    }
  }
  y += padBottom;
  return { svg: s, height: y };
}

function renderAlertBanner(section, R, W) {
  const padH = isMobile() ? 16 : n(R, section.padding && section.padding.horizontal, 24);
  const padBottom = n(R, section.padding && section.padding.bottom, 16);

  // Determine variant from props or states
  let variant = (section.props && section.props.variant) || 'warning';
  let title = (section.props && section.props.title) || '';
  let message = (section.props && section.props.message) || '';
  let ctaLabel = (section.props && section.props.ctaLabel) || '';

  // Admin alert banners may use states[0].props
  if (!title && section.states && section.states[0] && section.states[0].props) {
    const sp = section.states[0].props;
    variant = sp.variant || variant;
    title = sp.title || title;
    message = sp.message || message;
    ctaLabel = sp.ctaLabel || ctaLabel;
  }

  const isError = variant === 'error' || variant === 'safeguarding-urgent';
  const bgColor = isError ? c(R, '{colors.alert.error-bg}') : c(R, '{colors.alert.warning-bg}');
  const borderColor = isError ? c(R, '{colors.alert.error-border}') : c(R, '{colors.alert.warning-border}');
  const textColor = isError ? c(R, '{colors.alert.error-text}') : c(R, '{colors.alert.warning-text}');

  const H = 80;
  const cw = W - padH * 2;
  let s = '';
  s += `<rect x="${padH}" y="0" width="${cw}" height="${H}" rx="12" fill="${bgColor}" stroke="${borderColor}" stroke-width="1.5"/>`;

  // Left accent bar for error
  if (isError) {
    s += `<rect x="${padH}" y="0" width="4" height="${H}" rx="2" fill="${borderColor}"/>`;
  }

  // Icon circle
  s += `<circle cx="${padH + 32}" cy="${H / 2}" r="14" fill="${borderColor}" opacity="0.2"/>`;
  s += `<text x="${padH + 26}" y="${H / 2 + 5}" font-family="Inter,sans-serif" font-size="16">${isError ? '&#x26D4;' : '&#x26A0;'}</text>`;

  // Title
  s += `<text x="${padH + 56}" y="28" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="${textColor}">${esc(title)}</text>`;
  if (message) {
    s += `<text x="${padH + 56}" y="48" font-family="Inter,sans-serif" font-size="13" fill="${textColor}" opacity="0.85">${esc(message)}</text>`;
  }
  if (ctaLabel) {
    s += `<text x="${padH + 56}" y="68" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="${textColor}" text-decoration="underline">${esc(ctaLabel)}</text>`;
  }

  return { svg: s, height: H + padBottom };
}

function renderQuickActions(section, R, W) {
  const padH = isMobile() ? 16 : n(R, section.padding && section.padding.horizontal, 24);
  const padV = n(R, section.padding && section.padding.vertical, 16);
  const columns = isMobile() ? 1 : (section.columns || 3);
  const gap = isMobile() ? 12 : 28;
  const cw = W - padH * 2;
  const cardW = (cw - gap * (columns - 1)) / columns;
  const cardH = 140;
  const brand = c(R, '{colors.brand.secondary}');
  const cardBg = c(R, '{colors.background.card-glass}');
  const cardBorder = c(R, '{colors.border.card}');
  const textP = c(R, '{colors.text.primary}');
  const br = n(R, '{borderRadius.lg}', 18);

  let s = '';
  if (section.children) {
    section.children.forEach((card, i) => {
      const col = i % columns;
      const x = padH + col * (cardW + gap);
      const y = padV;
      const isPrimary = card.variant === 'primary';
      const bg = isPrimary ? brand : cardBg;
      const tc = isPrimary ? '#ffffff' : textP;

      s += `<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="${br}" fill="${bg}" stroke="${cardBorder}" stroke-width="1"/>`;

      // Icon circle
      s += `<circle cx="${x + 30}" cy="${y + 38}" r="20" fill="${tc}" opacity="0.12"/>`;

      // Title
      const title = (card.props && card.props.title) || 'Action';
      s += `<text x="${x + 20}" y="${y + 78}" font-family="Inter,sans-serif" font-size="16" font-weight="600" fill="${tc}">${esc(title)}</text>`;

      // CTA button
      const ctaLabel = card.props && card.props.ctaLabel;
      if (ctaLabel) {
        s += `<rect x="${x + 16}" y="${y + 94}" width="${cardW - 32}" height="32" rx="10" fill="${tc}" opacity="0.14"/>`;
        s += `<text x="${x + cardW / 2}" y="${y + 115}" font-family="Inter,sans-serif" font-size="13" font-weight="500" fill="${tc}" text-anchor="middle">${esc(ctaLabel)}</text>`;
      }

      // Badge
      if (card.props && card.props.badge) {
        s += `<circle cx="${x + cardW - 28}" cy="${y + 24}" r="12" fill="#dc2626"/>`;
        s += `<text x="${x + cardW - 33}" y="${y + 28}" font-family="Inter,sans-serif" font-size="11" fill="white" font-weight="700">${card.props.badge}</text>`;
      }
    });
  }

  return { svg: s, height: cardH + padV * 2 };
}

// ── Widget Container (generic dashboard card with title + content) ──────────

function renderWidgetContainer(widget, R, containerWidth, sectionPadH) {
  sectionPadH = sectionPadH || 0;
  const cardBg = c(R, '{colors.background.card-glass}');
  const cardBorder = c(R, '{colors.border.card}');
  const textP = c(R, '{colors.text.primary}');
  const textM = c(R, '{colors.text.muted}');
  const brand = c(R, '{colors.brand.secondary}');
  const br = n(R, '{borderRadius.lg}', 18);
  const pad = 24;

  const title = (widget.props && widget.props.title) || 'Widget';
  const subtitle = widget.props && widget.props.subtitle;
  const hasHeaderAction = widget.props && widget.props.hasHeaderAction;
  const headerActionLabel = (widget.props && widget.props.headerActionLabel) || '';
  const hasFooterAction = widget.props && widget.props.hasFooterAction;
  const footerActionLabel = (widget.props && widget.props.footerActionLabel) || '';

  let s = '';
  let iy = pad; // inner y

  // Title
  s += `<text x="${pad}" y="${iy + 16}" font-family="Inter,sans-serif" font-size="18" font-weight="600" fill="${textP}">${esc(title)}</text>`;
  if (hasHeaderAction && headerActionLabel) {
    s += `<text x="${containerWidth - pad}" y="${iy + 16}" font-family="Inter,sans-serif" font-size="14" fill="${brand}" text-anchor="end">${esc(headerActionLabel)}</text>`;
  }
  iy += 26;

  // Badge
  if (widget.props && widget.props.badge) {
    s += `<rect x="${pad + 0}" y="${iy - 4}" width="24" height="20" rx="10" fill="#dc2626"/>`;
    s += `<text x="${pad + 6}" y="${iy + 10}" font-family="Inter,sans-serif" font-size="11" fill="white" font-weight="700">${widget.props.badge}</text>`;
  }

  // Subtitle
  if (subtitle) {
    s += `<text x="${pad}" y="${iy + 12}" font-family="Inter,sans-serif" font-size="14" fill="${textM}">${esc(subtitle)}</text>`;
    iy += 24;
  }

  iy += 12; // gap

  // Render content from children or states
  const contentChildren = getWidgetContent(widget);
  for (const child of contentChildren) {
    const result = renderWidgetChild(child, R, containerWidth - pad * 2);
    s += `<g transform="translate(${pad}, ${iy})">${result.svg}</g>`;
    iy += result.height;
  }

  // Footer action
  if (hasFooterAction && footerActionLabel) {
    iy += 8;
    s += `<line x1="${pad}" y1="${iy}" x2="${containerWidth - pad}" y2="${iy}" stroke="${cardBorder}" stroke-width="1"/>`;
    iy += 16;
    s += `<text x="${containerWidth / 2}" y="${iy + 4}" font-family="Inter,sans-serif" font-size="14" font-weight="500" fill="${brand}" text-anchor="middle">${esc(footerActionLabel)} &#x2192;</text>`;
    iy += 20;
  }

  iy += pad - 8;

  // Card background (drawn first so content overlays)
  const cardSvg =
    `<rect x="0" y="0" width="${containerWidth}" height="${iy}" rx="${br}" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1"/>`;

  return { svg: cardSvg + s, height: iy };
}

function getWidgetContent(widget) {
  // States with populated children take priority
  if (widget.states && widget.states.length > 0) {
    const populated = widget.states.find(st => st.name === 'populated') || widget.states[0];
    if (populated && populated.children) return populated.children;
  }
  if (widget.children) return widget.children;
  return [];
}

// ── Render individual widget content children ───────────────────────────────

function renderWidgetChild(child, R, width) {
  const comp = child.component;
  const gap = n(R, child.gap, 12);
  const repeat = child.repeat;
  const maxVisible = child.maxVisible || 1;

  // For repeating items
  if (repeat) {
    const count = Math.min(maxVisible, 6);
    const isGrid = child.layout === 'grid';
    const columns = isMobile() ? 1 : ((isGrid && child.columns && child.columns.desktop) || 1);

    if (isGrid && columns > 1) {
      let s = '';
      const colGap = gap;
      const rowGap = gap;
      const colWidth = (width - colGap * (columns - 1)) / columns;
      const sampleH = renderSingleChild(child, R, colWidth, 0).height;
      for (let i = 0; i < count; i++) {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const result = renderSingleChild(child, R, colWidth, i);
        s += `<g transform="translate(${col * (colWidth + colGap)}, ${row * (sampleH + rowGap)})">${result.svg}</g>`;
      }
      const totalRows = Math.ceil(count / columns);
      return { svg: s, height: totalRows * (sampleH + rowGap) - rowGap };
    }

    let s = '';
    let y = 0;
    for (let i = 0; i < count; i++) {
      const result = renderSingleChild(child, R, width, i);
      s += `<g transform="translate(0, ${y})">${result.svg}</g>`;
      y += result.height + gap;
    }
    return { svg: s, height: y - gap };
  }

  // Containers with children (metric-card, metric-list, etc.)
  if (Array.isArray(child.children) && child.children.length > 0) {
    return renderChildContainer(child, R, width);
  }

  return renderSingleChild(child, R, width, 0);
}

function renderChildContainer(container, R, width) {
  const gap = n(R, container.gap, 12);
  const isHoriz = container.layout === 'horizontal' || container.layout === 'horizontal-split';
  const childGap = n(R, container.gap, 16);

  let s = '';
  let y = 0;
  let x = 0;

  if (isHoriz) {
    const childWidth = (width - childGap * (container.children.length - 1)) / container.children.length;
    let maxH = 0;
    for (const child of container.children) {
      const result = renderWidgetChild(child, R, childWidth);
      s += `<g transform="translate(${x}, 0)">${result.svg}</g>`;
      x += childWidth + childGap;
      maxH = Math.max(maxH, result.height);
    }
    return { svg: s, height: maxH };
  }

  // Vertical
  for (const child of container.children) {
    const result = renderWidgetChild(child, R, width);
    s += `<g transform="translate(0, ${y})">${result.svg}</g>`;
    y += result.height + gap;
  }
  return { svg: s, height: Math.max(y - gap, 0) };
}

function renderSingleChild(child, R, width, index) {
  const comp = child.component;
  const textP = c(R, '{colors.text.primary}');
  const textM = c(R, '{colors.text.muted}');
  const brand = c(R, '{colors.brand.secondary}');
  const cardBg = c(R, '{colors.background.card-glass}');
  const border = c(R, '{colors.border.card}');

  switch (comp) {
    case 'booking-card':
    case 'booking-request-card': {
      const H = 90;
      const variant = child.variant || 'confirmed';
      const isPending = variant.includes('pending') || variant.includes('request');
      const badgeBg = isPending ? '#fef3c7' : '#dbeafe';
      const badgeTxt = isPending ? '#92400e' : '#1e40af';
      const badgeLabel = isPending ? 'Requested' : 'Confirmed';

      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${H}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<circle cx="36" cy="${H / 2}" r="22" fill="${brand}" opacity="0.25"/>`;
      s += `<text x="68" y="28" font-family="Inter,sans-serif" font-size="16" font-weight="600" fill="${textP}">Caregiver Name ${index + 1}</text>`;
      s += `<text x="68" y="48" font-family="Inter,sans-serif" font-size="13" fill="${textM}">Mon 15 Jan &#x2022; 10:00 &#x2013; 14:00 (4h)</text>`;
      s += `<rect x="68" y="56" width="82" height="22" rx="11" fill="${badgeBg}"/>`;
      s += `<text x="80" y="71" font-family="Inter,sans-serif" font-size="12" font-weight="500" fill="${badgeTxt}">${badgeLabel}</text>`;

      // CTA
      s += `<rect x="${width - 200}" y="${H / 2 - 14}" width="90" height="28" rx="8" fill="${brand}"/>`;
      s += `<text x="${width - 178}" y="${H / 2 + 2}" font-family="Inter,sans-serif" font-size="12" font-weight="500" fill="white">View Details</text>`;

      return { svg: s, height: H };
    }

    case 'activity-card': {
      const H = 52;
      let s = '';
      s += `<circle cx="20" cy="${H / 2}" r="16" fill="${brand}" opacity="0.12"/>`;
      s += `<text x="46" y="${H / 2 - 3}" font-family="Inter,sans-serif" font-size="14" fill="${textP}">Activity item ${index + 1}</text>`;
      s += `<text x="46" y="${H / 2 + 14}" font-family="Inter,sans-serif" font-size="12" fill="${textM}">2 hours ago</text>`;
      s += `<text x="${width - 64}" y="${H / 2 + 4}" font-family="Inter,sans-serif" font-size="13" fill="${brand}" font-weight="500">Review &#x2192;</text>`;
      return { svg: s, height: H };
    }

    case 'empty-state': {
      const H = 120;
      const heading = (child.props && child.props.heading) || 'No items';
      const message = (child.props && child.props.message) || '';
      const hasCta = child.props && child.props.hasAction;
      const ctaLabel = (child.props && child.props.ctaLabel) || '';

      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${H}" rx="12" fill="${textP}" opacity="0.03"/>`;
      s += `<circle cx="${width / 2}" cy="32" r="18" fill="${textM}" opacity="0.12"/>`;
      s += `<text x="${width / 2}" y="70" font-family="Inter,sans-serif" font-size="16" font-weight="600" fill="${textP}" text-anchor="middle">${esc(heading)}</text>`;
      if (message) {
        s += `<text x="${width / 2}" y="90" font-family="Inter,sans-serif" font-size="13" fill="${textM}" text-anchor="middle">${esc(message.substring(0, 60))}</text>`;
      }
      if (hasCta && ctaLabel) {
        s += `<rect x="${width / 2 - 60}" y="96" width="120" height="28" rx="8" fill="${brand}"/>`;
        s += `<text x="${width / 2}" y="115" font-family="Inter,sans-serif" font-size="13" font-weight="500" fill="white" text-anchor="middle">${esc(ctaLabel)}</text>`;
      }
      return { svg: s, height: H };
    }

    case 'metric-display': {
      const H = 60;
      const label = (child.props && child.props.label) || 'Metric';
      const value = (child.props && child.props.value) || '—';
      const trend = (child.props && child.props.trend) || '';

      let s = '';
      s += `<text x="0" y="16" font-family="Inter,sans-serif" font-size="13" fill="${textM}">${esc(label)}</text>`;
      s += `<text x="0" y="46" font-family="Inter,sans-serif" font-size="28" font-weight="700" fill="${textP}">${esc(value)}</text>`;
      if (trend) {
        const isUp = (child.props && child.props.trendDirection) === 'up';
        s += `<text x="0" y="60" font-family="Inter,sans-serif" font-size="12" fill="${isUp ? '#16a34a' : textM}">${esc(trend)}</text>`;
      }
      return { svg: s, height: H };
    }

    case 'metric-row': {
      const H = 28;
      const label = (child.props && child.props.label) || '';
      const value = (child.props && child.props.value) || '';
      let s = '';
      s += `<text x="0" y="16" font-family="Inter,sans-serif" font-size="14" fill="${textM}">${esc(label)}</text>`;
      s += `<text x="${width}" y="16" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="${textP}" text-anchor="end">${esc(value)}</text>`;
      return { svg: s, height: H };
    }

    case 'metric-item': {
      const H = 28;
      const label = (child.props && child.props.label) || '';
      const value = (child.props && child.props.value) || '';
      let s = '';
      s += `<text x="0" y="16" font-family="Inter,sans-serif" font-size="13" fill="${textM}">${esc(label)}: ${esc(value)}</text>`;
      return { svg: s, height: H };
    }

    case 'metric-breakdown': {
      if (child.children) return renderChildContainer(child, R, width);
      return { svg: '', height: 0 };
    }

    case 'metric-list': {
      if (child.children) return renderChildContainer(child, R, width);
      return { svg: '', height: 0 };
    }

    case 'metric-card':
    case 'metric-card-grid': {
      if (child.children) return renderChildContainer(child, R, width);
      const H = 80;
      const label = (child.props && child.props.label) || 'Metric';
      const value = (child.props && child.props.value) || '—';
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${H}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<text x="16" y="28" font-family="Inter,sans-serif" font-size="13" fill="${textM}">${esc(label)}</text>`;
      s += `<text x="16" y="56" font-family="Inter,sans-serif" font-size="24" font-weight="700" fill="${textP}">${esc(value)}</text>`;
      return { svg: s, height: H };
    }

    case 'profile-completion-bar': {
      const H = 40;
      let s = '';
      s += `<rect x="0" y="8" width="${width}" height="16" rx="8" fill="${textP}" opacity="0.08"/>`;
      s += `<rect x="0" y="8" width="${width * 0.75}" height="16" rx="8" fill="${brand}"/>`;
      s += `<text x="${width * 0.75 + 8}" y="22" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="${textP}">75%</text>`;
      return { svg: s, height: H };
    }

    case 'verification-badges': {
      const H = 40;
      const badges = ['DBS Check', 'ID Verified', 'References'];
      let s = '';
      let bx = 0;
      badges.forEach((badge) => {
        s += `<rect x="${bx}" y="4" width="100" height="28" rx="14" fill="#dcfce7"/>`;
        s += `<text x="${bx + 12}" y="23" font-family="Inter,sans-serif" font-size="12" font-weight="500" fill="#166534">${badge}</text>`;
        bx += 110;
      });
      return { svg: s, height: H };
    }

    case 'verification-badge-row': {
      const vbrBadges = Array.isArray(child.props && child.props.badges) ? child.props.badges : ['DBS Verified', 'ID Verified'];
      const vbrH = 32;
      let s = '', bx = 0;
      vbrBadges.forEach(function (badge) {
        const label = typeof badge === 'string' ? badge : (badge.label || 'Badge');
        const bw = label.length * 7 + 24;
        s += `<rect x="${bx}" y="2" width="${bw}" height="26" rx="13" fill="#dcfce7"/>`;
        s += `<text x="${bx + 12}" y="20" font-family="Inter,sans-serif" font-size="11" font-weight="500" fill="#166534">${esc(label)}</text>`;
        bx += bw + 8;
      });
      return { svg: s, height: vbrH };
    }

    case 'user-avatar': {
      const avatarSize = parseInt((child.props && child.props.size) || '56', 10) || 56;
      const r = Math.min(avatarSize, 80) / 2;
      const name = (child.props && child.props.name) || '';
      const initials = name.split(' ').map(function (w) { return w.charAt(0); }).join('').substring(0, 2).toUpperCase() || '?';
      let s = '';
      s += `<circle cx="${r}" cy="${r}" r="${r}" fill="${brand}" opacity="0.2"/>`;
      s += `<text x="${r}" y="${r + 6}" font-family="Inter,sans-serif" font-size="${Math.round(r * 0.7)}" font-weight="600" fill="${brand}" text-anchor="middle">${esc(initials)}</text>`;
      return { svg: s, height: r * 2 };
    }

    case 'frame': {
      // Frame is a layout container — if children somehow not caught upstream, render empty
      return { svg: '', height: 0 };
    }

    case 'profile-visibility-toggle': {
      const H = 36;
      let s = '';
      s += `<text x="0" y="22" font-family="Inter,sans-serif" font-size="14" fill="${textP}">Profile visible to families</text>`;
      // Toggle
      s += `<rect x="${width - 48}" y="6" width="44" height="24" rx="12" fill="${brand}"/>`;
      s += `<circle cx="${width - 16}" cy="18" r="9" fill="white"/>`;
      return { svg: s, height: H };
    }

    case 'quick-action-button': {
      const H = 40;
      const label = (child.props && child.props.label) || 'Action';
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${H}" rx="10" fill="${brand}" opacity="0.12"/>`;
      s += `<text x="${width / 2}" y="25" font-family="Inter,sans-serif" font-size="14" font-weight="500" fill="${brand}" text-anchor="middle">${esc(label)}</text>`;
      return { svg: s, height: H };
    }

    case 'button': {
      const H = 40;
      const label = (child.props && child.props.label) || 'Button';
      const variant = (child.props && child.props.variant) || 'primary';
      const bg = variant === 'secondary' ? `${textP}` : brand;
      const opac = variant === 'secondary' ? '0.08' : '1';
      const textFill = variant === 'secondary' ? textP : 'white';
      let s = '';
      s += `<rect x="0" y="0" width="${Math.min(width, 200)}" height="${H}" rx="10" fill="${bg}" opacity="${opac}"/>`;
      s += `<text x="${Math.min(width, 200) / 2}" y="25" font-family="Inter,sans-serif" font-size="14" font-weight="500" fill="${textFill}" text-anchor="middle">${esc(label)}</text>`;
      return { svg: s, height: H };
    }

    case 'sla-indicator':
    case 'urgent-indicator': {
      const H = 28;
      const label = (child.props && child.props.label) || 'SLA Status';
      let s = '';
      s += `<circle cx="8" cy="14" r="6" fill="#f59e0b"/>`;
      s += `<text x="22" y="18" font-family="Inter,sans-serif" font-size="13" fill="${textM}">${esc(label)}</text>`;
      return { svg: s, height: H };
    }

    case 'activity-timeline':
    case 'activity-feed': {
      const H = 120;
      let s = '';
      for (let i = 0; i < 3; i++) {
        const fy = i * 36;
        s += `<circle cx="8" cy="${fy + 14}" r="5" fill="${brand}" opacity="0.4"/>`;
        if (i < 2) s += `<line x1="8" y1="${fy + 22}" x2="8" y2="${fy + 45}" stroke="${brand}" stroke-width="1" opacity="0.2"/>`;
        s += `<text x="24" y="${fy + 12}" font-family="Inter,sans-serif" font-size="13" fill="${textP}">Activity entry ${i + 1}</text>`;
        s += `<text x="24" y="${fy + 28}" font-family="Inter,sans-serif" font-size="11" fill="${textM}">Today, ${10 + i}:${30 + i * 5} AM</text>`;
      }
      return { svg: s, height: H };
    }

    case 'filter-dropdown': {
      const H = 36;
      const label = (child.props && child.props.label) || 'Filter';
      let s = '';
      s += `<rect x="0" y="0" width="160" height="${H}" rx="8" fill="white" stroke="${border}" stroke-width="1"/>`;
      s += `<text x="12" y="23" font-family="Inter,sans-serif" font-size="13" fill="${textM}">${esc(label)} &#x25BE;</text>`;
      return { svg: s, height: H };
    }

    case 'divider': {
      return { svg: `<line x1="0" y1="8" x2="${width}" y2="8" stroke="${border}" stroke-width="1"/>`, height: 16 };
    }

    case 'text': {
      const H = 24;
      const content = (child.props && child.props.content) || child.content || 'Text';
      const fs = n(R, child.tokens && child.tokens.fontSize, 14);
      const fill = c(R, child.tokens && child.tokens.fill);
      let s = `<text x="0" y="16" font-family="Inter,sans-serif" font-size="${fs}" fill="${fill}">${esc(content)}</text>`;
      return { svg: s, height: H };
    }

    case 'text-link': {
      const H = 24;
      const label = (child.props && child.props.label) || 'Link';
      const linkColor = c(R, child.tokens && child.tokens.fill) || c(R, '{colors.brand.link-bg}') || brand;
      const fs = n(R, child.tokens && child.tokens.fontSize, 14);
      const hasArrow = /[\u2190\u2192\u2039\u203A]/.test(label) || label.includes('<-') || label.includes('->');
      const displayLabel = hasArrow ? label : (child.props && child.props.iconPosition === 'left' ? '\u2190 ' + label : label + ' \u2192');
      let s = `<text x="0" y="16" font-family="Inter,sans-serif" font-size="${fs}" fill="${linkColor}" text-decoration="underline">${esc(displayLabel)}</text>`;
      return { svg: s, height: H };
    }

    case 'widget-container': {
      return renderWidgetContainer(child, R, width, 0);
    }

    case 'link-list': {
      const H = 80;
      const links = (child.props && child.props.links) || ['Link 1', 'Link 2', 'Link 3'];
      let s = '';
      links.forEach((link, i) => {
        s += `<text x="0" y="${16 + i * 24}" font-family="Inter,sans-serif" font-size="14" fill="${brand}" text-decoration="underline">${esc(typeof link === 'string' ? link : link.label || 'Link')}</text>`;
      });
      return { svg: s, height: H };
    }

    case 'system-status-bar': {
      const H = 28;
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${H}" rx="6" fill="#dcfce7"/>`;
      s += `<circle cx="16" cy="14" r="5" fill="#16a34a"/>`;
      s += `<text x="28" y="18" font-family="Inter,sans-serif" font-size="12" font-weight="500" fill="#166534">All systems operational</text>`;
      return { svg: s, height: H };
    }

    case 'caregiver-card': {
      const H = 280;
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${H}" rx="16" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<circle cx="${width / 2}" cy="48" r="32" fill="${brand}" opacity="0.25"/>`;
      s += `<text x="${width / 2}" y="100" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="${textP}" text-anchor="middle">Caregiver ${index + 1}</text>`;
      s += `<text x="${width / 2}" y="118" font-family="Inter,sans-serif" font-size="12" fill="${textM}" text-anchor="middle">Location &#x2022; ${index + 1}.2 mi</text>`;
      for (let i = 0; i < 5; i++) { s += `<text x="${width / 2 - 45 + i * 18}" y="140" font-family="Inter,sans-serif" font-size="14" fill="#f59e0b">&#x2605;</text>`; }
      s += `<text x="${width / 2}" y="164" font-family="Inter,sans-serif" font-size="18" font-weight="700" fill="${textP}" text-anchor="middle">&#xA3;1${7 + index}/hr</text>`;
      s += `<rect x="16" y="176" width="${(width - 32) * 0.48}" height="22" rx="11" fill="${brand}" opacity="0.12"/>`;
      s += `<text x="${16 + (width - 32) * 0.24}" y="191" font-family="Inter,sans-serif" font-size="11" fill="${brand}" text-anchor="middle">Companionship</text>`;
      s += `<rect x="16" y="${H - 52}" width="${width - 32}" height="36" rx="8" fill="${brand}"/>`;
      s += `<text x="${width / 2}" y="${H - 28}" font-family="Inter,sans-serif" font-size="13" font-weight="500" fill="white" text-anchor="middle">View Profile</text>`;
      s += `<text x="${width - 32}" y="28" font-family="Inter,sans-serif" font-size="18" fill="${textM}" opacity="0.4">&#x2661;</text>`;
      return { svg: s, height: H };
    }

    case 'filter-sidebar': {
      const groups = (child.props && child.props.filterGroups) || [];
      let s = '', iy = 16;
      s += `<text x="16" y="${iy + 14}" font-family="Inter,sans-serif" font-size="16" font-weight="600" fill="${textP}">Filters</text>`;
      iy += 32;
      groups.slice(0, 5).forEach(function (g) {
        s += `<line x1="16" y1="${iy}" x2="${width - 16}" y2="${iy}" stroke="${border}" stroke-width="1"/>`;
        iy += 16;
        s += `<text x="16" y="${iy + 12}" font-family="Inter,sans-serif" font-size="14" font-weight="500" fill="${textP}">${esc(g.label || 'Filter')}</text>`;
        s += `<text x="${width - 24}" y="${iy + 12}" font-family="Inter,sans-serif" font-size="12" fill="${textM}">${g.expanded !== false ? '&#x25B4;' : '&#x25BE;'}</text>`;
        iy += 22;
        if (g.expanded !== false && g.fields) {
          g.fields.forEach(function (f) {
            if (f.type === 'dual-range-slider') {
              s += `<rect x="20" y="${iy + 4}" width="${width - 40}" height="4" rx="2" fill="${textP}" opacity="0.1"/>`;
              s += `<rect x="${20 + (width - 40) * 0.2}" y="${iy + 4}" width="${(width - 40) * 0.35}" height="4" rx="2" fill="${brand}"/>`;
              s += `<circle cx="${20 + (width - 40) * 0.2}" cy="${iy + 6}" r="7" fill="white" stroke="${brand}" stroke-width="2"/>`;
              s += `<circle cx="${20 + (width - 40) * 0.55}" cy="${iy + 6}" r="7" fill="white" stroke="${brand}" stroke-width="2"/>`;
              iy += 28;
            } else {
              (f.options || []).slice(0, 3).forEach(function (o) {
                var chk = o.checked || o.selected;
                s += `<rect x="20" y="${iy}" width="14" height="14" rx="${f.type === 'radio-group' ? 7 : 3}" fill="${chk ? brand : 'transparent'}" stroke="${chk ? brand : border}" stroke-width="1.5"/>`;
                s += `<text x="42" y="${iy + 12}" font-family="Inter,sans-serif" font-size="13" fill="${textP}">${esc(o.label || '')}</text>`;
                iy += 22;
              });
            }
          });
        }
        iy += 8;
      });
      iy += 12;
      s += `<rect x="16" y="${iy}" width="${width - 32}" height="34" rx="8" fill="${brand}"/>`;
      s += `<text x="${width / 2}" y="${iy + 22}" font-family="Inter,sans-serif" font-size="13" font-weight="500" fill="white" text-anchor="middle">Apply Filters</text>`;
      iy += 48;
      var bg2 = `<rect x="0" y="0" width="${width}" height="${iy}" rx="16" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      return { svg: bg2 + s, height: iy };
    }

    case 'star-rating': {
      var rH = 20;
      var rating = (child.props && child.props.rating) || 5;
      let s = '';
      for (let i = 0; i < 5; i++) { s += `<text x="${i * 18}" y="14" font-family="Inter,sans-serif" font-size="14" fill="${i < Math.floor(rating) ? '#f59e0b' : '#d1d5db'}">&#x2605;</text>`; }
      if (child.props && child.props.reviewCount) { s += `<text x="96" y="14" font-family="Inter,sans-serif" font-size="12" fill="${textM}">(${child.props.reviewCount})</text>`; }
      return { svg: s, height: rH };
    }

    case 'filter-tag':
    case 'filter-tag-row': {
      var tags = Array.isArray(child.props && child.props.tags) ? child.props.tags : [{ label: 'Filter' }];
      var ftH = 28;
      let s = '', tx = 0;
      tags.forEach(function (t) {
        var lbl = t.label || t;
        var tw = lbl.length * 7 + 28;
        s += `<rect x="${tx}" y="0" width="${tw}" height="${ftH}" rx="14" fill="${brand}" opacity="0.1" stroke="${border}" stroke-width="1"/>`;
        s += `<text x="${tx + 10}" y="18" font-family="Inter,sans-serif" font-size="12" fill="${brand}">${esc(lbl)}</text>`;
        s += `<text x="${tx + tw - 16}" y="18" font-family="Inter,sans-serif" font-size="12" fill="${textM}">&#xD7;</text>`;
        tx += tw + 8;
      });
      return { svg: s, height: ftH };
    }

    case 'pagination-controls': {
      var pgH = 40;
      var cur = (child.props && child.props.currentPage) || 1;
      var total = (child.props && child.props.totalPages) || 3;
      let s = '', px = 0;
      s += `<rect x="${px}" y="2" width="64" height="36" rx="8" fill="transparent" stroke="${border}" stroke-width="1"/>`;
      s += `<text x="${px + 32}" y="25" font-family="Inter,sans-serif" font-size="12" fill="${textM}" text-anchor="middle">&#x2190; Prev</text>`;
      px += 76;
      for (let i = 1; i <= Math.min(total, 5); i++) {
        var act = i === cur;
        s += `<rect x="${px}" y="2" width="36" height="36" rx="8" fill="${act ? brand : 'transparent'}" ${act ? '' : `stroke="${border}" stroke-width="1"`}/>`;
        s += `<text x="${px + 18}" y="25" font-family="Inter,sans-serif" font-size="13" font-weight="${act ? '600' : '400'}" fill="${act ? 'white' : textP}" text-anchor="middle">${i}</text>`;
        px += 44;
      }
      s += `<rect x="${px}" y="2" width="64" height="36" rx="8" fill="transparent" stroke="${border}" stroke-width="1"/>`;
      s += `<text x="${px + 32}" y="25" font-family="Inter,sans-serif" font-size="12" fill="${textM}" text-anchor="middle">Next &#x2192;</text>`;
      return { svg: s, height: pgH };
    }

    case 'dual-range-slider': {
      var drH = 36;
      let s = '';
      s += `<rect x="0" y="12" width="${width}" height="4" rx="2" fill="${textP}" opacity="0.1"/>`;
      s += `<rect x="${width * 0.2}" y="12" width="${width * 0.4}" height="4" rx="2" fill="${brand}"/>`;
      s += `<circle cx="${width * 0.2}" cy="14" r="8" fill="white" stroke="${brand}" stroke-width="2"/>`;
      s += `<circle cx="${width * 0.6}" cy="14" r="8" fill="white" stroke="${brand}" stroke-width="2"/>`;
      return { svg: s, height: drH };
    }

    case 'availability-calendar':
    case 'date-picker': {
      var calH = 260;
      var avail = '#dcfce7';
      var unavail = '#f3f4f6';
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${calH}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<rect x="0" y="0" width="${width}" height="40" rx="12" fill="${textP}" opacity="0.04"/>`;
      s += `<text x="${width / 2}" y="26" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="${textP}" text-anchor="middle">February 2026</text>`;
      s += `<text x="24" y="26" font-family="Inter,sans-serif" font-size="16" fill="${textM}">&#x2039;</text>`;
      s += `<text x="${width - 24}" y="26" font-family="Inter,sans-serif" font-size="16" fill="${textM}">&#x203A;</text>`;
      var days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
      var cellW = (width - 24) / 7;
      days.forEach(function (d, i) { s += `<text x="${12 + i * cellW + cellW / 2}" y="60" font-family="Inter,sans-serif" font-size="11" fill="${textM}" text-anchor="middle">${d}</text>`; });
      for (var r = 0; r < 5; r++) {
        for (var col = 0; col < 7; col++) {
          var day = r * 7 + col - 2;
          if (day < 1 || day > 28) continue;
          var cx = 12 + col * cellW + cellW / 2;
          var cy = 78 + r * 36;
          var isAvail = day % 3 !== 0;
          s += `<rect x="${cx - cellW / 2 + 2}" y="${cy - 14}" width="${cellW - 4}" height="28" rx="6" fill="${isAvail ? avail : unavail}"/>`;
          s += `<text x="${cx}" y="${cy + 4}" font-family="Inter,sans-serif" font-size="13" fill="${textP}" text-anchor="middle">${day}</text>`;
        }
      }
      return { svg: s, height: calH };
    }

    case 'review-card': {
      var rcH = 120;
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${rcH}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<circle cx="32" cy="32" r="18" fill="${brand}" opacity="0.25"/>`;
      s += `<text x="60" y="28" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="${textP}">Reviewer ${index + 1}</text>`;
      s += `<text x="60" y="44" font-family="Inter,sans-serif" font-size="12" fill="${textM}">2 weeks ago</text>`;
      for (let i = 0; i < 5; i++) { s += `<text x="${width - 100 + i * 16}" y="28" font-family="Inter,sans-serif" font-size="12" fill="#f59e0b">&#x2605;</text>`; }
      s += `<text x="20" y="72" font-family="Inter,sans-serif" font-size="13" fill="${textP}">Wonderful caregiver, very reliable and caring. Highly recommended...</text>`;
      s += `<text x="20" y="100" font-family="Inter,sans-serif" font-size="12" fill="${brand}">Helpful (3)</text>`;
      return { svg: s, height: rcH };
    }

    case 'rating-distribution-chart': {
      var rdH = 140;
      let s = '';
      var barW = width - 80;
      var dist = [60, 25, 10, 3, 2];
      for (let i = 0; i < 5; i++) {
        var ry = i * 26;
        s += `<text x="0" y="${ry + 16}" font-family="Inter,sans-serif" font-size="13" fill="${textP}">${5 - i}&#x2605;</text>`;
        s += `<rect x="36" y="${ry + 4}" width="${barW}" height="16" rx="4" fill="${textP}" opacity="0.06"/>`;
        s += `<rect x="36" y="${ry + 4}" width="${barW * dist[i] / 100}" height="16" rx="4" fill="${brand}"/>`;
        s += `<text x="${width}" y="${ry + 16}" font-family="Inter,sans-serif" font-size="12" fill="${textM}" text-anchor="end">${dist[i]}%</text>`;
      }
      return { svg: s, height: rdH };
    }

    case 'verification-detail-list': {
      var vitems = (child.props && child.props.verificationItems) || [
        { name: 'Identity Verified', status: 'passed' }, { name: 'Enhanced DBS', status: 'passed' },
        { name: 'References', status: 'pending' }, { name: 'Right to Work', status: 'passed' }
      ];
      let s = '', viy = 0;
      s += `<text x="0" y="16" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="${textP}">Verification Status</text>`;
      viy = 32;
      vitems.forEach(function (item) {
        var isPassed = item.status === 'passed';
        var iconColor = isPassed ? '#16a34a' : '#f59e0b';
        s += `<circle cx="12" cy="${viy + 10}" r="9" fill="${iconColor}" opacity="0.15"/>`;
        s += `<text x="6" y="${viy + 14}" font-family="Inter,sans-serif" font-size="12" fill="${iconColor}">${isPassed ? '&#x2713;' : '&#x23F3;'}</text>`;
        s += `<text x="28" y="${viy + 14}" font-family="Inter,sans-serif" font-size="14" fill="${textP}">${esc(item.name)}</text>`;
        s += `<text x="${width}" y="${viy + 14}" font-family="Inter,sans-serif" font-size="12" fill="${isPassed ? '#16a34a' : '#f59e0b'}" text-anchor="end">${isPassed ? 'Verified' : 'Pending'}</text>`;
        viy += 32;
      });
      return { svg: s, height: viy };
    }

    case 'caregiver-summary-card': {
      var csH = 80;
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${csH}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<circle cx="44" cy="${csH / 2}" r="26" fill="${brand}" opacity="0.25"/>`;
      var csp = child.props || {};
      s += `<text x="80" y="28" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="${textP}">${esc(csp.name || 'Caregiver Name')}</text>`;
      for (let i = 0; i < 5; i++) { s += `<text x="${80 + i * 16}" y="48" font-family="Inter,sans-serif" font-size="12" fill="#f59e0b">&#x2605;</text>`; }
      s += `<text x="164" y="48" font-family="Inter,sans-serif" font-size="12" fill="${textM}">${csp.rating || '4.8'}</text>`;
      s += `<text x="80" y="64" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="${textP}">${esc(csp.hourlyRate || '&#xA3;18')}/hr</text>`;
      s += `<text x="${width - 24}" y="44" font-family="Inter,sans-serif" font-size="18" fill="${textM}">&#x203A;</text>`;
      return { svg: s, height: csH };
    }

    case 'price-summary-card': {
      var psH = 200;
      var psp = child.props || {};
      let s = '', piy = 16;
      s += `<rect x="0" y="0" width="${width}" height="${psH}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<text x="16" y="${piy + 16}" font-family="Inter,sans-serif" font-size="16" font-weight="600" fill="${textP}">Price Summary</text>`;
      piy += 36;
      var prows = [['Hourly rate', psp.hourlyRate || '&#xA3;18'], ['Duration', (psp.duration || 3) + ' hours'], ['Subtotal', '&#xA3;' + (psp.subtotal || 54)], ['Service fee (5%)', '&#xA3;' + (psp.serviceFee || '2.70')]];
      prows.forEach(function (rv) {
        s += `<text x="16" y="${piy + 12}" font-family="Inter,sans-serif" font-size="14" fill="${textM}">${rv[0]}</text>`;
        s += `<text x="${width - 16}" y="${piy + 12}" font-family="Inter,sans-serif" font-size="14" fill="${textP}" text-anchor="end">${rv[1]}</text>`;
        piy += 24;
      });
      s += `<line x1="16" y1="${piy}" x2="${width - 16}" y2="${piy}" stroke="${border}" stroke-width="1"/>`;
      piy += 12;
      s += `<text x="16" y="${piy + 14}" font-family="Inter,sans-serif" font-size="16" font-weight="700" fill="${textP}">Total</text>`;
      s += `<text x="${width - 16}" y="${piy + 14}" font-family="Inter,sans-serif" font-size="16" font-weight="700" fill="${textP}" text-anchor="end">&#xA3;${psp.total || '56.70'}</text>`;
      return { svg: s, height: psH };
    }

    case 'duration-selector': {
      var dsH = 44;
      var dsOpts = ['2h', '3h', '4h', 'Custom'];
      var dsSel = 1;
      let s = '';
      var dsow = (width - (dsOpts.length - 1) * 8) / dsOpts.length;
      dsOpts.forEach(function (o, i) {
        var ox = i * (dsow + 8);
        var isAct = i === dsSel;
        s += `<rect x="${ox}" y="0" width="${dsow}" height="40" rx="10" fill="${isAct ? brand : 'transparent'}" stroke="${isAct ? brand : border}" stroke-width="1.5"/>`;
        s += `<text x="${ox + dsow / 2}" y="25" font-family="Inter,sans-serif" font-size="14" font-weight="${isAct ? '600' : '400'}" fill="${isAct ? 'white' : textP}" text-anchor="middle">${o}</text>`;
      });
      return { svg: s, height: dsH };
    }

    case 'breadcrumb': {
      var bcItems = Array.isArray(child.props && child.props.items) ? child.props.items : [{ label: 'Home' }, { label: 'Page' }];
      var bcH = 20;
      let s = '', bx = 0;
      bcItems.forEach(function (it, i) {
        var isLast = i === bcItems.length - 1;
        s += `<text x="${bx}" y="14" font-family="Inter,sans-serif" font-size="13" fill="${isLast ? textP : brand}">${esc(it.label)}</text>`;
        bx += it.label.length * 7 + 4;
        if (!isLast) { s += `<text x="${bx}" y="14" font-family="Inter,sans-serif" font-size="13" fill="${textM}">&#x203A;</text>`; bx += 12; }
      });
      return { svg: s, height: bcH };
    }

    case 'booking-detail-card': {
      var bdH = 220;
      var bdp = child.props || {};
      let s = '', biy = 16;
      s += `<rect x="0" y="0" width="${width}" height="${bdH}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<text x="16" y="${biy + 14}" font-family="Inter,sans-serif" font-size="16" font-weight="600" fill="${textP}">Booking Details</text>`;
      biy += 32;
      var bdrows = [['Reference', bdp.bookingRef || 'BK-2026-0142'], ['Date', bdp.date || '20 Feb 2026'], ['Time', bdp.time || '10:00 - 14:00'], ['Duration', bdp.duration || '4 hours'], ['Service', bdp.serviceType || 'Companionship'], ['Address', bdp.address || '42 Rosemary Lane, London']];
      bdrows.forEach(function (rv) {
        s += `<text x="16" y="${biy + 12}" font-family="Inter,sans-serif" font-size="13" fill="${textM}">${rv[0]}</text>`;
        s += `<text x="140" y="${biy + 12}" font-family="Inter,sans-serif" font-size="14" fill="${textP}">${esc(rv[1])}</text>`;
        biy += 26;
      });
      return { svg: s, height: bdH };
    }

    case 'payment-summary': {
      var pmH = 220;
      var pmp = child.props || {};
      var pmStatus = pmp.paymentStatus || 'held';
      var statusMap = { held: { bg: '#fef3c7', t: '#92400e', l: 'Payment Held' }, released: { bg: '#dcfce7', t: '#166534', l: 'Payment Released' }, refunded: { bg: '#fee2e2', t: '#991b1b', l: 'Refunded' }, pending: { bg: '#dbeafe', t: '#1e40af', l: 'Pending' } };
      var sc = statusMap[pmStatus] || statusMap.held;
      let s = '', pmiy = 16;
      s += `<rect x="0" y="0" width="${width}" height="${pmH}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<text x="16" y="${pmiy + 14}" font-family="Inter,sans-serif" font-size="16" font-weight="600" fill="${textP}">Payment</text>`;
      s += `<rect x="${width - 120}" y="${pmiy}" width="104" height="24" rx="12" fill="${sc.bg}"/>`;
      s += `<text x="${width - 68}" y="${pmiy + 16}" font-family="Inter,sans-serif" font-size="11" font-weight="500" fill="${sc.t}" text-anchor="middle">${sc.l}</text>`;
      pmiy += 36;
      [['Hourly rate', '&#xA3;18'], ['Duration', '4 hours'], ['Subtotal', '&#xA3;72'], ['Service fee', '&#xA3;3.60']].forEach(function (rv) {
        s += `<text x="16" y="${pmiy + 12}" font-family="Inter,sans-serif" font-size="13" fill="${textM}">${rv[0]}</text>`;
        s += `<text x="${width - 16}" y="${pmiy + 12}" font-family="Inter,sans-serif" font-size="14" fill="${textP}" text-anchor="end">${rv[1]}</text>`;
        pmiy += 24;
      });
      s += `<line x1="16" y1="${pmiy}" x2="${width - 16}" y2="${pmiy}" stroke="${border}" stroke-width="1"/>`;
      pmiy += 12;
      s += `<text x="16" y="${pmiy + 14}" font-family="Inter,sans-serif" font-size="15" font-weight="700" fill="${textP}">Total</text>`;
      s += `<text x="${width - 16}" y="${pmiy + 14}" font-family="Inter,sans-serif" font-size="15" font-weight="700" fill="${textP}" text-anchor="end">&#xA3;75.60</text>`;
      return { svg: s, height: pmH };
    }

    case 'booking-timeline': {
      var btEvents = Array.isArray(child.props && child.props.events) ? child.props.events : [
        { title: 'Booking Requested', timestamp: '10 Feb, 14:32' },
        { title: 'Booking Accepted', timestamp: '10 Feb, 16:15', isActive: true }
      ];
      let s = '', btiy = 0;
      s += `<text x="0" y="16" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="${textP}">Timeline</text>`;
      btiy = 32;
      btEvents.forEach(function (ev, i) {
        var isLast = i === btEvents.length - 1;
        var dotFill = ev.isActive ? brand : border;
        if (!isLast) s += `<line x1="8" y1="${btiy + 16}" x2="8" y2="${btiy + 52}" stroke="${border}" stroke-width="2"/>`;
        s += `<circle cx="8" cy="${btiy + 10}" r="6" fill="${dotFill}"/>`;
        s += `<text x="24" y="${btiy + 8}" font-family="Inter,sans-serif" font-size="14" font-weight="500" fill="${textP}">${esc(ev.title)}</text>`;
        s += `<text x="24" y="${btiy + 24}" font-family="Inter,sans-serif" font-size="12" fill="${textM}">${esc(ev.timestamp || '')}</text>`;
        btiy += 52;
      });
      return { svg: s, height: btiy };
    }

    case 'earnings-breakdown-card': {
      var ebH = 180;
      let s = '', ebiy = 16;
      s += `<rect x="0" y="0" width="${width}" height="${ebH}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<text x="16" y="${ebiy + 14}" font-family="Inter,sans-serif" font-size="16" font-weight="600" fill="${textP}">Your Earnings</text>`;
      ebiy += 36;
      s += `<text x="16" y="${ebiy + 12}" font-family="Inter,sans-serif" font-size="14" fill="${textM}">Gross amount</text>`;
      s += `<text x="${width - 16}" y="${ebiy + 12}" font-family="Inter,sans-serif" font-size="14" fill="${textP}" text-anchor="end">&#xA3;72.00</text>`;
      ebiy += 26;
      s += `<text x="16" y="${ebiy + 12}" font-family="Inter,sans-serif" font-size="14" fill="#dc2626">Commission (15%)</text>`;
      s += `<text x="${width - 16}" y="${ebiy + 12}" font-family="Inter,sans-serif" font-size="14" fill="#dc2626" text-anchor="end">-&#xA3;10.80</text>`;
      ebiy += 26;
      s += `<line x1="16" y1="${ebiy}" x2="${width - 16}" y2="${ebiy}" stroke="${border}" stroke-width="1"/>`;
      ebiy += 12;
      s += `<rect x="12" y="${ebiy - 2}" width="${width - 24}" height="32" rx="8" fill="${textP}" opacity="0.04"/>`;
      s += `<text x="20" y="${ebiy + 18}" font-family="Inter,sans-serif" font-size="16" font-weight="700" fill="${textP}">Net payout</text>`;
      s += `<text x="${width - 20}" y="${ebiy + 18}" font-family="Inter,sans-serif" font-size="16" font-weight="700" fill="${textP}" text-anchor="end">&#xA3;61.20</text>`;
      return { svg: s, height: ebH };
    }

    case 'care-receiver-card': {
      var crH = 96;
      var crLimited = (child.variant || '') === 'privacy-limited';
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${crH}" rx="12" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      if (crLimited) {
        s += `<rect x="16" y="20" width="56" height="56" rx="28" fill="${brand}" opacity="0.15"/>`;
        s += `<text x="44" y="56" font-family="Inter,sans-serif" font-size="24" font-weight="600" fill="${brand}" text-anchor="middle">M</text>`;
        s += `<text x="84" y="40" font-family="Inter,sans-serif" font-size="15" font-weight="500" fill="${textP}">Care Receiver</text>`;
        s += `<text x="84" y="58" font-family="Inter,sans-serif" font-size="13" fill="${textM}">North London area</text>`;
        s += `<text x="84" y="76" font-family="Inter,sans-serif" font-size="12" fill="${textM}" opacity="0.7">Full details after acceptance</text>`;
      } else {
        s += `<circle cx="44" cy="48" r="24" fill="${brand}" opacity="0.25"/>`;
        s += `<text x="80" y="36" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="${textP}">Margaret Harrison</text>`;
        s += `<text x="80" y="54" font-family="Inter,sans-serif" font-size="13" fill="${textM}">42 Rosemary Lane, Islington</text>`;
        s += `<text x="80" y="72" font-family="Inter,sans-serif" font-size="13" fill="${brand}">07XXX XXX XXX</text>`;
      }
      return { svg: s, height: crH };
    }

    case 'profile-header': {
      var phH = 160;
      var php = child.props || {};
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${phH}" rx="16" fill="${cardBg}" stroke="${border}" stroke-width="1"/>`;
      s += `<circle cx="56" cy="60" r="40" fill="${brand}" opacity="0.25"/>`;
      s += `<text x="112" y="36" font-family="Inter,sans-serif" font-size="20" font-weight="700" fill="${textP}">${esc(php.name || 'Caregiver')}</text>`;
      s += `<text x="112" y="56" font-family="Inter,sans-serif" font-size="14" fill="${textM}">${esc(php.location || 'Location')} &#x2022; ${esc(php.distance || '0 mi')}</text>`;
      for (let i = 0; i < 5; i++) { s += `<text x="${112 + i * 18}" y="78" font-family="Inter,sans-serif" font-size="14" fill="#f59e0b">&#x2605;</text>`; }
      s += `<text x="112" y="100" font-family="Inter,sans-serif" font-size="18" font-weight="700" fill="${textP}">${esc(php.hourlyRate || '&#xA3;18')}/hr</text>`;
      s += `<rect x="${width - 200}" y="30" width="160" height="40" rx="10" fill="${brand}"/>`;
      s += `<text x="${width - 120}" y="55" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="white" text-anchor="middle">Request Booking</text>`;
      return { svg: s, height: phH };
    }

    case 'dropdown': {
      var ddH = 36;
      var ddp = child.props || {};
      var ddLabel = ddp.label || 'Select';
      var ddOpts = ddp.options || [];
      var ddDefault = ddOpts.find(function (o) { return o.default; }) || ddOpts[0];
      let s = '';
      s += `<rect x="0" y="0" width="${Math.min(width, 240)}" height="${ddH}" rx="8" fill="white" stroke="${border}" stroke-width="1"/>`;
      s += `<text x="12" y="23" font-family="Inter,sans-serif" font-size="13" fill="${textM}">${esc(ddLabel)} ${esc(ddDefault ? ddDefault.label : '')} &#x25BE;</text>`;
      return { svg: s, height: ddH };
    }

    case 'loading-skeleton':
    case 'loading-spinner': {
      var lsH = 48;
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${lsH}" rx="8" fill="${textP}" opacity="0.06"/>`;
      s += `<rect x="12" y="12" width="${width * 0.6}" height="12" rx="4" fill="${textP}" opacity="0.08"/>`;
      s += `<rect x="12" y="28" width="${width * 0.4}" height="8" rx="4" fill="${textP}" opacity="0.06"/>`;
      return { svg: s, height: lsH };
    }

    case 'status-badge': {
      var sbH = 28;
      var sbLabel = (child.props && child.props.label) || 'Status';
      let s = '';
      s += `<rect x="0" y="0" width="${sbLabel.length * 8 + 24}" height="${sbH}" rx="14" fill="#dbeafe"/>`;
      s += `<text x="12" y="18" font-family="Inter,sans-serif" font-size="12" font-weight="500" fill="#1e40af">${esc(sbLabel)}</text>`;
      return { svg: s, height: sbH };
    }

    case 'countdown-timer': {
      var ctH = 28;
      let s = '';
      s += `<rect x="0" y="0" width="160" height="${ctH}" rx="14" fill="#fef3c7"/>`;
      s += `<text x="14" y="18" font-family="Inter,sans-serif" font-size="12" font-weight="500" fill="#92400e">&#x23F1; 23h 45m remaining</text>`;
      return { svg: s, height: ctH };
    }

    default: {
      // Generic component placeholder
      const H = 48;
      let s = '';
      s += `<rect x="0" y="0" width="${width}" height="${H}" rx="8" fill="${textP}" opacity="0.04" stroke="${border}" stroke-width="1" stroke-dasharray="6,3"/>`;
      s += `<text x="${width / 2}" y="${H / 2 + 4}" font-family="Inter,sans-serif" font-size="13" fill="${textM}" text-anchor="middle">[${esc(comp || 'unknown')}]</text>`;
      return { svg: s, height: H };
    }
  }
}

// ── Two-Column Layout ───────────────────────────────────────────────────────

function renderTwoColumnSection(section, R, W) {
  const pH = isMobile() ? 16 : n(R, section.padding && section.padding.horizontal, 24);
  const padV = n(R, section.padding && section.padding.vertical, 0);
  const gap = isMobile() ? 16 : 28;
  const cw = W - pH * 2;

  const children = section.children || [];
  const leftCol = children[0];
  const rightCol = children[1];

  // Mobile: stack columns vertically at full width
  if (isMobile()) {
    const leftResult = renderColumn(leftCol, R, cw);
    const rightResult = renderColumn(rightCol, R, cw);
    let s = '';
    let y = padV;
    s += `<g transform="translate(${pH}, ${y})">${leftResult.svg}</g>`;
    y += leftResult.height + gap;
    s += `<g transform="translate(${pH}, ${y})">${rightResult.svg}</g>`;
    y += rightResult.height;
    return { svg: s, height: y + padV };
  }

  // Desktop/tablet: side-by-side columns
  let leftRatio = 0.7;
  let rightRatio = 0.3;
  if (section.columnRatio) {
    const parts = section.columnRatio.split('-');
    if (parts.length === 2) {
      leftRatio = parseInt(parts[0]) / 100;
      rightRatio = parseInt(parts[1]) / 100;
    }
  }

  const leftW = Math.floor(cw * leftRatio - gap / 2);
  const rightW = Math.floor(cw * rightRatio - gap / 2);

  const leftResult = renderColumn(leftCol, R, leftW);
  const rightResult = renderColumn(rightCol, R, rightW);

  const maxH = Math.max(leftResult.height, rightResult.height);

  let s = '';
  s += `<g transform="translate(${pH}, ${padV})">${leftResult.svg}</g>`;
  s += `<g transform="translate(${pH + leftW + gap}, ${padV})">${rightResult.svg}</g>`;

  return { svg: s, height: maxH + padV * 2 };
}

function renderColumn(column, R, width) {
  // Support both .children and .sections (caregiver-profile uses sections)
  var items = column && (Array.isArray(column.children) ? column.children : Array.isArray(column.sections) ? column.sections : null);
  if (!items) return { svg: '', height: 0 };

  const gap = n(R, column.gap, 24);
  let s = '';
  let y = 0;

  for (const child of items) {
    let result;
    if (child.component === 'widget-container') {
      result = renderWidgetContainer(child, R, width, 0);
    } else if (Array.isArray(child.children) && child.children.length > 0) {
      result = renderWidgetChild(child, R, width);
    } else {
      result = renderSingleChild(child, R, width, 0);
    }

    s += `<g transform="translate(0, ${y})">${result.svg}</g>`;
    y += result.height + gap;
  }

  return { svg: s, height: Math.max(y - gap, 0) };
}

// ── Footer ──────────────────────────────────────────────────────────────────

function renderFooter(section, R, W) {
  const border = c(R, '{colors.border.soft}');
  const textM = c(R, '{colors.text.muted}');
  const copyright =
    (section.props && section.props.copyrightText) || '\u00A9 2026 iCare Platform';

  let s = '';
  s += `<line x1="0" y1="0" x2="${W}" y2="0" stroke="${border}" stroke-width="1"/>`;

  const links = ['Privacy Policy', 'Terms of Service', 'Safeguarding', 'Contact Us', 'Help Centre'];

  if (isMobile()) {
    // Mobile: two columns of links, copyright below
    let y = 16;
    links.forEach((link, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      s += `<text x="${16 + col * (W / 2)}" y="${16 + row * 24}" font-family="Inter,sans-serif" font-size="12" fill="${textM}">${link}</text>`;
      y = 16 + (row + 1) * 24;
    });
    s += `<text x="${W / 2}" y="${y + 16}" font-family="Inter,sans-serif" font-size="11" fill="${textM}" text-anchor="middle">${esc(copyright)}</text>`;
    return { svg: s, height: y + 36 };
  }

  // Desktop: horizontal links
  links.forEach((link, i) => {
    s += `<text x="${24 + i * 140}" y="34" font-family="Inter,sans-serif" font-size="13" fill="${textM}">${link}</text>`;
  });
  s += `<text x="${W - 24}" y="34" font-family="Inter,sans-serif" font-size="13" fill="${textM}" text-anchor="end">${esc(copyright)}</text>`;

  return { svg: s, height: 64 };
}

// ── Search & Booking Section Renderers ──────────────────────────────────────

function renderBreadcrumbSection(section, R, W) {
  var padH = isMobile() ? 16 : n(R, section.padding && section.padding.horizontal, 24);
  var padV = isMobile() ? 8 : n(R, section.padding && section.padding.vertical, 16);
  var H = 24 + padV * 2;
  var textM = c(R, '{colors.text.muted}');
  var linkC = c(R, '{colors.brand.link-bg}') || c(R, '{colors.brand.secondary}');
  var textP = c(R, '{colors.text.primary}');
  var items = (section.props && section.props.items) || [];
  var s = '', x = padH;
  items.forEach(function (item, i) {
    var isLast = i === items.length - 1;
    var fill = isLast ? textP : linkC;
    s += `<text x="${x}" y="${padV + 16}" font-family="Inter,sans-serif" font-size="14" font-weight="${isLast ? '600' : '400'}" fill="${fill}">${esc(item.label)}</text>`;
    x += item.label.length * 8 + 8;
    if (!isLast) { s += `<text x="${x}" y="${padV + 16}" font-family="Inter,sans-serif" font-size="14" fill="${textM}">&#x203A;</text>`; x += 16; }
  });
  return { svg: s, height: H };
}

function renderSearchBarSection(section, R, W) {
  var pH = isMobile() ? 16 : n(R, section.padding && section.padding.horizontal, 24);
  var padV = isMobile() ? 12 : n(R, section.padding && section.padding.vertical, 24);
  var brand = c(R, '{colors.brand.secondary}');
  var inputBg = c(R, '{colors.brand.primary}');
  var bdr = c(R, '{colors.border.form}');
  var textM = c(R, '{colors.text.muted}');
  var textP = c(R, '{colors.text.primary}');
  var rad = n(R, '{borderRadius.sm}', 8);
  var placeholder = (section.props && section.props.placeholder) || 'Enter postcode';
  var rdef = (section.props && section.props.radiusDefault) || '10 miles';
  var btnLbl = (section.props && section.props.searchButtonLabel) || 'Search';
  var cw = W - pH * 2;
  var s = '';

  if (isMobile()) {
    // Mobile: stacked full-width inputs
    var y = padV;
    s += `<rect x="${pH}" y="${y}" width="${cw}" height="40" rx="${rad}" fill="${inputBg}" stroke="${bdr}" stroke-width="1"/>`;
    s += `<text x="${pH + 12}" y="${y + 25}" font-family="Inter,sans-serif" font-size="14" fill="${textM}">${esc(placeholder)}</text>`;
    y += 48;
    s += `<rect x="${pH}" y="${y}" width="${cw}" height="40" rx="${rad}" fill="${inputBg}" stroke="${bdr}" stroke-width="1"/>`;
    s += `<text x="${pH + 12}" y="${y + 25}" font-family="Inter,sans-serif" font-size="14" fill="${textP}">${esc(rdef)} &#x25BE;</text>`;
    y += 48;
    s += `<rect x="${pH}" y="${y}" width="${cw}" height="44" rx="${rad}" fill="${brand}"/>`;
    s += `<text x="${W / 2}" y="${y + 28}" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="white" text-anchor="middle">${esc(btnLbl)}</text>`;
    y += 44 + padV;
    return { svg: s, height: y };
  }

  // Desktop: horizontal bar
  var H = 56 + padV * 2;
  var bg = c(R, section.tokens && section.tokens.fill) || c(R, '{colors.background.card-glass}');
  s += `<rect x="${pH}" y="${padV}" width="${cw}" height="56" rx="12" fill="${bg}" stroke="${bdr}" stroke-width="1"/>`;
  s += `<rect x="${pH + 12}" y="${padV + 10}" width="${cw * 0.45}" height="36" rx="${rad}" fill="${inputBg}" stroke="${bdr}" stroke-width="1"/>`;
  s += `<text x="${pH + 24}" y="${padV + 33}" font-family="Inter,sans-serif" font-size="14" fill="${textM}">${esc(placeholder)}</text>`;
  var rx = pH + 12 + cw * 0.45 + 12;
  var rw = cw * 0.25;
  s += `<rect x="${rx}" y="${padV + 10}" width="${rw}" height="36" rx="${rad}" fill="${inputBg}" stroke="${bdr}" stroke-width="1"/>`;
  s += `<text x="${rx + 12}" y="${padV + 33}" font-family="Inter,sans-serif" font-size="14" fill="${textP}">${esc(rdef)} &#x25BE;</text>`;
  var bx = rx + rw + 12;
  var bw = cw - (bx - pH) - 12;
  s += `<rect x="${bx}" y="${padV + 10}" width="${bw}" height="36" rx="${rad}" fill="${brand}"/>`;
  s += `<text x="${bx + bw / 2}" y="${padV + 33}" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="white" text-anchor="middle">${esc(btnLbl)}</text>`;
  return { svg: s, height: H };
}

function renderPaginationSection(section, R, W) {
  var padV = n(R, section.padding && section.padding.vertical, 24);
  var H = 48 + padV * 2;
  var brand = c(R, '{colors.brand.secondary}');
  var textP = c(R, '{colors.text.primary}');
  var textM = c(R, '{colors.text.muted}');
  var bdr = c(R, '{colors.border.card}');
  var cur = (section.props && section.props.currentPage) || 1;
  var total = (section.props && section.props.totalPages) || 3;
  var s = '';
  var centerX = W / 2;
  var btnW = 36;
  var prevX = centerX - (total * (btnW + 8) / 2) - 80 - 8;
  s += `<rect x="${prevX}" y="${padV + 6}" width="80" height="${btnW}" rx="8" fill="transparent" stroke="${bdr}" stroke-width="1"/>`;
  s += `<text x="${prevX + 40}" y="${padV + 30}" font-family="Inter,sans-serif" font-size="13" fill="${textM}" text-anchor="middle">&#x2190; Prev</text>`;
  for (var i = 1; i <= Math.min(total, 5); i++) {
    var px = centerX - (total * (btnW + 8) / 2) + (i - 1) * (btnW + 8);
    var isAct = i === cur;
    s += `<rect x="${px}" y="${padV + 6}" width="${btnW}" height="${btnW}" rx="8" fill="${isAct ? brand : 'transparent'}" ${isAct ? '' : `stroke="${bdr}" stroke-width="1"`}/>`;
    s += `<text x="${px + btnW / 2}" y="${padV + 30}" font-family="Inter,sans-serif" font-size="14" font-weight="${isAct ? '600' : '400'}" fill="${isAct ? 'white' : textP}" text-anchor="middle">${i}</text>`;
  }
  var nextX = centerX + (total * (btnW + 8) / 2) + 8;
  s += `<rect x="${nextX}" y="${padV + 6}" width="80" height="${btnW}" rx="8" fill="transparent" stroke="${bdr}" stroke-width="1"/>`;
  s += `<text x="${nextX + 40}" y="${padV + 30}" font-family="Inter,sans-serif" font-size="13" fill="${textM}" text-anchor="middle">Next &#x2192;</text>`;
  return { svg: s, height: H };
}

function renderProfileHeaderSection(section, R, W) {
  var pH = isMobile() ? 16 : n(R, section.padding && section.padding.horizontal, 24);
  var padV = isMobile() ? 16 : n(R, section.padding && section.padding.vertical, 24);
  var bg = c(R, '{colors.background.card-glass}');
  var brand = c(R, '{colors.brand.secondary}');
  var textP = c(R, '{colors.text.primary}');
  var textM = c(R, '{colors.text.muted}');
  var bdr = c(R, '{colors.border.card}');
  var props = section.props || {};
  var badges = Array.isArray(props.verificationBadges) ? props.verificationBadges : ['DBS Checked', 'ID Verified'];
  var s = '';

  if (isMobile()) {
    // Mobile: centered layout, photo above text, full-width CTA
    var cw = W - pH * 2;
    var cx = W / 2;
    var y = padV;
    s += `<rect x="${pH}" y="${y}" width="${cw}" height="auto" rx="12" fill="${bg}" stroke="${bdr}" stroke-width="1"/>`;
    y += 16;
    s += `<circle cx="${cx}" cy="${y + 40}" r="40" fill="${brand}" opacity="0.25"/>`;
    y += 96;
    s += `<text x="${cx}" y="${y}" font-family="Inter,sans-serif" font-size="20" font-weight="700" fill="${textP}" text-anchor="middle">${esc(props.name || 'Caregiver Name')}</text>`;
    y += 20;
    s += `<text x="${cx}" y="${y}" font-family="Inter,sans-serif" font-size="13" fill="${textM}" text-anchor="middle">${esc(props.location || 'Location')} &#x2022; ${esc(props.distance || '0 miles')}</text>`;
    y += 22;
    var starsW = 5 * 18;
    for (var i = 0; i < 5; i++) { s += `<text x="${cx - starsW / 2 + i * 18}" y="${y}" font-family="Inter,sans-serif" font-size="14" fill="#f59e0b">&#x2605;</text>`; }
    y += 22;
    s += `<text x="${cx}" y="${y}" font-family="Inter,sans-serif" font-size="18" font-weight="700" fill="${textP}" text-anchor="middle">${esc(props.hourlyRate || '&#xA3;18')}/hour</text>`;
    y += 24;
    var totalBW = 0;
    badges.forEach(function (b) { totalBW += b.length * 7 + 24; });
    var bbx = cx - totalBW / 2;
    badges.forEach(function (badge) {
      var bw = badge.length * 7 + 20;
      s += `<rect x="${bbx}" y="${y}" width="${bw}" height="22" rx="11" fill="#dcfce7"/>`;
      s += `<text x="${bbx + 10}" y="${y + 15}" font-family="Inter,sans-serif" font-size="10" font-weight="500" fill="#166534">${esc(badge)}</text>`;
      bbx += bw + 6;
    });
    y += 36;
    s += `<rect x="${pH + 12}" y="${y}" width="${cw - 24}" height="44" rx="10" fill="${brand}"/>`;
    s += `<text x="${cx}" y="${y + 28}" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="white" text-anchor="middle">Request Booking</text>`;
    y += 60;
    // Fix the card rect height now we know it
    s = s.replace('height="auto"', `height="${y - padV}"`);
    return { svg: s, height: y + padV };
  }

  // Desktop: side-by-side layout
  var H = 200 + padV * 2;
  s += `<rect x="${pH}" y="${padV}" width="${W - pH * 2}" height="200" rx="16" fill="${bg}" stroke="${bdr}" stroke-width="1"/>`;
  s += `<circle cx="${pH + 80}" cy="${padV + 80}" r="56" fill="${brand}" opacity="0.25"/>`;
  s += `<text x="${pH + 160}" y="${padV + 40}" font-family="Inter,sans-serif" font-size="24" font-weight="700" fill="${textP}">${esc(props.name || 'Caregiver Name')}</text>`;
  s += `<text x="${pH + 160}" y="${padV + 64}" font-family="Inter,sans-serif" font-size="14" fill="${textM}">${esc(props.location || 'Location')} &#x2022; ${esc(props.distance || '0 miles')}</text>`;
  for (var j = 0; j < 5; j++) { s += `<text x="${pH + 160 + j * 20}" y="${padV + 90}" font-family="Inter,sans-serif" font-size="16" fill="#f59e0b">&#x2605;</text>`; }
  s += `<text x="${pH + 160}" y="${padV + 118}" font-family="Inter,sans-serif" font-size="20" font-weight="700" fill="${textP}">${esc(props.hourlyRate || '&#xA3;18')}/hour</text>`;
  var bx = pH + 160;
  badges.forEach(function (badge) {
    var bw = badge.length * 8 + 20;
    s += `<rect x="${bx}" y="${padV + 130}" width="${bw}" height="24" rx="12" fill="#dcfce7"/>`;
    s += `<text x="${bx + 10}" y="${padV + 146}" font-family="Inter,sans-serif" font-size="11" font-weight="500" fill="#166534">${esc(badge)}</text>`;
    bx += bw + 8;
  });
  var ctaW = 180;
  var ctaX = W - pH - ctaW - 24;
  s += `<rect x="${ctaX}" y="${padV + 40}" width="${ctaW}" height="44" rx="10" fill="${brand}"/>`;
  s += `<text x="${ctaX + ctaW / 2}" y="${padV + 67}" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="white" text-anchor="middle">Request Booking</text>`;
  return { svg: s, height: H };
}

function renderHorizontalSection(section, R, W) {
  var padH = isMobile() ? 16 : n(R, section.padding && section.padding.horizontal, 24);
  var padV = n(R, section.padding && section.padding.vertical, 16);
  var cw = W - padH * 2;
  var s = '', y = padV;
  if (section.children) {
    for (var i = 0; i < section.children.length; i++) {
      var child = section.children[i];
      var result;
      if (child.component === 'widget-container') {
        result = renderWidgetContainer(child, R, cw, 0);
      } else if (Array.isArray(child.children) && child.children.length > 0) {
        result = renderChildContainer(child, R, cw);
      } else {
        result = renderSingleChild(child, R, cw, 0);
      }
      s += `<g transform="translate(${padH}, ${y})">${result.svg}</g>`;
      y += result.height + 8;
    }
  }
  y += padV;
  return { svg: s, height: y };
}

// ── Generic Section Fallback ────────────────────────────────────────────────

function renderGenericSection(section, R, W) {
  const H = 56;
  const border = c(R, '{colors.border.card}');
  const textM = c(R, '{colors.text.muted}');
  const label = section.component || section.name || 'Section';

  let s = '';
  s += `<rect x="24" y="8" width="${W - 48}" height="${H - 16}" rx="8" fill="transparent" stroke="${border}" stroke-width="1" stroke-dasharray="6,3"/>`;
  s += `<text x="${W / 2}" y="${H / 2 + 4}" font-family="Inter,sans-serif" font-size="14" fill="${textM}" text-anchor="middle">[${esc(label)}]</text>`;

  return { svg: s, height: H };
}

// ── Main Screen Generator ───────────────────────────────────────────────────

function generateScreenSvg(screen, R) {
  const W = VIEWPORT_WIDTHS[VIEWPORT] || 1440;
  const bg = c(R, screen.frame.fill);
  const sampleData = screen.sampleData || null;
  const rawSorted = [...screen.sections].sort((a, b) => a.order - b.order);
  const sorted = sampleData ? resolveTemplateStrings(rawSorted, sampleData) : rawSorted;

  let totalH = 0;
  const parts = [];

  for (const section of sorted) {
    // Skip sections hidden for this viewport
    if (section.visibility) {
      var vis = section.visibility[VIEWPORT];
      if (vis === 'none' || vis === 'hidden' || vis === false) continue;
    }
    // Show mobile-only sections (visibility.desktop === 'none')
    if (section.visibility && section.visibility.desktop === 'none' && VIEWPORT === 'desktop') continue;
    let result;

    if (section.component === 'navigation-header') {
      result = renderNavHeader(section, R, W);
    } else if (section.component === 'footer-global') {
      result = renderFooter(section, R, W);
    } else if (section.component === 'alert-banner') {
      result = renderAlertBanner(section, R, W);
    } else if (section.layout === 'two-column') {
      result = renderTwoColumnSection(section, R, W);
    } else if (section.component === 'breadcrumb') {
      result = renderBreadcrumbSection(section, R, W);
    } else if (section.component === 'search-bar') {
      result = renderSearchBarSection(section, R, W);
    } else if (section.component === 'pagination-controls') {
      result = renderPaginationSection(section, R, W);
    } else if (section.component === 'profile-header') {
      result = renderProfileHeaderSection(section, R, W);
    } else if (section.layout === 'horizontal-grid') {
      result = renderQuickActions(section, R, W);
    } else if (section.layout === 'horizontal') {
      result = renderHorizontalSection(section, R, W);
    } else if (section.component === 'widget-container') {
      // Top-level widget (care-receiver style)
      const padH = isMobile() ? 16 : n(R, section.padding && section.padding.horizontal, 24);
      const padV = n(R, section.padding && section.padding.vertical, 16);
      const innerW = W - padH * 2;
      const widgetResult = renderWidgetContainer(section, R, innerW, padH);
      result = {
        svg: `<g transform="translate(${padH}, ${padV})">${widgetResult.svg}</g>`,
        height: widgetResult.height + padV * 2,
      };
    } else if (section.children) {
      result = renderPageHeader(section, R, W);
    } else {
      result = renderGenericSection(section, R, W);
    }

    parts.push(`<g transform="translate(0, ${totalH})">${result.svg}</g>`);
    totalH += result.height;
  }

  // Final SVG
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${totalH}" viewBox="0 0 ${W} ${totalH}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap');
    </style>
  </defs>
  <rect x="0" y="0" width="${W}" height="${totalH}" fill="${bg}"/>
  ${parts.join('\n  ')}
</svg>`;

  return svg;
}

// ── Entry Point ─────────────────────────────────────────────────────────────

function main() {
  const baseDir = path.resolve(__dirname, '../../docs/tiers/tier1/figma');
  const outDirBase = path.resolve(baseDir, 'svg-output');

  // Parse --viewport argument
  const args = process.argv.slice(2);
  const vpIdx = args.indexOf('--viewport');
  const vpArg = vpIdx !== -1 ? args[vpIdx + 1] : 'desktop';
  const viewports = vpArg === 'all'
    ? ['desktop', 'mobile', 'tablet']
    : [vpArg];

  // Load tokens
  const tokens = JSON.parse(fs.readFileSync(path.join(baseDir, 'tokens.json'), 'utf8'));
  const R = new TokenResolver(tokens);

  // Load screens
  const screensDir = path.join(baseDir, 'screens');
  const screenFiles = fs.readdirSync(screensDir).filter(f => f.endsWith('.json'));

  console.log('SVG Wireframe Generator');
  console.log('=======================\n');

  let totalGenerated = 0;

  for (const vp of viewports) {
    VIEWPORT = vp;
    const outDir = vp === 'desktop' ? outDirBase : path.join(outDirBase, vp);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    console.log(`[${vp}] (${VIEWPORT_WIDTHS[vp]}px)`);

    for (const file of screenFiles) {
      const screen = JSON.parse(fs.readFileSync(path.join(screensDir, file), 'utf8'));
      const name = screen._metadata.screenName;
      console.log(`  Generating: ${name}`);

      const svg = generateScreenSvg(screen, R);
      const outFile = path.join(outDir, file.replace('.json', '.svg'));
      fs.writeFileSync(outFile, svg);
      console.log(`    -> ${path.relative(process.cwd(), outFile)}`);
      totalGenerated++;
    }
    console.log('');
  }

  console.log(`Done! ${totalGenerated} SVG wireframes generated.`);
  console.log(`Output directory: ${path.relative(process.cwd(), outDirBase)}/`);
  console.log('\nImport into Figma: File -> Import, or drag-and-drop the SVG files.');
}

main();
