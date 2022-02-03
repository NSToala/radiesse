import { Routes, Route } from 'react-router-dom';

import { Navbar } from '../components/ui/Navbar';

import { CourseScreen } from '../components/courses/CourseScreen';
import { CourseItemScreen } from '../components/courses/CourseItemScreen';


export const DashboardRoutes = () => {

    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    <Route path="courses" element={<CourseScreen />} />
                    <Route path="courses/learn/:courseId" element={<CourseItemScreen />} />
                </Routes>
            </div>
        </>
    )
}
