import { useLoaderData } from "react-router";
import CaregiversPage from "../../pages/CaregiversPage";
import { getCaregivers } from "../../lib/caregivers.server";

export const meta = () => {
  return [
    { title: "Caregivers | Browse trusted independent carers | ICare" },
    { name: "description", content: "Browse caregiver profiles on ICare and open full profile pages with care types, availability, and practical details." }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/caregivers" }
  ];
};

export async function loader() {
  const caregivers = await getCaregivers();
  return { caregivers };
}

export default function CaregiversRoute() {
  const { caregivers } = useLoaderData();
  return <CaregiversPage caregivers={caregivers} />;
}
