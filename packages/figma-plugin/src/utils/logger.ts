import type { SandboxMessage } from '../types/messages';

function send(msg: SandboxMessage) {
  figma.ui.postMessage(msg);
}

export function progress(step: string, current: number, total: number, message: string) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;
  send({ type: 'progress', payload: { step, message, percent } });
}

export function log(message: string) {
  send({ type: 'log', payload: { message } });
}

export function error(step: string, message: string) {
  send({ type: 'error', payload: { step, message } });
}

export function complete(step: string, message: string, stats?: Record<string, number>) {
  send({ type: 'complete', payload: { step, message, stats } });
}
