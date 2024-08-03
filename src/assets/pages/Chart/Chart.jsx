import React, { useMemo } from 'react';
import Footer from '../../../../components/footer/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './chart.css';

export default function Chart({ tasksDone }) {
    // Calcula el total acumulado de tareas completadas
    const cumulativeTasksDone = useMemo(() => {
        let cumulativeTotal = 0;
        return tasksDone.map(task => {
            if (task.completedTasks === 0){
                cumulativeTotal -= task.numOfTasks / 2
            }
            else{
                cumulativeTotal += task.completedTasks;
            }
            return { date: task.date, cumulativeCompletedTasks: cumulativeTotal };
        });
    }, [tasksDone]);

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
                        <LineChart data={cumulativeTasksDone}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                            <XAxis dataKey="date" tick={{ fill: '#8884d8' }} />
                            <YAxis tick={{ fill: '#8884d8' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#8884d8', color: '#fff' }} itemStyle={{ color: '#fff' }} content={CustomTooltip}/>
                            <Line type="monotone" dataKey="cumulativeCompletedTasks" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </main>
            <Footer />
        </>
    );
}
