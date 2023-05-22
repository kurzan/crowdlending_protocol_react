import {FC} from 'react';
import styles from './Input.module.css';


type TInputProps = {
    type?: string;
    name?: string;
    value?: any;
    onChange?: any;
    label?: string;
    placeholder?: string;
    max?: number;
    min?: number;
    required?: boolean;
    setValue?: any;
    fastBtn?: boolean
}


const Input:FC<TInputProps> = ({type = 'text', fastBtn = false, name, value, setValue, onChange, label, placeholder, max, min, required = true}) => {

    return (
        <div className={styles.inputBox}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.inputBox}>
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
                {fastBtn && <button onClick={() => setValue(min)} className={styles.max} type='button'>MIN</button>}
            </div>

        </div>

    )
};

export default Input;