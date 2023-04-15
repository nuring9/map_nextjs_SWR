import React from 'react';
import Map from './Map';

const MapSection = () => {
  return (
    <Map
      onLoad={() => {
        console.log('load!');
      }}
    />
  );
};

export default MapSection;
