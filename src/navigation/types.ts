import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: any;
  Login: any;
  RegisterStep1: any;
  RegisterStep2: any;
  RegisterStep3: any;
  RegisterStep4: any;
};

export type AuthScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;
