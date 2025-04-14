type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone_number: string;
  postnumber: string;
  address: string;
  validated: boolean;
  role: string;
  created_at: Date | string;
};

type Credentials = {
  emailOrPhone: string;
  password: string;
};

type UserWithoutPassword = Omit<User, 'password'>;

type UserCreate = Omit<User, 'id' | 'created_at' | 'validated' | 'role'>;

type TokenData = Pick<User, 'id' | 'validated' | 'role'>;

type UserRegisterData = {
  address: string;
  confirmPassword: string;
  email: string;
  emailOrPhone: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  postalCode: string;
  frontImage: string;
  backImage: string;
};

type RegisterStep1Data = Pick<
  UserRegisterData,
  'email' | 'password' | 'confirmPassword'
>;

type RegisterStep2Data = Pick<
  UserRegisterData,
  'firstName' | 'lastName' | 'phone' | 'postalCode' | 'address'
>;
type RegisterStep3Data = Pick<UserRegisterData, 'frontImage' | 'backImage'>;

export type {
  User,
  UserCreate,
  UserWithoutPassword,
  TokenData,
  Credentials,
  UserRegisterData,
  RegisterStep1Data,
  RegisterStep2Data,
  RegisterStep3Data,
};
