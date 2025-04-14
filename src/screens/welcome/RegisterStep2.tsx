import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthScreenNavigationProp,
  AuthStackParamList,
} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {RegisterStep2Data} from '../../../types/user';
import {UseUser} from '../../hooks/apiHooks';

const RegisterStep2 = () => {
  const route = useRoute<RouteProp<AuthStackParamList, 'RegisterStep2'>>();
  const step1Data = route.params?.step1Data || {};
  const {checkPhoneAndEmailAvailability} = UseUser();

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

  const {control, handleSubmit} = useForm<RegisterStep2Data>({
    defaultValues: initValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterStep2Data) => {
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
              rules={{
                required: 'Etunimi on pakollinen',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: 'Etunimi voi sisältää vain kirjaimia',
                },
              }}
            />

            <CustomInput
              className="mb-3 w-[80%] mx-auto"
              control={control}
              name="lastName"
              label="Sukunimi"
              rules={{
                required: 'Sukunimi on pakollinen',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: 'Sukunimi voi sisältää vain kirjaimia',
                },
              }}
            />

            <CustomInput
              className="mb-3 w-[80%] mx-auto"
              control={control}
              name="phone"
              label="Puhelinnumero"
              rules={{
                required: 'Puhelinnumero on pakollinen',
                validate: async (value: string) => {
                  try {
                    // null for not checked value
                    const available = await checkPhoneAndEmailAvailability(
                      null,
                      value,
                    );
                    return available ? true : 'Puhelinnumero on jo käytössä';
                  } catch (error) {
                    console.log((error as Error).message);
                  }
                },
                pattern: {
                  value: /^(\+358|0)\s*\d(\s*\d){6,9}$/,
                  message: 'Puhelinnumero on muodoltaan väärä',
                },
              }}
              keyboardType="phone-pad"
            />

            <CustomInput
              className="mb-3 w-[80%] mx-auto"
              control={control}
              name="postalCode"
              label="Postinumero"
              rules={{
                required: 'Postinumero on pakollinen',
                pattern: {
                  value: /^\d{5}$/,
                  message: 'Postinumeron tulee olla 5 numeroa pitkä',
                },
              }}
              keyboardType="numeric"
            />

            <CustomInput
              className="mb-3 w-[80%] mx-auto"
              control={control}
              name="address"
              label="Katuosoite"
              rules={{
                required: 'Katuosoite on pakollinen',
                pattern: {
                  value: /^[A-Za-z0-9\s.,-]+$/,
                  message:
                    'Katuosoite voi sisältää vain kirjaimia ja numeroita',
                },
              }}
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
          <CustomButton
            className="bg-seabed-green mx-auto mt-2"
            onPress={() => navigation.navigate('RegisterStep3')}
          >
            <Text>Ohita</Text>
          </CustomButton>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterStep2;
