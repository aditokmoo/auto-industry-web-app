import axios from "../../../../api/http";

interface AppointmentDataTypes {
    customer: string,
    serviceProvider: string,
    date: Date,
    time: string,
    note: string
}

export async function createAppointment(appointmentData: AppointmentDataTypes) {
    try {
        const res = await axios.post('/api/appointment/create', appointmentData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        
        return res.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        return error;
    }
}

export async function getAppointments(token: string) {
    try {
        const res = await axios.get('/api/appointment/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        
        return res.data.appointments;
    } catch (error) {
        console.error('Error getting appointments:', error);
        return error;
    }
}