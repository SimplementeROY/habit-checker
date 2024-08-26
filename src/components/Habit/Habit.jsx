import './Habit.css';
import { delIcon } from '../icons/DeleteIcon';
import { editIcon } from '../icons/EditIcon';
export default function Habit({ habit, handleEdit, handleDelete, toggleHabit, isDisabled, isFilteredDay, selectedDay, handleErrorMessage }) {

    const handleCheckboxChange = () => {
        if (isFilteredDay) {
            handleErrorMessage(true);
            setTimeout(() => handleErrorMessage(false), 1500); // Limpiar el mensaje después de 3 segundos
        } else {
            toggleHabit(habit.id);
        }
    };

    return (
        <>
            <li className={`habits ${isDisabled ? 'disabled' : ''}`} key={habit.id}>
            <label className='container habit-info-container'>
                <div className='check'>
                    <input
                        className="checkbox"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={habit.completed[selectedDay] === true}
                    />
                    <span className='checkmark'></span>
                </div>
                <div className='habit-details'>
                    <p className='hour'>{habit.hour}</p>
                    <p className='habit-name'>{habit.name}</p>
                </div>
            </label>
            <div className="manage-habits-buttons">
                <button 
                  className="edit-button" 
                  aria-label="Edit" 
                  onClick={() => handleEdit(habit)} 
                  disabled={isDisabled}>
                  {editIcon}
                </button>
                <button 
                  className="delete-button" 
                  aria-label="Delete" 
                  onClick={() => handleDelete(habit.id)} 
                  disabled={isDisabled}>
                  {delIcon}
                </button>
            </div>
        </li>
        </>

    );
}
