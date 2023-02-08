import React from 'react';
import {View} from 'react-native';
import Header from '../Header';
import Main from '../Main';

import {styles} from './styles';
const Layout: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Main />
    </View>
  );
};

export default Layout;
