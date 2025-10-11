export async function getAllMessages(baseUrl = "http://localhost:4000") {

  // Fetch message threads
  const allMessagesRes = await fetch(`${baseUrl}/caregiverMessageThreads`);
  if (!allMessagesRes.ok) {
    throw new Response("Failed to load caregiver messages", { status: allMessagesRes.status });
  }
  const threads = await allMessagesRes.json();

  // Fetch caregivers once and build a lookup map by id
  const caregiversRes = await fetch(`${baseUrl}/caregivers`);
  if (!caregiversRes.ok) {
    throw new Response("Failed to load caregivers", { status: caregiversRes.status });
  }
  const caregivers = await caregiversRes.json();
  const caregiverById = new Map(
    caregivers.map(c => [String(c.id), c])
  );

  // Map threads to returned shape, pulling imgSrc (and name) from caregivers using caregiverId
  const dataToReturn = threads.map(thread => {
    const caregiver = caregiverById.get(String(thread.caregiverId)) || {};
    return {
      threadId: thread.id,
      caregiverId: thread.caregiverId,
      caregiverName: caregiver.name || null,
      imgSrc: caregiver.imgSrc || null,
      unreadCount: thread.unreadCount,
      lastUpdated: thread.lastUpdated
    };
  });

  return {
    data: dataToReturn
  };
}
