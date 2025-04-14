import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Loading: any;
  Welcome: any;
  Login: any;
  RegisterStep1: any;
  RegisterStep2: any;
  RegisterStep3: any;
  RegisterStep4: any;
};

export type AuthScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

export type AppNavigationParamList = {
  Home: undefined;
  Account: undefined;
  History: undefined;
  About: undefined;
  Help: undefined;
  Usage: undefined;
  Payments: undefined;
  Contact: undefined;
};

export type MainStackParamList = {
  App: NavigatorScreenParams<AppNavigationParamList>;
  AppStack: NavigatorScreenParams<AppNavigationParamList>;
};

export type MainNavigationProp = NativeStackNavigationProp<MainStackParamList>;

// export type AppScreenNavigationProp =
//   NativeStackNavigationProp<AppNavigationParamList>;
