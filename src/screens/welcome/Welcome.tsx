import {Image, SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';

const Welcome = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView className="h-full">
      <View className="flex justify-between items-center h-full">
        <Image
          source={require('./logos/zapp-text-logo.png')}
          className="w-full"
          resizeMode="contain"
        />
        <View className="mb-4">
          <Text className="text-xl text-center font-bold text-secondary pb-6">
            Welcome to Zapp
          </Text>
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
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
