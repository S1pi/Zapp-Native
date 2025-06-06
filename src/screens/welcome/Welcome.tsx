import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';

const Welcome = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView className="h-full">
      <View className="fixed bottom-[-80%] w-full">
        <CustomButton
          className="bg-seabed-green mx-auto my-2"
          onPress={() => navigation.navigate('RegisterStep1')}
        >
          <Text>Register</Text>
        </CustomButton>
        <CustomButton
          className="bg-secondary mx-auto my-2"
          onPress={() => navigation.navigate('Login')}
        >
          <Text>Login</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
