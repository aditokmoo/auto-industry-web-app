import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { Controller, useForm } from "react-hook-form";

// Icons
import GoogleIcon from '../../../assets/google-logo-icon.webp';
import AppleIcon from '../../../assets/apple-logo-icon.png';

// SCSS
import styles from './RegisterLayout.module.scss';
import useCreateAccount from "../api/hooks/useAuth";

export default function RegisterLayout() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    });
    // Mutations
    const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount();

    return (
        <div className={styles.registerLayout}>
            <h2 className={styles.registerTitle}>Create account</h2>
            <div className={styles.registerOptions}>
                <Link to='/'><img src={GoogleIcon} alt="Google Icon" /> Sign in with Google</Link>
                <Link to='/'><img src={AppleIcon} alt="Apple Icon" /> Sign in with Apple ID</Link>
            </div>

            <span>OR</span>

            <form className={styles.registerForm} onSubmit={handleSubmit((data) => createAccount(data))}>
                <div className={styles.inputField}>
                    <Controller
                        control={control}
                        name="username"
                        rules={{ required: 'Username is required' }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="John Doe"
                                label="Username*"
                                size="large"
                                variant={errors.username ? 'error' : 'default'}
                            />
                        )}
                    />
                    {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
                </div>

                <div className={styles.inputField}>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: 'Enter a valid email address'
                            }
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="user@mail.com"
                                label="Email*"
                                size="large"
                                variant={errors.email ? 'error' : 'default'}
                            />
                        )}
                    />
                    {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                </div>

                <div className={styles.inputField}>
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: 'Password is required' }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="*******"
                                type="password"
                                label="Password*"
                                size="large"
                                variant={errors.password ? 'error' : 'default'}
                            />
                        )}
                    />
                    {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
                </div>

                <Button size="medium" type="submit" loading={isCreatingAccount}>Register</Button>
            </form>

            <p className={styles.createAccountText}>Already have an account? <Link to='/auth/login'>Login</Link></p>
        </div>
    );
}