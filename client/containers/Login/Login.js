import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import LoginForm from '../../components/LoginForm/LoginForm';
// import * as authActions from '../../redux/modules/auth';
// import * as notifActions from '../../redux/modules/notifs';
// import GithubLogin from 'components/GithubLogin/GithubLogin';

// const { user, logout } = this.props;

// @connect(state => ({ user: state.auth.user }), { ...notifActions, ...authActions })
@connect(state => ({ user: state.auth.user }))

// @withRouter

export default class Login extends Component {

  static propTypes = {
    user: PropTypes.shape({ email: PropTypes.string }),
    // login: PropTypes.func.isRequired,
    // logout: PropTypes.func.isRequired,
    // notifSend: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    router: PropTypes.object
  };

  // onFacebookLogin = async (err, data) => {
  //   if (err) return;

  //   try {
  //     await this.props.login(data);
  //     this.successLogin();
  //   } catch (error) {
  //     if (error.message === 'Incomplete oauth registration') {
  //       this.context.router.push({
  //         pathname: '/register',
  //         state: { oauth: error.data }
  //       });
  //     } else {
  //       throw error;
  //     }
  //   }
  // };

  // login = async data => {
  //   const result = await this.props.login(data);
  //   this.successLogin();
  //   return result;
  // };

  // successLogin = () => {
  //   this.props.notifSend({
  //     message: "You'r logged !",
  //     kind: 'success',
  //     dismissAfter: 2000
  //   });
  // };

  FacebookLoginButton = ({ facebookLogin }) => (
    <button className="btn btn-primary" onClick={facebookLogin}>
      Login with <i className="fa fa-facebook-f" />
    </button>
  );

  render() {

    const { user } = this.props;
    const styles = require('./scss/Login.scss');

    return (

      <div className="container">

        <Helmet title="Login" />

        <div className={styles.login}>

          {!user && (

            <div>

              <LoginForm onSubmit={this.login} />

            </div>

          )}

          {user && (

            <div>

              <p>You are currently logged in as {user.email}.</p>

              <div>

                <button className="btn btn-danger" onClick={logout}>

                  <i className="fa fa-sign-out" /> Log Out

                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    );
  }
};
