import { Component, Host, h, State, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "icare-messages-card",
  styleUrl: "icare-messages-card.scss",
  shadow: true
})

export class IcareMessagesCard {

  @State() fetchResult: {
    status: "loading" | "success" | "error";
    data?: {
      unreadMessages?: number;
      newMessages?: number;
      newNotifications?: number;
    };
    error?: any;
  } = { status: "loading" };

  @Event() navigate: EventEmitter<string>;

  componentWillLoad() {
    fetch("/api/messages")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.fetchResult = { status: "success", data };
      }
      ).catch(error => {
        // eslint-disable-next-line no-console
        console.error("Error fetching messages:", error);
        this.fetchResult = { status: "error", error };
      }
      );
  }

  private handleClick(event: MouseEvent, path: string) {
    event.preventDefault(); // prevent default link navigation
    this.navigate.emit(path); // SPA navigation
  }


  private renderResults() {
    const data = this.fetchResult.data;
    return (
      <ul>
        <li>
          <a
            href="/api/messages/new"
            class="status-item"
            onClick={(e) => this.handleClick(e, "/api/messages/new")}
          >
            <span class="label">New messages</span>
            <span class="sr-only">{data.newMessages}</span>
          </a>
        </li>
        <li>
          <a
            href="/api/messages/unread-count"
            class="status-item"
            onClick={(e) => this.handleClick(e, "/api/messages/unread-count")}
          >
            <span class="label">Unread messages</span>
            <span class="sr-only">{data.unreadMessages}</span>
          </a>
        </li>
        <li>
          <a
            href="/api/messages/notifications"
            class="status-item"
            onClick={(e) => this.handleClick(e, "/api/messages/notifications")}
          >
            <span class="label">New Notifications</span>
            <span class="sr-only">{data.newNotifications}</span>
          </a>
        </li>
      </ul>
    );
  }

  private pendingData() {
    return (
      <div>
        <icare-shimmer />
        <p>Loading...</p>
      </div>

    );
  }


  private renderNoData() {
    return (
      <p>There was an error fetching your messages</p>
    );
  }

  render() {
    return (
      <Host>
        <icare-card>
          <span slot="contents">
            <div class="header">
              <h2>Messages</h2>
              <p>View all received messages or send a message</p>
            </div>
            <div class="card-body">
              {this.fetchResult.status === "loading" && this.pendingData()}
              {this.fetchResult.status === "error" && this.renderNoData()}
              {this.fetchResult.status === "success" && this.renderResults()}
            </div>
            <div class="card-footer">
              <span><a href="#">Send Message</a></span>
            </div>
          </span>
        </icare-card>
      </Host >
    );
  }
}
