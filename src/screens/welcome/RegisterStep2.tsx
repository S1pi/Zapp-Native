import React from 'react';
import {View, Text, SafeAreaView, Keyboard} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthScreenNavigationProp,
  AuthStackParamList,
} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const RegisterStep2 = () => {
  const route = useRoute<RouteProp<AuthStackParamList, 'RegisterStep2'>>();
  const step1Data = route.params?.step1Data || {};

  const navigation = useNavigation<AuthScreenNavigationProp>();

  const initValues = {
    emailOrPhone: step1Data.emailOrPhone || '',
    password: step1Data.password || '',
    firstName: '',
    lastName: '',
    phone: '',
    postalCode: '',
    address: '',
  };

  const {control, handleSubmit} = useForm<any>({
    defaultValues: initValues,
  });

  const onSubmit = async (data: any) => {
    const allData = {...step1Data, ...data};
    console.log('allData: ', allData);
    navigation.navigate('RegisterStep3', {step2Data: allData});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white p-4">
        <BackButton />
        <View className="h-[10%]">
          <View className="flex-row justify-center my-4">
            <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
            <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
            <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
            <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
          </View>
        </View>
        <View className="h-[10%]">
          <Text className="text-xl text-center">Luo käyttäjä</Text>
        </View>
        <ScrollView>
          <View className="h-[70%]">
            <CustomInput
              className="mb-3 w-[80%] mx-auto"
              control={control}
              name="firstName"
              label="Etunimi"
              rules={{required: 'Etunimi on pakollinen'}}
            />

            <CustomInput
              className="mb-3 w-[80%] mx-auto"
              control={control}
              name="lastName"
              label="Sukunimi"
              rules={{required: 'Sukunimi on pakollinen'}}
            />

            <CustomInput
              className="mb-3 w-[80%] mx-auto"
              control={control}
              name="phone"
              label="Puhelinnumero"
              rules={{required: 'Puhelinnumero on pakollinen'}}
              keyboardType="phone-pad"
            />

            <CustomInput
              className="mb-3 w-[80%] mx-auto"
              control={control}
              name="postalCode"
              label="Postinumero"
              rules={{required: 'Postinumero on pakollinen'}}
              keyboardType="numeric"
            />

            <CustomInput
              className="mb-3 w-[80%] mx-auto"
              control={control}
              name="address"
              label="Katuosoite"
              rules={{required: 'Katuosoite on pakollinen'}}
            />
          </View>
          <View className="h-[300px]"></View>
        </ScrollView>
        <View className="h-[10%]">
          <CustomButton
            className="bg-secondary mx-auto"
            onPress={handleSubmit(onSubmit)}
          >
            <Text>Seuraava</Text>
          </CustomButton>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterStep2;
