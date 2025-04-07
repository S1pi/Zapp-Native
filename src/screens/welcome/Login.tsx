import React from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useForm} from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../navigation/types';
import BackButton from '../../components/BackButton';
import {UseUser} from '../../hooks/apiHooks';
import CustomInput from '../../components/CustomInput';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const initValues = {
    email: '',
    password: '',
  };
  const {control, handleSubmit} = useForm<LoginFormData>({
    defaultValues: initValues,
  });
  const {postLogin} = UseUser();
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const onSubmit = async (data: LoginFormData) => {
    console.log('Form data:', data);
    try {
      const response = await postLogin(data.email, data.password);
      console.log('Login response:', response);
      // Voit esim. päivittää käyttäjäkontekstin tai navigoida seuraavalle näytölle
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
          <Text className="text-xl text-center">Kirjaudu</Text>
        </View>
        <View className="h-[10%]"></View>

        <View className="h-[60%]">
          <CustomInput
            className="mb-3 w-[80%] mx-auto"
            control={control}
            name="email"
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
