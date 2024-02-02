import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp<any>>(); // Specify the type explicitly
  const theme = useTheme(); // Access the theme from react-native-paper

  const handleLogin = async () => {
    try {
      console.log('Sending data to the backend:', { email, password });
      const response: Response = await fetch('https://api-w3qcv3aiha-el.a.run.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);

        // Assume authentication is successful, and navigate to the welcome screen (replace 'Homepage' with your actual screen name)
        navigation.navigate('Homepage');
      } else {
        console.error('Login failed:', data);
        // Handle error scenario, e.g., show an error message to the user
      }
    } catch (error) {
      // Log the response text when a parsing error occurs
      console.error('Error during login:', error);
    }
  };

  const handleSignup = () => {
    // Navigate to the signup screen
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.colors.primary }]} // Highlight the border with the primary color from the theme
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[styles.input, { borderColor: theme.colors.primary }]} // Highlight the border with the primary color from the theme
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Button onPress={handleSignup}>Signup</Button>
      </View>
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
  input: {
    height: 40,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    marginRight: 8,
  },
});

export default Login;
