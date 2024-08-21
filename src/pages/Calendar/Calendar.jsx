import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, subMonths, addMonths } from 'date-fns';
import { enUS } from 'date-fns/locale'; // Usa la localización en inglés
import Footer from '../../components/Footer/Footer';
import './Calendar.css';

const Calendar = ({ habitsDone }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const oneYearAgo = subMonths(new Date(), 12); // Un año atrás desde la fecha actual
  // Convertimos el array de tareas a un objeto para facilitar el acceso
  const habitMap = habitsDone.reduce((acc, { date, completedHabits, numOfHabits }) => {
    acc[date.trim()] = {habitCount: completedHabits, numOfHabits: numOfHabits};
    return acc;
  }, {});

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => {
    const prevMonth = subMonths(currentMonth, 1);
    if (prevMonth >= oneYearAgo) {
      setCurrentMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    if (nextMonth <= new Date()) {
      setCurrentMonth(nextMonth);
    }
  };

  return (
    <>
      <main>
        <div className="calendar-container">
          <div className="header">
            <button className="button prev-month" onClick={handlePrevMonth}>{`<`}</button>
            <h2>{format(currentMonth, 'MMMM yyyy', { locale: enUS })}</h2>
            <button className="button next-month" onClick={handleNextMonth}>{`>`}</button>
          </div>

          <div className="calendar">
            {daysInMonth.map(day => {
              const dayString = format(day, 'dd MMM', { locale: enUS }); // Ajustado a "01 Aug"
              const { habitCount, numOfHabits } = habitMap[dayString] || { habitCount: 0, numOfHabits: 0 };
              const opacity = habitCount === 0 ? 0 : Math.min(1, habitCount / numOfHabits);

              return (
                <div 
                  key={dayString} 
                  className={`day ${isToday(day) ? 'today' : ''}`} 
                  style={{ backgroundColor: `rgba(0, 123, 255, ${opacity})` }}
                >
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Calendar;
