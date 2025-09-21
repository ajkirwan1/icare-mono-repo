
import heroImage from "/images/heros/hero-landing-page.jpg";
import HeroRegisterComponent from "../components/hero/hero-register";
import { login } from "../services/login-service";
import { redirect } from "react-router";

export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const loginDetails = await login(username, password);

  if (!loginDetails.success) {
    return { error: loginDetails.message };
  }

  if (loginDetails.userdetails.role === "caregiver") {
    return redirect("/caregiver");
  }

  if (loginDetails.userdetails.role === "carerecipient") {
    return redirect("/carerecipient");
  }

  return null;
}

export default function Register() {

  return (
    <HeroRegisterComponent imgSrc={heroImage} />
  );
}
