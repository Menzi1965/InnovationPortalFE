// src/components/Login.js
import React from "react";
import Button from '@mui/material/Button';
import './Login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import VodacomLogo from '../Assets/vdlogo.png';
import VodaLogo from '../Assets/vodalogo.png';

const Login = () => {
  const navigate = useNavigate();
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error submitting form');
      }

      resetForm();
      alert('Logged in successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Unsuccessful login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
        <div >
        <img className='image' src={VodacomLogo} alt="Vodacom" />
        </div>
      <div className="form-container">
        <div className="login-prompt">
          <p className="prompt-text" style={{ color: 'black' }}>Do you have an account?</p>
          <button className="register-link" onClick={() => navigate('/Register')}>Register</button>
          <img className='image-two' src={VodaLogo} alt="Vodacom logo" />
        </div>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <div className="field-container">
                <label htmlFor="username" className="label">Username</label>
                <Field type="text" id="username" name="username" placeholder="Username" className="input" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="field-container">
                <label htmlFor="password" className="label">Password</label>
                <Field type="password" id="password" name="password" placeholder="Password" className="input" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="button-container">
                <Button className="button" type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
