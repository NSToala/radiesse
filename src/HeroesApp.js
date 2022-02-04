import { useEffect, useReducer } from 'react';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';
import { AppRouter } from './routers/AppRouter';

const init = () => {
    const response = localStorage.getItem('token') !== null ? {token: localStorage.getItem('token'), user: JSON.parse(localStorage.getItem('user'))} : { token: '', user: [] }
    return response
}

export const HeroesApp = () => {
    const [ user, dispatch ] = useReducer( authReducer, {}, init );

    useEffect(() => {
        if ( !user ) return;
        localStorage.setItem('token', user.token );
        localStorage.setItem('user', JSON.stringify(user.user) );
    }, [ user ])


    return (
        <AuthContext.Provider value={{
            user,
            dispatch
        }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}
