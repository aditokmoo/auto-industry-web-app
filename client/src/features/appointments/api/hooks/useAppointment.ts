import { useMutation, useQuery } from "@tanstack/react-query";
import { createAppointment, getAppointments } from "../services/AppointmentServices";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../auth/context/auth.context";

interface AppointmentDataTypes {
    customer: string,
    serviceProvider: string,
    date: Date,
    time: string,
    note: string
}

export function useCreateAppointment() {
    const mutation = useMutation({
        mutationKey: ['createAppointment'],
        mutationFn: (data: AppointmentDataTypes) => createAppointment(data),
        onSuccess: (res) => {
            console.log(res)
            toast.success('Appointment has been created');
        },
        onError: (err: Error) => {
            console.log(`Create appointment error: ${err}`);
            toast.error(err.message);
        }
    });

    return mutation;
}

export function useGetAppointments() {
    const { state } = useAuthContext();
    const query = useQuery({
        queryKey: ["appointments"],
        queryFn: () => getAppointments(state.currentUser!),
    });

    return query;
}