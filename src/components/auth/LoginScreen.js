import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../common/API';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { Header } from '../ui/Header'

export const LoginScreen = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('edgar@trange.com');
    const [password, setPassword] = useState('radiesse2021');
    
    const navigate = useNavigate();
    const { dispatch } = useContext( AuthContext )

    const handleLogin = async(event) => {
        event.preventDefault();
        let payload = { email, password }

        try {
            const res = await API.post('/auth/signin', payload )        
            const action = { type: types.login, payload: res.data }
            dispatch(action);
    
            const lastPath = localStorage.getItem('lastPath') || '/courses';
            navigate( lastPath, { replace: true });
        } catch (error) { console.log(error); setError(true) }
    }

    useEffect(() => {
      setTimeout(() => {          
          setError(false)
      }, 7000);
    }, [error]);
    
    return (
        <>
            <Header />

            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-4 mt-5"></div>
                    <div className="col-lg-5 col-md-8 my-5">
                        <main className="form-signin mt-5">
                            {
                                error && (
                                    <div className={`alert alert-danger text-center animate__animated ${ error ? 'animate__fadeIn' : 'animate__fadeOut' }`}  role="alert">
                                        Lo sentimos, {email} no existe en la base de datos!
                                    </div>
                                )
                            }

                            <form onSubmit={handleLogin} id="signin-form1">
                                <input type="email" id="username" name="username" className="mb-3 input-app"
                                    placeholder="correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    
                                <input id="password" type="hidden" className="validate" name="password" value={password} />

                                <button className="w-100 btn-signin" type="submit">Iniciar sesión</button>
                            </form>
                            <div className="form-group bold sigup mt-3 acount">
                                ¿No tienes una cuenta? <a href="/signup" className="mini">regístrate</a>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
