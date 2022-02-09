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
        <nav className="app">
            <div className="nav-wrapper container-fluid nav-radiesse">
                <div className="row">
                    <div className="col-2 col-md-3 d-none d-sm-none d-md-none d-lg-block">
                        <img src="/assets/icons/merz.png" className="logo-merz d-none d-sm-none d-md-none d-lg-block" />
                    </div>
                    <div className="col-6 col-md-8 col-lg-6">
                        <img src="/assets/icons/radiesse.png" className="nav-merz" />
                    </div>
                    <div className="col-6 col-md-3">
                        <button 
                            className="nav-item nav-link btn pr-5" 
                            style={{'marginTop': '25px', 'color': 'white'}}
                            onClick={ handleLogout }
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        // <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
        //     <Link 
        //         className="navbar-brand p-3"
        //         to="/courses"
        //     >
        //         <img src="/assets/icons/radiesse.png" />
        //     </Link>

        //     <div className="navbar-collapse">
        //         <div className="navbar-nav">

        //             <NavLink 
        //                 className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
        //                 to="/courses"
        //             >
        //                 Courses
        //             </NavLink>
        //         </div>
        //     </div>

        //     <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        //         <ul className="navbar-nav ml-auto">
                    
        //             <span className="nav-item nav-link text-info">
        //                 BIENVENIDO, { user?.user?.username }
        //             </span>
                    
        //             <button 
        //                 className="nav-item nav-link btn pr-5" 
        //                 style={{'marginRight': '50px'}}
        //                 onClick={ handleLogout }
        //             >
        //                 Cerrar Sesión
        //             </button>
        //         </ul>
        //     </div>
        // </nav>
    )
}