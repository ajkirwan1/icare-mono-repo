import { newSpecPage } from '@stencil/core/testing';
import { IcareMessagesCard } from '../icare-messages-card';

describe('icare-messages-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IcareMessagesCard],
      html: `<icare-messages-card></icare-messages-card>`,
    });
    expect(page.root).toEqualHtml(`
      <icare-messages-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </icare-messages-card>
    `);
  });
});
