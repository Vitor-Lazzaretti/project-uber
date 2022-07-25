import React from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import NavFavorites from '../components/NavFavorites';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlices';

const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image
					style={[tw`w-24 h-24`, { resizeMode: 'contain' }]}
					source={{
						uri: 'https://links.papareact.com/gzs',
					}} />

				<GooglePlacesAutocomplete
					enablePoweredByContainer={false}
					nearbyPlacesAPI='GooglePlacesSearch'
					styles={{
						container: { flex: 0 },
						textInput: { fontSize: 18 }
					}}
					debounce={400}
					fetchDetails={true}
					placeholder='Vai partir de onde?'
					returnKeyType={'search'}
					onPress={(data, details = null) => {
						dispatch(setOrigin({
							location: details.geometry.location,
							description: data.description
						}));
						
						dispatch(setDestination(null));
					}}
					query={{
						language: 'pt-BR',
						key: GOOGLE_MAPS_APIKEY
					}}
				/>
				<NavOptions />
				<NavFavorites />
			</View>

		</SafeAreaView>
	);
}

export default HomeScreen;