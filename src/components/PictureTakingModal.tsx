import {CameraCapturedPicture, CameraView} from 'expo-camera';
import {View} from 'react-native-reanimated/lib/typescript/Animated';
import CustomButton from './CustomButton';
import {Text} from 'react-native';
import {useRef} from 'react';

{
  /* Kuvan ottaminen homma tässä */
}

{
  /* 
      <View className="h-[50%]">
        <CameraView
          style={{height: 300}}
          facing="back"
          mode="picture"
          ref={ref}
        ></CameraView>
        <CustomButton
          className="bg-secondary mt-2 mx-auto"
          onPress={takePicture}
        >
          <Text className="text-white">Take a picture</Text>
        </CustomButton>
      </View> */
}
// type CameraRef = {
//   takePicture: () => Promise<{uri: string}>;
// };

type CameraViewProps = {
  setUri1: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUri2: React.Dispatch<React.SetStateAction<string | undefined>>;
  side: 'front' | 'back' | null;
};

export const PictureTakingModal = ({
  setUri1,
  setUri2,
  side,
}: CameraViewProps) => {
  const ref = useRef<CameraView>(null);

  const takePicture = async () => {
    if (ref.current) {
      try {
        // use takePictureAsync from CameraView
        const photo = await ref.current.takePictureAsync();
        if (side === 'front' && photo?.uri) {
          setUri1(photo.uri);
        }
        if (side === 'back' && photo?.uri) {
          setUri2(photo.uri);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <>
      <View>
        <CameraView
          style={{height: 300}}
          facing="back"
          mode="picture"
          ref={ref}
        />
      </View>
      <CustomButton
        className="bg-secondary mt-2 mx-auto"
        onPress={() => {
          takePicture();
        }}
      >
        <Text className="text-white">Take a picture</Text>
      </CustomButton>
    </>
  );
};
