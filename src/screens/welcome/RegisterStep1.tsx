import React from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';

const RegisterStep1 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {control, getValues, handleSubmit} = useForm<any>({
    mode: 'onChange', // Tämä asetus tekee validoinnista reaaliaikaisen
  });

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    // Voit lisätä tarvittaessa lisäkäsittelyä datalle
    navigation.navigate('RegisterStep2', {step1Data: data});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white p-4">
        <BackButton />
        <View className="h-[10%]">
          <View className="flex-row justify-center my-4">
            <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
            <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
            <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
            <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
          </View>
        </View>
        <View className="h-[10%]">
          <Text className="text-xl text-center">Luo käyttäjä</Text>
        </View>
        <View className="h-[10%]"></View>

        <View className="h-[60%]">
          <CustomInput
            className="mb-3 w-[80%] mx-auto"
            control={control}
            name="email"
            label="Sähköposti"
            rules={{
              required: 'Sähköposti on pakollinen',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Syötä validi sähköposti',
              },
            }}
            keyboardType="email-address"
          />

          <CustomInput
            className="mb-3 w-[80%] mx-auto"
            control={control}
            name="password"
            label="Salasana"
            rules={{required: 'Salasana on pakollinen'}}
            secureTextEntry={true}
          />

          <CustomInput
            className="mb-32 w-[80%] mx-auto"
            control={control}
            name="confirmPassword"
            label="Vahvista salasana"
            rules={{
              required: 'Vahvista salasana',
              validate: (value: string) =>
                value === getValues('password') || 'Salasanat eivät täsmää',
            }}
            secureTextEntry
          />
        </View>

        <View className="h-[10%]">
          <CustomButton
            className="bg-secondary mx-auto"
            onPress={handleSubmit(onSubmit)}
          >
            <Text>Seuraava</Text>
          </CustomButton>
          <CustomButton
            className="bg-seabed-green mx-auto mt-2"
            onPress={() => navigation.navigate('RegisterStep2')}
          >
            <Text>Ohita</Text>
          </CustomButton>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterStep1;
