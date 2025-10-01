import React, { lazy, Suspense, useMemo } from "react";
import { IcareCard, IcareShimmer } from "react-library";
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
      <IcareCard variant="elevated">
        <span slot="contents">
          <Suspense fallback={
            <>
              <div style={{ marginBottom: "1rem" }}><IcareShimmer /></div>
              <div style={{ marginBottom: "1rem" }}><IcareShimmer /></div>
              <div style={{ marginBottom: "1rem" }}><IcareShimmer /></div>
              <div style={{ marginBottom: "1rem" }}><IcareShimmer /></div>
              <div style={{ marginBottom: "1rem" }}><IcareShimmer /></div>
              <div style={{ marginBottom: "1rem" }}><IcareShimmer /></div>
            </>
          }>
            <ViewResumeClient caregiverId={id} />
          </Suspense>
        </span>
      </IcareCard>
    </>
  );
}
