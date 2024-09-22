import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginLayout from './features/auth/LoginLayout/LoginLayout';
import RegisterLayout from './features/auth/RegisterLayout/RegisterLayout';
import AppLayout from './layouts/AppLayout/AppLayout';
import PrivateRoute from './router/PrivateRoute/PrivateRoute';
import PublicRoute from './router/PublicRoute/PublicRoute';
import Appointments from './features/appointments/Appointments';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import VerifyLayout from './features/auth/VerifyLayout/VerifyLayout';
import { AuthContextProvider } from './features/auth/context/auth.context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './features/admin/Admin';
import NotFound from './features/NotFound/NotFound';
import PersistLogin from './components/PersistLogin';
import DayPlanner from './features/dayplanner/DayPlanner';
// SCSS
import './App.scss'
import ServiceProviders from './features/serviceProviders/ServiceProviders';
import Settings from './features/settings/Settings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Navigate to="/service-providers" />} />

              {/* Private routes with layout */}
              <Route path="/" element={
                  <PrivateRoute allowedRoles={['admin', 'customer', 'serviceProvider']}>
                      <AppLayout />
                  </PrivateRoute>
              }>
                  {/* Public routes */}
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="day-planner" element={<DayPlanner />} />
                  <Route path="service-providers" element={<ServiceProviders />} />
                  <Route path="settings" element={<Settings />} />

                  {/* Restricted to Admin */}
                  <Route path="admin" element={
                      <PrivateRoute allowedRoles={['admin']}>
                          <Admin />
                      </PrivateRoute>
                  } />

                  
                  {/* not found route */}
                  <Route path="*" element={<NotFound />} />
              </Route>

              {/* Public routes */}
              <Route path='/auth' element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              } >
                <Route index element={<Navigate to='login' />} />
                <Route path='login' element={<LoginLayout />} />
                <Route path='register' element={<RegisterLayout />} />
                <Route path='verify' element={<VerifyLayout />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer />
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App