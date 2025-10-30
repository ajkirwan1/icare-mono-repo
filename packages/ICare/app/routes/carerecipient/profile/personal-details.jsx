import { useState } from "react";
import { IcareSection, IcareCard } from "react-library";
import imgSrc from "/images/care-receiver-profile-image/care-receiver-profile-image.png";
import PillComponent from "../../../components/pill/pill-component.jsx";
import ModalComponent from "../../../components/modals/modal-component.jsx";
import { NavLink } from "react-router";
import LoginForm from "../../../forms/login-form.jsx";
import ModalForm from "../../../components/modals/modal-form.jsx";
import DynamicForm from "../../../forms/dyanamic-form.jsx";

export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}

export default function CaregiverRecipientHome() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formKey, setFormKey] = useState("personalInfo");

  const openModal = (title, formKey) => {
    setModalTitle(title);
    setFormKey(formKey);
    setModalOpen(true);
  };

  return (
    <>
      <IcareSection>
        {/* <h1>My Profile</h1> */}
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
            <div style={{ flex: "1", display: "flex", gap: "16px" }}>
              <IcareCard variant="elevated" style={{ flex: "1" }}>
                <span slot="contents">
                  <h2>Conditions</h2>
                  <p>Please list your conditions</p>
                  <div>
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
                    <p><strong>Additional Notes:</strong> Jane experiences occasional tremors and stiffness, particularly in the mornings. She has a history of hypertension managed with medication and follows a diabetic-friendly diet. Jane also wears glasses for vision correction and uses a hearing aid for mild hearing loss.</p>
                  </div>
                  {/* <div>
                  <h3>Further information</h3>
                  <p>My mother, Margaret, is 78 and lives alone in her home. She has mild arthritis that makes certain movements uncomfortable, occasional memory lapses, and some reduced mobility after a hip replacement last year. She’s able to manage many of her daily routines on her own but needs some help with cooking, light cleaning, grocery shopping, and gentle reminders for her medication. Margaret is warm, easy to get along with, and loves chatting about books, gardening, and old family stories.Jane Doe</p>
                </div> */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button style={{ marginTop: "16px", cursor: "pointer" }} onClick={() => openModal("Edit Health Information")}>Edit Health Information</button>
                  </div>
                </span>
              </IcareCard>
              <IcareCard variant="elevated" style={{ flex: "1" }}>
                <span slot="contents">
                  <h2>Medications</h2>
                  <p>Please list your medications</p>
                  <div>
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
                    <p><strong>Additional Notes:</strong> Jane experiences occasional tremors and stiffness, particularly in the mornings. She has a history of hypertension managed with medication and follows a diabetic-friendly diet. Jane also wears glasses for vision correction and uses a hearing aid for mild hearing loss.</p>
                  </div>
                  {/* <div>
                  <h3>Further information</h3>
                  <p>My mother, Margaret, is 78 and lives alone in her home. She has mild arthritis that makes certain movements uncomfortable, occasional memory lapses, and some reduced mobility after a hip replacement last year. She’s able to manage many of her daily routines on her own but needs some help with cooking, light cleaning, grocery shopping, and gentle reminders for her medication. Margaret is warm, easy to get along with, and loves chatting about books, gardening, and old family stories.Jane Doe</p>
                </div> */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button style={{ marginTop: "16px", cursor: "pointer" }} onClick={() => openModal("Edit Health Information")}>Edit Health Information</button>
                  </div>
                </span>
              </IcareCard>
            </div>
          </div>
        </div>
        {/* <div style={{ display: "flex", gap: "16px" }}>
          <IcareCard variant="elevated" style={{ flex: "1" }}>dasdsa</IcareCard>
          <IcareCard variant="elevated" style={{ flex: "1" }}>dasdsa</IcareCard>
        </div> */}
        {/* <div>
          <LoginForm />
        </div> */}
      </IcareSection>
      <IcareSection>
        <div style={{ display: "flex", gap: "16px" }}>
          <IcareCard variant="elevated" style={{ flex: "1" }}>
            <span slot="contents">
              <h2>Account summary</h2>
              <div>
                <p><strong>Balance (held in protected account):</strong> £2,300</p>
                <p><strong>Upcoming payments:</strong> £450 on 15th July 2024</p>
                <p><strong>Payment history:</strong> Last payment of £400 made on 15th June 2024</p>
              </div>
              <div>
                <NavLink style={{
                  padding: "10px 20px",
                  color: "#4CAF50",
                  cursor: "pointer",
                  marginTop: "16px"
                }} to="/carerecipient/my-account">Edit Profile</NavLink>
              </div>
            </span>
          </IcareCard>
          <IcareCard variant="elevated" style={{ flex: "1" }}>
            <span slot="contents">
              <h2>Caregiver preferences</h2>
            </span></IcareCard>
        </div>
      </IcareSection>
      {/* <ModalForm isOpen={false} onClose={() => { }} title={modalTitle} formType="user" /> */}
      {/* The modal itself */}
      <ModalComponent isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        <DynamicForm formKey={
          modalTitle.includes("Health")
            ? "healthInfo"
            : modalTitle.includes("Personal")
              ? "personalInfo"
              : "personalInfo"
        }
          onSubmit={(formData) => {
            console.log("Form submitted:", formData);
            setModalOpen(false);
          }} />
      </ModalComponent>
    </>
  );
}
