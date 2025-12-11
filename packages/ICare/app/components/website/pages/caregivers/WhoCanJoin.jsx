// export default function WhoCanJoin() {
//     return (
//         <section
//             aria-label="Who can join ICare"
//             style={{
//                 width: "min(1100px,92vw)",
//                 margin: "7rem auto",
//                 padding: "0",
//                 fontFamily:
//                     "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
//             }}
//         >
//             {/* HEADER */}
//             <header style={{ marginBottom: "4rem", textAlign: "left" }}>
//                 <h2
//                     style={{
//                         margin: 0,
//                         fontWeight: 900,
//                         fontSize: "clamp(2.2rem,3vw,2.8rem)",
//                         letterSpacing: "-0.45px",
//                         lineHeight: 1.12,
//                         color: "#0F172A",
//                     }}
//                 >
//                     Who can join ICare
//                 </h2>

//                 <p
//                     style={{
//                         marginTop: "1.2rem",
//                         color: "#475569",
//                         fontSize: "1.18rem",
//                         lineHeight: 1.7,
//                         maxWidth: "62ch",
//                         fontWeight: 400,
//                     }}
//                 >
//                     Verified professional caregivers, specialists, and experienced helpers
//                     who provide safe and compassionate care.
//                 </p>
//             </header>

//             {/* CARDS */}
//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
//                     gap: "clamp(32px,2.6vw,40px)",
//                 }}
//             >
//                 {[
//                     {
//                         t: "Professional caregivers & nurses",
//                         d: "Verified experience, references and professional approach.",
//                         icon: (
//                             <svg
//                                 width="26"
//                                 height="26"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="#0F172A"
//                                 strokeWidth="1.8"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             >
//                                 <circle cx="12" cy="8" r="4" />
//                                 <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
//                             </svg>
//                         ),
//                     },
//                     {
//                         t: "Live-in & flexible hours",
//                         d: "Flexible schedules, overnight help and full-time support.",
//                         icon: (
//                             <svg
//                                 width="26"
//                                 height="26"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="#0F172A"
//                                 strokeWidth="1.8"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             >
//                                 <circle cx="12" cy="12" r="10" />
//                                 <polyline points="12 6 12 12 16 14" />
//                             </svg>
//                         ),
//                     },
//                     {
//                         t: "Specialist support",
//                         d: "Dementia care, post-surgery, mobility and advanced needs.",
//                         icon: (
//                             <svg
//                                 width="26"
//                                 height="26"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="#0F172A"
//                                 strokeWidth="1.8"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             >
//                                 <path d="M12 1v22" />
//                                 <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
//                             </svg>
//                         ),
//                     },
//                     {
//                         t: "Languages & driving",
//                         d: "Bilingual caregivers and certified drivers highly valued.",
//                         icon: (
//                             <svg
//                                 width="26"
//                                 height="26"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="#0F172A"
//                                 strokeWidth="1.8"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             >
//                                 <circle cx="12" cy="12" r="10" />
//                                 <path d="M2 12h20" />
//                                 <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10A15 15 0 0 1 12 2z" />
//                             </svg>
//                         ),
//                     },
//                 ].map((item, i) => (
//                     <article
//                         key={item.t}
//                         style={{
//                             background: "#FFFFFF",
//                             borderRadius: 28,
//                             padding: "34px 30px",
//                             display: "grid",
//                             gap: 18,
//                             transition:
//                                 "transform .25s ease, background .25s ease, border-color .25s ease",
//                             opacity: 0,
//                             transform: "translateY(16px)",
//                             animation: `fadeIn .75s ease forwards ${i * 0.14}s`,
//                         }}
//                         onMouseEnter={(e) => {
//                             e.currentTarget.style.transform = "translateY(-4px)";
//                             e.currentTarget.style.background = "rgba(31,171,31,0.05)";
//                         }}
//                         onMouseLeave={(e) => {
//                             e.currentTarget.style.transform = "translateY(0)";
//                             e.currentTarget.style.background = "#FFFFFF";
//                         }}
//                     >
//                         <div style={{ width: 34, opacity: 0.9 }}>{item.icon}</div>

//                         <strong
//                             style={{
//                                 color: "#0F172A",
//                                 fontSize: "1.24rem",
//                                 fontWeight: 800,
//                                 letterSpacing: "-0.25px",
//                             }}
//                         >
//                             {item.t}
//                         </strong>

//                         <p
//                             style={{
//                                 margin: 0,
//                                 color: "#475569",
//                                 lineHeight: 1.65,
//                                 fontSize: "1.05rem",
//                                 fontWeight: 400,
//                             }}
//                         >
//                             {item.d}
//                         </p>
//                     </article>
//                 ))}
//             </div>

//             <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(18px);}
//           to { opacity: 1; transform: translateY(0);}
//         }
//       `}</style>
//         </section>
//     );
// }
