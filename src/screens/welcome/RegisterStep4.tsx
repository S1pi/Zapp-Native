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
import {File} from 'expo-file-system/next';

const blobToBase64 = async (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      const base64data = reader.result as string;
      resolve(base64data);
    };
  });
};

const RegisterStep4 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {handleLogin} = useUserContext();
  const {postRegister} = UseUser();
  const route = useRoute<RouteProp<AuthStackParamList, 'RegisterStep4'>>();

  const data = route.params?.step3Data || {};

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

  const credentials = {
    emailOrPhone: data.emailOrPhone || '',
    password: data.password || '',
  };

  const handleFinish = async () => {
    console.log('step3Data: ', data);
    const jsonData = {
      email_or_phone: data.emailOrPhone,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      postal_code: data.postalCode,
      address: data.address,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(jsonData));

    console.log('formData', formData);
    const srcFront = new Blob(data.frontImage);
    const srcBack = new Blob(data.backImage);
    console.log('srcFront', srcFront);

    const base64Front = await blobToBase64(srcFront);
    const base64Back = await blobToBase64(srcBack);

    formData.append('license_front', base64Front);
    formData.append('license_back', base64Back);
    console.log('Form data:', formData);
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
