import React, {useState} from 'react';
import {SafeAreaView, Text, Button, TouchableOpacity} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MainNavigationProp} from '../types/navigationTypes';
import {Car} from '../types/car';

type OnDriveRouteParams = {
  car: Car;
};

const CompleteDrive = () => {
  const route = useRoute<RouteProp<{params: OnDriveRouteParams}, 'params'>>();
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
      <TouchableOpacity
        className="bg-flame p-4 rounded-lg"
        onPress={() =>
          navigation.navigate('AppStack', {
            screen: 'DriveSummary',
            params: {car},
          })
        }
      ></TouchableOpacity>
    </SafeAreaView>
  );
};
export default CompleteDrive;
