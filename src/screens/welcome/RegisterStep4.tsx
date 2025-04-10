import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';

const RegisterStep4 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const handleFinish = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-row justify-center my-4">
        <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
        <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
        <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
        <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
      </View>

      <Text className="text-2xl font-bold text-center mb-4">Käyttöehdot</Text>

      <View className="items-center mb-8">
        <Text className="text-base text-center">Käyttöehdot tähän</Text>
      </View>

      <CustomButton className="bg-secondary mx-auto" onPress={handleFinish}>
        <Text>Valmis</Text>
      </CustomButton>
    </SafeAreaView>
  );
};

export default RegisterStep4;
