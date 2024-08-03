import './header.css'
import { Outlet, Link } from 'react-router-dom'
export default function Header(){
    return(
        <>
            <header>
                <h1 className='app-title'>Habit Checker</h1>
                <nav>
                    <ul>
                        <li><Link to="/habit-checker">Inicio</Link></li>
                        <li><Link to="/graph">Gráfico</Link></li>
                        <li><Link to="/calendar">Calendario</Link></li>
                    </ul>
                </nav>
            </header>
            <Outlet></Outlet>
        </>


    )
}