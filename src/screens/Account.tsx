import React from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../hooks/ContextHooks';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import CustomInput from '../components/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {UseUser} from '../hooks/apiHooks';
import {UserUpdate} from '../../types/user';

const Account = () => {
  const {user, handleLogout, modifyUser} = useUserContext();

  const {control, handleSubmit} = useForm({
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
      postnumber: user?.postnumber || '',
      address: user?.address || '',
    },
  });

  const onSubmit = async (data: UserUpdate) => {
    try {
      await modifyUser(data);
      Keyboard.dismiss();
      Alert.alert('Success', 'User updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update user');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="h-full" edges={['top', 'left', 'right']}>
        <BackButton />
        <Text className="text-h2 ml-20 mt-3">Account</Text>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardOpeningTime={0}
          enableOnAndroid
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mx-auto mt-16 w-4/6">
            <CustomInput
              control={control}
              name="firstname"
              label="First name"
              className="mb-4"
            />
            <CustomInput
              control={control}
              name="lastname"
              label="Last name"
              className="mb-4"
            />
            <CustomInput
              control={control}
              name="email"
              label="Email"
              keyboardType="email-address"
              className="mb-4"
            />
            <CustomInput
              control={control}
              name="phone_number"
              label="Phone number"
              keyboardType="phone-pad"
              className="mb-4"
            />
            <CustomInput
              control={control}
              name="postnumber"
              label="Post number"
              keyboardType="numeric"
              className="mb-4"
            />
            <CustomInput
              control={control}
              name="address"
              label="Address"
              keyboardType="default"
              className="mb-4"
            />
          </View>

          <View className="mt-0">
            <CustomButton
              className="bg-secondary my-2 mx-auto"
              onPress={handleSubmit(onSubmit)}
            >
              Save
            </CustomButton>
            <CustomButton
              className="bg-seabed-green my-2 mx-auto"
              onPress={handleLogout}
            >
              Log out
            </CustomButton>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Account;
