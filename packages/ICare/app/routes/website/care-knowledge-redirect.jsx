import { redirect } from "react-router";

export function loader({ params }) {
    const splat = params["*"];
    if (splat) {
        return redirect(`/care-guidance/${splat}`, 301);
    }
    return redirect("/care-guidance", 301);
}

export default function CareKnowledgeRedirect() {
    return null;
}