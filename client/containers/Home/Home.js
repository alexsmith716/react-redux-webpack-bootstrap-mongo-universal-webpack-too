import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { provideHooks } from 'redial';

import GuestHomepage from '../../components/GuestHomepage/GuestHomepage';
import LoggedInHomepage from '../../components/LoggedInHomepage/LoggedInHomepage';

import { isAuthenticated } from '../../redux/modules/auth';
// import { loadLastVisitorDate } from 'redux/modules/visits';

// @asyncConnect([{
//     promise: async ({ store: { dispatch, getState } }) => {
//       console.log('>>>>>>>>>>>>> HOME.JS > asyncConnect > isAuthenticated TRUE ??? <<<<<<<<<<<<<<<<<');
//       if (isAuthenticated(getState())) {
//         console.log('>>>>>>>>>>>>> HOME.JS > asyncConnect > isAuthenticated TRUE <<<<<<<<<<<<<<<<<');
//         await dispatch(loadList({ pageIndex: 0, pageSize: 5 }));
//       }
//     }
//   }])


// @provideHooks({
//   fetch: async ({ store: { dispatch, getState } }) => {
//     if (!isAuthenticated(getState())) {
//       console.log('>>>>>>>>>>>>> HOME.JS > provideHooks > isAuthenticated IS FALSE <<<<<<<<<<<<<<<<<');
//       await dispatch(loadLastVisitorDate()).catch(() => null);
//     }
//     if (isAuthenticated(getState())) {
//       console.log('>>>>>>>>>>>>> HOME.JS > provideHooks > isAuthenticated IS TRUE <<<<<<<<<<<<<<<<<');
//       await dispatch(loadLastVisitorDate()).catch(() => null);
//     }
//   }
// })

@provideHooks([{
  fetch: async ({ store: { dispatch, getState } }) => {
    console.log('>>>>>>>>>>>>> HOME.JS > asyncConnect > isAuthenticated TRUE ??? <<<<<<<<<<<<<<<<<');
    if (isAuthenticated(getState())) {
      console.log('>>>>>>>>>>>>> HOME.JS > asyncConnect > isAuthenticated TRUE <<<<<<<<<<<<<<<<<');
      await dispatch(loadList({ pageIndex: 0, pageSize: 5 }));
    }
  }
}])


@connect(state => ({
  user: state.auth.user
}))

export default class Home extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      fullName: PropTypes.string
    })
  };

  static defaultProps = {
    user: null
  }

  render() {

    return (
      this.props.user ? <LoggedInHomepage /> : <GuestHomepage />
    );
  }
}
