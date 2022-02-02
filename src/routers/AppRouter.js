import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginScreen } from '../components/auth/LoginScreen';
import { SignupScreen } from '../components/auth/SignupScreen';
import { DashboardRoutes } from './DashboardRoutes';



export const AppRouter = () => {
    return (
        <BrowserRouter>
            
            <Routes>
                
                {/* <Route path="/login" element={<LoginScreen />} /> */}
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                } 
                />

                <Route path="/signup" element={
                    <PublicRoute>
                        <SignupScreen />
                    </PublicRoute>
                } 
                />
                
                <Route path="/*" element={ 
                        <PrivateRoute>
                            <DashboardRoutes />
                        </PrivateRoute>
                    } 
                />

                {/* <Route path="/*" element={ <DashboardRoutes />  } /> */}

            </Routes>
        </BrowserRouter>
    )
}
