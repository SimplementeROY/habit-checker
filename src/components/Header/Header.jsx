import './Header.css'
import { Outlet, Link } from 'react-router-dom'
export default function Header(){
    return(
        <>
            <header>
                <h1 className='app-title'>Habit Checker</h1>
                <nav>
                    <ul>
                        <li><Link to="/habit-checker">Inicio</Link></li>
                        <li><Link to="/habit-checker/chart">Gráfico</Link></li>
                        <li><Link to="/habit-checker/calendar">Calendario</Link></li>
                    </ul>
                </nav>
            </header>
            <Outlet></Outlet>
        </>


    )
}