import React, { useState, useCallback, useMemo } from 'react';
import GoogleMapReact from 'google-map-react';


const numContributors_COLOR = {
  1: 'green',
  2: 'yellow',
  3: 'orange',
  'default': 'red'
}
const Marker = ({ facility }) => {
  const numContributors = facility.contributors.split('|').length;
  const background = numContributors_COLOR[numContributors] || numContributors_COLOR.default;
  return <div style={{ height: '8px', width: '8px', borderRadius: '50%', background }} />;
}

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
              facility={facility}

            />
          )
        })}


      </GoogleMapReact>
    </div>

  );
}

export default Map;


