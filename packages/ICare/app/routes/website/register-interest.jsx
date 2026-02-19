import { redirect } from "react-router";
export { action } from "./actions/waitinglist";

export function loader() {
  return redirect("/#waitlist", { status: 301 });
}

