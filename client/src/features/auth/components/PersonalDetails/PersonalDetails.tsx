import { Controller } from 'react-hook-form';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './PersonalDetails.module.scss';
import Select from 'react-select';

interface PropTypes {
    control: any,
    errors: any,
    setActiveTab: any,
    handleSubmit: any
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

export default function PersonalDetails({ control, errors, setActiveTab, handleSubmit }: PropTypes) {
    return (
        <div className={styles.form}>
            <h2 className={styles.registerTitle}>Personal Details</h2>

            <div className={styles.profileImage}>
                <label htmlFor="profileImage"></label>
                <Controller
                    control={control}
                    name="profileImage"
                    rules={{ required: 'Profile image is required' }}
                    render={({ field }) => (
                        <input
                            type="file"
                            id='profileImage'
                            onChange={(e) => {
                                const selectedFile = e.target.files ? e.target.files[0] : null;
                                field.onChange(selectedFile);
                            }}
                            className={styles.fileInput}
                        />
                    )}
                />
                {errors.profileImage && <p className={styles.errorMessage}>{errors.profileImage.message}</p>}
            </div>

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
                            type="number"
                            size="large"
                            variant={errors.phoneNumber ? 'error' : 'default'}
                        />
                    )}
                />
                {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber.message}</p>}
            </div>

            <div className={styles.inputField}>
                <label htmlFor="location">Location*</label>
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

            <div className={styles.inputField}>
                <Controller
                    control={control}
                    name="workImages"
                    render={({ field }) => (
                        <input
                            type="file"
                            multiple
                            onChange={(e) => {
                                const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
                                field.onChange(selectedFiles);
                            }}
                            className={styles.fileInput}
                        />
                    )}
                />
                {errors.workImages && <p className={styles.errorMessage}>{errors.workImages.message}</p>}
            </div>

            <div className={styles.btn}>
                <Button size="medium" onClick={handleSubmit(() => setActiveTab(2))}>Next</Button>
            </div>

            <p className={styles.goBackText}>
                Want to return back, and change your role? <span className={styles.backLink} onClick={() => setActiveTab(0)}>Back</span>
            </p>
        </div>
    );
}