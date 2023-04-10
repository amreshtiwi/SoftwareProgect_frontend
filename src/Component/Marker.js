import React from 'react';
import { Marker } from 'react-native-maps';
import Colors from '../color';

function MarkerMap ({court = true,_latitude,_longitude, _description}){

return (
    <Marker
    coordinate={{ latitude: _latitude, longitude: _longitude }}
    title={court ? 'محكمة' : 'محامي'}
    description={_description}
    pinColor={Colors.darkGreen}
    icon={court ? require('frontend/assets/court.png') : require('frontend/assets/binance.png')}
  />
);
}

export default MarkerMap;
