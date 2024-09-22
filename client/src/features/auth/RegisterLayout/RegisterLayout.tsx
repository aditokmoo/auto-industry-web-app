import { useForm } from "react-hook-form";
import { useCreateAccount } from "../api/hooks/useAuth";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import RoleSelection from "../components/RoleSelection/RoleSelection";
import { useState } from "react";

// SCSS
import styles from './RegisterLayout.module.scss';
import PersonalDetails from "../components/PersonalDetails/PersonalDetails";

export default function RegisterLayout() {
    const [ activeTab, setActiveTab ] = useState(0);
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: '',
            group: []
        }
    });
    // Mutations
    const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount();

    return (
        <div className={styles.registerLayout}>
            <form className={styles.registerForm} onSubmit={handleSubmit((data) => createAccount(data))}>
                {activeTab === 0 && <RoleSelection control={control} setActiveTab={setActiveTab} errors={errors} watch={watch} />}
                {activeTab === 1 && <PersonalDetails control={control} errors={errors} setActiveTab={setActiveTab} />}
                {activeTab === 2 && <RegisterForm control={control} errors={errors} setActiveTab={setActiveTab} isLoading={isCreatingAccount} />}
            </form>
        </div>
    );
}