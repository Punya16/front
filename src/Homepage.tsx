import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Homepage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>(); // Specify the type explicitly

  const handleLogout = async () => {
    try {
      // Delete the token from AsyncStorage (replace 'userToken' with the actual key used for storing the token)
      await AsyncStorage.removeItem('userToken');

      // Navigate back to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default Homepage;
