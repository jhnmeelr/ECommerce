import React from 'react';
import { Image, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button, Text } from 'native-base';

import * as ProductsActions from '../reducers/products';

class ProductDetail extends React.Component {
  onBuyPress = (product) => {
    const { navigation, addProductToCart } = this.props;

    addProductToCart(product);
    navigation.goBack();
    setTimeout(() => navigation.navigate('MyCart', { product }), 0);
  }

  render() {
    const { navigation: { state: { params: product } } } = this.props;

    return (
      <ScrollView>
        <Image style={{ height: 200, width: 160, alignSelf: 'center', marginTop: 20 }} source={{ uri: product.img }}/>
        <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 30, fontWeight: 'bold' }}>${product.price}</Text>
        <Text style={{ alignSelf: 'center', margin: 20 }}>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam nec
          eros quis magna vehicula blandit at nec velit.
          Mauris porta risus non
          lectus ultricies lacinia. Phasellus molestie metus ac
          metus dapibus,
          nec maximus arcu interdum. In hac habitasse platea dictumst.
          Suspendisse fermentum iaculis ex, faucibus semper turpis
          vestibulum quis.
        </Text>
        <Button block style={{ margin: 20 }} onPress={() => this.onBuyPress(product)}><Text>Buy!</Text></Button>
      </ScrollView>
    );
  }
}

ProductDetail.propTypes = {
  navigation: PropTypes.any.isRequired,
  addProductToCart: PropTypes.func.isRequired,
};

ProductDetail.navigationOptions = props => {
  const { navigation: { state: { params } } } = props;

  return {
    tabBarIcon: () => <Icon name="home" />,
    headerTitle: params.product.name,
    drawerLabel: 'Home',
  };
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
  };
}

function mapStateActionsToProps(dispatch) {
  return bindActionCreators(ProductsActions, dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(ProductDetail);
