import { newE2EPage } from '@stencil/core/testing';

describe('icare-recommended-caregivers-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<icare-recommended-caregivers-card></icare-recommended-caregivers-card>');

    const element = await page.find('icare-recommended-caregivers-card');
    expect(element).toHaveClass('hydrated');
  });
});
