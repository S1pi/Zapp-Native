import {ActivityIndicator, Image, SafeAreaView, Text, View} from 'react-native';
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
        <Image
          source={require('./logos/zapp-logo.png')}
          className="mx-auto mb-4 w-60 h-60"
        />
        <ActivityIndicator size={50} className="mx-auto text-aqua-gem" />
      </View>
    </SafeAreaView>
  );
};

export default Loading;
