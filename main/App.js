import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListComponent from './src/components/ListComponent/ListComponent';
import Child from './src/components/ListComponent/Child';
import LogIn from './src/components/ListComponent/LogIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContextProvider } from "./ContextState";
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={LogIn} /> 
          <Stack.Screen name="ListComponent" component={ListComponent} /> 
          <Stack.Screen name="Child" component={Child} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
