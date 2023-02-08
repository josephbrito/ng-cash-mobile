import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
  Linking,
} from 'react-native';
import ShowCase from '../../assets/showcase.jpg';
import {useBalance} from '../../context/balance';
import {useLogged} from '../../context/isLogged';
import {IBalance, IUser} from '../../context/types';
import {useData} from '../../context/user';
import {api} from '../../services';
import Card from '../Card';

import {styles} from './styles';

const Main: React.FC = () => {
  const {isLogged, setIsLogged} = useLogged();
  const {user, setUser} = useData();
  const {userBalance, setUserBalance} = useBalance();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const handleInputUsernameChange = (e: string) => {
    setUsername(e);
  };

  const handleInputPasswordChange = (e: string) => {
    setPassword(e);
  };

  const submitData = async () => {
    if (!username || !password) return;

    try {
      const req = await api.post('login', {
        username,
        password,
      });

      const data: IUser = req.data;

      setIsLogged(true);
      setUser(data);

      const reqData = await api.post('balance', {
        id: data.id,
      });
      const dataBalance: IBalance = reqData.data;

      setUserBalance(dataBalance);

      setUsername('');
      setPassword('');
      return;
    } catch (error: any) {
      setError(true);
      return;
    }
  };

  if (!isLogged) {
    return (
      <ImageBackground source={ShowCase} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Enter with your account</Text>
          <View style={error ? styles.errorBackgorund : {display: 'none'}}>
            <Text style={styles.errorMessage}>User not found</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Type your username"
            placeholderTextColor="#f5f5f5"
            onChangeText={handleInputUsernameChange}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Type your password"
            placeholderTextColor="#f5f5f5"
            onChangeText={handleInputPasswordChange}
            value={password}
            secureTextEntry={true}
          />

          <Pressable style={styles.button} onPress={submitData}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Linking.openURL('https://github.com/josephbrito/ng-cash');
            }}>
            <Text style={styles.link}>Or create an account here</Text>
          </Pressable>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={ShowCase} style={styles.container}>
      <View style={styles.content}>
        <Card username={user.username} balance={userBalance.balance} />
      </View>
    </ImageBackground>
  );
};

export default Main;
