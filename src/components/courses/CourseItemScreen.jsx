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
    
    // const path = `/${poster}`;
    
    return (
        <>
            <div className="container">
                <div className="text-center text-light my-2">
                    <h1>{course.name}</h1>
                    <button
                        className="btn btn-outline-info mt-3 mb-2"
                        onClick={ handleReturn }
                    >
                        Ir a mis cursos 
                    </button>
                </div>
                
                <Player autoPlay startTime={tracking.current} ref={video} src="/media/courses/eventoonline.mp4" />
            </div>
        </>
    )
}
