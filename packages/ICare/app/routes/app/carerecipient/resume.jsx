import React, { lazy, Suspense, useMemo } from "react";
// import { IcareCard, IcareShimmer } from "react-library";
import { useLoaderData } from "react-router";
import { json } from "@remix-run/node";

export async function loader({ params }) {
  const id = params.caregiverId;
  console.log(params, "params in resume page loader");
  console.log(id, "caregiverId in resume page loader");
  // if (!caregiverId) {
  //   throw new Response("carereceiverId missing", { status: 400 });
  // }
  return json({ id });
}

export default function ResumePage() {
  const { id } = useLoaderData();

  const ViewResumeClient = useMemo(
    () =>
      lazy(() =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(import("../../components/pdf-viewer/pdf-view-resume-component.jsx"));
          }, 1000);
        })
      ),
    [id]
  );


  console.log(id, "caregiverId in resume page");
  return (
    <>
      <h1>Resume</h1>
      {/* <IcareCard variant="elevated">
        <span slot="contents"> */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <Suspense fallback={
            <>
              <div style={{ marginBottom: "1rem", background: "#e5e7eb", height: 20, borderRadius: 4 }}></div>
              <div style={{ marginBottom: "1rem", background: "#e5e7eb", height: 20, borderRadius: 4 }}></div>
              <div style={{ marginBottom: "1rem", background: "#e5e7eb", height: 20, borderRadius: 4 }}></div>
              <div style={{ marginBottom: "1rem", background: "#e5e7eb", height: 20, borderRadius: 4 }}></div>
              <div style={{ marginBottom: "1rem", background: "#e5e7eb", height: 20, borderRadius: 4 }}></div>
              <div style={{ marginBottom: "1rem", background: "#e5e7eb", height: 20, borderRadius: 4 }}></div>
            </>
          }>
            <ViewResumeClient caregiverId={id} />
          </Suspense>
      </div>
        {/* </span>
      </IcareCard> */}
    </>
  );
}
