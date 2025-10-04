import React from "react";
// import { useState } from "react";
import { IcareCard, IcareButton } from "react-library";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router";

export async function loader({ params }) {
  console.log(params, "paramssss");
  const { carereceiverId } = params;

  // Fetch caregiver details
  const caregiverDetailsResponse = await fetch(`http://localhost:4000/caregivers?id=${carereceiverId}`);
  if (!caregiverDetailsResponse.ok) {
    throw new Response("Failed to load caregiver details", { status: caregiverDetailsResponse.status });
  }

  const caregiverDetails = await caregiverDetailsResponse.json();

  let name = "";
  let imgSrc = "";

  if (Array.isArray(caregiverDetails) && caregiverDetails.length > 0) {
    name = caregiverDetails[0].name;
    imgSrc = caregiverDetails[0].imgSrc;
    console.log(name, "name");
    console.log(imgSrc, "imgSrc");
  }

  console.log(caregiverDetails, "caregiverDetailssss");

  // Fetch caregiver messages
  const res = await fetch(`http://localhost:4000/caregiverMessageThreads?caregiverId=${carereceiverId}`);
  if (!res.ok) {
    throw new Response("Failed to load caregiver messages", { status: res.status });
  }

  const threads = await res.json();
  const messages = threads[0]?.messages ?? [];

  const obj = { name, imgSrc, messages };

  return json(obj);
}


export default function CaregiverMessages() {
  const obj = useLoaderData();
  console.log(obj, "obj");

  return (
    <>
      <h1>Your conversation with {obj.name}</h1>
      <ul>
        {obj.messages.map((msg) => (
          <li key={msg.id}>
            {msg.from === "carerecipient" ? (
              <IcareCard variant="elevated" style={{ backgroundColor: "#d9ece5", marginBottom: "3vh" }}>
                <span slot="contents" style={{ display: "flex", alignItems: "center", gap: "5vw" }}>
                  <div style={{ display: "flex", flexDirection: "column", flex: "0 0 auto", alignItems: "center", gap: "1vh" }}>
                    <img src={`/${obj.imgSrc}`} alt={`${msg.from} Avatar`} style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "inline-block",
                      background: "#f2f2f2"
                    }} />
                    <span>You</span>
                  </div>
                  <hr style={{ height: "50px", borderLeft: "1px solid gray", margin: 0 }} />
                  <div>
                    <strong>{msg.from}:</strong> {msg.content} <em>({new Date(msg.timestamp).toLocaleString()})</em>
                    <p>{msg.text}</p>
                  </div>
                </span>
              </IcareCard>
            ) : (
              <IcareCard variant="elevated" style={{ marginBottom: "3vh" }}>
                <span slot="contents" style={{ display: "flex", alignItems: "center", gap: "5vw" }}>
                  <div>
                    <strong>{msg.from}:</strong> {msg.content} <em>({new Date(msg.timestamp).toLocaleString()})</em>
                    <p>{msg.text}</p>
                  </div>
                  <hr style={{ height: "50px", borderLeft: "1px solid gray", margin: 0 }} />
                  <div style={{ display: "flex", flexDirection: "column", flex: "0 0 auto", alignItems: "center", gap: "1vh" }}>
                    <img src={`/${obj.imgSrc}`} alt={`${msg.from} Avatar`} style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "inline-block",
                      background: "#f2f2f2"
                    }} />
                    <span>You</span>
                  </div>
                </span>
              </IcareCard>)}
          </li>
        ))}
      </ul>
      <IcareButton variant="contained" color="primary">Send Message</IcareButton>
      <IcareButton variant="secondary" color="secondary" style={{ marginLeft: "2vw" }}>Load more</IcareButton>
    </>
  );
}
