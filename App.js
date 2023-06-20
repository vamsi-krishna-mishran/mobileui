
import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login'
import Home from './components/Home'
import ATRGen from './components/ATRGen';
import AddBoard from './components/AddBoard';

const Stack = createNativeStackNavigator();

const MyStack = () =>
{
  return (
    <NativeBaseProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerStyle: {
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
          title: "",
          headerShown: false,
          headerShadowVisible: false
        }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: '', headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            optons={{ title: 'Analinar' }}
          />
          <Stack.Screen name="ATRGen" component={ATRGen} />
          <Stack.Screen name="AddBoard" component={AddBoard} options={{ title: "AddBoard" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default MyStack;