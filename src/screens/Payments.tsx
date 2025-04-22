import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

const Payments = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddCard = () => {
    // Ei tallenneta mitään oikeasti
    setModalVisible(true);
    setName('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
  };

  return (
    <SafeAreaView className="flex-1 bg-primary flex">
      <BackButton />
      <Text className="text-h2 ml-20 mb-2 mt-3">Payments and pricing</Text>

      <View className="flex-1 px-10 py-4">
        <Text className="text-lg text-secondary font-semibold mb-4">
          Lisää maksukortti
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <Text className="text-sm text-grey mb-6">
            💡 Tämä maksukortin lisäys on simuloitu eikä tallenna oikeita
            maksutietoja. Tämä on osa kouluprojektia.
          </Text>
          <Text className="text-base text-gray-700 mb-2">Name on card</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
          />

          <Text className="text-base text-gray-700 mb-2">Card number</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
          />

          <View className="flex-row justify-between">
            <View className="w-[48%]">
              <Text className="text-base text-gray-700 mb-2">Expiry</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
                value={expiry}
                onChangeText={setExpiry}
                placeholder="MM/YY"
                keyboardType="number-pad"
              />
            </View>
            <View className="w-[48%]">
              <Text className="text-base text-gray-700 mb-2">CVV</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
                value={cvv}
                onChangeText={setCvv}
                placeholder="123"
                keyboardType="number-pad"
                secureTextEntry
              />
            </View>
          </View>

          <Pressable
            onPress={handleAddCard}
            className="bg-secondary rounded-xl py-3 mt-2 items-center"
          >
            <Text className="text-primary text-base font-medium">
              Lisää kortti
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
      <View className="flex-1 px-10 py-4">
        <Text className="text-lg text-secondary font-semibold mb-4">
          Hinnoittelu
        </Text>
        <Text className="text-sm text-black-zapp">
          ZAPP-palvelun hinnoittelu:
        </Text>
        <Text className="text-sm p-4 bg-light-grey rounded-xl border-l-4 border-secondary text-black-zapp mt-4">
          0,50 € / alkava minuutti
        </Text>
        <Text className="text-sm text-grey mt-4">
          Esimerkiksi 12 minuutin ajo maksaa 6,00 €.
        </Text>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center px-10">
          <View className="bg-primary shadow-md rounded-2xl p-10 w-full items-center">
            <Text className="text-lg text-black-zapp font-medium mb-4 text-center">
              Maksukortti lisätty onnistuneesti
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-secondary rounded-full px-6 py-2"
            >
              <Text className="text-primary font-medium">OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Payments;
