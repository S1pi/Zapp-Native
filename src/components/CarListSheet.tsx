import React, {useEffect, useMemo} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {TouchableOpacity, Image, View, Text, ScrollView} from 'react-native';
import {Car} from '../types/car';
import {haversine} from '../utils/geo';
import {useMap} from '../hooks/apiHooks';
import {useZappStore} from '../utils/store';

interface Props {
  cars: Car[];
  userLocation: {latitude: number; longitude: number} | null;
  onSelect(car: Car, distance: string): void;
  sheetRef: React.RefObject<BottomSheetModal | null>;
}

const imageBaseUrl = 'http://192.168.1.67:3000';

const CarListSheet = ({cars, userLocation, onSelect, sheetRef}: Props) => {
  const dealerships = useZappStore((s) => s.dealers);
  const sorted = useMemo(() => {
    if (!userLocation) return [];
    return cars
      .map((c) => ({
        ...c,
        distance: haversine(
          userLocation.latitude,
          userLocation.longitude,
          c.latitude,
          c.longitude,
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 6);
  }, [cars, userLocation]);

  return (
    <BottomSheetModal
      index={0}
      snapPoints={['23%', '50%', '75%']}
      enablePanDownToClose={false}
      handleIndicatorStyle={{
        backgroundColor: '#007F5F',
        width: 50,
        height: 5,
        borderRadius: 5,
        margin: 15,
      }}
      backgroundStyle={{
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      ref={sheetRef}
    >
      <BottomSheetView className="max-h-96">
        {sorted.map((car) => {
          const distanceStr =
            car.distance < 1
              ? `${(car.distance * 1_000).toFixed(0)} m`
              : `${car.distance.toFixed(2)} km`;

          return (
            <TouchableOpacity
              key={car.id}
              className="flex-row items-center py-4 px-6"
              onPress={() => {
                sheetRef.current?.snapToIndex(0);
                onSelect(car, distanceStr);
              }}
            >
              <Image
                className="h-20 w-28 mr-4 rounded-lg"
                resizeMode="contain"
                source={{uri: imageBaseUrl + car.car_showcase_url}}
              />
              <View className="flex-1">
                <Text className="text-lg font-medium">
                  {car.dealership_id === 1 ? 'ZAPP ' : ''}
                  {car.brand} {car.model}
                </Text>
                {car.dealership_id !== 1 && (
                  <Text className="text-secondary">
                    {dealerships.find((d) => d.id === car.dealership_id)?.name}
                  </Text>
                )}
                <Text>{distanceStr}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CarListSheet;
