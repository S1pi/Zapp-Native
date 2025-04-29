import {CameraOrientation, CameraView} from 'expo-camera';
import CustomButton from './CustomButton';
import {Dimensions, Modal, Text, View} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {ImageManipulator, SaveFormat} from 'expo-image-manipulator';
import {Ionicons} from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

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
  setBase64Front: React.Dispatch<React.SetStateAction<string | undefined>>;
  setBase64Back: React.Dispatch<React.SetStateAction<string | undefined>>;
  setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
  showCamera: boolean;
  side: 'front' | 'back' | null;
};

export const PictureTakingModal = ({
  setUri1,
  setUri2,
  setBase64Front,
  setBase64Back,
  showCamera,
  setShowCamera,
  side,
}: CameraViewProps) => {
  const ref = useRef<CameraView>(null);
  const [licenseBoxLayout, setLicenseBoxLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [orientation, setOrientation] = useState<CameraOrientation>('portrait');

  const onSetOrientation = (newOrientation: CameraOrientation) => {
    setOrientation(newOrientation);
    console.log('Camera orientation changed:', newOrientation);
  };

  const takePicture = async () => {
    if (ref.current && licenseBoxLayout) {
      try {
        // use takePictureAsync from CameraView
        const photo = await ref.current.takePictureAsync({
          // scale: 1,
          skipProcessing: false,
          exif: true,
        });

        // const availaibleRatio =
        //   await ref.current.getAvailablePictureSizesAsync();

        // console.log('Available picture sizes:', availaibleRatio);

        console.log('Photo taken:', photo);

        if (photo !== undefined) {
          const {uri, width: photoWidth, height: photoHeight, exif} = photo;
          const context = ImageManipulator.manipulate(uri);

          if (
            orientation === 'landscapeLeft' ||
            orientation === 'landscapeRight'
          ) {
            context.rotate(180);
          }

          console.log('Photo URI:', uri);
          const screen = Dimensions.get('window');
          console.log('screen:', screen);

          const isLandscape = photoWidth > photoHeight;
          const actualWidth = photoWidth;
          const actualHeight = photoHeight;

          console.log('Photo width:', photoWidth);
          console.log('Photo height:', photoHeight);

          const fileInfoPic = await FileSystem.getInfoAsync(uri);
          if (fileInfoPic.exists) {
            const size = fileInfoPic.size / 1024; // Convert to KB
            console.log('File size:', size, 'KB');
          }

          // let {x, y, width: w, height: h} = licenseBoxLayout;

          // if (isLandscape) {
          //   // If the photo is in landscape mode, swap width and height
          //   [x, y, w, h] = [
          //     y,
          //     screen.height - licenseBoxLayout.x - licenseBoxLayout.width,
          //     licenseBoxLayout.height,
          //     licenseBoxLayout.width,
          //   ];
          // }

          // Old cropregion
          const cropRegion = {
            originX: (licenseBoxLayout.x / screen.width) * photoWidth,
            originY: (licenseBoxLayout.y / screen.height) * photoHeight,
            width: (licenseBoxLayout.width / screen.width) * photoWidth,
            height: (licenseBoxLayout.height / screen.height) * photoHeight,
          };

          // New cropregion
          // const cropRegion = {
          //   originX: (x / screen.width) * actualWidth,
          //   originY: (y / screen.height) * actualHeight,
          //   width: (w / screen.width) * actualWidth,
          //   height: (h / screen.height) * actualHeight,
          // };

          // Make sure we are not cropping outside the image

          // cropRegion.originX = Math.max(
          //   0,
          //   Math.min(cropRegion.originX, actualWidth - cropRegion.width),
          // );
          // cropRegion.originY = Math.max(
          //   0,
          //   Math.min(cropRegion.originY, actualHeight - cropRegion.height),
          // );

          // const context = useImageManipulator(uri);

          // const context = ImageManipulator.manipulate(uri);

          const imageOrientation = photo.exif?.Orientation;

          console.log('Image orientation:', imageOrientation);

          // if (photo.exif?.Orientation === 1) {
          //   console.log(
          //     'Orientation is 1, rotating 90 degrees',
          //     photo.exif?.Orientation,
          //   );
          //   // Rotate the image 90 degrees
          //   context.rotate(90);
          // }
          // Crop the image
          context.crop(cropRegion);

          const rederImage = await context.renderAsync();
          // Think about using base64 instead of uri
          const croppedImage = await rederImage.saveAsync({
            format: SaveFormat.JPEG,
            compress: 0.8,
            base64: true, // This is optional, but we need it for backend
          });

          // console.log('Cropped image:', croppedImage);
          console.log('Cropped image URI:', croppedImage.uri);
          const fileInfo = await FileSystem.getInfoAsync(croppedImage.uri);
          if (fileInfo.exists) {
            // console.log('File exists:', fileInfo.uri);
            const size = fileInfo.size / 1024; // Convert to KB
            console.log('File size:', size, 'KB');
          }
          // console.log('photo base64', photo?.base64);
          if (side === 'front' && croppedImage.uri) {
            setUri1(croppedImage.uri);
            setBase64Front(croppedImage.base64);
          }
          if (side === 'back' && croppedImage.uri) {
            setUri2(croppedImage.uri);
            setBase64Back(croppedImage.base64);
          }
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  // ["3840x2160", "1920x1080", "1280x720", "640x480", "352x288", "Photo", "High", "Medium", "Low"]

  useEffect(() => {
    if (showCamera) {
      setCameraReady(false);
    }
  }, [showCamera]);

  return (
    <Modal
      // animationType="fade"
      transparent={true}
      visible={showCamera}
      // hardwareAccelerated={true}
      onRequestClose={() => {
        setShowCamera(false);
      }}
      // presentationStyle="overFullScreen"
    >
      <View className="flex-1 justify-center items-center relative">
        <CameraView
          // style={{height: '100%', width: '100%'}}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            flex: 1,
          }}
          facing="back"
          mode="picture"
          active={showCamera}
          ref={ref}
          ratio="16:9"
          responsiveOrientationWhenOrientationLocked={true}
          onResponsiveOrientationChanged={(e) => {
            console.log(
              'Responsive orientation changed inside cameraView option:',
              e,
            );
            onSetOrientation(e.orientation);
          }}
          onCameraReady={() => {
            setCameraReady(true);
          }}
          // pictureSize="1280x720"
          // pictureSize="4:3"
        />

        {/* Dashed lines to represent space for driving license */}
        {cameraReady && (
          <>
            <View
              className="w-full h-72 absolute flex gap-4 p-2 z-50"
              onLayout={(event) => {
                const {x, y, width, height} = event.nativeEvent.layout;
                console.log('Dashed line layout:', {x, y, width, height});
                setLicenseBoxLayout({x, y, width, height});
              }}
            >
              <Text className="text-secondary text-center text-lg font-bold">
                Place your driver license here
              </Text>
              <View className="w-full h-full border-2 border-dashed border-secondary" />
            </View>

            <CustomButton
              className="absolute top-safe-offset-0 left-4 max-w-14 flex justify-center items-center rounded-full z-50"
              onPress={() => {
                setShowCamera(false);
              }}
            >
              <Ionicons name="close" size={36} color="white" />
            </CustomButton>

            <CustomButton
              className="absolute bottom-10 bg-secondary z-50"
              onPress={async () => {
                await takePicture();
                setShowCamera(false);
              }}
            >
              <Text className="text-white">Take a picture</Text>
            </CustomButton>
          </>
        )}
      </View>
    </Modal>
  );
};
