import { useState } from "react";
import { IcareSection, IcareCard } from "react-library";
import imgSrc from "/images/care-receiver-profile-image/care-receiver-profile-image.png";
import PillComponent from "../../../components/pill/pill-component.jsx";
import ModalComponent from "../../../components/modals/modal-component.jsx";

export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}

export default function CaregiverRecipientHome() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (title) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  return (
    <>
      <IcareSection>
        <h1>My Profile</h1>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "0 0 30%" }}>
            <img src={imgSrc} alt="Care Receiver Profile" style={{ borderRadius: "8px" }} />
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <button style={{ marginTop: "16px", cursor: "pointer" }} onClick={() => openModal("Edit Profile Picture")}>Edit Profile Picture</button>
            </div>
          </div>
          <div style={{ flex: "1", marginLeft: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <IcareCard variant="elevated" style={{ flex: "1" }}>
              <span slot="contents">
                <h2>Personal information</h2>
                <p><strong>Name:</strong> Jane Doe</p>
                <p><strong>Age:</strong> 68</p>
                <p><strong>Location:</strong> Springfield, IL</p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button style={{ marginTop: "16px", cursor: "pointer" }} onClick={() => openModal("Edit Personal Information")}>Edit Personal Information</button>
                </div>
              </span>
            </IcareCard>
            <IcareCard variant="elevated" style={{ flex: "1" }}>
              <span slot="contents">
                <h2>Personal health</h2>
                <div>
                  <h3>Health summary</h3>
                  <ul style={{ display: "flex", gap: "8px", flexWrap: "wrap", listStyleType: "none", padding: 0, margin: 0 }}>
                    <li><PillComponent>Parkinsons</PillComponent></li>
                    <li><PillComponent>Hypertension</PillComponent></li>
                    <li><PillComponent>Arthritis</PillComponent></li>
                    <li><PillComponent>Diabetes</PillComponent></li>
                    <li><PillComponent>High cholesterol</PillComponent></li>
                    <li><PillComponent>Vision impairment</PillComponent></li>
                    <li><PillComponent>Hearing loss</PillComponent></li>
                    <li><PillComponent>Medication: L-dopa</PillComponent></li>
                    <li><PillComponent>Allergy: Penicillin</PillComponent></li>
                    <li><PillComponent>Mobility aid: Walker</PillComponent></li>
                    <li><PillComponent>Falls risk</PillComponent></li>
                    <li><PillComponent>Sleep disturbances</PillComponent></li>
                  </ul>
                </div>
                <div>
                  <h3>Further information</h3>
                  <p>My mother, Margaret, is 78 and lives alone in her home. She has mild arthritis that makes certain movements uncomfortable, occasional memory lapses, and some reduced mobility after a hip replacement last year. She’s able to manage many of her daily routines on her own but needs some help with cooking, light cleaning, grocery shopping, and gentle reminders for her medication. Margaret is warm, easy to get along with, and loves chatting about books, gardening, and old family stories.Jane Doe</p>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button style={{ marginTop: "16px", cursor: "pointer" }} onClick={() => openModal("Edit Health Information")}>Edit Health Information</button>
                </div>
              </span>
            </IcareCard>
          </div>
        </div>
        <div>
          hello
        </div>
      </IcareSection>
      {/* The modal itself */}
      <ModalComponent isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        <p>This is where your edit form or details could go.</p>
      </ModalComponent>
    </>
  );
}
