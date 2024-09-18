import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAccount, login } from "../services/authServices";
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

type LoginResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};

type LoginData = {
    email: string;
    password: string;
};

export function useCreateAccount() {
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

export function useLogin() {
    const navigate = useNavigate();
    
    const mutation: UseMutationResult<LoginResponse, Error, LoginData> = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginData) => login(data),
        onSuccess: (res) => {
            console.log(res);
            navigate('/appointments')
            toast.success('Login successful!');
        },
        onError: (err: Error) => {
            console.log(`Login error: ${err}`);
            toast.error(err.message);
        }
    });

    return mutation;
}