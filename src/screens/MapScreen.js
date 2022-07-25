import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'twrnc';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={`${Platform.OS === 'ios' ? 'position' : 'height'}`}
    >
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={tw`bg-black absolute top-12 left-8 z-50 p-3 rounded-full shadow-lg`}
        >
          <Icon 
            name='home'
            color='white'
          />
        </TouchableOpacity>
        <View style={tw`h-1/2`}>
          <Map />
        </View>
        <View style={tw`h-1/2`}>
          <Stack.Navigator>
            <Stack.Screen
              name='NavigateCard'
              component={NavigateCard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='RideOptionsCard'
              component={RideOptionsCard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </View>
      </View>
    </KeyboardAvoidingView>

  );
}

export default MapScreen;