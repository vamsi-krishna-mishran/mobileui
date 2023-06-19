import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login'

const Stack = createNativeStackNavigator();

const MyStack = () =>
{
  return (
    <NativeBaseProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: '', headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default MyStack;