import React, {useState} from 'react';
import {Pressable, Text, View, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserContext} from '../hooks/ContextHooks';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';

const Account = () => {
  const {user, handleLogout} = useUserContext();

  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');
  const [postnumber, setPostnumber] = useState(user?.postnumber || '');
  const [address, setAddress] = useState(user?.address || '');

  const handleSave = () => {
    // Add logic here to update user data in the context or backend
    // This is just a placeholder for the save action
    // You might want to call an API or update the context state
    // For example:
    // updateUser({firstname, lastname, email, phoneNumber, postnumber, address});
    // For now, we'll just log the changes
    console.log('Saving changes...');
    console.log({firstname, lastname, email, phoneNumber, postnumber, address});
  };

  return (
    <SafeAreaView className="">
      <BackButton />
      //TÄTÄ PITÄÄ VIELÄ MUUTTAA KOSKA BACKBUTTON ON ABSOLUTE POSITIOIN
      <Text className="text-h2 ml-20 mt-3">Account</Text>
      <View className="mx-auto mb-10 mt-16 w-4/6">
        <Text className="text-sm text-secondary">First name</Text>
        <TextInput
          value={firstname}
          onChangeText={setFirstname}
          className="text-lg mb-4 mt-2 p-2 border rounded-xl"
          placeholder="First Name"
        />
        <Text className="text-sm text-secondary">Last name</Text>
        <TextInput
          value={lastname}
          onChangeText={setLastname}
          className="text-lg mb-4 mt-2 p-2 border rounded-xl"
          placeholder="Last Name"
        />
        <Text className="text-sm text-secondary">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="text-lg mb-4 mt-2 p-2 border rounded-xl"
          placeholder="Email"
        />
        <Text className="text-sm text-secondary">Phone number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          className="text-lg mb-4 mt-2 p-2 border rounded-xl"
          placeholder="Phone Number"
        />
        <Text className="text-sm text-secondary">Post number</Text>
        <TextInput
          value={postnumber}
          onChangeText={setPostnumber}
          className="text-lg mb-4 mt-2 p-2 border rounded-xl"
          placeholder="Post Number"
        />
        <Text className="text-sm text-secondary">Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          className="text-lg mb-4 mt-2 p-2 border rounded-xl"
          placeholder="Address"
        />
      </View>
      <View className="mt-0">
        <CustomButton
          className="bg-secondary my-2 mx-auto"
          onPress={handleSave}
        >
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
