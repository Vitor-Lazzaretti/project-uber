import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import tw from "twrnc";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, setDestination } from '../slices/navSlices';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);

  const toInput = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      paddingTop: 20,
      flex: 0
    },
    textInput: {
      backgroundColor: '#DDDDDF',
      borderRadius: 0,
      fontSize: 18
    },
    textInputContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
  });

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <KeyboardAvoidingView
        behavior='position'
      >
        <Text style={tw`text-center py-4 font-medium text-xl`}> Good Morning, Vitor </Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <GooglePlacesAutocomplete
            styles={toInput}
            placeholder='Para onde?'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            enablePoweredByContainer={false}
            minLength={3}
            returnKeyType={'search'}
            fetchDetails={true}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description
                }))
              navigation.navigate('RideOptionsCard');
            }}
            query={{
              language: 'pt-BR',
              key: GOOGLE_MAPS_APIKEY
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <NavFavorites />
      <View
        style={[tw`flex-row bg-white justify-evenly py-2 border-t border-gray-100`, { border: 0.5 }]}
      >
        <TouchableOpacity
          style={tw`flex flex-row justify-between items-center bg-black w-24 px-4 py-4 rounded-full ${destination ? '': 'bg-gray-500'}`}
          disabled={!destination}
          onPress={() => {
            navigation.navigate('RideOptionsCard');
          }}
        >
          <Icon
            name='car'
            type='font-awesome'
            color='white'
            size={16}
          />
          <Text style={tw`text-white text-center`}> Rides </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row justify-between items-center bg-white w-24 px-4 py-4 rounded-full`}
        >
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='black'
            size={16}
          />
          <Text style={tw`text-black text-center`}> Eats </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default NavigateCard;