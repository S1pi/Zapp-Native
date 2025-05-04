import {useState} from 'react';
import {View, Text, Pressable, Modal, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const AboutScreen = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackButton />
      <Text className="text-h2 ml-20 mt-3">Account</Text>
      <View className="flex-1 bg-white px-5 pt-6">
        {/* Käyttöehdot */}
        <Pressable
          onPress={() => setShowTerms(true)}
          className="flex-row justify-between items-center py-4 border-b border-secondary"
        >
          <Text className="text-base text-black">Käyttöehdot</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </Pressable>

        {/* Tietosuojakäytäntö */}
        <Pressable
          onPress={() => setShowPrivacy(true)}
          className="flex-row justify-between items-center py-4 border-b border-secondary"
        >
          <Text className="text-base text-black">Tietosuojakäytäntö</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </Pressable>

        {/* Modal: Käyttöehdot */}
        <Modal
          visible={showTerms}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowTerms(false)}
        >
          <View className="flex-1 bg-white px-5 pt-10">
            <Text className="text-h3 font-semibold mb-4 ">Käyttöehdot</Text>
            <ScrollView>
              <Text className="text-base text-black-zapp leading-6">
                Tervetuloa käyttämään ZAPP-sovellusta. Käyttämällä tätä
                sovellusta hyväksyt seuraavat käyttöehdot:
                {'\n\n'}1. Sovelluksen käyttö
                {'\n'}Sovellusta saa käyttää vain sen tarkoittamaan
                tarkoitukseen voimassa olevien lakien ja säädösten mukaisesti.
                {'\n\n'}2. Käyttäjän vastuu
                {'\n'}Käyttäjä vastaa omasta toiminnastaan sovelluksessa. Kaikki
                vilpillinen toiminta tai ehtojen rikkominen voi johtaa tilin
                jäädyttämiseen.
                {'\n\n'}3. Omavastuu
                {'\n'}Sovelluksen kautta tehtyjen varausten tai toimintojen
                osalta käyttäjällä on enintään 2500 euron omavastuu
                mahdollisista vahingoista, vahingonkorvauksista tai vastuista,
                mikäli vahinko johtuu käyttäjän huolimattomuudesta tai
                sopimusrikkomuksesta.
                {'\n\n'}4. Vastuunrajoitus
                {'\n'}Palveluntarjoaja ei vastaa välillisistä tai epäsuorista
                vahingoista. Sovellus tarjotaan "sellaisena kuin se on".
                {'\n\n'}5. Muutokset ehtoihin
                {'\n'}Pidätämme oikeuden muuttaa käyttöehtoja. Muutoksista
                ilmoitetaan sovelluksessa.
              </Text>
            </ScrollView>

            <Pressable
              onPress={() => setShowTerms(false)}
              className="p-5 mb-10 w-full flex items-center"
            >
              <Text className="text-black-zapp text-lg font-medium">Sulje</Text>
            </Pressable>
          </View>
        </Modal>

        {/* Modal: Tietosuojakäytäntö */}
        <Modal
          visible={showPrivacy}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowPrivacy(false)}
        >
          <View className="flex-1 bg-white px-5 pt-10">
            <Text className="text-h3 font-semibold mb-4 ">
              Tietosuojakäytäntö
            </Text>
            <ScrollView>
              <Text className="text-base text-black-zapp leading-6">
                ZAPP-sovelluksessa kunnioitamme yksityisyyttäsi. Tämä
                tietosuojakäytäntö kertoo, miten käsittelemme henkilötietojasi.
                {'\n\n'}1. Kerätyt tiedot
                {'\n'}Keräämme vain välttämättömiä tietoja, kuten nimesi,
                sähköpostiosoitteesi ja sijaintisi (esim. auton vuokraukseen
                liittyen).
                {'\n\n'}2. Tietojen käyttö
                {'\n'}Tietoja käytetään palvelun tarjoamiseen, asiakaspalveluun
                ja lakisääteisten velvollisuuksien täyttämiseen.
                {'\n\n'}3. Tietojen säilytys
                {'\n'}Säilytämme tietoja vain niin kauan kuin on tarpeellista
                palvelun toteuttamiseksi tai lakisääteisten velvoitteiden
                vuoksi.
                {'\n\n'}4. Tietojen jakaminen
                {'\n'}Emme luovuta tietojasi kolmansille osapuolille ilman
                suostumustasi, ellei laki tai viranomaismääräys sitä edellytä.
                {'\n\n'}5. Oikeutesi
                {'\n'}Sinulla on oikeus tarkastaa, oikaista ja pyytää tietojesi
                poistamista ottamalla yhteyttä asiakaspalveluumme.
              </Text>
            </ScrollView>

            <Pressable
              onPress={() => setShowPrivacy(false)}
              className="p-5 mb-10 w-full flex items-center"
            >
              <Text className="text-black-zapp text-lg font-medium">Sulje</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;
