import type { UIMessage } from './types/messages';
import { importTokens } from './modules/token-importer';
import { generateComponents } from './modules/component-generator';
import { generateScreens } from './modules/screen-generator';
import * as logger from './utils/logger';

figma.showUI(__html__, { width: 480, height: 640 });

let tokensData: unknown = null;

figma.ui.onmessage = async (msg: UIMessage) => {
  try {
    switch (msg.type) {
      case 'import-tokens': {
        logger.log('Starting token import...');
        tokensData = msg.payload;
        const stats = await importTokens(msg.payload);
        logger.complete('import-tokens', 'Token import complete', stats);
        break;
      }

      case 'generate-components': {
        if (!tokensData) {
          logger.error('generate-components', 'Please import tokens first');
          return;
        }
        logger.log('Starting component generation...');
        const count = await generateComponents(msg.payload, tokensData as any);
        logger.complete('generate-components', `Generated ${count} components`, { components: count });
        break;
      }

      case 'generate-screens': {
        if (!tokensData) {
          logger.error('generate-screens', 'Please import tokens first');
          return;
        }
        logger.log('Starting screen generation...');
        const screenCount = await generateScreens(
          msg.payload.screens,
          msg.payload.tokens
        );
        logger.complete('generate-screens', `Generated ${screenCount} screens`, { screens: screenCount });
        break;
      }
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logger.error(msg.type, `Unexpected error: ${errorMsg}`);
  }
};
