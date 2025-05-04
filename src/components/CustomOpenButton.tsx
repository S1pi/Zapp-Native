import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Ionicons} from '@expo/vector-icons';

interface CustomOpenButtonProps extends PressableProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  iconSize?: number;
  className?: string;
  color?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomOpenButton = ({
  icon,
  iconSize,
  color,
  className = '',
  ...props
}: CustomOpenButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, {duration: 100});
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {duration: 100});
  };

  return (
    <AnimatedPressable
      className={`rounded-full p-3 mx-auto absolute ${className}`}
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <Ionicons name={icon} size={iconSize} color={color ? color : 'white'} />
    </AnimatedPressable>
  );
};

export default CustomOpenButton;
