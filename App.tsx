/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Layout from './components/Layout';
import {BalanceProvider} from './context/balance';
import {LoggedProvider} from './context/isLogged';
import {TransactionsProvider} from './context/transactions';
import {UserProvider} from './context/user';

function App(): JSX.Element {
  return (
    <TransactionsProvider>
      <BalanceProvider>
        <UserProvider>
          <LoggedProvider>
            <View style={styles.container}>
              <SafeAreaView />
              <StatusBar barStyle={'light-content'} />
              <Layout />
            </View>
          </LoggedProvider>
        </UserProvider>
      </BalanceProvider>
    </TransactionsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#000',
  },
});

export default App;
