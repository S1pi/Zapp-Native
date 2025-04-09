import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useUserContext} from '../hooks/ContextHooks';
import {AuthScreenNavigationProp} from '../types/navigationTypes';

const Loading = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {handleAutoLogin} = useUserContext();

  // useEffect(() => {
  //   async function autoLogin() {
  //     await handleAutoLogin();
  //     navigation.navigate('Welcome');
  //   }
  //   autoLogin();
  // }, []);

  handleAutoLogin().then(() => {
    navigation.navigate('Welcome');
  });

  return (
    <SafeAreaView className="bg-secondary h-full">
      <Text className="text-lg text-center align-middle">Loading...</Text>
    </SafeAreaView>
  );
};

export default Loading;
