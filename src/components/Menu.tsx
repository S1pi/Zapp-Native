import React, {useEffect} from 'react';
import {
  Dimensions,
  Pressable,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Ionicons} from '@expo/vector-icons';
import BackButton from './BackButton';
import {useUserContext} from '../hooks/ContextHooks';
import {useNavigation} from '@react-navigation/native';
import {MainNavigationProp} from '../types/navigationTypes';

const {width} = Dimensions.get('window');
const DRAWER_W = width * 0.8;

interface MenuProps {
  visible: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({visible, onClose}) => {
  const translateX = useSharedValue(-DRAWER_W);
  const backdropOp = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(visible ? 0 : -DRAWER_W, {duration: 250});
    backdropOp.value = withTiming(visible ? 1 : 0, {duration: 250});
  }, [visible]);

  const rDrawer = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const rBackdrop = useAnimatedStyle(() => ({
    opacity: backdropOp.value,
  }));

  const {user} = useUserContext();
  const navigation = useNavigation<MainNavigationProp>();

  return (
    <>
      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={[
          {
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
          },
          rBackdrop,
        ]}
      >
        <Pressable className="flex-1" onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: DRAWER_W,
            backgroundColor: '#007F5F',
            paddingHorizontal: 20,
            paddingTop: '30%',
            zIndex: 100,
          },
          rDrawer,
        ]}
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
            onPress={() =>
              navigation.navigate('AppStack', {screen: 'Payments'})
            }
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
    </>
  );
};

export default Menu;
