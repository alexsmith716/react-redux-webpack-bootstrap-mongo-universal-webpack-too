import React, { Component } from 'react';
// import { reduxForm, Field, propTypes } from 'redux-form';
// import Input from '../../formElements/Input/Input';
// import loginValidation from './loginValidation';

// @reduxForm({
//   form: 'login',
//   validate: loginValidation
// })

// 

export default class LoginForm extends Component {

  // static propTypes = {
  //   ...propTypes
  // };

  render() {

    const { handleSubmit, error } = this.props;
    const styles = require('./scss/LoginForm.scss');

    return (

      <form className={styles.loginFormScss} id="loginForm">

        <h1 className="h3 mb-3 font-weight-normal bootstrapDefaultFont">Please sign in</h1>


        <label htmlFor="inputEmail" className="sr-only">Email address</label>

        <input id="inputEmail" className="form-control bootstrapDefaultFont" placeholder="Email address" required="" autoFocus="" type="email" />


        <label htmlFor="inputPassword" className="sr-only">Password</label>

        <input id="inputPassword" className="form-control bootstrapDefaultFont" placeholder="Password" required="" type="password" />


        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label bootstrapDefaultFont" htmlFor="exampleCheck1">Remember me</label>
        </div>

        <button className="btn btn-lg btn-primary btn-block bootstrapDefaultFont" type="submit">Sign in</button>

        <p className="mt-5 mb-3 text-muted norwesterFont">© 2018-2019</p>

      </form>
    );
  }
}
