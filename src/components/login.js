import React from 'react';
import PropTypes from 'prop-types';
import { View, Button as LinkButton } from 'react-native';
import { Form, Item, Input, Content, Button, Text, Spinner } from 'native-base';

class Login extends React.Component {
  state = { email: null, password: null };

  render() {
    const { loading, login, error, changeToRegister } = this.props;
    const { email, password } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="e-mail"
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                onChangeText={e => this.setState({ email: e })}
              />
            </Item>

            <Item last>
              <Input
                placeholder="password"
                secureTextEntry
                onChangeText={p => this.setState({ password: p })}
              />
            </Item>

            <Button block disabled={loading} style={{ margin: 20 }} onPress={() => login({ email, password })}>
              <Text>Login</Text>
            </Button>
          </Form>

          <LinkButton title={'or Register'} onPress={() => changeToRegister()}/>

          {loading && <Spinner />}
        </Content>
        {error && (
          <Text style={{ alignSelf: 'center', color: 'red', position: 'absolute', bottom: 10 }}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  login: PropTypes.func.isRequired,
  changeToRegister: PropTypes.func.isRequired,
};

export default Login;
