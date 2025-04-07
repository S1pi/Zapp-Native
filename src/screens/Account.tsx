import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../hooks/ContextHooks';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import CustomInput from '../components/CustomInput';

const Account = () => {
  const {user, handleLogout} = useUserContext();

  const {control, handleSubmit} = useForm({
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      phoneNumber: user?.phone_number || '',
      postnumber: user?.postnumber || '',
      address: user?.address || '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Saving changes...');
    console.log(data);
  };

  return (
    <SafeAreaView className="">
      <BackButton />
      <Text className="text-h2 ml-20 mt-3">Account</Text>

      <View className="mx-auto mb-10 mt-16 w-4/6">
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
          name="phoneNumber"
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
    </SafeAreaView>
  );
};

export default Account;
