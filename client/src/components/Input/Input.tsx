import { FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';
import { forwardRef } from 'react';

interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    variant?: 'default' | 'error' | 'success';
    size?: 'small' | 'medium' | 'large';
    label?: string;
    id?: string;
    register?: UseFormRegister<FieldValues>; // Optional if not using Controller
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = 'text',
            placeholder = '',
            value = '',
            onChange,
            disabled = false,
            variant = 'default',
            size = 'medium',
            label = '',
            id,
        },
        ref // ref is passed as the second argument
    ) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <input
                type={type}
                id={id}
                value={value}
                ref={ref}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`${styles.input} ${styles[`input--${variant}`]} ${styles[`input--${size}`]}`}
            />
        </div>
    );
});

export default Input;