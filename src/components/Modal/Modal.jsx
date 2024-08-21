import ReactModal from "react-modal";
import Form from "../Form/Form";

import './Modal.css'

export default function Modal ({isOpen, onRequestClose, onSubmit, formData }){

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            className="modalContent"
            overlayClassName="modalOverlay"
        >
            <button className="close-form-button" onClick={onRequestClose}>X</button>
            <Form onSubmit={onSubmit} data={formData}/>
        </ReactModal>
    )
}