
import './openForm.css'
export default function OpenFormButton ({openModal}) {
    return (
        <div className="manage-tasks">
            <h1 className="tasks-title">To-Do List</h1>
            <button className="add-task-button button" onClick={openModal}><span>+ </span><span className='add-task-text'>Agregar tarea</span></button>
        </div>
    )
}