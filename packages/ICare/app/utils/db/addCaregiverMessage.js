const BASE_URL = "http://localhost:4000";

async function safeJson(res, errMsg) {
  if (!res.ok) {
    throw new Response(errMsg, { status: res.status });
  }
  return res.json();
}

export async function appendCaregiverMessage(caregiverId, text) {
  if (!caregiverId) {
    throw new Response("caregiverId missing", { status: 400 });
  }

  const threadRes = await fetch(`${BASE_URL}/caregiverMessageThreads?caregiverId=${caregiverId}`);
  const threads = await safeJson(threadRes, "Failed to load thread");
  if (!threads.length) {
    throw new Response("Thread not found", { status: 404 });
  }

  const thread = threads[0];

  const newMessage = {
    id: `msg-${Date.now()}`,
    from: "carerecipient",
    to: "caregiver",
    timestamp: new Date().toISOString(),
    text,
    status: "unread"
  };

  const updatedThread = {
    ...thread,
    messages: [...thread.messages, newMessage],
    lastUpdated: new Date().toISOString()
  };

  const putRes = await fetch(`${BASE_URL}/caregiverMessageThreads/${thread.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedThread)
  });

  if (!putRes.ok) {
    throw new Response("Failed to update thread", { status: putRes.status });
  }

  return newMessage;
}
