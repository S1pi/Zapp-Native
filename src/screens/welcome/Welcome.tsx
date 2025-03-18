import {Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../navigation/types';

const Welcome = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Tervetuloa Zappiin!</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text className="text-2xl bg-slate-500 p-4 rounded-lg text-white">
          Kirjaudu sisään
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('RegisterStep1')}
        className="mt-4"
      >
        <Text className="text-2xl bg-slate-500 p-4 rounded-lg text-white">
          Rekisteröidy
        </Text>
      </Pressable>
    </View>
  );
};

export default Welcome;
