import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  RegisterStep1: undefined;
  RegisterStep2: undefined;
  RegisterStep3: undefined;
  RegisterStep4: undefined;
};

export type AuthScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;
