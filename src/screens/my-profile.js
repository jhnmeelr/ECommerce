import React from 'react';
import PropTypes from 'prop-types';
import { View, Button as LinkButton } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Header, Title, Label, Input, Item, Form, Content } from 'native-base';

import * as UserActions from '../reducers/user';

import LoginOrRegister from '../components/login-or-register';

class MyProfile extends React.Component {
  render() {
    const { user, login, logout, register, loading, error } = this.props;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <Header><Title style={{ paddingTop: 10 }}>My Profile</Title></Header>
        {!user && (
          <LoginOrRegister
            login={login}
            register={register}
            logout={logout}
            loading={loading}
            error={error}
          />
        )}
        {user && (
          <Content>
            <Form>
              <Item>
                <Item fixedLabel>
                  <Label>Name</Label>
                  <Input disabled placeholder={user.name}/>
                </Item>
              </Item>

              <Item disabled>
                <Item fixedLabel>
                  <Label>Email</Label>
                  <Input disabled placeholder={user.email}/>
                </Item>
              </Item>

              <Item disabled>
                <Item fixedLabel>
                  <Label>Address</Label>
                  <Input disabled placeholder={user.address}/>
                </Item>
              </Item>

              <Item disabled>
                <Item fixedLabel>
                  <Label>Postcode</Label>
                  <Input disabled placeholder={user.postcode}/>
                </Item>
              </Item>

              <Item disabled>
                <Item fixedLabel>
                  <Label>City</Label>
                  <Input disabled placeholder={user.city}/>
                </Item>
              </Item>
            </Form>
            <LinkButton title={'Logout'} onPress={() => logout()}/>
          </Content>
        )}
      </View>
    );
  }
}

MyProfile.propTypes = {
  user: PropTypes.any,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

MyProfile.navigationOptions = {
  drawerLabel: 'My Profile',
  tabBarIcon: () => <Icon name="person" />,
};

function mapStateToProps(state) {
  const { userReducer: { user = null, loading, error } } = state;

  return { user, loading, error };
}

function mapStateActionsToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(MyProfile);
