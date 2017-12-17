import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon, Title, Text, ListItem, Badge, Button } from 'native-base';

import * as UserActions from '../reducers/user';
import * as ProductActions from '../reducers/products';
import * as PaymentsActions from '../reducers/payments';

class PaymentConfirmation extends React.Component {
  componentWillMount() {
    const { cart, resetCart, resetPayment } = this.props;

    this.setState({ cart }, () => {
      resetCart();
      resetPayment();
    });
  }

  continueShopping = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyCart' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { cart } = this.state;

    return (
      <View>
        <Title style={{ marginTop: 20 }}>Your purchase is complete!</Title>
        <Text style={{ margin: 20 }}>
          Thank you for buying with us. We sent you an email with the
          confirmation details and an invoice.
          Here you can find a summary of
          your purchase: {' '}
        </Text>
        {cart.map((p, i) => (
          <ListItem key={i} style={{ justifyContent: 'space-between' }}>
            <Badge primary><Text>{p.quantity}</Text></Badge>
            <Text>{p.name}</Text>
            <Text>{p.price * p.quantity}</Text>
          </ListItem>
        ))}
        <Text style={{ alignSelf: 'flex-end', margin: 10 }}>
          Total: ${cart.reduce((sum, p) => sum + p.price * p.quantity, 0)}
        </Text>
        <Button block style={{ margin: 20 }} onPress={this.continueShopping}>
          <Text>Continue Shopping</Text>
        </Button>
      </View>
    );
  }
}

PaymentConfirmation.propTypes = {
  cart: PropTypes.array.isRequired,
  resetCart: PropTypes.func.isRequired,
  resetPayment: PropTypes.func.isRequired,
};

PaymentConfirmation.navigationOptions = {
  drawerLabel: 'MyCart',
  tabBarIcon: () => <Icon name="cart" />,
};

function mapStateToProps(state) {
  return {
    cart: state.productsReducer.cart || [],
  };
}

function mapStateActionsToProps(dispatch) {
  return bindActionCreators(Object.assign({}, PaymentsActions, ProductActions, UserActions), dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(PaymentConfirmation);
