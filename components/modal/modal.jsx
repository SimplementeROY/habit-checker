import ReactModal from "react-modal";
import AddTaskForm from "../form/addTaskForm";

import './modal.css'

export default function ModalComponent ({isOpen, onRequestClose, onSubmit, formData }){

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            className="modalContent"
            overlayClassName="modalOverlay"
        >
            <button className="close-form-button" onClick={onRequestClose}>X</button>
            <AddTaskForm onSubmit={onSubmit} data={formData}/>
        </ReactModal>
    )
}