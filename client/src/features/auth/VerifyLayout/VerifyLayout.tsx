// Images
import { useNavigate } from 'react-router';
import CheckImage from '../../../assets/check-img.webp';
// SCSS
import styles from './VerifyLayout.module.scss';

export default function VerifyLayout() {
    const navigate = useNavigate();
    return (
        <div className={styles.verifyLayout}>
            <img src={CheckImage} alt='Email Confirmation' className={styles.confirmationImage} />
            <h2 className={styles.heading}>Account Created!</h2>
            <p className={styles.message}>
                Your account has been successfully created. Please check your email inbox for the verification link to complete your registration.
            </p>
            <p className={styles.message}>
                If you don't see the email, please check your spam folder or <a href='#'>resend the verification email</a>.
            </p>
            <button className={styles.continueButton} onClick={() => navigate('/auth/login')}>
                Continue to Login
            </button>
        </div>
    )
}
