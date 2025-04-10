import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

const Contact = () => {
  return (
    <SafeAreaView className="">
      <BackButton />
      <Text className="text-h2 ml-20 mt-3">Contact us</Text>
    </SafeAreaView>
  );
};

export default Contact;
