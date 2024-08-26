import { FREQUENCY_OPTIONS } from "../../constantes/daysOfTheWeek";
import { useState, useEffect } from "react";
import './DayFilter.css';

export default function DayFilter({ filteredDay, setFilteredDay, today }) {
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    //console.log(filteredDay)
    //console.log(DAY_OF_THE_WEEK)
    useEffect(() => {
        const todayDate = new Date();
        const currentDay = todayDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        const daysOffset = [1, 2, 3, 4, 5, 6, 7]; // Monday to Sunday offsets

        // Find the previous Monday (or today if it's Monday)
        const mondayDate = new Date(todayDate);
        mondayDate.setDate(todayDate.getDate() - ((currentDay + 6) % 7)); // Adjust for Monday as the start of the week

        // Generate the week dates from Monday to Sunday
        const newDaysOfWeek = daysOffset.map(offset => {
            const day = new Date(mondayDate);
            day.setDate(mondayDate.getDate() + offset - 1);
            return day.getDate(); // Only the day of the month
        });

        setDaysOfWeek(newDaysOfWeek);
    }, [filteredDay]);

    const handleSelect = (e) => {
        const { checked, value } = e.target;
        if (checked){
            setFilteredDay(value);
        }
    };

    const isSelectedClassName = (day) => {
        if (day === today && filteredDay !== day){
            return 'today-but-not-selected day-filter';
        }
        return filteredDay === day ? 'day-filter highlight': 'day-filter';
    };

    const days = FREQUENCY_OPTIONS.map((day, index) => {
        return (
            <label htmlFor="day" key={'Filter' + day} className={isSelectedClassName(day)}>
                <input type="checkbox" className="habit-filter" value={day} onChange={handleSelect} checked={filteredDay === day} />
                <p>{day}</p>
                <span>{daysOfWeek[index]}</span>
            </label>
        )
    });

    return (
        <div className="habit-filter">
            {days}
        </div>
    );
}
