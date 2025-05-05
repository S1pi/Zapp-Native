import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Car} from './car';

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
  About: undefined;
  Help: undefined;
  Usage: undefined;
  Payments: undefined;
  Contact: undefined;
  OnDrive: {car: Car};
  CompleteDrive: {car: Car};
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
