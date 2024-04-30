// import { useState } from 'react';
import axios from 'axios';
import boardImage from '../assets/demoBg.jpg';
import '../style/style.css';
import { useNavigate } from 'react-router-dom';
import { createUrl } from '../utils/Utils';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const apiUrl = createUrl('login/login');
            const response = await axios.post(apiUrl, values);

            const { status, data } = response.data;

            if (status === "success") {
                const { userId, username } = data;

                console.log("User logged in successfully:", data); // Log user data received from the server

                // Store user information in sessionStorage
                sessionStorage.setItem('userId', userId);
                sessionStorage.setItem('username', username);

                // Redirect to home page after successful login
                toast.success(`Welcome ${username} to Todo App`);
                navigate('/home');
            } else {
                setErrors({ errorMessage: 'Failed to login. Please try again.' });
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ errorMessage: 'Failed to login. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="row g-0 justify-content-center align-items-center h-100">
                <div className="row g-0 align-items-center border bg-white h-100">
                    <div className="col-md-5 img-container">
                        <img src={boardImage} alt="Board" className="img-fluid h-100" />
                        <div className="overlay-text">
                            <h2 className="text-center">Track Your Work</h2>
                            <p className="text-center">TODO is the best way to track your record. Try for free now.</p>
                            <div className="text-center">
                                <button type="button" className="Register-btn p-2 rounded-3 transparent-button border" onClick={() => navigate('/signup')}>Register</button>
                            </div>
                        </div>
                        <h1 className="logo-text">LOGO</h1>
                        <div className="contact-support-text">Contact Support</div>
                    </div>
                    <div className="col-md-7 d-flex justify-content-center">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="p-5 w-75  d-flex flex-column">
                                    <h2 className="Login-title text-center p-5 mb-2 font-weight-bold">Login</h2>
                                    <div className="mb-3 form-floating">
                                        <Field type="email" name="email" className="form-control" id="email" placeholder="Email" />
                                        <label htmlFor="email">Email</label>
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>
                                    <div className="mb-3 form-floating">
                                        <Field type="password" name="password" className="form-control" id="password" placeholder="Password" />
                                        <label htmlFor="password">Password</label>
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="login-btn py-3 rounded-3" disabled={isSubmitting}>Login</button>
                                    </div>
                                    <div className="text-center mt-4">
                                        <span style={{ color: 'blue' }}>Forgot password ?</span>
                                    </div>
                                    <ErrorMessage name="errorMessage" component="div" className="error-message" />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
