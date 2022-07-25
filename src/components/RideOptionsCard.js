import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectTravelTimeInformation } from '../slices/navSlices';

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const SURGE_CHARGE_RATE = 1.5;

  const data = [
    {
      id: "1",
      title: "Uber X",
      multiplier: 1,
      image: "https://links.papareact.com/3pn"
    },
    {
      id: "2",
      title: "Uber XL",
      multiplier: 1.2,
      image: "https://links.papareact.com/5w8"
    },
    {
      id: "3",
      title: "Uber LUX",
      multiplier: 1.6,
      image: "https://links.papareact.com/7pf"
    },
  ]
  
  return (
    <SafeAreaView style={[tw`bg-white flex-grow`, { overflow: 'scroll' }]}>
        <View style={tw`mt-auto border-b border-gray-200`}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NavigateCard')}
            style={tw`absolute top-3 z-10 left-5 p-3 rounded-full`}
          >
            <Icon
              name='chevron-left'
              type='fontawesome'
            />
          </TouchableOpacity>
          <Text style={tw`text-center py-5 text-xl`}> Select a Ride - {travelTimeInformation?.distance?.text} </Text>
        </View>

        <FlatList
          disableVirtualization={true}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCar(item)}
              style={tw`flex-row items-center justify-around px-2 ${item.id === selectedCar?.id ? 'bg-gray-200' : ''}`}
            >
              <Image
                source={{ uri: item.image }}
                style={[tw`w-24 h-24`, { resizeMode: 'contain' }]}
              />
              <View style={tw`-mt-1`}>
                <Text style={tw`text-xl font-semibold`}> {item.title} </Text>
                <Text> {travelTimeInformation?.duration?.text} </Text>
              </View>
              <Text style={tw`text-xl font-normal`}> 
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(
                  (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * item.multiplier / 100)
                )}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={tw`mt-auto border-t border-gray-200`}>
          <TouchableOpacity
            disabled={!selectedCar}
            style={tw`bg-black py-3 m-3 ${!selectedCar ? 'bg-gray-300' : ''}`}
          >
            <Text
              style={tw`text-center text-white text-xl`}
            >
              Choose {selectedCar?.title}
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

export default RideOptionsCard;
