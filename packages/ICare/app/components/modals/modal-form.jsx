import ModalComponent from "./modal-component";
import DynamicForm from "../../forms/dyanamic-form";


export default function ModalForm({ isOpen, onClose, title, formType }) {
  return (
    <ModalComponent onClose={() => setModalOpen(false)} title={modalTitle}>
      <p>This is where your edit form or details could go.</p>
      <DynamicForm />
    </ModalComponent>
  );
};
