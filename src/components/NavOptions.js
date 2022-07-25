import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectOrigin } from '../slices/navSlices';

const data = [
  {
    id: '1',
    title: 'Get a Ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen'
  },
  {
    id: '2',
    title: 'Order Food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatScreen'
  }
]

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 w-40 mr-4`}
          disabled={!origin}
        >
          <View style={tw`${!origin ? "opacity-40" : 'opacity-100'}`}>
            <Image
              style={[tw`w-24 h-24`, { resizeMode: 'contain' }]}
              source={{
                uri: item.image
              }}
            />
            <Text
              style={tw`mt-2 text-lg font-semibold`}
            >
              {item.title}
            </Text>
            <Icon
              style={tw`flex justify-center items-center bg-black rounded-full w-8 h-8 mt-4`}
              type='antdesign'
              color='white'
              name='arrowright'
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default NavOptions;