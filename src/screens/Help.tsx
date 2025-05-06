import {useState} from 'react';
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
import {
  Gesture,
  ScrollView,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const Help = () => {
  const faqItems = [
    {
      question: 'Miten aloitan ajon?',
      answer: 'Avaa sovellus, valitse haluamasi auto ja paina "Aloita ajo".',
    },
    {
      question: 'Miten hinnoittelu toimii?',
      answer:
        'Ajo veloitetaan minuuttiperusteisesti. Näet auton hinnan ennen ajon vahvistamista.',
    },
    {
      question: 'Voinko päättää ajon missä tahansa?',
      answer:
        'Ajo tulee päättää sallituilla pysäköintialueilla. Jos pysäköit alueen ulkopuolelle, voi siitä seurata siirtomaksu.',
    },
    {
      question: 'Mitä teen jos auto ei avaudu?',
      answer:
        'Varmista, että puhelimesi sijainti on päällä ja olet auton lähellä. Kokeile tarvittaessa uudelleen tai ota yhteyttä asiakastukeen.',
    },
    {
      question: 'Voinko varata auton etukäteen?',
      answer:
        'Tällä hetkellä emme tarjoa ennakkovarauksia. Autot ovat saatavilla heti, kun näet ne sovelluksessa.',
    },
    {
      question: 'Miten voin maksaa ajosta?',
      answer:
        'Voit maksaa yleisimmillä maksukorteilla tai mobiilimaksulla. Maksutapa lisätään sovelluksen asetuksissa.',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary flex">
      <BackButton />
      <Text className="text-h2 ml-20 mb-2 mt-3">Help</Text>

      <View className="px-10 py-4">
        <Text className="text-lg font-semibold text-secondary">
          Usein kysytyt kysymykset
        </Text>
      </View>
      <GestureHandlerRootView style={{flex: 1}}>
        <ScrollView className="px-10 py-4">
          {faqItems.map((item, index) => (
            <View key={index} className="mb-4">
              <Text className="text-md">{item.question}</Text>
              <Text className="text-sm text-grey">{item.answer}</Text>
            </View>
          ))}
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Help;
