import {Pressable, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserContext} from '../hooks/ContextHooks';

const Account = () => {
  const {user, handleLogout} = useUserContext();

  return (
    <SafeAreaView>
      <Text>Account</Text>
      <Pressable
        onPress={() => {
          handleLogout();
        }}
        className="text-2xl p-4 m-4 bg-blue-500 rounded-lg"
      >
        <Text className="">Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Account;
