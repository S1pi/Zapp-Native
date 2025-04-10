import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

const About = () => {
  return (
    <SafeAreaView className="">
      <BackButton />
      <Text className="text-h2 ml-20 mt-3">About</Text>
    </SafeAreaView>
  );
};

export default About;
