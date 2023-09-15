import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getToken } from "../../services/omdbService";
import { useContextState } from "../../../ContextState.js";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('challenge@alkemy.org');
  const [password, setPassword] = useState('react');
  const {contextState, setContextState} = useContextState();
  const [warning, setwarning] = useState('');

  const handleLogin = async() => {
    if(email.length === 0 || password.length === 0){
        setwarning("Usuario o Contraseña vacios, llenar para continuar")
    }
    else if (email != "challenge@alkemy.org" || password != "react") 
    {
        setwarning("Usuario o Contraseña incorrectos")
    }
    else{
        const token = await getToken(email, password);
        setContextState({ newValue: token.token, type: "SET_TOKEN" });
        navigation.navigate('ListComponent');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Text style={styles.warning}>{warning}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  warning:{
    color: 'crimson'
  }
});

export default LoginScreen;
