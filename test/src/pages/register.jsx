// import { useState } from 'react';
import axios from 'axios';
import boardImage from '../assets/demoBg.jpg';
import '../style/style.css';
import { useNavigate } from 'react-router-dom';
import { createUrl } from '../utils/Utils';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const initialValues = {
        email: '',
        username: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const apiUrl = createUrl('signup/signup');
            const response = await axios.post(apiUrl, values);

            const { status } = response.data;

            if (status === "success") {
                toast.success(`Registered Successfully.`);
                navigate('/login');
            } else {
                setErrors({ errorMessage: 'Failed to register. Please try again.' });
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ errorMessage: 'Failed to register. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <div className="row g-0 justify-content-center align-items-center h-100">
                <div className="row g-0 align-items-center border bg-white h-100">
                    <div className="col-md-7 d-flex justify-content-center">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="p-5 w-75 d-flex flex-column">
                                    <h2 className="Login-title text-center p-5 mb-2 font-weight-bold">Register</h2>
                                    <div className="mb-3 form-floating">
                                        <Field type="email" name="email" className="form-control" id="email" placeholder="Email" />
                                        <label htmlFor="email">Email</label>
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>
                                    <div className="mb-3 form-floating">
                                        <Field type="text" name="username" className="form-control" id="username" placeholder="Username" />
                                        <label htmlFor="username">Username</label>
                                        <ErrorMessage name="username" component="div" className="error-message" />
                                    </div>
                                    <div className="mb-3 form-floating">
                                        <Field type="password" name="password" className="form-control" id="password" placeholder="Password" />
                                        <label htmlFor="password">Password</label>
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="register-btn py-3 rounded-3" disabled={isSubmitting}>Register</button>
                                    </div>
                                    <ErrorMessage name="errorMessage" component="div" className="error-message" />
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="col-md-5 img-container">
                        <img src={boardImage} alt="placeholder" className="img-fluid h-100" />
                        <div className="overlay-text">
                            <h2 className="text-center">Already have an account</h2>
                            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis distinctio ab quam doloribus asperiores. </p>
                            <div className="text-center">
                                <button type="button" className="Register-btn p-2  rounded-3 transparent-button border" onClick={() => navigate('/login')}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
