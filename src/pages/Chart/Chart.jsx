import React, { useMemo } from 'react';
import Footer from '../../components/Footer/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './Chart.css';

export default function Chart({ habitsDone }) {
    // Calcula el total acumulado de tareas completadas
    const cumulativeHabitsDone = useMemo(() => {
        let cumulativeTotal = 0;
        return habitsDone.map(habit => {
            if (habit.completedHabits === 0){
                cumulativeTotal -= habit.numOfHabits / 2
            }
            else{
                cumulativeTotal += habit.completedHabits;
            }
            return { date: habit.date, cumulativeCompletedHabits: cumulativeTotal };
        });
    }, [habitsDone]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            if (payload[0].value < 0){
                return (
                    <div className="custom-tooltip">
                        <p className="label">{label}</p>
                        <p className="intro">{`Aunque te cueste, sólo tú puedes cambiarte ¡ánimo!`}</p>
                    </div>
                )
            }
            return (
                <div className="custom-tooltip">
                <p className="label">{label}</p>
                <p className="intro">{`Has mejorado un ${payload[0].value}% mejor, ¡sigue así!`}</p>
                </div>
            );
        }
      
        return null;
      };

    return (
        <>
            <main>
                <div className="chart-container">
                    <h2 className="chart-title">Gráfico de progresión</h2>
                    <ResponsiveContainer width="100%" height="70%" className='chart'>
                        <LineChart data={cumulativeHabitsDone} className='true-chart'>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip content={CustomTooltip}/>
                            <Line type="monotone" dataKey="cumulativeHabitsDone" stroke="#000000" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </main>
            <Footer />
        </>
    );
}
