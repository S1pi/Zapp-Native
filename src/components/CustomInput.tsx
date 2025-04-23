import React from 'react';
import {Controller} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';

interface CustomInputProps {
  control: any;
  name: string;
  label: string;
  className?: string;
  rules?: object;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  multiline?: boolean;
  lineheight?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  label,
  rules = {},
  keyboardType = 'default',
  secureTextEntry = false,
  className,
  multiline = false,
  lineheight = 1,
}) => {
  return (
    <View className={className}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <Text className="text-sm text-secondary">{label}</Text>
            <TextInput
              multiline={multiline}
              numberOfLines={lineheight}
              placeholder={label}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              className="border rounded-xl p-2 text-lg mb-2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {error && <Text className="text-flame">{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default CustomInput;
