import {Pressable, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserContext} from '../hooks/ContextHooks';
import CustomButton from '../components/CustomButton';

const Account = () => {
  const {user, handleLogout} = useUserContext();

  return (
    <SafeAreaView>
      <Text>Account</Text>
      <CustomButton onPress={handleLogout}>Logout</CustomButton>
    </SafeAreaView>
  );
};

export default Account;
