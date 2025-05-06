import {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import CarPictureModal from '../components/CarPictureModal';
import CustomButton from '../components/CustomButton';
import {useDrive} from '../hooks/apiHooks';
import {MainNavigationProp} from '../types/navigationTypes';
import {Car} from '../types/car';

type Side = 'front' | 'right' | 'left' | 'back';
type Params = {driveId: number; car: Car; endLocation: string};

export default function CompleteDrive() {
  const navigation = useNavigation<MainNavigationProp>();
  const route = useRoute<RouteProp<{params: Params}, 'params'>>();
  const {driveId, endLocation, car} = route.params;

  /* ------- state ------- */
  const [side, setSide] = useState<Side | null>(null);
  const [show, setShow] = useState(false);
  const [uris, setUris] = useState<Record<Side, string | undefined>>({
    front: undefined,
    right: undefined,
    left: undefined,
    back: undefined,
  });
  const [base64s, setBase64s] = useState<Record<Side, string | undefined>>({
    front: undefined,
    right: undefined,
    left: undefined,
    back: undefined,
  });
  const [uploading, setUploading] = useState(false);

  const {endDrive} = useDrive();

  const onTaken = (s: Side, uri: string, b64: string) => {
    setUris((p) => ({...p, [s]: uri}));
    setBase64s((p) => ({...p, [s]: b64}));
  };

  /* ------- lähetys ------- */
  const submit = async () => {
    const missing = (Object.keys(uris) as Side[]).filter((k) => !uris[k]);
    if (missing.length) {
      Alert.alert('Puuttuvat kuvat', `Ota vielä kuvat: ${missing.join(', ')}`);
      return;
    }

    try {
      setUploading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('Token puuttuu');

      const fd = new FormData();
      fd.append('data', JSON.stringify({driveId, endLocation}));
      fd.append('front', base64s.front as string);
      fd.append('back', base64s.back as string);
      fd.append('left', base64s.left as string);
      fd.append('right', base64s.right as string);

      const res = await endDrive(fd, token);

      navigation.navigate('AppStack', {
        screen: 'DriveSummary',
        params: {
          duration: (res as any).duration,
          cost: (res as any).cost,
          car: car,
        },
      });
    } catch (e: any) {
      console.log('Lähetys epäonnistui', e);
      Alert.alert('Virhe', e.message || 'Lähetys epäonnistui');
    } finally {
      setUploading(false);
    }
  };

  /* ------- laatikko UI ------- */
  const Box = ({title, s}: {title: string; s: Side}) => (
    <Pressable
      className={`w-[47%] aspect-square border-2 rounded-xl justify-center items-center ${side === s ? 'border-sunshine' : 'border-dashed border-seabed-green'}`}
      onPress={() => {
        setSide(s);
        setShow(true);
      }}
    >
      <Text className="absolute top-1 left-2 font-semibold text-secondary">
        {title}
      </Text>
      {uris[s] ? (
        <Image source={{uri: uris[s]}} className="w-full h-full rounded-lg" />
      ) : (
        <View className="justify-center items-center">
          <Ionicons name="camera-outline" size={48} color="#093331" />
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      {/* Kamera‑modaali */}
      <CarPictureModal
        visible={show}
        side={side}
        setVisible={setShow}
        onTaken={onTaken}
      />

      <View className="flex-1 flex-row flex-wrap justify-between gap-4">
        <Box title="Front" s="front" />
        <Box title="Right" s="right" />
        <Box title="Left" s="left" />
        <Box title="Back" s="back" />
      </View>

      <CustomButton
        className={`m-auto bg-secondary mt-6 ${uploading ? 'opacity-50' : ''}`}
        disabled={uploading}
        onPress={submit}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white">Lähetä kuvat</Text>
        )}
      </CustomButton>
    </SafeAreaView>
  );
}
