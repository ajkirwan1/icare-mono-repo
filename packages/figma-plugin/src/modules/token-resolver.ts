import type { TokensJSON } from '../types/tokens';

const MAX_DEPTH = 10;

/**
 * Resolves {tokenPath} references to actual values from tokens.json.
 * Handles nested references (tokens referencing other tokens) with cycle detection.
 */
export class TokenResolver {
  private tokens: TokensJSON;
  private cache = new Map<string, string | number>();
  private resolving = new Set<string>();

  constructor(tokens: TokensJSON) {
    this.tokens = tokens;
  }

  /** Resolve a single value. If it's a {reference}, look it up. Otherwise return as-is. */
  resolve(value: string | number | undefined): string {
    if (value === undefined || value === null) return '';
    if (typeof value === 'number') return String(value);
    if (!value.startsWith('{') || !value.endsWith('}')) return value;

    const path = value.slice(1, -1);

    // Check cache
    if (this.cache.has(path)) return String(this.cache.get(path));

    // Cycle detection
    if (this.resolving.has(path)) {
      console.warn(`Circular token reference detected: ${path}`);
      return value;
    }

    this.resolving.add(path);

    const result = this.lookupPath(path);
    this.resolving.delete(path);

    if (result !== undefined) {
      // If the result is itself a reference, resolve recursively
      const resolved = typeof result === 'string' && result.startsWith('{')
        ? this.resolve(result)
        : String(result);
      this.cache.set(path, resolved);
      return resolved;
    }

    console.warn(`Token not found: ${path}`);
    return value;
  }

  /** Resolve a number value (parse the resolved string as float) */
  resolveNumber(value: string | number | undefined, fallback = 0): number {
    const resolved = this.resolve(value);
    const num = parseFloat(resolved);
    return isNaN(num) ? fallback : num;
  }

  private lookupPath(path: string): string | number | undefined {
    const parts = path.split('.');

    // Try looking up in global first, then at the root
    let current: unknown = this.tokens.global;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[part];
      } else {
        // Fallback: try from root
        current = this.tokens;
        let found = true;
        for (const p of parts) {
          if (current && typeof current === 'object' && p in (current as Record<string, unknown>)) {
            current = (current as Record<string, unknown>)[p];
          } else {
            found = false;
            break;
          }
        }
        if (!found) return undefined;
        break;
      }
    }

    // Extract .value if it's a token object
    if (current && typeof current === 'object' && 'value' in (current as Record<string, unknown>)) {
      const val = (current as Record<string, unknown>).value;
      if (typeof val === 'string' || typeof val === 'number') return val;
    }

    if (typeof current === 'string' || typeof current === 'number') return current;

    return undefined;
  }
}
