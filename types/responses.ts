import {UserWithoutPassword} from './user';

type CreatedUserSuccessResponse = {
  message: string;
  user: UserWithoutPassword;
};

type LoginResponse = {
  message: string;
  token: string;
  user: UserWithoutPassword;
};

type EmailOrPhoneResponse = {
  message: string;
  available: boolean;
};

export type {CreatedUserSuccessResponse, LoginResponse, EmailOrPhoneResponse};
