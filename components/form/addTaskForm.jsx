import { FREQUENCY_OPTIONS } from '../constantes/daysOfTheWeek'
import { useState } from 'react'
import './Form.css'


export default function AddTaskForm( { onSubmit , data } ){

    const [taskData, setTaskData] = useState({
        id: data.id,
        name: data.name || '',
        hour: data.hour || '',
        days: data.days || [],
        completed: data.completed || {
            L: false,
            M: false,
            X: false,
            J: false,
            V: false,
            S: false,
            D: false,
        }
    });
   
    const handleChange = (e) =>{
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox'){
            setTaskData((prev) => {
                if (value === 'allDays' && checked){
                    return (
                        {
                            ...prev,
                            days: FREQUENCY_OPTIONS
                        }
                    )
                }
                return (
                    {
                        ...prev,
                        days: checked ? [...prev.days, value]: prev.days.filter((day) => day !== value)
                    }
                )
            })
        }
        else{
            setTaskData((prev) => {
                return(
                    {...prev, [name]:value}
                )
            })
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(taskData)
        setTaskData({
            id: taskData.id + 1,
            name: '',
            hour: '',
            days: [],
            completed: {
                L: false,
                M: false,
                X: false,
                J: false,
                V: false,
                S: false,
                D: false,
            }
        })
    }
    

    const frequency = FREQUENCY_OPTIONS.map((day) => {
        return (
            <label className='container' key={day}>
                <div className='check'>
                    <input type="checkbox" className="checkbox" name="days" value={day} onChange={handleChange} checked={taskData.days.includes(day)} />
                    <span className='checkmark'></span>
                </div>
                <p className='frequency-option'>{day}</p>
            </label>
        )
    })
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nombre del hábito: </label>
                <input type="text" name="name" onChange={handleChange} value={taskData.name} placeholder='Ir al gimnasio' required/>
            </div>
            <div>
                <label htmlFor="hour">Hora: </label>
                <input type="time" name="hour" onChange={handleChange} value={taskData.hour} required/>
            </div>
            <div className='frequency'>
                <label htmlFor="days">Frecuencia: </label>
                <label className='container'>
                    <div className='check'>
                        <input type="checkbox" className="checkbox" onChange={handleChange} value="allDays" name="days" />
                        <span className='checkmark'></span>
                    </div>
                    <p className='frequency-option'>Todos los días</p>
                </label>
                {frequency}
            </div>

            <button className="add-task-button-form button" type='submit'>Añadir</button>
        </form>
    )
}