import React, { useMemo } from "react";
import MessageComponent from "./message-component";

export default function MessageListComponent({ caregiver,
  messages = [],
  visibleMessages = 5,
  sortDescending = true }) {

  // Stable sorted copy by timestamp
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      const ta = Date.parse(a?.timestamp) || 0;
      const tb = Date.parse(b?.timestamp) || 0;
      return sortDescending ? tb - ta : ta - tb;
    });
  }, [messages, sortDescending]);

  const messagesToShow = sortedMessages.slice(0, visibleMessages);

  console.log("Rendering MessageListComponent with messages:", messagesToShow);

  return (
    <>
      <ul>
        {messagesToShow.map((msg) => (
          <li key={msg.id}>
            <MessageComponent msg={msg} imgSrc={caregiver.imgSrc} name={caregiver.name} />
          </li>
        ))}
      </ul>
      {messages.length > visibleMessages && (
        <p>
          Showing {messagesToShow.length} of {messages.length} messages. Click "Load more" to see more.
        </p>
      )}
    </>
  );
}
