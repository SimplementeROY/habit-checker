import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home/Home';
import Chart from './assets/pages/Chart/Chart';
import Calendar from './assets/pages/Calendar/Calendar';
import Header from '../components/header/Header';
import './index.css';
import { convertDate } from '../components/constantes/daysOfTheWeek';

const root = createRoot(document.getElementById('root'));

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const historyOfCompletedTasks = JSON.parse(localStorage.getItem('history')) || [{ date: convertDate(currentDate), completedTasks: 0, numOfTasks: 0 }];
    setTasks(storedTasks);
    setCompletedTasks(historyOfCompletedTasks);
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();

    if (currentDate !== today) {
      setCurrentDate(today);
      setCompletedTasks(prev => {
        const exists = prev.some(entry => entry.date === today);
        if (exists) {
          return prev.map(entry =>
            entry.date === today ? { ...entry, completedTasks: 0 } : entry
          );
        }
        return [...prev, { date: convertDate(currentDate), completedTasks: 0 }];
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('history', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  //Restablecemos las tareas completadas cuando llegue lunes
  useEffect(() => {
    // Función para obtener el lunes de la semana actual
    const getMondayOfCurrentWeek = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 (domingo) - 6 (sábado)
      const dayDiff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const monday = new Date(today.setDate(today.getDate() + dayDiff));
      monday.setHours(0, 0, 0, 0); // Establecer a la medianoche
      return monday;
    };

    // Función para restablecer todas las propiedades del objeto a false
    const resetObjectProperties = () => {
      setTasks(tasks.map((task) => {
        Object.keys(task.wasCompleted).forEach(day => task.wasCompleted[day] = false)
        return task
      }))
    };

    // Obtener la fecha del último lunes restablecido y la fecha actual
    const lastMonday = localStorage.getItem('lastMonday');
    const currentMonday = getMondayOfCurrentWeek();

    // Comparar si el último lunes guardado es diferente al lunes actual
    if (!lastMonday || new Date(lastMonday) < currentMonday) {
      resetObjectProperties();
      localStorage.setItem('lastMonday', currentMonday);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="habit-checker" element={<Header />}>
          <Route
            index
            element={<Home tasks={tasks} setTasks={setTasks} setCompletedTasks={setCompletedTasks} date={currentDate} />}
          />
          <Route path="chart" element={<Chart tasksDone={completedTasks} />} />
          <Route path="calendar" element={<Calendar tasks={completedTasks}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

root.render(<App />);