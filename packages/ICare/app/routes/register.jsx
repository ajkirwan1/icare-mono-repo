
import heroImage from "/images/heros/hero-landing-page.jpg";
import HeroRegisterComponent from "../components/hero/hero-register";
import { login } from "../services/login-service";

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

  // Here you would typically handle the registration logic,
  // such as saving the user to a database.
  // eslint-disable-next-line no-console, no-undef
  console.log("Registering user:", { username, password });

  await login(username, password);

  // Redirect to a welcome page or login page after registration.
  // return redirect("/welcome");
  return null;
}

export default function Register() {

  return (
    <HeroRegisterComponent imgSrc={heroImage} />
  );
}
