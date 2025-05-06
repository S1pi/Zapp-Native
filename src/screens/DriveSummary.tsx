//Message, duration, cost tulee floattina
import React, {useState} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MainNavigationProp} from '../types/navigationTypes';
import {Car} from '../types/car';

type CompleteDriveParams = {
  car: Car;
};

const DriveSummary = () => {
  const route = useRoute<RouteProp<{params: CompleteDriveParams}, 'params'>>();
  const navigation = useNavigation<MainNavigationProp>();

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  const {car} = route.params;

  return (
    <SafeAreaView className="flex-1 bg-primary p-4">
      <Text className="text-white text-2xl font-bold mb-4">
        Drive Completed, with {car.brand} {car.model}
      </Text>
      <Text className="text-white text-lg mb-4">
        You are in {userLocation?.latitude} {userLocation?.longitude}
      </Text>
    </SafeAreaView>
  );
};
export default DriveSummary;
