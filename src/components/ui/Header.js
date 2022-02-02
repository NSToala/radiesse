import React from 'react'

export const Header = () => {
    
    return (
        <nav className="app">
            <div className="nav-wrapper container-fluid nav-radiesse">
                <div className="row">
                <div className="col-2 col-md-3"></div>

                <div className="col-8 col-md-8 col-lg-6">
                    <img src="/assets/icons/radiesse.png" className="nav-merz" />
                </div>
                <div className="col-3">
                    <img src="/assets/icons/merz.png" className="logo-merz d-none d-sm-none d-md-none d-lg-block" />
                </div>
                </div>
            </div>
        </nav>
    )
}