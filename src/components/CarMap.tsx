import React, {memo, useMemo, useCallback, useEffect} from 'react';
import MapView, {Marker, Polygon} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import {Car} from '../types/car';
import {haversine} from '../utils/geo';
import {useMap} from '../hooks/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parkingZones} from './parkingZones';

interface Props {
  cars: Car[];
  userLocation: {latitude: number; longitude: number} | null;
  onCarPress(car: Car, distance: string): void;
  mapRef: React.RefObject<MapView | null>;
  disableGestures: boolean;
}

const CarMap = ({
  cars,
  userLocation,
  onCarPress,
  mapRef,
  disableGestures,
}: Props) => {
  // Esilaskettu etäisyys joka autolle
  const carsWithDistance = useMemo(() => {
    if (!userLocation) return [];
    return cars.map((c) => ({
      ...c,
      distance: haversine(
        userLocation.latitude,
        userLocation.longitude,
        c.latitude,
        c.longitude,
      ),
    }));
  }, [cars, userLocation]);

  const handlePress = useCallback(
    (car: Car, km: number) => {
      const str =
        km < 1 ? `${(km * 1_000).toFixed(0)} m` : `${km.toFixed(2)} km`;
      onCarPress(car, str);
    },
    [onCarPress],
  );

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      showsUserLocation
      userLocationPriority="high"
      scrollEnabled={!disableGestures}
      zoomEnabled={!disableGestures}
      pitchEnabled={!disableGestures}
      rotateEnabled={!disableGestures}
    >
      {parkingZones.map((zone) => (
        <Polygon
          key={zone.id}
          coordinates={zone.location}
          strokeColor="green"
          fillColor="rgba(0,255,0,0.2)"
          strokeWidth={2}
        />
      ))}

      {carsWithDistance.map((car) => (
        <Marker
          key={car.id}
          coordinate={{latitude: car.latitude, longitude: car.longitude}}
          pinColor="blue"
          onPress={() => handlePress(car, car.distance)}
          image={
            car.dealership_id === 1
              ? require('./logos/zapp.png')
              : require('./logos/other.png')
          }
        />
      ))}
    </MapView>
  );
};

export default memo(CarMap);
