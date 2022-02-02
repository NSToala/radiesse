import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../common/API';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { Header } from '../ui/Header'
import { Loader } from '../ui/Loader'

export const SignupScreen = () => {
    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [code, setCode] = useState(undefined);
    const [message, setMessage] = useState("Lo sentimos, llene el formulario manualmente!");
    const [error, setError] = useState(false);
    const [isfound, setIsFound] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { dispatch } = useContext( AuthContext )

    const handleSignup = async(event) => {
        event.preventDefault()
        let payload = { username: user.fullname, email: user.email, password: 'radiesse2021' }

        try {
            const res = await API.post('/auth/signup', payload )        
            const action = { type: types.signup, payload: res.data }
            dispatch(action);
    
            const lastPath = localStorage.getItem('lastPath') || '/courses';
            navigate( lastPath, { replace: true });
        } catch (error) { console.log(error); setError(true) }
        // if(user.email === "") {
        //     setError(true)
        //     setMessage("Lo sentimos, el correo electronico es obligatorio!")
        // }
    }

    // const res = await fetch(`https://seminarioatencionprimaria.mx/controller/api.php?code=${cedula}`).

    const findCedula = async(e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if(code === undefined && code === '' && code === 0) {
                setError(true)
                return
            }
            const res = await API.get(`https://eventosvirtualesaz.mx/controller/api.php?code=${code}`)
            setIsLoading(false)
            const { users } = res.data
            
            if(users.length === 0) {
                setError(true)
                setIsFound(2)
                return
            }

            if(users.length >= 2) {
                setData(users)
                setIsFound(1)
                return
            }
            
            let response = {
                cedula: users[0].cedula,
                fullname: users[0].nombre,
                specialty: users[0].profesion
            }
            setUser(response)
            setIsFound(2)
        } catch (error) { console.log(error); }
    }

    const handleSelectedUser = (item) => {
        let response = {
            cedula: item.cedula,
            fullname: item.nombre,
            specialty: item.profesion
        }
        setUser(response)
        setIsFound(2)
    }

    useEffect(() => {
        setTimeout(() => {          
            setError(false)
        }, 8000);
    }, [error]);

    return (
        <>
            <Header />

            {
                isLoading && (
                    <Loader />
                )
            }

            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 mt-5"></div>
                    <div className="col-lg-8 col-md-8 my-5">            
                        <main className="form-signin mt-4">
                            <h1 className="mt-5 text-center txt-registro">REGISTRO</h1>
                            {/* {
                                JSON.stringify(user)
                            } */}

                            {
                                error && (
                                    <div className={`alert alert-danger text-center animate__animated ${ error ? 'animate__fadeIn' : 'animate__fadeOut' }`}  role="alert">
                                        { message }
                                    </div>
                                )
                            }


                            {
                                isfound === 0 && 
                                (
                                    <div className="step-1 mt-5">
                                        <div className="form-register">
                                            <form onSubmit={findCedula} autoComplete="off"> 
                                                <input type="number" name="cedula" 
                                                    className="mb-3 input-app" placeholder="Cédula" 
                                                    onChange={(e) => setCode(e.target.value) } required />

                                                <button className="w-100 btn-signin" type="submit">Buscar</button>
                                            </form>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                isfound === 1 && 
                                (
                                    data.map((item, index) => {
                                        return (
                                            <div className="card mt-3" key={index}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.nombre}</h5>
                                                    <p className="card-text">{item.profesion}</p>
                                                    
                                                    <div className="d-grid gap-2">
                                                        <button className="btn btn-primary btn-user" onClick={() => {handleSelectedUser(item)}} >Seleccionar usuario</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }

                            {
                                isfound === 2 &&
                                (
                                    <div className="step-2 mt-5">
                                        <div className="form-register">
                                            <form onSubmit={handleSignup} autoComplete="off">
                                                <input type="number" name="cedula" 
                                                    className="mb-3 input-app" placeholder="Cédula" value={user.cedula}
                                                    onChange={(e) => setUser({...user, cedula: e.target.value})} required/>

                                                <input type="text" name="fullname" className="mb-3 input-app" placeholder="Nombre completo" 
                                                    value={user.fullname} onChange={(e) => setUser({...user, fullname: e.target.value})} required/>

                                                <input type="text" name="specialty" className="mb-3 input-app" value={user.specialty}
                                                    placeholder="Especialidad" onChange={(e) => setUser({...user, specialty: e.target.value})} />

                                                <input type="email" name="email" className="mb-3 input-app"
                                                    placeholder="Correo electronico" onChange={(e) => setUser({...user, email: e.target.value})} required/>

                                                <div className="checkbox mb-3">
                                                    <label>                                    
                                                        {/* <a data-fancybox data-src="#hidden-content" href="javascript:;" className="termos">
                                                            <input type="checkbox" id="termos" > Términos y condiciones</input>
                                                        </a> */}
                                                    </label>
                                                </div>

                                                <button className="w-100 btn-signin" type="submit">Aceptar</button>

                                                <div className="row text-center my-3">
                                                    {/* <a href="https://www.merz.com/mx/aviso-de-privacidad/" target="_Blank" className="terminos">Política de privacidad</a> */}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="form-group bold sigup mt-5 acount">
                                ¿Tienes una cuenta? <a href="/" className="mini">Inicia sesión</a>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};
