import React from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import BackButton from '../../components/BackButton';

const RegisterStep4 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const handleFinish = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <BackButton />
      <View className="h-[15%]">
        <View className="flex-row justify-center my-4">
          <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
          <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
          <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
          <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
        </View>
        <Text className="text-lg font-bold text-center my-4">Käyttöehdot</Text>
      </View>

      <View className="h-[75%]">
        <Text className="text-base text-center">Käyttöehdot tähän</Text>
      </View>

      <View className="h-[10%]">
        <CustomButton className="bg-secondary mx-auto" onPress={handleFinish}>
          <Text>Valmis</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default RegisterStep4;
