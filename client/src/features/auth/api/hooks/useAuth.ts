import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAccount } from "../services/authServices";
import { useNavigate } from "react-router";

// Define the types for your data and response
interface CreateAccountData {
    username: string;
    email: string;
    password: string;
}

interface CreateAccountResponse {
    // Define the structure of the response if needed
}

export default function useCreateAccount() {
    const navigate = useNavigate();
    const mutation: UseMutationResult<CreateAccountResponse, Error, CreateAccountData> = useMutation({
        mutationKey: ['register'],
        mutationFn: (data: CreateAccountData) => createAccount(data),
        onSuccess: (res) => {
            console.log(res)
            navigate('/auth/verify')
            toast.success('Account has been created');
        },
        onError: (err: Error) => {
            console.log(`Create account error: ${err}`);
            toast.error(err.message);
        }
    });

    return mutation;
}
