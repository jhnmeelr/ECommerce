import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Login from './login';
import Register from './register';

export default class LoginOrRegister extends React.Component {
  state = {
    display: 'login',
  };

  render() {
    const { login, register, loading, error } = this.props;
    const { display } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch' }}>
        {display === 'login' && (
          <Login
            login={login}
            changeToRegister={() => this.setState({ display: 'register' })}
            loading={loading}
            error={error}
          />
        )}
        {display === 'register' && (
          <Register
            register={register}
            changeToLogin={() => this.setState({ display: 'login' })}
            loading={loading}
            error={error}
          />
        )}
      </View>
    );
  }
}

LoginOrRegister.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
