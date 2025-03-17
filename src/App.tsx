import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import '../global.css';

const App = () => {
  console.log('App loaded!');
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
