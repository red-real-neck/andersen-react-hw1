import { useEffect, useState } from 'react';

const useForm = (cb, validate) => {
    const [values, setValues] = useState({
        fullName: '',
        age: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [firstRender, setFirstRender] = useState(true);



    const handleChange = e => {
        if (e === null) {
            return;
        }
        if (e instanceof Date) {
            setValues({
                ...values,
                age: e
            });
            setFirstRender(false);
            return;
        }
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
        setFirstRender(false);
    }

    useEffect(() => {
        if (firstRender) {
            return;
        }
        cb(errors);
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(values));
        setFirstRender(false);
    }

    return { handleChange, values, handleSubmit, errors };
}

export default useForm;