import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import loginValidation from './loginValidation';

// react-final-form:
//  * works on subscriptions to perform updates based on the Observer pattern
//  * both form and field subscribers must specify exactly which parts of the form state they want to receive updates about

// <Form
// 
//   onSubmit={values => onSubmit(values).then(() => {}, err => err)}
//   validate={loginValidation}

//   render={({ handleSubmit, submitError }) => (

//     <form className={styles.loginFormScss} onSubmit={handleSubmit}>

//       <span className={`p-b-33 ${styles.formTitle}`}>
//         Account Login 19
//       </span>

//       <div className={styles.wrap}>
//         <Field className={styles.wrapInput} name="email" type="text" component={Input} label="Email" />
//       </div>

//       <div className={styles.wrap}>
//         <Field className={styles.wrapInput} name="password" type="password" component={Input} label="Password" />
//       </div>

//       {submitError && (
//         <p className="text-danger">
//           <strong>{submitError}</strong>
//         </p>
//       )}

//       <button className="btn btn-success" type="submit">
//         <i className="fa fa-sign-in" /> Log In
//       </button>

//     </form>

//   )}

// />

const Input = ({
  input, label, type, meta: { touched, error, submitError }, ...rest
}) => (
  <div className={`form-group ${(error || submitError) && touched ? 'has-error' : ''}`}>

    <label htmlFor={input.name} className="col-sm-2">{label}</label>

    <div className="col-sm-10">

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

const styles = require('./scss/LoginForm.scss');

const LoginForm = ({ onSubmit }) => (

  <Form
  
    onSubmit={values => onSubmit(values).then(() => {}, err => err)}
    validate={loginValidation}

    render={({ handleSubmit, submitError }) => (

      <form className={styles.loginFormScss} onSubmit={handleSubmit}>

        <div className={`mb-4 ${styles.formTitle}`}>
          <span>
            Please sign in
          </span>
        </div>

        <div className={`mb-3 ${styles.wrapInput}`}>
          <Field name="email" type="text" component={Input} label="Email" />
        </div>

        <div className={`mb-4 ${styles.wrapInput}`}>
          <Field name="password" type="password" component={Input} label="Password" />
        </div>

        {submitError && (
          <p className="text-danger">
            <strong>{submitError}</strong>
          </p>
        )}

        <div className={`mb-4 ${styles.containerBtn}`}>
          <button className="btn btn-lg btn-primary btn-block bootstrapDefaultFont" type="submit">
            Sign in
          </button>
        </div>

        <div className={`mb-4 ${styles.orLoginWith}`}>
          Or login with
        </div>

      </form>

    )}
  />
);


LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
