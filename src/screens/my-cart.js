import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListItem, Text, Icon, Button, Badge } from 'native-base';

import * as ProductActions from '../reducers/products';

class MyCart extends React.Component {
  onTrashPress = (product) => {
    this.props.removeProductFromCart(product);
  }

  render() {
    const { cart, navigation } = this.props;

    return (
      <View>
        <ScrollView>
          {cart.map((p, i) => (
            <ListItem key={i} style={{ justifyContent: 'space-between' }}>
              <Badge primary><Text>{p.quantity}</Text></Badge>
              <Text>{p.name}</Text>
              <Button icon danger small transparent onPress={() => this.onTrashPress(p)}>
                <Icon name="trash" />
              </Button>
            </ListItem>
          ))}
          {cart.length > 0 && (
            <View>
              <Text style={{ alignSelf: 'flex-end', margin: 10 }}>
                Total: ${cart.reduce((sum, p) => sum + p.price * p.quantity, 0)}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button style={{ margin: 10 }} onPress={() => navigation.navigate('Home')}>
                  <Text>Keep buying</Text>
                </Button>
                <Button style={{ margin: 10 }} onPress={() => navigation.navigate('Payment')}>
                  <Text>Confirm purchase</Text>
                </Button>
              </View>
            </View>
          )}
          {cart.length === 0 && (
            <Text style={{ alignSelf: 'center', margin: 30 }}>There are no products in the cart</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

MyCart.propTypes = {
  cart: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  removeProductFromCart: PropTypes.func.isRequired,
};

MyCart.navigationOptions = {
  drawerLabel: 'My Cart',
  tabBarIcon: () => <Icon name="cart" />,
};

function mapStateToProps(state) {
  const { userReducer, productsReducer, paymentsReducer } = state;

  return {
    user: userReducer.user,
    cart: productsReducer.cart || [],
    loading: userReducer.loading,
    error: userReducer.error,
    paying: paymentsReducer.loading,
  };
}

function mapStateActionsToProps(dispatch) {
  return bindActionCreators(ProductActions, dispatch);
}
export default connect(mapStateToProps, mapStateActionsToProps)(MyCart);
