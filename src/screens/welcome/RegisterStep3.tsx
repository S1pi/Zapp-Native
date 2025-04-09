import React from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import BackButton from '../../components/BackButton';

const RegisterStep3 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <BackButton />
      <View className="h-[15%]">
        <View className="flex-row justify-center my-4">
          <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
          <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
          <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
          <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
        </View>
        <Text className="text-lg font-bold text-center my-4">
          Tunnistautuminen
        </Text>
      </View>

      <View className="h-[75%]">
        <Text className="text-base text-center">Ajokorttikuvat</Text>
      </View>

      <View className="h-[10%]">
        <CustomButton
          className="bg-secondary mx-auto"
          onPress={() => navigation.navigate('RegisterStep4')}
        >
          <Text>Seuraava</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default RegisterStep3;
