import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {useUserContext} from '../../hooks/ContextHooks';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../types/navigationTypes';

const Loading = () => {
  const {handleAutoLogin} = useUserContext();
  const navigation = useNavigation<AuthScreenNavigationProp>();

  useEffect(() => {
    const autoLogin = async () => {
      await handleAutoLogin();
      navigation.navigate('Welcome');
    };
    autoLogin();
  }, []);

  return (
    <SafeAreaView className="bg-secondary h-full">
      <View className="m-auto">
        <Text className="text-lg mx-auto">Ladataan</Text>
        <ActivityIndicator size={50} className="mx-auto" />
      </View>
    </SafeAreaView>
  );
};

export default Loading;
