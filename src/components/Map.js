import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlices';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env'

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
      }); 
    }, 100);
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      fetch(url)
        .then((res) => res.json()
          .then(data => {
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
          })
          .catch(console.error))
        .catch(console.error);
    }

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <View style={[tw`h-full w-full`, { borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }]}>
      <MapView
        ref={mapRef}
        mapType='standard'
        style={tw`h-full w-full rounded-b-xl`}
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor="#444"
            strokeWidth={4}
            language="pt-BR"
          />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng
            }}
            title="Origem"
            description={origin.description}
            identifier='origin'
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng
            }}
            title="Destino"
            description={destination.description}
            identifier='destination'
          />
        )}
      </MapView>
    </View>
  );
}

export default Map;