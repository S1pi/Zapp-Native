import {Pressable, PressableProps, Text} from 'react-native';

interface CustomButtonProps extends PressableProps {
  defaultClassName?: string;
  className?: string;
  defaultTextClassName?: string;
  textClassName?: string;
  children: React.ReactNode;
}

const CustomButton = ({
  defaultClassName = 'bg-blue-500 p-2 rounded-lg w-auto m-auto active:bg-blue-700 ',
  className = '',
  defaultTextClassName = 'text-2xl text-white m-auto',
  textClassName = '',
  children,
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable className={`${defaultClassName} ${className}`} {...props}>
      {({pressed}) => (
        <Text
          suppressHighlighting={true}
          className={`${defaultTextClassName} ${textClassName} ${pressed ? 'opacity-70' : 'opacity-100'}`}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
