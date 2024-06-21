// src/components/Registration.js
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './Registration.css'; // Import the CSS file
import VodacomLogo from '../Assets/vdlogo.png';
import VodaLogo from '../Assets/vodalogo.png';
import axios from 'axios';



const Registration = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
   
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(JSON.stringify(values))
    try {
        const response = await axios.post('http://localhost:8090/innovation_portal/register', values, { 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log('Success:', response.data);
      alert('Registration successful');
      if (!response.ok) {
    
        throw new Error('Error submitting form');
        
      
      }

      resetForm();
      alert('Form submitted successfully!');
      navigate('/');
    } catch (error) {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
          alert(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error in request setup:', error.message);
        }
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
         <p className="prompt-text" style={{ color: 'black' }}>Already have an account?</p>

          <button className="login-button" onClick={() => navigate('/')}>Login</button>
          <img className='image-two' src={VodaLogo} alt="Vodacom logo" />

        </div>
        <Formik
          initialValues={{ name: '', surname: '', email: '', username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              {formFields.map(field => (
                <div key={field.id} className="field-container">
                  <label htmlFor={field.id} className="label">{field.label}</label>
                  <Field
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="input"
                  />
                  <ErrorMessage name={field.name} component="div" className="error" />
                </div>
              ))}
              <div className="button-container">
                <Button
                  className="button"
                  type="submit"
                 
                >
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const formFields = [
  { id: 'name', name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { id: 'surname', name: 'surname', label: 'Surname', type: 'text', placeholder: 'Your surname' },
  { id: 'email', name: 'email', label: 'Email Address', type: 'email', placeholder: 'Your email address' },
  { id: 'username', name: 'username', label: 'Username', type: 'text', placeholder: 'Your username' },
  { id: 'password', name: 'password', label: 'Password', type: 'password', placeholder: 'Password' },
 
];

export default Registration;
