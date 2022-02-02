import { Routes, Route } from 'react-router-dom';

import { Navbar } from '../components/ui/Navbar';

import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { CourseScreen } from '../components/courses/CourseScreen';
import { CourseItemScreen } from '../components/courses/CourseItemScreen';


export const DashboardRoutes = () => {

    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    {/* <Route path="marvel" element={<MarvelScreen />} />
                    <Route path="dc" element={<DcScreen />} /> */}
                    
                    <Route path="courses" element={<CourseScreen />} />
                    <Route path="courses/learn/:courseId" element={<CourseItemScreen />} />

                    {/* <Route path="search" element={<SearchScreen />} />
                    <Route path="hero/:heroeId" element={<HeroScreen />} /> */}

                    <Route path="/" element={<MarvelScreen />} />

                </Routes>
            </div>
        </>
    )
}
