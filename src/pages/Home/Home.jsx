import React, { useEffect, useState } from "react"
import Habit from "../../components/Habit/Habit";
import Footer from "../../components/Footer/Footer";
import OpenForm from "../../components/OpenForm/OpenForm";
import DayFilter from "../../components/DayFilter/DayFilter";
import Modal from "../../components/Modal/Modal";
import { convertDate, DAYS_OF_THE_WEEK } from "../../constantes/daysOfTheWeek";
import './Home.css'

export default function Home({ habits = [], setHabits, setCompletedHabits, date }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [template, setTemplate] = useState({
    id: null,
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
  });
  const [filteredDay, setFilteredDay] = useState(DAYS_OF_THE_WEEK[new Date().getDay()]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [today, setToday] = useState(DAYS_OF_THE_WEEK[new Date().getDay()]);
  const numOfHabitsToday = habits.filter(habit => habit.days.includes(today)).length;
  
  useEffect(() => {
    const now = DAYS_OF_THE_WEEK[new Date().getDay()];
    if (now !== today) setToday(now);
  }, [today]);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => {
    setIsFormOpen(false);
    resetTemplate();
  };

  const resetTemplate = () => setTemplate({
    id: null,
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
  });

  const updateCompletedHabits = (updatedHabits) => {
    const completedCount = updatedHabits.filter(habit => habit.completed[today] === true).length;
    setCompletedHabits(prev => {
      const existingDate = prev.find(entry => entry.date === convertDate(date));
      if (existingDate) {
        return prev.map(entry =>
          entry.date === convertDate(date) ? { ...entry, completedHabits: completedCount, numOfHabits: numOfHabitsToday } : entry
        );
      }
      return [...prev, { date: convertDate(date), completedHabits: completedCount, numOfHabits: numOfHabitsToday }];
    });
  };

  const toggleHabit = (id) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, completed: { ...habit.completed, [today]: !habit.completed[today] } } : habit
    );
    setHabits(updatedHabits);
    updateCompletedHabits(updatedHabits);
  };

  const handleSubmit = (habit) => {
    if (habit.id !== null) {
      setHabits(prevHabits => prevHabits.map(t => t.id === habit.id ? habit : t));
    } else {
      setHabits(prevHabits => [...prevHabits, { ...habit, id: prevHabits.length + 1 }]);
    }
    closeForm();
  };

  const handleEdit = (habit) => {
    setTemplate(habit);
    openForm();
  };

  const handleDelete = (id) => {
    const updatedHabits = habits.filter(habit => habit.id !== id);
    setHabits(updatedHabits);
    updateCompletedHabits(updatedHabits);
  };

  const filteredHabits = habits
    .filter(habit => habit.days.includes(filteredDay))
    .map(habit => (
      <Habit 
        key={habit.id} 
        habit={habit} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
        toggleHabit={toggleHabit}
        isDisabled={filteredDay !== today}
        isFilteredDay={filteredDay !== today}
        handleErrorMessage={setErrorMessage}
        selectedDay={filteredDay}
      />
    ));

  return (
    <>
      <main className="habit-manager-container">
        <div className="habit-manager">
          <OpenForm openModal={openForm} />
          <DayFilter filteredDay={filteredDay} setFilteredDay={setFilteredDay} today={today} />
          <Modal
            isOpen={isFormOpen}
            onRequestClose={closeForm}
            onSubmit={handleSubmit}
            formData={template}
          />
          <ul className="habits-container">
            {filteredHabits}
          </ul>
          {errorMessage && (
            <div className="error-message">
              <img 
                src="https://i.pinimg.com/originals/dc/5d/51/dc5d513617f16c73ef5c8a09ea075d85.jpg" 
                alt="Más despacio velocista meme"
                className="error"
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}