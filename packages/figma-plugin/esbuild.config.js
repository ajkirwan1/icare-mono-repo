const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

async function build() {
  const commonOptions = {
    bundle: true,
    target: 'es2020',
    logLevel: 'info',
  };

  // Build sandbox code (code.ts) — target es2015 for Figma sandbox compat
  const codeCtx = await esbuild.context({
    ...commonOptions,
    entryPoints: ['src/code.ts'],
    outfile: 'dist/code.js',
    platform: 'neutral',
    target: 'es2017',
  });

  // Build UI script (ui.ts)
  const uiCtx = await esbuild.context({
    ...commonOptions,
    entryPoints: ['src/ui.ts'],
    outfile: 'dist/ui.js',
    platform: 'browser',
  });

  if (isWatch) {
    await codeCtx.watch();
    await uiCtx.watch();
    console.log('Watching for changes...');
  } else {
    await codeCtx.rebuild();
    await uiCtx.rebuild();
    await codeCtx.dispose();
    await uiCtx.dispose();
  }

  // Build ui.html with inlined JS
  buildUIHtml();
}

function buildUIHtml() {
  const htmlSrc = fs.readFileSync(path.join(__dirname, 'src/ui.html'), 'utf8');
  let uiJs = '';
  try {
    uiJs = fs.readFileSync(path.join(__dirname, 'dist/ui.js'), 'utf8');
  } catch (e) {
    // ui.js not built yet on first run, will be available on rebuild
  }

  // Replace script src reference with inline script
  const output = htmlSrc.replace(
    '<script src="ui.js"></script>',
    `<script>${uiJs}</script>`
  );

  fs.writeFileSync(path.join(__dirname, 'dist/ui.html'), output);
  console.log('Built dist/ui.html');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
