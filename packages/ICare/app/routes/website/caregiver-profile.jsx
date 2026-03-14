import { useLoaderData } from "react-router";
import CaregiverProfile from "../../pages/CaregiverProfile";
import { getCaregiverBySlug } from "../../lib/caregivers.server";

export const meta = ({ data }) => {
  const caregiver = data?.caregiver;

  if (!caregiver) {
    return [{ title: "Caregiver profile | ICare" }];
  }

  return [
    { title: `${caregiver.name} | Caregiver profile | ICare` },
    { name: "description", content: caregiver.shortBio }
  ];
};

export const links = ({ params } = {}) => {
  return [
    { rel: "canonical", href: `https://icare-app.co.uk/caregivers/${params?.slug || ""}` }
  ];
};

export async function loader({ params }) {
  const caregiver = await getCaregiverBySlug(params.slug);

  if (!caregiver) {
    throw new Response("Caregiver not found", { status: 404 });
  }

  return { caregiver };
}

export default function CaregiverProfileRoute() {
  const { caregiver } = useLoaderData();
  return <CaregiverProfile caregiver={caregiver} />;
}
