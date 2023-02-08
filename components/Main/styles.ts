import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '90%',
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  title: {
    fontSize: 30,
    color: '#f5f5f5',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginVertical: 30,
  },

  input: {
    height: 50,
    width: '80%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    color: '#f5f5f5',
    marginVertical: 20,
  },

  link: {
    marginTop: 20,
    color: 'dodgerblue',
    textDecorationLine: 'underline',
    padding: 10,
  },

  button: {
    height: 40,
    width: '50%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },

  buttonText: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 19,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  errorBackgorund: {
    height: 40,
    width: '80%',
    backgroundColor: '#ff0000',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorMessage: {
    color: '#f5f5f5',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 20,
  },
});
