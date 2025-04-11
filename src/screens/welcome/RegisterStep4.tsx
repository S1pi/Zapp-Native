import React from 'react';
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
// import {File} from 'expo-file-system/next';
import * as FileSystem from 'expo-file-system';
import {UserCreate, UserRegisterData} from '../../../types/user';

// const blobToBase64 = async (blob: Blob): Promise<string> => {
//   const reader = new FileReader();
//   reader.readAsDataURL(blob);
//   return new Promise((resolve) => {
//     reader.onloadend = () => {
//       const base64data = reader.result as string;
//       resolve(base64data);
//     };
//   });
// };

// const uriToBlob = async (uri: string): Promise<Blob> => {
//   const response = await fetch(uri);
//   const blob = await response.blob();
//   return blob;
// };

// formData.append('license_front', {
//   uri: data.frontImage,
//   name: 'front_image.jpg',
//   type: 'image/jpeg',
// } as any);
// formData.append('license_back', {
//   uri: data.backImage,
//   name: 'back_image.jpg',
//   type: 'image/jpeg',
// } as any);

const uriToBase64 = async (uri: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(',')[1];
      resolve(base64 || '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

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

    // Laten tekemä jsonData, @lattexi
    // const jsonData = {
    //   email_or_phone: data.emailOrPhone,
    //   password: data.password,
    //   first_name: data.firstName,
    //   last_name: data.lastName,
    //   phone: data.phone,
    //   postal_code: data.postalCode,
    //   address: data.address,
    // };

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

    console.log('Front uri : ', data.frontImage);
    console.log('Back uri : ', data.backImage);

    const frontBase64 = await uriToBase64(data.frontImage);
    const backBase64 = await uriToBase64(data.backImage);

    formData.append('license_front_base64', frontBase64);
    formData.append('license_back_base64', backBase64);

    const info = await FileSystem.getInfoAsync(data.frontImage);
    console.log('Does file exist:', info.exists);

    try {
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
