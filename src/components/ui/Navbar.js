import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';


export const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext)
    const navigate = useNavigate();
    
    const handleLogout = () => {        
        dispatch({ type: types.logout });

        navigate('/login', {
            replace: true
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand p-3"
                to="/courses"
            >
                Raddiese
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                        to="/courses"
                    >
                        Courses
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-info">
                        BIENVENIDO, { user.user.username }
                    </span>
                    
                    <button 
                        className="nav-item nav-link btn pr-5" 
                        style={{'marginRight': '50px'}}
                        onClick={ handleLogout }
                    >
                        Cerrar Sesión
                    </button>
                </ul>
            </div>
        </nav>
    )
}