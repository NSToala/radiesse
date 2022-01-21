import { useEffect, useState } from 'react';
import { API } from '../../common/API';
import { CourseCard } from './CourseCard';

export const CourseScreen = () => {
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        API.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
        API.get('/courses')
        .then(res => setCourses(res.data))
        .catch(error => console.log(error))
    }, []);
    
    return (
        <div className="row rows-cols-1 row-cols-md-3 g-3 mt-5 animate__animated animate__fadeIn">
            {
                courses.map( course => (
                    <CourseCard
                        key={ course._id }
                        { ...course }
                    />
                ))
            }
        </div>
    )
}
