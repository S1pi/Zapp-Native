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
import {AuthScreenNavigationProp} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import BackButton from '../../components/BackButton';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';

const RegisterStep1 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {control, handleSubmit} = useForm<any>();

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
            name="emailOrPhone"
            label="Sähköposti tai puhelinnumero"
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
            onPress={() => navigation.navigate('RegisterStep2')}
          >
            <Text>Seuraava</Text>
          </CustomButton>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterStep1;
