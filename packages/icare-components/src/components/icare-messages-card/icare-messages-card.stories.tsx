import { html } from "lit";
import "icare-components"; // Ensure this resolves to your built components

export default {
  title: "Components/ICare Messages Card",
  component: "icare-messages-card",
  parameters: {
    mockData: [
      {
        url: "/api/messages",
        method: "GET",
        status: 200,
        response: {
          unreadMessages: 7,
          newMessages: 5,
          newNotifications: 3
        }
      }
    ]
  }
};

const Template = () =>
  html`<icare-messages-card>
      </icare-messages-card>`;

export const Default = Template.bind({});

export const DelayedResponse = Template.bind({});
DelayedResponse.parameters = {
  mockData: [
    {
      url: "/api/messages",
      method: "GET",
      status: 200,
      delay: 3000, // 3 seconds delay
      response: {
        unreadMessages: 7,
        newMessages: 5,
        newNotifications: 3
      }
    }
  ]
};

// New story: Failed API response
export const NoAPIResponse = Template.bind({});
NoAPIResponse.parameters = {
  mockData: [
    {
      url: "/api/messages",
      method: "GET",
      status: 500, // simulate server error
      response: {
        message: "Internal Server Error"
      },
      delay: 1000 // optional: simulate network delay
    }
  ]
};
