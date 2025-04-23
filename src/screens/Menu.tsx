import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useUserContext} from '../hooks/ContextHooks';
import {useNavigation} from '@react-navigation/native';
import {MainNavigationProp} from '../types/navigationTypes';
import BackButton from '../components/BackButton';

const screenWidth = Dimensions.get('window').width;

const Menu = ({visible, onClose}: {visible: boolean; onClose: () => void}) => {
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  const {user, handleLogout} = useUserContext();

  const navigation = useNavigation<MainNavigationProp>();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={{
        transform: [{translateX: slideAnim}],
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: screenWidth * 0.8,
        backgroundColor: '#007F5F',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingTop: '30%',
        zIndex: 100,
      }}
    >
      <BackButton onPress={onClose} size={35} />

      <View className="flex flex-row items-center gap-4 mt-6 mb-10">
        <View className="w-20 h-20 rounded-full p-0 justify-center items-center bg-primary">
          <Ionicons name="person" size={30} color="#cccc" />
        </View>
        <View className="flex flex-col gap-2">
          <Text className="text-xl text-primary font-semibold">
            {user?.firstname} {user?.lastname}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('App', {screen: 'Account'})}
          >
            <Text className="text-sm text-aqua-gem">My Account</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-col items-start gap-6 mb-10">
        {/* Add menu items here */}
        <TouchableOpacity
          className="flex flex-row gap-2 items-center"
          onPress={() => navigation.navigate('App', {screen: 'History'})}
        >
          <Ionicons name="time-outline" size={30} color="#093331" />
          <Text className="text-xl">History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row gap-2 items-center"
          onPress={() =>
            navigation.navigate('AppStack', {
              screen: 'About',
            })
          }
        >
          <Ionicons
            name="information-circle-outline"
            size={30}
            color="#093331"
          />
          <Text className="text-xl">About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row gap-2 items-center"
          onPress={() => navigation.navigate('AppStack', {screen: 'Help'})}
        >
          <Ionicons name="help-circle-outline" size={30} color="#093331" />
          <Text className="text-xl">Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row gap-2 items-center"
          onPress={() => navigation.navigate('AppStack', {screen: 'Payments'})}
        >
          <Ionicons name="card-outline" size={30} color="#093331" />
          <Text className="text-xl">Payments and pricing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row gap-2 items-center"
          onPress={() => navigation.navigate('AppStack', {screen: 'Usage'})}
        >
          <Ionicons name="phone-portrait-outline" size={30} color="#093331" />
          <Text className="text-xl">App and usage</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Menu;
