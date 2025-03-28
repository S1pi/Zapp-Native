import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Account from '../screens/Account';
import History from '../screens/History';
import {NavigationContainer} from '@react-navigation/native';
import {useUserContext} from '../hooks/ContextHooks';
import Welcome from '../screens/welcome/Welcome';

import Login from '../screens/welcome/Login';
import RegisterStep1 from '../screens/welcome/RegisterStep1';
import RegisterStep2 from '../screens/welcome/RegisterStep2';
import RegisterStep3 from '../screens/welcome/RegisterStep3';
import RegisterStep4 from '../screens/welcome/RegisterStep4';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#093331', // taustaväri
          borderTopWidth: 0, // poistaa yläreunan
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5, // Android-varjostus
        },
        tabBarActiveTintColor: '#1af3cf', // aktiivisen ikonin väri
        tabBarInactiveTintColor: '#f9fcfa', // ei-aktiivisen ikonin väri
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{title: 'Kirjaudu sisään'}}
      />

      <AuthStack.Screen
        name="RegisterStep1"
        component={RegisterStep1}
        options={{title: 'Rekisteröidy (1/4)'}}
      />
      <AuthStack.Screen
        name="RegisterStep2"
        component={RegisterStep2}
        options={{title: 'Rekisteröidy (2/4)'}}
      />
      <AuthStack.Screen
        name="RegisterStep3"
        component={RegisterStep3}
        options={{title: 'Rekisteröidy (3/4)'}}
      />
      <AuthStack.Screen
        name="RegisterStep4"
        component={RegisterStep4}
        options={{title: 'Rekisteröidy (4/4)'}}
      />
    </AuthStack.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const {user} = useUserContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Screen name="App" component={TabScreen} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStackScreen} />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export {Navigator};
