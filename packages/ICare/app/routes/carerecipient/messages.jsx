import React, { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "react-router";
import MessageListComponent from "../../components/messages/message-list-component";
import { IcareButton } from "react-library";
import { getCaregiverMessageThread } from "../../utils/db/get-caregiver-message-thread";
import { appendCaregiverMessage } from "../../utils/db/addCaregiverMessage";
import ComposeMessageModal from "../../components/modals/compose-message-modal";

// Loader runs on server (SSR)
export async function loader({ params }) {
  const { caregiverId } = params;
  const data = await getCaregiverMessageThread(caregiverId);
  return json(data);
}

// Action for sending a new message
export async function action({ request, params }) {
  const { caregiverId } = params;
  const formData = await request.formData();
  const text = formData.get("text");

  if (!text || !text.trim()) {
    return json({ error: "Message cannot be empty" }, { status: 400 });
  }

  try {
    const newMessage = await appendCaregiverMessage(caregiverId, text);
    return json({ newMessage });
  } catch (e) {
    const status = e?.status ?? 500;
    return json({ error: e?.message || "Failed to send message" }, { status });
  }
}

// Component
export default function MessagesPage() {
  const { caregiver, messages: initialMessages } = useLoaderData();
  const [messages, setMessages] = useState(initialMessages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessageText, setNewMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(5);

  const fetcher = useFetcher();

  const handleLoadMore = () => setVisibleMessages((prev) => prev + 5);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewMessageText("");
  };

  // // Append new message when action returns
  // useEffect(() => {
  //   if (fetcher.data?.newMessage) {
  //     setMessages((prev) => [...prev, fetcher.data.newMessage]);
  //   }
  // }, [fetcher.data]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) { return; }

    setIsSending(true);

    const formData = new FormData();
    formData.append("text", newMessageText);

    // submit using fetcher
    fetcher.submit(formData, { method: "post" });

    setNewMessageText("");
    setIsModalOpen(false);
    setIsSending(false);
  };

  return (
    <>
      <h1>Your conversation with {caregiver.name}</h1>
      <MessageListComponent
        caregiver={caregiver}
        messages={messages}
        visibleMessages={visibleMessages}
      />
      <div style={{ marginTop: "1rem" }}>
        <IcareButton variant="primary" onClick={openModal}>
          Send Message
        </IcareButton>
        {messages.length > visibleMessages && (
          <IcareButton
            variant="secondary"
            style={{ marginLeft: "2vw" }}
            onClick={handleLoadMore}
          >
            Load more
          </IcareButton>
        )}
      </div>
      <ComposeMessageModal
        isOpen={isModalOpen}
        value={newMessageText}
        onChange={setNewMessageText}
        onClose={closeModal}
        onSubmit={handleSendMessage}
        isSending={isSending}
      />
    </>
  );
}
