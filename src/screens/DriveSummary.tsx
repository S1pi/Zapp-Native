import React, {useState} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MainNavigationProp} from '../types/navigationTypes';
import {Car} from '../types/car';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton';

type CompleteDriveParams = {
  car: Car;
};

const DriveSummary = () => {
  const route = useRoute<RouteProp<{params: CompleteDriveParams}, 'params'>>();
  const navigation = useNavigation<MainNavigationProp>();

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const options = [
    {label: 'Huono', icon: 'emoticon-sad-outline', value: 'bad'},
    {label: 'Neutraali', icon: 'emoticon-neutral-outline', value: 'okay'},
    {label: 'Hyvä', icon: 'emoticon-happy-outline', value: 'good'},
  ];

  const {car} = route.params;
  const imageBaseUrl = process.env.EXPO_PUBLIC_URL;

  return (
    <SafeAreaView className="flex-1 bg-primary p-4">
      <View className="flex-1 items-center p-6">
        <TouchableOpacity
          className="absolute top-2 right-2 p-4"
          onPress={() => navigation.navigate('App', {screen: 'Home'})}
        >
          <MaterialCommunityIcons name="close" size={30} color="black" />
        </TouchableOpacity>

        <Text className="text-xl font-semibold">Ajon yhteenveto</Text>

        <View className="flex-1 w-full py-10 px-2">
          <Text className="text-h3 font-semibold px-2 text-secondary">
            Kiitos, että käytit Zappia!
          </Text>

          <View className="bg-grey/10 p-6 rounded-lg mt-10 flex gap-4 relative">
            <Image
              source={{uri: imageBaseUrl + car.car_showcase_url}}
              className="absolute top-4 right-4 h-28 w-36"
              resizeMode="contain"
            />
            <Text className="text-lg font-semibold text-black-zapp">
              {car.brand} {car.model}
            </Text>
            <Text className="text-lg font-semibold text-black-zapp">
              {car.license_plate}
            </Text>
            <Text className="text-lg font-semibold text-black-zapp">
              X minuuttia
            </Text>

            <View className="h-0.5 w-full bg-grey/50 rounded-full" />

            <Text className="text-xl font-semibold text-black-zapp">
              0.00 € (ilmainen)
            </Text>
          </View>

          <View className="p-10 mt-4 flex justify-center items-center">
            <Text className="text-lg">Piditkö ajostasi?</Text>
            <View className="flex-row my-6 justify-center">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className="items-center mx-4"
                  onPress={() => setSelectedIcon(option.value)}
                >
                  <MaterialCommunityIcons
                    name={option.icon}
                    size={40}
                    color={selectedIcon === option.value ? '#FFD700' : 'gray'}
                  />
                  <Text className="mt-2">{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <CustomButton
            className="bg-secondary mx-auto mt-40"
            onPress={() => navigation.navigate('App', {screen: 'Home'})}
          >
            <Text>Sulje</Text>
          </CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriveSummary;
