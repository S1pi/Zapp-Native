import React from 'react';
import {View, Text, TextInput, SafeAreaView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import BackButton from '../../components/BackButton';

const RegisterStep2 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <BackButton />
      <View className="h-[15%]">
        <View className="flex-row justify-center my-4">
          <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
          <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
          <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
          <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
        </View>
        <Text className="text-lg font-bold text-center my-4">
          Henkilötiedot
        </Text>
      </View>

      <View className="h-[75%]">
        <TextInput
          placeholder="Etunimi"
          className="border-b border-gray-300 mb-4 p-2"
        />
        <TextInput
          placeholder="Sukunimi"
          className="border-b border-gray-300 mb-4 p-2"
        />
        <TextInput
          placeholder="Puhelinnumero"
          keyboardType="phone-pad"
          className="border-b border-gray-300 mb-4 p-2"
        />
        <TextInput
          placeholder="Henkilötunnus"
          className="border-b border-gray-300 mb-4 p-2"
        />
        <TextInput
          placeholder="Kansalaisuus"
          className="border-b border-gray-300 mb-8 p-2"
        />
      </View>

      <View className="h-[10%]">
        <CustomButton
          className="bg-secondary mx-auto"
          onPress={() => navigation.navigate('RegisterStep3')}
        >
          <Text>Seuraava</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default RegisterStep2;
