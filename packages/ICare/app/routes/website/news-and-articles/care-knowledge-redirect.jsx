import { redirect } from "react-router";

export function loader({ params, request }) {
  const legacySuffix = params["*"] ? `/${params["*"]}` : "";
  const search = new URL(request.url).search;

  return redirect(`/care-guidance${legacySuffix}${search}`, { status: 301 });
}

export default function CareKnowledgeRedirect() {
  return null;
}
