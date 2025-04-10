import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

const Payments = () => {
  return (
    <SafeAreaView className="">
      <BackButton />
      <Text className="text-h2 ml-20 mt-3">Payments and pricing</Text>
    </SafeAreaView>
  );
};

export default Payments;
