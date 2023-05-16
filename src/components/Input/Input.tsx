import {FC} from 'react';
import styles from './Input.module.css';


type TInputProps = {
    type?: string;
    name?: string;
    value?: any;
    onChange?: any;
    label?: string;
    placeholder?: string;
    max?: string;
    min?: string;
    required?: boolean;
}


const Input:FC<TInputProps> = ({type = 'text', name, value, onChange, label, placeholder, max, min, required = true}) => {

    return (
        <div className={styles.inputBox}>
            <label htmlFor={name}>{label}</label>
            <input
                className={styles.input}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                max={max}
                required={required}
            />
        </div>

    )
};

export default Input;