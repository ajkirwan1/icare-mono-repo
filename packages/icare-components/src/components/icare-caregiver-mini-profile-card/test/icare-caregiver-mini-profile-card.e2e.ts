import { newE2EPage } from '@stencil/core/testing';

describe('icare-caregiver-mini-profile-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<icare-caregiver-mini-profile-card></icare-caregiver-mini-profile-card>');

    const element = await page.find('icare-caregiver-mini-profile-card');
    expect(element).toHaveClass('hydrated');
  });
});
