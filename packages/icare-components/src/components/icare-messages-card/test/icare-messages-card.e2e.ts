import { newE2EPage } from '@stencil/core/testing';

describe('icare-messages-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<icare-messages-card></icare-messages-card>');

    const element = await page.find('icare-messages-card');
    expect(element).toHaveClass('hydrated');
  });
});
