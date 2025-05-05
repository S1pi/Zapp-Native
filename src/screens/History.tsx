import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

const History = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary flex">
      <BackButton />
      <Text className="text-h2 ml-20 mb-2 mt-3">History</Text>

      <View className="px-10 py-4">
        <Text className="text-lg font-semibold text-secondary">
          Tämä ei ole vielä valitettavasti saatavilla.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default History;
