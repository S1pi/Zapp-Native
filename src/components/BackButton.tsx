import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import {AuthScreenNavigationProp} from '../navigation/types';

interface CustomButtonProps extends PressableProps {
  className?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const BackButton = ({className = '', ...props}: CustomButtonProps) => {
  const scale = useSharedValue(1);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.7, {duration: 100});
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {duration: 100});
  };

  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <AnimatedPressable
      className={`absolute top-20 left-6 p-2 ${className}`}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
      hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
      onPress={() => navigation.goBack()}
    >
      <AnimatedIcon name="arrowleft" size={30} style={animatedIconStyle} />
    </AnimatedPressable>
  );
};

export default BackButton;
