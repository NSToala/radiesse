import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../common/API';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const LoginScreen = () => {

    const navigate = useNavigate();
    const { dispatch } = useContext( AuthContext )

    const handleLogin = async() => {
        let payload = {
            email: "marcos@tanger-inc.com",
            password: "123123"
        }

        const res = await API.post('/auth/signin', payload )
        
        const action = {
            type: types.login,
            payload: res.data
        }

        dispatch(action);
        const lastPath = localStorage.getItem('lastPath') || '/marvel';


        navigate( lastPath, {
            replace: true
        });
    }


    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button 
                className="btn btn-primary"
                onClick={ handleLogin }
                >
                    Login
            </button>
        </div>
    )
}
