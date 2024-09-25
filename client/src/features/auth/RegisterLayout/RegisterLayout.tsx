import { useForm } from "react-hook-form";
import { useCreateAccount } from "../api/hooks/useAuth";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import RoleSelection from "../components/RoleSelection/RoleSelection";
import { useState } from "react";

// SCSS
import styles from './RegisterLayout.module.scss';
import PersonalDetails from "../components/PersonalDetails/PersonalDetails";

interface User {
    name: string,
    email: string,
    password: string,
    location: {
        label: string,
        value: string,
    },
    phoneNumber: string,
    role: string,
    group: string[]
    profileImage: File | null,
    workImages: File[],  
}

export default function RegisterLayout() {
    const [ activeTab, setActiveTab ] = useState(0);
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            location: {
                value: '',
                label: ''
            },
            phoneNumber: '',
            role: '',
            group: [],
            profileImage: null,
            workImages: [],
        }
    });
    // Mutations
    const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount();

    const onSubmit = (data: User) => {
        const modifiedData = {
            ...data,  
            location: data.location.value
        };
        
        createAccount(modifiedData)
    }

    return (
        <div className={styles.registerLayout}>
            <form className={styles.registerForm} onSubmit={handleSubmit((data) => onSubmit(data))}>
                {activeTab === 0 && <RoleSelection control={control} setActiveTab={setActiveTab} errors={errors} watch={watch} handleSubmit={handleSubmit} />}
                {activeTab === 1 && <PersonalDetails control={control} errors={errors} setActiveTab={setActiveTab} handleSubmit={handleSubmit} />}
                {activeTab === 2 && <RegisterForm control={control} errors={errors} setActiveTab={setActiveTab} isLoading={isCreatingAccount} />}
            </form>
        </div>
    );
}