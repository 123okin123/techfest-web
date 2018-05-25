import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {Container} from 'reactstrap'


const LPDDirections = (props) =>
  <Container>
      <h2 className="mb-5">DIRECTIONS TO LPD</h2>
      <MapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, filter: 'grayscale(100%)' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <p><strong>Wörthseestraße 43 | 82229 Seefeld</strong></p>
  </Container>;

const MapComponent = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: 48.0488591, lng: 11.1791678 }}
  >
      {props.isMarkerShown && <Marker position={{ lat: 48.0488591, lng: 11.1791678 }} />}
  </GoogleMap>
);

export default LPDDirections;