import React from 'react';
import {View} from 'react-native';

import {styles} from './styles';

import Logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Logo width={50} height={60} />
    </View>
  );
};

export default Header;
