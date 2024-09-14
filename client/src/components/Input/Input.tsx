import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    variant?: 'default' | 'error' | 'success';
    size?: 'small' | 'medium' | 'large';
    label?: string; // Add label prop
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder = '',
    value = '',
    onChange,
    disabled = false,
    variant = 'default',
    size = 'medium',
    label = '',
}) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`${styles.input} ${styles[`input--${variant}`]} ${styles[`input--${size}`]}`}
            />
        </div>
    );
};

export default Input;