import React from 'react';
import {View, Text, TextInput, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';

const RegisterStep1 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-row justify-center my-4">
        <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
        <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
        <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
        <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
      </View>

      <Text className="text-2xl font-bold text-center mb-4">Luo käyttäjä</Text>

      <TextInput
        placeholder="Sähköposti"
        keyboardType="email-address"
        className="border-b border-gray-300 mb-4 p-2"
      />
      <TextInput
        placeholder="Salasana"
        secureTextEntry
        className="border-b border-gray-300 mb-4 p-2"
      />
      <TextInput
        placeholder="Salasana uudelleen"
        secureTextEntry
        className="border-b border-gray-300 mb-8 p-2"
      />
      <CustomButton
        className="bg-secondary mx-auto"
        onPress={() => navigation.navigate('RegisterStep2')}
      >
        <Text>Seuraava</Text>
      </CustomButton>
    </SafeAreaView>
  );
};

export default RegisterStep1;
