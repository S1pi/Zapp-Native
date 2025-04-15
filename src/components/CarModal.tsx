import React from 'react';
import {Modal, View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {Car} from '../screens/Home';
import {Ionicons} from '@expo/vector-icons';

type CarModalProps = {
  visible: boolean;
  setCarModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCar: Car | null;
  distanceToSelectedCar: string | null;
};

export const CarModal = ({
  visible,
  setCarModalVisible,
  selectedCar,
  distanceToSelectedCar,
}: CarModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setCarModalVisible(false)}
    >
      <View className="flex-1 flex justify-end relative">
        <View className="relative h-1/2 justify-start items-center bg-primary">
          {/*CLOSING TAG*/}
          <View className="absolute top-5 left-5">
            <Ionicons
              className="text-black-zapp"
              name="close"
              size={30}
              onPress={() => setCarModalVisible(false)}
            />
          </View>

          {selectedCar ? (
            <View className="p-10 flex justify-center">
              <Text className="text-h2 p-5 text-center">
                {selectedCar.dealership_id === 1 ? 'ZAPP' : ''}{' '}
                {selectedCar.brand} {selectedCar.model}
              </Text>
              {selectedCar.showcase_image_url && (
                <Image source={{uri: selectedCar.showcase_image_url}} />
              )}
              <Text className="text-md mx-auto p-5">
                {distanceToSelectedCar
                  ? distanceToSelectedCar
                  : 'Distance: Unknown'}
              </Text>
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
