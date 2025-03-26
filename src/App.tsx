import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import '../global.css';
import {Navigator} from './navigation/Navigator';
import {UserProvider} from './contexts/UserContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  console.log('App loaded!');
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Navigator />
      </UserProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
