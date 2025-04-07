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
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  label,
  rules = {},
  keyboardType = 'default',
  secureTextEntry = false,
  className,
}) => {
  return (
    <View className={className}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <Text className="text-lg">{label}</Text>
            <TextInput
              placeholder={label}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              className="border border-seperator-line rounded-lg p-2 text-lg mt-2"
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
