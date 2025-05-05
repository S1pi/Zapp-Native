import React, {useEffect, useState} from 'react';
import {Modal, View, Text, Image, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Location from 'expo-location';
import {useNavigation} from '@react-navigation/native';
import {MainNavigationProp} from '../types/navigationTypes';
import {Car} from '../types/car';

type CarModalProps = {
  visible: boolean;
  setCarModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCar: Car | null;
  distanceToSelectedCar: string | null;
};

const imageBaseUrl = process.env.EXPO_PUBLIC_URL;

export const CarModal = ({
  visible,
  setCarModalVisible,
  selectedCar,
  distanceToSelectedCar,
}: CarModalProps) => {
  const [canStartDriving, setCanStartDriving] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const navigation = useNavigation<MainNavigationProp>();

  const checkDistance = async () => {
    if (!selectedCar) return;

    setLoadingLocation(true);
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setCanStartDriving(false);
      setLoadingLocation(false);
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync({});
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371e3;
    const φ1 = toRad(userLocation.coords.latitude);
    const φ2 = toRad(selectedCar.latitude);
    const Δφ = toRad(selectedCar.latitude - userLocation.coords.latitude);
    const Δλ = toRad(selectedCar.longitude - userLocation.coords.longitude);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters

    setCanStartDriving(distance <= 200);
    setLoadingLocation(false);
  };

  useEffect(() => {
    if (visible) {
      checkDistance();
    }
  }, [visible, selectedCar]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setCarModalVisible(false)}
    >
      <View className="flex-1 justify-end">
        <View className="relative items-center bg-primary">
          <View className="absolute p-5 top-0 left-0 z-10">
            <Ionicons
              name="close"
              size={30}
              onPress={() => setCarModalVisible(false)}
            />
          </View>

          {selectedCar ? (
            <View className="py-10 px-10 w-full items-center">
              <Text className="text-h2 p-5 text-center">
                {selectedCar.dealership_id === 1 ? 'ZAPP' : ''}{' '}
                {selectedCar.brand} {selectedCar.model}
              </Text>
              {selectedCar.car_showcase_url ? (
                <Image
                  className="h-52 w-full"
                  resizeMode="contain"
                  source={{uri: imageBaseUrl + selectedCar.car_showcase_url}}
                />
              ) : (
                <Text className="text-lg text-secondary">Ei kuvaa autost</Text>
              )}
              <Text className="text-lg mx-auto p-5">
                {distanceToSelectedCar
                  ? distanceToSelectedCar
                  : 'Distance: Unknown'}
              </Text>

              <View className="bg-light-grey rounded-3xl p-5 w-3/4 items-center">
                <Text className="text-lg text-center">0,5 € / min</Text>
              </View>

              <TouchableOpacity
                className={`rounded-3xl p-5 w-3/4 mt-5 items-center ${
                  canStartDriving ? 'bg-secondary' : 'bg-primary'
                }`}
                onPress={() => {
                  if (canStartDriving) {
                    setCarModalVisible(false);
                    navigation.navigate('AppStack', {
                      screen: 'OnDrive',
                      params: {car: selectedCar},
                    });
                  }
                }}
                disabled={!canStartDriving || loadingLocation}
              >
                {loadingLocation ? (
                  <Text className="text-lg text-secondary text-center">
                    Tarkistetaan sijaintiasi...
                  </Text>
                ) : canStartDriving ? (
                  <Text className="text-lg text-primary text-center">
                    Aloita ajaminen
                  </Text>
                ) : (
                  <Text className="text-lg text-secondary text-center">
                    Olet liian kaukana autosta
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-h2">No car data, try again</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
