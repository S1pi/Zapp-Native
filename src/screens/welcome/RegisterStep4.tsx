import {View, Text, SafeAreaView} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthScreenNavigationProp,
  AuthStackParamList,
} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import {useUserContext} from '../../hooks/ContextHooks';
import {UseUser} from '../../hooks/apiHooks';
import * as FileSystem from 'expo-file-system';
import {UserRegisterData} from '../../types/user';

// JUST HERE FOR LEGACY PURPOSES R.I.P. OLD CODE!!!!
// const uriToBase64 = async (uri: string): Promise<string> => {
//   const response = await fetch(uri);
//   const blob = await response.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64 = reader.result?.toString().split(',')[1];
//       resolve(base64 || '');
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

const RegisterStep4 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {handleLogin} = useUserContext();
  const {postRegister} = UseUser();
  const route = useRoute<RouteProp<AuthStackParamList, 'RegisterStep4'>>();

  const data: UserRegisterData = route.params?.step3Data || {};

  const credentials = {
    emailOrPhone: data.phone || '',
    password: data.password || '',
  };

  const handleFinish = async () => {
    console.log('step3Data: ', data);

    const jsonData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone_number: data.phone,
      password: data.password,
      postnumber: data.postalCode,
      address: data.address,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(jsonData));

    try {
      if (!data.frontImage || !data.backImage) {
        console.error('Front or back image is missing');
        return;
      }

      formData.append('license_front_base64', data.frontImage);
      formData.append('license_back_base64', data.backImage);

      const response = await postRegister(formData);

      console.log('Registration response:', response);
      if (!response) {
        console.error('Registration failed');
        return;
      }
      handleLogin(credentials);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <BackButton />
      <View className="h-[15%]">
        <View className="flex-row justify-center my-4">
          <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
          <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
          <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
          <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
        </View>
        <Text className="text-lg font-bold text-center my-4">Käyttöehdot</Text>
      </View>

      <View className="h-[75%]">
        <Text className="text-base text-center">Käyttöehdot tähän</Text>
      </View>

      <View className="h-[10%]">
        <CustomButton className="bg-secondary mx-auto" onPress={handleFinish}>
          <Text>Valmis</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default RegisterStep4;
