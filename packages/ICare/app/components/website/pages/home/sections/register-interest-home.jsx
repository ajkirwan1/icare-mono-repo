// import React from "react";
// import RegisterInterestForm from "../../../common/forms/register-interest-form";

// export default function RegisterInterestHome() {

//     return (
//         <section
//             style={{
//                 width: "100vw",
//                 marginLeft: "calc(50% - 50vw)",
//                 marginRight: "calc(50% - 50vw)",
//                 padding: "64px 0",
//                 background: "#FFFFFF",
//                 fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
//             }}
//         >
//             <div
//                 style={{
//                     width: "min(92vw, 1100px)",
//                     margin: "0 auto",
//                     display: "grid",
//                     gridTemplateColumns: "1.15fr 0.85fr", // mockup | text
//                     gap: "3rem",
//                     alignItems: "center"
//                 }}
//             >
//                 {/* ================= LEFT — IPHONE MOCKUP ================= */}
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "center"
//                     }}
//                 >
//                     {/* <img
//             src="images/web/icare-for-carereceivers/mockup-icare3.png"
//             alt="ICare app preview on iPhone"
//             style={{
//               width: "120%",              // +20%
//               maxWidth: "520px",
//               height: "auto",
//               objectFit: "contain",
//               borderRadius: "32px"

//             }}
//           /> */}
//                     <RegisterInterestForm />
//                 </div>

//                 {/* ================= RIGHT — UK CARE RECEIVERS COPY ================= */}
//                 <div>
//                     <h2
//                         style={{
//                             margin: 0,
//                             fontSize: "2rem",
//                             fontWeight: 500,
//                             color: "#1A1A1A",
//                             lineHeight: 1.2,
//                             maxWidth: "26ch"
//                         }}
//                     >
//                         Care that feels simple,
//                         <br /> clear and human
//                     </h2>

//                     <p
//                         style={{
//                             marginTop: "1rem",
//                             fontSize: "1.25rem",
//                             color: "#1a1a1a",
//                             lineHeight: 1.6,
//                             maxWidth: "48ch"
//                         }}
//                     >
//                         ICare is built for people receiving care — and for families organising it.
//                         Everything is designed to feel familiar, calm and easy to navigate, without
//                         unnecessary steps or confusing options.
//                     </p>

//                     <ul
//                         style={{
//                             marginTop: "1.6rem",
//                             paddingLeft: "1.1rem",
//                             display: "grid",
//                             gap: "0.7rem",
//                             fontSize: "1.2rem",
//                             color: "#1a1a1a",
//                             lineHeight: 1.5,
//                             maxWidth: "52ch",
//                             fontWeight: "700"
//                         }}
//                     >
//                         <li>Comfortable, one-hand use on any phone</li>
//                         <li>The essentials are always one tap away</li>
//                         <li>Clear caregiver profiles with the details that matter</li>
//                         <li>Help and support available whenever you need it</li>
//                     </ul>

//                     <p
//                         style={{
//                             marginTop: "1.6rem",
//                             fontSize: "0.95rem",
//                             color: "#1a1a1a",
//                             maxWidth: "50ch",
//                             lineHeight: 1.55
//                         }}
//                     >
//                         Whether you’re arranging care for yourself or a loved one, ICare keeps the
//                         process reassuring — so you can focus on the person, not the paperwork.
//                     </p>
//                 </div>
//             </div>

//             {/* ================= MOBILE ================= */}
//             <style>{`
//     @media (max-width: 900px) {
//       section > div {
//         grid-template-columns: 1fr !important;
//         gap: 2.2rem;
//       }

//       section img {
//         width: 100% !important;
//         max-width: 420px !important;
//       }
//     }
//   `}</style>
//         </section>
//     );
// }
