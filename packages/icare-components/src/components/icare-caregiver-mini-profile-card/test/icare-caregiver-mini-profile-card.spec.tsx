import { newSpecPage } from '@stencil/core/testing';
import { IcareCaregiverMiniProfileCard } from '../icare-caregiver-mini-profile-card';

describe('icare-caregiver-mini-profile-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IcareCaregiverMiniProfileCard],
      html: `<icare-caregiver-mini-profile-card></icare-caregiver-mini-profile-card>`,
    });
    expect(page.root).toEqualHtml(`
      <icare-caregiver-mini-profile-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </icare-caregiver-mini-profile-card>
    `);
  });
});
