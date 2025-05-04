import {Modal, View, Text, ScrollView, Pressable, Image} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const HowToEndDriveModal = ({visible, onClose}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white px-8 pt-10">
        <Text className="text-h2 font-semibold text-secondary mb-4">
          Ajon lopettaminen
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row my-5 flex justify-between gap-5 w-full p-5 items-center">
            <Image
              source={require('./logos/parkingZone.png')}
              resizeMode="contain"
              className="flex-1 h-36 rounded-xl"
            />
            <View className="flex-1 flex justify-center">
              <Text className="text-lg text-black-zapp font-semibold mb-2">
                Pysäköintialue
              </Text>
              <Text className="text-sm text-black-zapp font-light mb-2">
                Vihreä alue kartalla tarkoittaa virallista pysäköintialuetta.
                {'\n'}Voit lopettaa ajon vain näiden alueiden sisällä.
              </Text>
            </View>
          </View>

          <View className="mt-6 space-y-4">
            <Text className="text-lg font-semibold text-secondary leading-6">
              Voit lopettaa ajon, kun:
            </Text>

            <View className="flex flex-col gap-5 my-5 pl-2">
              <Text className="text-base text-black-zapp">
                ✅ Olet pysäköintialueella.
              </Text>
              <Text className="text-base text-black-zapp">
                ✅ Auto on pysäköity turvallisesti.
              </Text>
              <Text className="text-base text-black-zapp">
                ✅ Ovet on suljettu ja tavarat otettu mukaan.
              </Text>
            </View>

            <Text className="text-base text-black-zapp mt-3">
              💡 ZAPP-autoja ei koske kaupungin pysäköintiajat, koska autot ovat
              yhteiskäyttöautoja. Pysäköi silti sääntöjen mukaan.
            </Text>
          </View>
        </ScrollView>

        <Pressable
          onPress={onClose}
          className="p-5 mb-10 w-full flex items-center"
        >
          <Text className="text-black-zapp text-lg font-medium">Sulje</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default HowToEndDriveModal;
