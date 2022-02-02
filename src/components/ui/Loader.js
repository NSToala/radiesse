import React from 'react'

export const Loader = () => {    
    return (
        <div className="overlay">
            <div className="content-loader text-center">
                <div className="loader3">
                    <span></span>
                    <span></span>
                </div>
                <p className="text-loader">Por favor espere un momento...</p>
            </div>
        </div>
    )
}