import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginLayout from './features/auth/LoginLayout/LoginLayout';
import RegisterLayout from './features/auth/RegisterLayout/RegisterLayout';
import AppLayout from './layouts/AppLayout/AppLayout';
import PrivateRoute from './router/PrivateRoute/PrivateRoute';
import PublicRoute from './router/PublicRoute/PublicRoute';
import Scheduler from './features/scheduler/Scheduler';
import Appointments from './features/appointments/Appointments';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import VerifyLayout from './features/auth/VerifyLayout/VerifyLayout';
import { AuthContextProvider } from './features/auth/context/auth.context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// SCSS
import './App.scss'
import Workers from './features/workers/Workers';
import Admin from './features/admin/Admin';
import NotFound from './features/NotFound/NotFound';
import PersistLogin from './components/PersistLogin';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Navigate to="/appointments" />} />

              {/* Private routes with layout */}
              <Route path="/" element={
                  <PrivateRoute allowedRoles={['admin', 'worker', 'user']}>
                      <AppLayout />
                  </PrivateRoute>
              }>
                  {/* Public routes */}
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="scheduler" element={<Scheduler />} />

                  {/* Restricted to Admin */}
                  <Route path="admin" element={
                      <PrivateRoute allowedRoles={['admin']}>
                          <Admin />
                      </PrivateRoute>
                  } />

                  {/* Allowed to Worker */}
                  <Route path="workers" element={
                      <PrivateRoute allowedRoles={['worker', 'admin']}>
                          <Workers />
                      </PrivateRoute>
                  } />
                  
                  {/* Catch-all route for undefined paths */}
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