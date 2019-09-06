import React, { useState, useCallback, useMemo } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div style={{color: 'red', fontWeight: 'bold'}}>{text}</div>;

const defaultProps = {
  center: {
    lat: 40.95,
    lng: 30.33
  },
  zoom: 11
};

function Map({ facilities }) {


  return (
    <div style={{ width: '100%', height: '500px' }}>

      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCPtylxNBp1rfINaXHUPaEtu8TKe-AO2-Y' }}
        defaultCenter={defaultProps.center}
        defaultZoom={2}
      >
        {facilities.map(facility => {
          return (
            <Marker
              lat={facility.lat}
              lng={facility.lng}
              text={facility.name}

            />
          )
        })}


      </GoogleMapReact>
    </div>

  );
}

export default Map;


