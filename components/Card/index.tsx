import React, {useState} from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';

import UserLogo from '../../assets/icons/user.png';
import {useBalance} from '../../context/balance';
import {useLogged} from '../../context/isLogged';
import {useTransactions} from '../../context/transactions';
import {IBalance, ITransactions} from '../../context/types';
import {useData} from '../../context/user';
import {api} from '../../services';
import Table from '../Table';

import {styles} from './styles';

interface IProps {
  username?: string;
  balance?: number;
}

const Card: React.FC<IProps> = ({username, balance}: IProps) => {
  const [sendModal, setSendModal] = useState<boolean>(false);
  const [detailModal, setDetailModal] = useState<boolean>(false);

  const [receiverUsername, setReceiverUsername] = useState<string>('');
  const [amount, setAmount] = useState<string>();

  const [error, setError] = useState<boolean | string>(false);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const {setIsLogged} = useLogged();
  const {user, setUser} = useData();
  const {setUserBalance} = useBalance();
  const {transactions, setTransactions} = useTransactions();

  const handleClickLogOut = () => {
    setUser({});
    setUserBalance({});
    setTransactions([]);
    setIsLogged(false);
  };

  const handleInputReceiverChange = (e: string) => {
    setReceiverUsername(e);
  };

  const handleInputAmountChange = (e: string) => {
    setAmount(e);
  };

  const submitData = async () => {
    if (!receiverUsername || !amount) return;

    try {
      const req = await api.post('transfer', {
        id: user.id,
        username: receiverUsername,
        cash_in: Number(amount),
      });

      const data: IBalance = req.data;

      setUserBalance(data);
      setSendModal(false);
      setReceiverUsername('');
      setAmount('');
      return;
    } catch (error: any) {
      setError(error.response.data);
      return;
    }
  };

  const seeDetails = async () => {
    setDetailModal(true);
    try {
      const req = await api.post('transactions', {
        id: user.accountId,
      });

      const data: ITransactions[] = req.data;
      setTransactions(data);
      return;
    } catch (error: any) {
      console.log(error.response.data);
      return;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.section}>
        <Image source={UserLogo} style={styles.icon} />
        <Text style={styles.text}>{username}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>R$ {balance}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => setSendModal(true)}>
        <Text style={[styles.text, {fontSize: 14, letterSpacing: 2}]}>
          Send
        </Text>
      </Pressable>

      <View>
        <Modal
          isVisible={sendModal}
          hasBackdrop={true}
          backdropColor={'#222'}
          onBackdropPress={() => setSendModal(false)}>
          <View style={styles.sendModalContainer}>
            <Text
              style={[
                styles.title,
                {color: '#000', fontSize: 20, marginBottom: 20},
              ]}>
              Send money to:
            </Text>

            <View style={error ? styles.errorBackgorund : {display: 'none'}}>
              <Text style={styles.errorMessage}>{error}</Text>
            </View>

            <TextInput
              style={styles.inputSend}
              placeholder="receiver's username"
              placeholderTextColor="#222"
              value={receiverUsername}
              onChangeText={handleInputReceiverChange}
            />

            <TextInput
              style={styles.inputSend}
              placeholder="R$"
              placeholderTextColor="#222"
              keyboardType="numeric"
              value={amount}
              onChangeText={handleInputAmountChange}
            />

            <Pressable
              style={[styles.button, {backgroundColor: '#000'}]}
              onPress={submitData}>
              <Text style={styles.text}>SEND</Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      <Pressable style={styles.button} onPress={seeDetails}>
        <Text style={[styles.text, {fontSize: 14, letterSpacing: 2}]}>
          Details
        </Text>
      </Pressable>

      <View>
        <Modal
          isVisible={detailModal}
          hasBackdrop={true}
          backdropColor={'#222'}
          onBackdropPress={() => setDetailModal(false)}>
          <View style={styles.sendModalContainer}>
            <Text
              style={[
                styles.title,
                {color: '#000', fontSize: 20, marginBottom: 20},
              ]}>
              See your transactions
            </Text>
            <Table transactionsArr={transactions} />
          </View>
        </Modal>
      </View>

      <Pressable style={styles.button} onPress={handleClickLogOut}>
        <Text style={[styles.text, {fontSize: 14, letterSpacing: 2}]}>
          Log out
        </Text>
      </Pressable>
    </View>
  );
};

export default Card;
