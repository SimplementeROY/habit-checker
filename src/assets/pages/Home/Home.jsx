import React, { useEffect, useState } from "react";
import Task from "../../../../components/tasks/tasks";
import Footer from "../../../../components/footer/Footer";
import { DAYS_OF_THE_WEEK } from "../../../../components/constantes/daysOfTheWeek";
import OpenFormButton from "../../../../components/openForm/openForm";
import TaskFilter from "../../../../components/filterTasks/filterTasks";
import ModalComponent from "../../../../components/modal/modal";
import { convertDate } from "../../../../components/constantes/daysOfTheWeek";
import './home.css'
export default function Home({ tasks = [], setTasks, setCompletedTasks, date }) {
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
  const numOfTasksToday = tasks.filter(task => task.days.includes(today)).length;
  
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

  const updateCompletedTasks = (updatedTasks) => {
    const completedCount = updatedTasks.filter(task => task.completed[today] === true).length;
    setCompletedTasks(prev => {
      const existingDate = prev.find(entry => entry.date === convertDate(date));
      if (existingDate) {
        return prev.map(entry =>
          entry.date === convertDate(date) ? { ...entry, completedTasks: completedCount, numOfTasks: numOfTasksToday } : entry
        );
      }
      return [...prev, { date: convertDate(date), completedTasks: completedCount, numOfTasks: numOfTasksToday }];
    });
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: { ...task.completed, [today]: !task.completed[today] } } : task
    );
    setTasks(updatedTasks);
    updateCompletedTasks(updatedTasks);
  };

  const handleSubmit = (task) => {
    if (task.id !== null) {
      setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? task : t));
    } else {
      setTasks(prevTasks => [...prevTasks, { ...task, id: prevTasks.length + 1 }]);
    }
    closeForm();
  };

  const handleEdit = (task) => {
    setTemplate(task);
    openForm();
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    updateCompletedTasks(updatedTasks);
  };

  const filteredTasks = tasks
    .filter(task => task.days.includes(filteredDay))
    .map(task => (
      <Task 
        key={task.id} 
        task={task} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
        toggleTask={toggleTask}
        isDisabled={filteredDay !== today}
        isFilteredDay={filteredDay !== today}
        handleErrorMessage={setErrorMessage}
        selectedDay={filteredDay}
      />
    ));

  return (
    <>
      <main className="task-manager-container">
        <div className="task-manager">
          <OpenFormButton openModal={openForm} />
          <TaskFilter filteredDay={filteredDay} setFilteredDay={setFilteredDay} today={today} />
          <ModalComponent
            isOpen={isFormOpen}
            onRequestClose={closeForm}
            onSubmit={handleSubmit}
            formData={template}
          />
          <ul className="tasks-container">
            {filteredTasks}
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