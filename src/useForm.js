import { useState } from 'react'
import validateInfo from './validateInfo';
import axios from 'axios';

const useForm = () => {
    const [values, setValues] = useState({
        cardName: '',
        cardNumber: '',
        cardType: '',
        cardExpiration: '',
        cardSecurityCode: '',
        cardPostalCode: '',
        focus: ''
    })

    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false)
    const handleFocus = (e) => {
        setValues({
            ...values,
            focus: (e.target.name === 'cardSecurityCode') ? 'cvc' : e.target.name
        });
    }

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { ccvv, cexp, cname, cnumber, cpostal, ctype, } = validateInfo(values)
        if (ccvv == true && cexp == true && cname === true && cnumber === true && cpostal === true && ctype === true) {
            try {
                setLoading(true)
                const { cardNumber } = values
                setTimeout(async () => {
                    const response = await axios.post('http://localhost:5000/validate', { cardNumber });
                    if (response?.data?.isValid) {
                        setErrors({
                            message: "Credit Card is valid",
                            show: true,
                            variant: "success",
                            ccvv: true,
                            cexp: true,
                            cname: true,
                            cnumber: true,
                            cpostal: true,
                            ctype: true,
                        });
                    } else {
                        setErrors({
                            message: "Credit Card is invalid",
                            show: true,
                            variant: "danger",
                            ccvv: true,
                            cexp: true,
                            cname: true,
                            cnumber: true,
                            cpostal: true,
                            ctype: true,
                        });
                    }
                }, 2000);
            } catch (error) {
                console.error("Error validating card:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(validateInfo(values))
        }
    };

    return { handleChange, handleFocus, handleSubmit, values, errors, loading };
};

export default useForm; 