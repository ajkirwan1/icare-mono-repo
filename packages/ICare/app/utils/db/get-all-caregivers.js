export async function getAllCaregivers(baseUrl = "http://localhost:4000") {

  // Fetch message threads
  const caregiversRes = await fetch(`${baseUrl}/caregivers`);
  if (!caregiversRes.ok) {
    throw new Response("Failed to load caregiver messages", { status: caregiversRes.status });
  }

  console.log("fetching caregivers", caregiversRes);

  const caregivers = await caregiversRes.json();

  return { caregivers };
}
