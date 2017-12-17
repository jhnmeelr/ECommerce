import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Card, CardItem, Left, Body, Text, Button, Right, Title } from 'native-base';

import * as ProductActions from '../reducers/products';

class Sales extends React.Component {
  onBuyPress = (product) => {
    const { navigation, addProductToCart } = this.props;

    addProductToCart(product);
    setTimeout(() => navigation.navigate('MyCart', { product }), 0);
  }

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        {this.props.products.filter(p => p.discount).map(product => (
          <Card key={product.id}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{product.name}</Text>
                  <Text note>{product.author}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody>
              <Image source={{ uri: product.img }} style={{ height: 200, width: null, flex: 1 }}/>
            </CardItem>

            <CardItem>
              <Left>
                <Title>${product.price}</Title>
              </Left>

              <Body>
                <Button transparent onPress={() => this.onBuyPress(product)}>
                  <Text>Add to cart</Text>
                </Button>
              </Body>

              <Right>
                <Text style={{ color: 'red' }}>{product.discount} off!</Text>
              </Right>
            </CardItem>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

Sales.propTypes = {
  products: PropTypes.array.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  navigation: PropTypes.any.isRequired,
};

Sales.navigationOptions = {
  drawerLabel: 'Sales',
  tabBarIcon: () => <Icon name="home" />,
};

function mapStateToProps(state) {
  return {
    products: state.productsReducer.products || [],
  };
}

function mapStateActionsToProps(dispatch) {
  return bindActionCreators(ProductActions, dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(Sales);
