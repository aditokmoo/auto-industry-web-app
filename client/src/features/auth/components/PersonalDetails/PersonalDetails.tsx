import { Controller } from 'react-hook-form';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './PersonalDetails.module.scss';
import Select from 'react-select';

interface PropTypes {
    control: any,
    errors: any,
    setActiveTab: any
}

const options = [
    { value: '', label: 'Select your location' },
    { value: 'Kakanj', label: 'Kakanj' },
    { value: 'Sarajevo', label: 'Sarajevo' },
    { value: 'Zenica', label: 'Zenica' },
    { value: 'Vitez', label: 'Vitez' },
];

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        fontSize: '13px',
        padding: '.6rem 0'
    })
}

export default function PersonalDetails({ control, errors, setActiveTab }: PropTypes) {
    return (
        <div className={styles.form}>
            <h2 className={styles.registerTitle}>Personal Details</h2>

            <div className={styles.inputField}>
                <Controller
                    control={control}
                    name="phoneNumber"
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="+387"
                            label="Phone number*"
                            size="large"
                            variant={errors.name ? 'error' : 'default'}
                        />
                    )}
                />
                {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber.message}</p>}
            </div>

            <div className={styles.inputField}>
                <label htmlFor='location'>Location*</label>
                <Controller
                    control={control}
                    name="location"
                    rules={{ required: 'Location is required' }}
                    render={({ field }) => (
                        <Select 
                            {...field}
                            options={options}
                            styles={customStyles}
                        />
                    )}
                />
                {errors.location && <p className={styles.errorMessage}>{errors.location.message}</p>}
            </div>

            <div className={styles.btn}>
                <Button size="medium" onClick={() => setActiveTab(2)}>Next</Button>
            </div>

            <p className={styles.goBackText}>Want to return back, and change your role? <span className={styles.backLink} onClick={() => setActiveTab(0)}>Back</span></p>
        </div>
    )
}