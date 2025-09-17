import { newSpecPage } from '@stencil/core/testing';
import { IcareRecommendedCaregiversCard } from '../icare-recommended-caregivers-card';

describe('icare-recommended-caregivers-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IcareRecommendedCaregiversCard],
      html: `<icare-recommended-caregivers-card></icare-recommended-caregivers-card>`,
    });
    expect(page.root).toEqualHtml(`
      <icare-recommended-caregivers-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </icare-recommended-caregivers-card>
    `);
  });
});
