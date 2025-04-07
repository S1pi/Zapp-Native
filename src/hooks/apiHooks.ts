import {fetchData} from '../utils/functions';

const UseUser = () => {
  const postLogin = async (emailOrPhone: string, password: string) => {
    const loginData = {
      email_or_phone: emailOrPhone,
      password: password,
    };
    console.log('loginData', loginData);
    const options = {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('options', options);
    const response = await fetchData(
      process.env.EXPO_PUBLIC_API + '/users/login',
      options,
    );
    return response;
  };

  return {
    postLogin,
  };
};

export {UseUser};
