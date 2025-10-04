/**
 * Fetch caregiver profile + first message thread.
 * Returns shape consumed by the route loader.
 */
export async function getCaregiverMessageThread(caregiverId, baseUrl = "http://localhost:4000") {
  if (!caregiverId) {
    throw new Response("caregiverId missing", { status: 400 });
  }

  // Fetch caregiver details
  const caregiverRes = await fetch(`${baseUrl}/caregivers?id=${caregiverId}`);
  if (!caregiverRes.ok) {
    throw new Response("Failed to load caregiver details", { status: caregiverRes.status });
  }
  const caregiverData = await caregiverRes.json();
  const { name = "", imgSrc = "" } = caregiverData[0] || {};

  // Fetch message threads
  const threadsRes = await fetch(`${baseUrl}/caregiverMessageThreads?caregiverId=${caregiverId}`);
  if (!threadsRes.ok) {
    throw new Response("Failed to load caregiver messages", { status: threadsRes.status });
  }
  const threads = await threadsRes.json();

  return {
    caregiver: { name, imgSrc },
    messages: threads[0]?.messages ?? [],
    caregiverId,
    threadId: threads[0]?.id ?? null
  };
}
