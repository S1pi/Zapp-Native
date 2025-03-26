import {Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserContext} from '../hooks/ContextHooks';
import CustomButton from '../components/CustomButton';

const Account = () => {
  const {user, handleLogout} = useUserContext();

  return (
    <SafeAreaView className="">
      <Text className="text-xl ml-4">Account</Text>
      <View className="mx-auto my-24">
        <Text className="text-lg my-4">{user?.firstname}</Text>
        <Text className="text-lg my-4">{user?.lastname}</Text>
        <Text className="text-lg my-4">{user?.email}</Text>
        <Text className="text-lg my-4">{user?.phone_number}</Text>
        <Text className="text-lg my-4">{user?.postnumber}</Text>
        <Text className="text-lg my-4">{user?.address}</Text>
      </View>

      <View className="mt-24">
        <CustomButton className="bg-secondary my-2 mx-auto" onPress={() => {}}>
          Save
        </CustomButton>
        <CustomButton
          className="bg-seabed-green my-2 mx-auto"
          onPress={handleLogout}
        >
          Log Out
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default Account;
