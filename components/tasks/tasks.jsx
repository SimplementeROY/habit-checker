import './tasks.css';
import { editIcon, delIcon } from '../constantes/icons';

export default function Task({ task, handleEdit, handleDelete, toggleTask, isDisabled, isFilteredDay, selectedDay ,handleErrorMessage }) {

    const handleCheckboxChange = () => {
        if (isFilteredDay) {
            handleErrorMessage(true);
            setTimeout(() => handleErrorMessage(false), 1000); // Limpiar el mensaje después de 3 segundos
        } else {
            toggleTask(task.id);
        }
    };

    return (
        <>
            <li className={`tasks ${isDisabled ? 'disabled' : ''}`} key={task.id}>
            <label className='container task-info-container'>
                <div className='check'>
                    <input
                        className="checkbox"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={task.completed[selectedDay] === true}
                    />
                    <span className='checkmark'></span>
                </div>
                <div className='task-details'>
                    <p className='hour'>{task.hour}</p>
                    <p className='task-name'>{task.name}</p>
                </div>
            </label>
            <div className="manage-tasks-buttons">
                <button 
                  className="edit-button" 
                  aria-label="Edit" 
                  onClick={() => handleEdit(task)} 
                  disabled={isDisabled}>
                  {editIcon}
                </button>
                <button 
                  className="delete-button" 
                  aria-label="Delete" 
                  onClick={() => handleDelete(task.id)} 
                  disabled={isDisabled}>
                  {delIcon}
                </button>
            </div>
        </li>
        </>

    );
}
