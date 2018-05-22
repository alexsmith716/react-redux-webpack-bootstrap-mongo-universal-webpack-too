import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import loginValidation from './loginValidation';

const styles = require('./scss/LoginForm.scss');

const Input = ({
  input, label, type, meta: { touched, error, submitError }, ...rest
}) => (

  <div className={`form-group ${(error || submitError) && touched ? 'has-error' : ''} ${styles.wrapInput}`}>

    {label == 'Email' && (

      <label htmlFor={input.name}>{label}</label>
    )}

    {label == 'Password' && (

      <div className="space-between">

        <label htmlFor={input.name}>
          {label}
        </label>

        <div>
          <a href="/password_reset">Forgot password?</a>
        </div>
      </div>
    )}

    <div className={input}>

      <input {...input} {...rest} type={type} className="form-control" />

      {(error || submitError) && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}

      {(error || submitError) &&
        touched && (
        <div className="text-danger">
          <strong>{error || submitError}</strong>
        </div>
      )}
    </div>
  </div>

);

Input.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.objectOf(PropTypes.any).isRequired
};

const LoginForm = ({ onSubmit }) => (

  <Form
  
    onSubmit={values => onSubmit(values).then(() => {}, err => err)}
    validate={loginValidation}

    render={({ handleSubmit, submitError }) => (

      <form className={styles.loginFormScss} onSubmit={handleSubmit}>

        <div className={`mb-3 ${styles.formTitle}`}>
          <span>
            Sign in to Election App
          </span>
        </div>

        <div className={styles.wrapInput}>
          <Field name="email" type="text" component={Input} label="Email" />
        </div>

        <div className={`mb-2 ${styles.wrapInput}`}>
          <Field name="password" type="password" component={Input} label="Password" />
        </div>

        {submitError && (
          <p className="text-danger">
            <strong>{submitError}</strong>
          </p>
        )}

        <div className={`mb-4 ${styles.containerBtn}`}>
          <button className="btn btn-md btn-success" type="submit">
            Sign in
          </button>
        </div>
      </form>
    )}
  />
);


LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
