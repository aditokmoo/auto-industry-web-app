import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
// Components
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
// Icons
import GoogleIcon from '../../../assets/google-logo-icon.webp'
import AppleIcon from '../../../assets/apple-logo-icon.png'
// SCSS
import styles from './LoginLayout.module.scss'

export default function LoginLayout() {
    return (
        <div className={styles.loginLayout}>
            <h2 className={styles.loginTitle}>Welcome Back</h2>
            <div className={styles.loginOptions}>
                <Link to='/'><img src={GoogleIcon} alt="" /> Sign in with Google</Link>
                <Link to='/'><img src={AppleIcon} alt="" /> Sign in with Apple ID</Link>
            </div>

            <span>OR</span>

            <form className={styles.loginForm}>
                <Input placeholder='user@mail.com' label='Email*' size='large' />
                <Input placeholder='*******' label='Password*' size='large' />
                <Button size='medium'>Login</Button>
            </form>

            <p>Don't have account? <Link to='/auth/register'>Create account</Link></p>
        </div>
    )
}
