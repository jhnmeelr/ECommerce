import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, Text, Spinner, Title } from 'native-base';

import * as PaymentsActions from '../reducers/payments';
import * as UserActions from '../reducers/user';
import LoginOrRegister from '../components/login-or-register';

class Payment extends React.Component {
  state = {
    validCardDetails: false,
    cardDetails: null,
  };

  componentWillReceiveProps(newProps) {
    const { paying, navigation } = this.props;

    if (paying && newProps.paymentConfirmed) navigation.navigate('PaymentConfirmation');
  }

  onCardInputChange = (creditCardForm) => {
    this.setState({
      validCardDetails: creditCardForm.valid,
      cardDetails: creditCardForm.values,
    });
  }

  render() {
    const { cart, user, login, logout, register, loading, error, pay, paying } = this.props;
    const { cardDetails, validCardDetails } = this.state;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch', paddingTop: 10 }}>
        {cart.length > 0 && !user && (
          <LoginOrRegister
            login={login}
            register={register}
            logout={logout}
            loading={loading}
            error={error}
          />
        )}

        {cart.length > 0 && user && (
          <View>
            <Title style={{ margin: 10 }}>
              Paying: $ {cart.reduce((sum, p) => sum + p.price * p.quantity, 0)}
            </Title>
            <CreditCardInput onChange={this.onCardInputChange} />
            <Button block style={{ margin: 20 }} onPress={() => pay(user, cart, cardDetails)} disabled={!validCardDetails}>
              <Text>Pay now</Text>
            </Button>
            {paying && <Spinner />}
          </View>
        )}

        {cart.length > 0 && error && (
          <Text style={{ alignSelf: 'center', color: 'red', position: 'absolute', bottom: 10 }}>
            {error}
          </Text>
        )}

        {cart.length === 0 && (
          <Text style={{ alignSelf: 'center', margin: 30 }}>
            There are no products in the cart
          </Text>
        )}
      </View>
    );
  }
}

Payment.propTypes = {
  user: PropTypes.object,
  cart: PropTypes.array,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  pay: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  paying: PropTypes.bool,
  error: PropTypes.string,
  paymentConfirmed: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
};

Payment.navigationOptions = {
  drawerLabel: 'MyCart',
  tabBarIcon: () => <Icon name="cart" />,
};

function mapStateToProps(state) {
  const { userReducer, productsReducer, paymentsReducer } = state;

  return {
    user: userReducer.user,
    cart: productsReducer.cart,
    loading: userReducer.loading,
    paying: paymentsReducer.loading,
    paymentConfirmed: paymentsReducer.paymentConfirmed,
    error: paymentsReducer.error || userReducer.error,
  };
}

function mapStateActionsToProps(dispatch) {
  return bindActionCreators(Object.assign({}, PaymentsActions, UserActions), dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(Payment);
