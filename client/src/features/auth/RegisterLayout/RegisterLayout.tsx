import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

// Icons
import GoogleIcon from '../../../assets/google-logo-icon.webp'
import AppleIcon from '../../../assets/apple-logo-icon.png'

// SCSS
import styles from './RegisterLayout.module.scss'

export default function RegisterLayout() {
    return (
        <div className={styles.registerLayout}>
            <h2 className={styles.registerTitle}>Create account</h2>
            <div className={styles.registerOptions}>
                <Link to='/'><img src={GoogleIcon} alt="" /> Sign in with Google</Link>
                <Link to='/'><img src={AppleIcon} alt="" /> Sign in with Apple ID</Link>
            </div>

            <span>OR</span>

            <form className={styles.registerForm}>
                <Input placeholder='user@mail.com' label='Email*' size='large' />
                <Input placeholder='*******' label='Password*' size='large' />
                <Input placeholder='*******' label='Confirm password*' size='large' />
                <Button size='medium'>Register</Button>
            </form>

            <p>Already have an account? <Link to='/auth/login'>Login</Link></p>
        </div>
    )
}
