import React from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useForm} from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import CustomInput from '../../components/CustomInput';
import {useUserContext} from '../../hooks/ContextHooks';
import {Credentials} from '../../../types/user';

const Login = () => {
  const initValues = {
    emailOrPhone: '',
    password: '',
  };
  const {control, handleSubmit} = useForm<Credentials>({
    defaultValues: initValues,
  });

  const {handleLogin} = useUserContext();

  const onSubmit = async (data: Credentials) => {
    console.log('Form data:', data);
    try {
      const response = handleLogin(data);
      console.log('Login response:', response);
    } catch (error) {
      Alert.alert('Kirjautumisvirhe', 'Tarkista sähköposti ja salasana', [
        {
          text: 'Yritä uudelleen',
          onPress: () => console.log('Try Again Pressed'),
        },
      ]);
      console.log('Login error:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white p-4">
        <BackButton />
        <View className="h-[10%]"></View>
        <View className="h-[10%]">
          <Text className="text-xl m-auto">Kirjaudu</Text>
        </View>
        <View className="h-[10%]"></View>

        <View className="h-[60%]">
          <CustomInput
            className="mb-3 w-[80%] mx-auto"
            control={control}
            name="emailOrPhone"
            label="Sähköposti tai puhelinnumero"
            rules={{
              required: 'Sähköposti tai puhelinnumero on pakollinen',
            }}
            keyboardType="email-address"
          />

          <CustomInput
            className="mb-32 w-[80%] mx-auto"
            control={control}
            name="password"
            label="Salasana"
            rules={{required: 'Salasana on pakollinen'}}
            secureTextEntry={true}
          />
        </View>

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

export default Login;
