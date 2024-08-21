import './OpenForm.css'

export default function OpenForm({openModal}) {
    return (
        <div className="manage-habits">
            <h1 className="habits-title">List Of Habits</h1>
            <button className="add-habit-button button" onClick={openModal}><span>+ </span><span className='add-habit-text'>Agregar Hábito</span></button>
        </div>
    )
}