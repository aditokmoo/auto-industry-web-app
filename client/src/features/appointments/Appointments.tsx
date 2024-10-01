import React from 'react'
import { useGetAppointments } from './api/hooks/useAppointment'

export default function Appointments() {
  const { data: appointments, isLoading: isLoadingAppointments } = useGetAppointments();

  if(isLoadingAppointments) return <h2>Loading...</h2>

  console.log(appointments)

  return (
    <div>Appointments</div>
  )
}
