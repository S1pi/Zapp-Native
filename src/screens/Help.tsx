import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

const Help = () => {
  return (
    <SafeAreaView className="">
      <BackButton />
      <Text className="text-h2 ml-20 mt-3">Help</Text>
    </SafeAreaView>
  );
};

export default Help;
