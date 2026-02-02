#!/usr/bin/env node

/**
 * Script to find unused .jsx components in packages/ICare/app/components
 * that are not dependencies (direct or indirect) of files in packages/ICare/app/routes
 *
 * Usage: node scripts/find-unused-components.js
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..', 'packages', 'ICare', 'app');
const COMPONENTS_DIR = path.join(BASE_DIR, 'components');
const ROUTES_DIR = path.join(BASE_DIR, 'routes');

// Track all files and their dependencies
const dependencyGraph = new Map();
const allComponentFiles = new Set();
const reachableFiles = new Set();
const filesToMark = [];

/**
 * Recursively find all files matching a pattern
 */
function findFiles(dir, pattern, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      findFiles(fullPath, pattern, files);
    } else if (pattern.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract imports from a file
 */
function extractImports(filePath) {
  if (!fs.existsSync(filePath)) {
    return { jsImports: [], cssImports: [] };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const jsImports = [];
  const cssImports = [];

  // Match various import patterns
  const importPatterns = [
    // import X from 'path'
    /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'"]+)['"]/g,
    // require('path')
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    // dynamic import('path')
    /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];

  for (const pattern of importPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const importPath = match[1];

      // Check if it's a CSS import
      if (importPath.endsWith('.css') || importPath.endsWith('.module.css')) {
        cssImports.push(importPath);
      } else if (importPath.startsWith('.') || importPath.startsWith('~')) {
        // Relative imports (potential component imports)
        jsImports.push(importPath);
      }
    }
  }

  return { jsImports, cssImports };
}

/**
 * Resolve an import path to an absolute file path
 */
function resolveImport(importPath, fromFile) {
  const fromDir = path.dirname(fromFile);

  // Handle relative imports
  if (importPath.startsWith('.')) {
    let resolved = path.resolve(fromDir, importPath);

    // Try different extensions
    const extensions = ['', '.jsx', '.js', '.tsx', '.ts', '/index.jsx', '/index.js', '/index.tsx', '/index.ts'];

    for (const ext of extensions) {
      const tryPath = resolved + ext;
      if (fs.existsSync(tryPath) && fs.statSync(tryPath).isFile()) {
        return tryPath;
      }
    }
  }

  // Handle ~ alias (common in Remix/Vite projects)
  if (importPath.startsWith('~')) {
    const aliasPath = importPath.replace(/^~\/?/, '');
    let resolved = path.join(BASE_DIR, aliasPath);

    const extensions = ['', '.jsx', '.js', '.tsx', '.ts', '/index.jsx', '/index.js'];

    for (const ext of extensions) {
      const tryPath = resolved + ext;
      if (fs.existsSync(tryPath) && fs.statSync(tryPath).isFile()) {
        return tryPath;
      }
    }
  }

  return null;
}

/**
 * Build dependency graph for a file
 */
function buildDependencyGraph(filePath, visited = new Set()) {
  if (visited.has(filePath) || !fs.existsSync(filePath)) {
    return;
  }

  visited.add(filePath);

  const { jsImports, cssImports } = extractImports(filePath);
  const dependencies = { js: [], css: [] };

  // Resolve JS imports
  for (const imp of jsImports) {
    const resolved = resolveImport(imp, filePath);
    if (resolved) {
      dependencies.js.push(resolved);
      buildDependencyGraph(resolved, visited);
    }
  }

  // Resolve CSS imports
  for (const imp of cssImports) {
    const resolved = resolveImport(imp, filePath);
    if (resolved) {
      dependencies.css.push(resolved);
    }
  }

  dependencyGraph.set(filePath, dependencies);
}

/**
 * Find all files reachable from routes
 */
function findReachableFromRoutes() {
  // Find all route files
  const routeFiles = findFiles(ROUTES_DIR, /\.(jsx|js|tsx|ts)$/);

  console.log(`\nFound ${routeFiles.length} route files`);

  // Build dependency graph starting from routes
  for (const routeFile of routeFiles) {
    buildDependencyGraph(routeFile);
  }

  // Collect all reachable files
  for (const [file, deps] of dependencyGraph) {
    reachableFiles.add(file);
    for (const dep of deps.js) {
      reachableFiles.add(dep);
    }
    for (const dep of deps.css) {
      reachableFiles.add(dep);
    }
  }
}

/**
 * Comment out all lines in a file and add TO_BE_DELETED marker
 */
function markFileAsUnused(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Check if already marked
  if (lines[0] && lines[0].includes('TO_BE_DELETED')) {
    console.log(`  Already marked: ${path.relative(BASE_DIR, filePath)}`);
    return null;
  }

  const ext = path.extname(filePath);
  let commentedContent;

  if (ext === '.css') {
    // CSS comment style
    commentedContent = `/* TO_BE_DELETED - This file is not used by any route */\n/*\n${content}\n*/`;
  } else {
    // JS/JSX comment style
    const commentedLines = lines.map(line => `// ${line}`);
    commentedContent = `// TO_BE_DELETED - This file is not used by any route\n${commentedLines.join('\n')}`;
  }

  return { filePath, originalContent: content, commentedContent };
}

/**
 * Main execution
 */
function main() {
  console.log('='.repeat(60));
  console.log('Finding unused components in packages/ICare/app/components');
  console.log('='.repeat(60));

  // Check directories exist
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error(`Components directory not found: ${COMPONENTS_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(ROUTES_DIR)) {
    console.error(`Routes directory not found: ${ROUTES_DIR}`);
    process.exit(1);
  }

  // Find all component .jsx files
  const componentFiles = findFiles(COMPONENTS_DIR, /\.jsx$/);
  componentFiles.forEach(f => allComponentFiles.add(f));

  console.log(`\nFound ${componentFiles.length} .jsx files in components/`);

  // Find all files reachable from routes
  findReachableFromRoutes();

  console.log(`\nTotal files reachable from routes: ${reachableFiles.size}`);

  // Find unused components
  const unusedComponents = [];

  for (const componentFile of componentFiles) {
    if (!reachableFiles.has(componentFile)) {
      unusedComponents.push(componentFile);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`UNUSED COMPONENTS: ${unusedComponents.length}`);
  console.log('='.repeat(60));

  if (unusedComponents.length === 0) {
    console.log('\nAll components are used! Nothing to mark.');
    return;
  }

  // Process unused components
  const toProcess = [];

  for (const componentFile of unusedComponents) {
    const relativePath = path.relative(BASE_DIR, componentFile);
    console.log(`\n[UNUSED] ${relativePath}`);

    // Check for CSS imports in this file
    const { cssImports } = extractImports(componentFile);

    // Mark the JSX file
    const jsxResult = markFileAsUnused(componentFile);
    if (jsxResult) {
      toProcess.push(jsxResult);
    }

    // Mark associated CSS files
    for (const cssImport of cssImports) {
      const cssPath = resolveImport(cssImport, componentFile);
      if (cssPath && fs.existsSync(cssPath)) {
        console.log(`  [CSS] ${path.relative(BASE_DIR, cssPath)}`);
        const cssResult = markFileAsUnused(cssPath);
        if (cssResult) {
          toProcess.push(cssResult);
        }
      }
    }
  }

  // Apply changes
  console.log(`\n${'='.repeat(60)}`);
  console.log('APPLYING CHANGES');
  console.log('='.repeat(60));

  for (const { filePath, commentedContent } of toProcess) {
    const relativePath = path.relative(BASE_DIR, filePath);
    console.log(`Marking: ${relativePath}`);
    fs.writeFileSync(filePath, commentedContent, 'utf-8');
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total component files scanned: ${componentFiles.length}`);
  console.log(`Files reachable from routes: ${componentFiles.length - unusedComponents.length}`);
  console.log(`Unused component files: ${unusedComponents.length}`);
  console.log(`Files marked as TO_BE_DELETED: ${toProcess.length}`);

  // List all marked files
  if (toProcess.length > 0) {
    console.log(`\nMarked files:`);
    for (const { filePath } of toProcess) {
      console.log(`  - ${path.relative(process.cwd(), filePath)}`);
    }
  }

  console.log(`\nNote: No files were deleted. Files are marked with TO_BE_DELETED comment.`);
  console.log(`Review the marked files and delete manually if confirmed unused.`);
}

main();
