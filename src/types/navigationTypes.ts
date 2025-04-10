import {NavigatorScreenParams} from '@react-navigation/native';
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

export type AppNavigationParamList = {
  About: undefined;
  Help: undefined;
  Usage: undefined;
  Payments: undefined;
  Contact: undefined;
};

export type TabScreenParamList = {
  Home: undefined;
  Account: undefined;
  History: undefined;
};

export type MainStackParamList = {
  App: NavigatorScreenParams<TabScreenParamList>;
  AppStack: NavigatorScreenParams<AppNavigationParamList>;
};

export type MainNavigationProp = NativeStackNavigationProp<MainStackParamList>;

// export type AppScreenNavigationProp =
//   NativeStackNavigationProp<AppNavigationParamList>;
