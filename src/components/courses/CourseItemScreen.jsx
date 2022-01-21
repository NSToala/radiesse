import { useEffect, useState, useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { Player } from 'video-react';
import { API } from '../../common/API';

export const CourseItemScreen = () => {
    API.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
    const [course, setCourse] = useState({});
    const [tracking, setTracking] = useState({});
    const [player, setPlayer] = useState({});
    const { courseId } = useParams();
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {        
        API.get(`/courses/${courseId}`)
        .then(res => {
            setCourse(res.data)
        })
        .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        let payload = {
            uid: user._id,
            course: courseId,
            name: course.name
        }
    
        API.post('/analytics', payload)
        .then(res => {
            setTracking(res.data)
        })
        .catch(error => console.log(error))
    }, []);

    const video = useRef({});
    
    useEffect(() => {
        const { player } = video.current.manager.store.getState();
        setPlayer(player)
    }, []);
    

    const handleReturn = () => {
        const { player } = video.current.manager.store.getState();

        let payload = {
            uid: user._id,
            course: courseId,
            name: course.name,
            current: player.currentTime
        }

        API.post('/analytics/tracking', payload)
        .then(res => {
            console.log(res.data)
        })
        .catch(error => console.log(error))

        navigate( -1 );
    }


    if (!course) {
        return <Navigate to='/' />
    }
    
    // const {
    //     id,
    //     superhero,
    //     publisher,
    //     alter_ego,
    //     first_appearance,
    //     characters
    // } = hero;
    // const video = useRef([]);
    
    return (
        <div style={{width: '700px'}}>
            <h1>{courseId}</h1>
            {course.path}
            {player.currentTime}
            <Player autoPlay startTime={tracking.current} ref={video} src={course.path} />

            <button
                className="btn btn-outline-info"
                onClick={ handleReturn }
            >
                Regresar 
            </button>
        </div>
    )

    // return (
    //     <div className="row mt-5">
    //         <div className="col-4">
    //             <img 
    //                 src={ imagePath } 
    //                 alt={ superhero }
    //                 className="img-thumbnail animate__animated animate__fadeInLeft"
    //             />
    //         </div>

    //         <div className="col-8 animate__animated animate__fadeIn">
    //             <h3>{ hero.superhero }</h3>
    //             <ul className="list-group list-group-flush">
    //                 <li className="list-group-item"> <b>Alter ego:</b> { alter_ego } </li>
    //                 <li className="list-group-item"> <b>Publisher:</b> { publisher } </li>
    //                 <li className="list-group-item"> <b>First Appearance:</b> { first_appearance } </li>
    //             </ul>

    //             <h5 className="mt-3">Characters</h5>
    //             <p>{ characters }</p>

    //             <button
    //                 className="btn btn-outline-info"
    //                 onClick={ handleReturn }
    //             >
    //                 Regresar 
    //             </button>

    //         </div>

    //     </div>
    // )
}
