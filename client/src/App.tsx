// SCSS
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginLayout from './features/auth/LoginLayout/LoginLayout';
import RegisterLayout from './features/auth/RegisterLayout/RegisterLayout';
import AppLayout from './layouts/AppLayout/AppLayout';
import PrivateRoute from './router/PrivateRoute/PrivateRoute';
import PublicRoute from './router/PublicRoute/PublicRoute';
import Scheduler from './features/scheduler/Scheduler';
import Appointments from './features/appointments/Appointments';
import AuthLayout from './layouts/AuthLayout/AuthLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/appointments" />} />

          {/* Private routes */}
          <Route path='/' element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }>
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/scheduler' element={<Scheduler />} />
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
          </Route>

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
