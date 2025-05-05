// import {useRef, useState} from 'react';
// import {Modal, View, Text} from 'react-native';
// import {CameraView, useCameraPermissions} from 'expo-camera';
// import {Ionicons} from '@expo/vector-icons';
// import * as FileSystem from 'expo-file-system';
// import CustomButton from './CustomButton'; // sama nappi kuin muualla

// type Side = 'front' | 'right' | 'left' | 'back' | null;

// interface Props {
//   visible: boolean;
//   side: Side;
//   setVisible: (v: boolean) => void;
//   onTaken: (side: Exclude<Side, null>, uri: string, base64: string) => void;
// }

// export default function CarPictureModal({
//   visible,
//   side,
//   setVisible,
//   onTaken,
// }: Props) {
//   const [permission, requestPermission] = useCameraPermissions();
//   const ref = useRef<CameraView>(null);

//   if (!permission) return null;
//   if (!permission.granted) {
//     return (
//       <Modal visible={visible} transparent>
//         <View className="flex-1 items-center justify-center bg-black/80 p-6">
//           <Text className="text-white mb-4">
//             Sovellus tarvitsee kameran käyttöoikeuden
//           </Text>
//           <CustomButton className="bg-secondary" onPress={requestPermission}>
//             <Text className="text-white">Salli kamera</Text>
//           </CustomButton>
//         </View>
//       </Modal>
//     );
//   }

//   const take = async () => {
//     if (!ref.current || !side) return;
//     const pic = await ref.current.takePictureAsync();
//     const base64 = await FileSystem.readAsStringAsync(pic.uri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });
//     onTaken(side, pic.uri, base64);
//     setVisible(false);
//   };

//   return (
//     <Modal visible={visible} animationType="fade" transparent>
//       <View className="flex-1 bg-black">
//         <CameraView ref={ref} className="flex-1" facing="back" mode="picture" />
//         <View className="absolute w-full bottom-10 flex-row justify-center gap-16">
//           <CustomButton
//             className="bg-secondary rounded-full w-16 h-16 justify-center items-center"
//             onPress={take}
//           >
//             <Ionicons name="camera" size={32} color="white" />
//           </CustomButton>
//           <CustomButton
//             className="bg-seabed-green rounded-full w-16 h-16 justify-center items-center"
//             onPress={() => setVisible(false)}
//           >
//             <Ionicons name="close" size={32} color="white" />
//           </CustomButton>
//         </View>
//       </View>
//     </Modal>
//   );
// }
