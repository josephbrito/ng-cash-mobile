import React from 'react';
import {FlatList, Text, View} from 'react-native';

import {styles} from './styles';

import {DataTable} from 'react-native-paper';
import {ITransactions} from '../../context/types';

interface IProps {
  transactionsArr: ITransactions[];
}

const Table: React.FC<IProps> = ({transactionsArr}: IProps) => {
  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>
          <Text>Target ID</Text>
        </DataTable.Title>
        <DataTable.Title>
          <Text>Value</Text>
        </DataTable.Title>
        <DataTable.Title>
          <Text>Date</Text>
        </DataTable.Title>
      </DataTable.Header>

      <FlatList
        data={transactionsArr}
        renderItem={({item}) => (
          <DataTable.Header style={{justifyContent: 'space-between'}}>
            <DataTable.Row>
              <Text>{item.creditedAccountId}</Text>
            </DataTable.Row>
            <DataTable.Row>
              <Text>{item.value}</Text>
            </DataTable.Row>
            <DataTable.Row>
              <Text>{item.createdAt?.slice(0, 10)}</Text>
            </DataTable.Row>
          </DataTable.Header>
        )}
      />
    </DataTable>
  );
};

export default Table;
