
import './openForm.css'
export default function OpenFormButton ({openModal}) {
    return (
        <div className="manage-tasks">
            <h1 className="tasks-title">To-Do List</h1>
            <button className="add-task-button button" onClick={openModal}><span>+ </span>Agregar tarea</button>
        </div>
    )
}