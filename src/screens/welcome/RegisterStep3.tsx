import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';

const RegisterStep3 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-row justify-center my-4">
        <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
        <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
        <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
        <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
      </View>

      <Text className="text-2xl font-bold text-center mb-4">
        Tunnistautuminen
      </Text>

      <View className="items-center mb-8">
        <Text className="text-base text-center">Ajokorttikuvat</Text>
      </View>

      <CustomButton
        className="bg-secondary mx-auto"
        onPress={() => navigation.navigate('RegisterStep4')}
      >
        <Text>Seuraava</Text>
      </CustomButton>
    </SafeAreaView>
  );
};

export default RegisterStep3;
