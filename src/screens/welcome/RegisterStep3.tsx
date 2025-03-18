import {useNavigation} from '@react-navigation/native';
import {Pressable, Text, View} from 'react-native';
import {AuthScreenNavigationProp} from '../../navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';

const RegisterStep3 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView>
      <Text>RegisterStep3 Form</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('RegisterStep4');
        }}
        className="text-2xl p-4 m-4 bg-blue-500 text-white rounded-lg"
      >
        <Text>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default RegisterStep3;
