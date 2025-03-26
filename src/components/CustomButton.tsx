import React from 'react';
import {Text, Pressable, PressableProps} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface CustomButtonProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  textClassName?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomButton = ({
  children,
  className = '',
  textClassName = 'text-primary m-auto text-lg',
  ...props
}: CustomButtonProps) => {
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
      className={`p-2 rounded-3xl w-72 h-12 ${className}`}
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <Text className={textClassName}>{children}</Text>
    </AnimatedPressable>
  );
};

export default CustomButton;
