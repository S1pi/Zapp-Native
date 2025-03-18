import {Pressable, Text, View} from 'react-native';
import {useUserContext} from '../../hooks/ContextHooks';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = () => {
  const {handleLogin} = useUserContext();
  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    handleLogin(data);
  };
  return (
    <SafeAreaView>
      <Text>Login Form</Text>
      <Pressable onPress={onSubmit}>
        <Text>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
