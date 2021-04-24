import useForm from '../../services/useForm'
import styles from './RegistrationForm.module.css';
import validate from '../../services/validateInfo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

const RegistrationForm = (props) => {

    const { handleChange, values, handleSubmit, errors } = useForm((errors) => props.signUp(errors) ,validate);

    const [selectedDate, setSelectedDate] = useState(null);

    function selectedDateHandler(date) {
        setSelectedDate(date);
        handleChange(date);
    }

    return (
        <div id='registration_wrapper' className={styles.registration_wrapper} onClick={(e) => props.changeFormActive(e)}>
            <div className={styles.form_wrapper}>
                <form className={styles.form} onSubmit={(e) => handleSubmit(e, props.signUp)}>
                    <div id='close' className={styles.close}></div>
                    <h1>Start drinking today</h1>
                    <h2>Fill out the form and become an alcoholic...</h2>
                    <div className={styles.form_inputs}>
                        {errors.fullName && <p>{errors.fullName}</p>}
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            className={styles.form_input}
                            placeholder="Full Name"
                            value={values.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.form_inputs}>
                        {errors.age && <p>{errors.age}</p>}
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => selectedDateHandler(date)}
                            name='age'
                            value={selectedDate}
                            minDate={new Date() - 3.154e+12}
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableYearDropdown
                            placeholderText='Date Of Birth'
                            className={styles.form_input}
                        />
                    </div>

                    <div className={styles.form_inputs}>
                        {errors.email && <p>{errors.email}</p>}
                        <input
                            id="email"
                            type="text"
                            name="email"
                            className={styles.form_input}
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.form_inputs}>
                        {errors.password && <p>{errors.password}</p>}
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className={styles.form_input}
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className={styles.form_input_btn}
                        type="submit"
                        id='submit_btn'
                        >
                        Sign up
                        </button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;