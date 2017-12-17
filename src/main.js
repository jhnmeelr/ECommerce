import React from 'react';
import { DrawerNavigator, TabNavigator, StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import paymentsReducer from './reducers/payments';
import productsReducer from './reducers/products';
import userReducer from './reducers/user';

import ProductList from './screens/product-list';
import ProductDetail from './screens/product-detail';
import MyCart from './screens/my-cart';
import MyProfile from './screens/my-profile';
import Payment from './screens/payment';
import PaymentConfirmation from './screens/payment-confirmation';
import Sales from './screens/sales';

const ProductsNavigator = StackNavigator({
  ProductList: { screen: ProductList },
  ProductDetail: { screen: ProductDetail },
});

const PurchaseNavigator = StackNavigator({
  MyCart: { screen: MyCart },
  Payment: { screen: Payment },
  PaymentConfirmation: { screen: PaymentConfirmation },
});

let Navigator;
if (Platform.OS === 'ios') {
  Navigator = TabNavigator(
    {
      Home: { screen: ProductsNavigator },
      MyCart: { screen: PurchaseNavigator },
      MyProfile: { screen: MyProfile },
      Sales: { screen: Sales },
    },
    {
      tabBarOptions: {
        inactiveTintColor: '#aaa',
        activeTintColor: '#000',
        showLabel: true,
      },
    }
  );
} else {
  Navigator = DrawerNavigator({
    Home: { screen: ProductsNavigator },
    MyCart: { screen: MyCart },
    MyProfile: { screen: MyProfile },
    Sales: { screen: Sales },
  });
}

const store = createStore(
  combineReducers({ paymentsReducer, productsReducer, userReducer }),
  applyMiddleware(thunk)
);
export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
