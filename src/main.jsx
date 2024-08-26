import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chart from './pages/Chart/Chart';
import Calendar from './pages/Calendar/Calendar';
import Header from './components/Header/Header';
import { convertDate } from './components/constantes/daysOfTheWeek';
import './index.css';

const root = createRoot(document.getElementById('root'));

function App() {
  const [habits, setHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    const historyOfCompletedHabits = JSON.parse(localStorage.getItem('history')) || [{ date: convertDate(currentDate), completedHabits: 0, numOfHabits: 0 }];
    setHabits(storedHabits);
    setCompletedHabits(historyOfCompletedHabits);
  }, []);
  localStorage.removeItem('history')
  localStorage.removeItem('habits')
  useEffect(() => {
    const today = new Date().toDateString();

    if (currentDate !== today) {
      setCurrentDate(today);
      setCompletedHabits(prev => {
        const exists = prev.some(entry => entry.date === today);
        if (exists) {
          return prev.map(entry =>
            entry.date === today ? { ...entry, completedHabits: 0 } : entry
          );
        }
        return [...prev, { date: convertDate(currentDate), completedHabits: 0 }];
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('history', JSON.stringify(completedHabits));
  }, [habits, completedHabits]);

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
      setHabits(habits.map((habit) => {
        Object.keys(habit.completed).forEach(day => habit.completed[day] = false)
        return habit
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
            element={<Home habits={habits} setHabits={setHabits} setCompletedHabits={setCompletedHabits} date={currentDate} />}
          />
          <Route path="chart" element={<Chart habitsDone={completedHabits} />} />
          <Route path="calendar" element={<Calendar habitsDone={completedHabits}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

root.render(<App />);