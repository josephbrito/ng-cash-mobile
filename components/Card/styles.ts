import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '60%',
    width: '90%',
    backgroundColor: '#333',
    padding: 20,
  },

  section: {
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: '#444',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f5f5f5',
    letterSpacing: 3,
    marginBottom: 10,
  },

  text: {
    fontSize: 20,
    color: '#f5f5f5',
    fontWeight: 'bold',
  },

  icon: {
    width: 15,
    height: 20,
    marginRight: 10,
  },

  button: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },

  sendModalContainer: {
    height: '35%',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 15,
  },

  sendModalContent: {
    height: '45%',
    width: '95%',
    borderRadius: 30,
    backgroundColor: '#F0F4EF',
  },

  inputSend: {
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 5,
    marginVertical: 10,
  },

  errorBackgorund: {
    height: 40,
    width: '100%',
    backgroundColor: '#ff0000',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorMessage: {
    color: '#f5f5f5',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 15,
  },
});
