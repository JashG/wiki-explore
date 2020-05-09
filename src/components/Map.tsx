import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { setCoordinates } from '../store/actions';
import { Coordinates } from '../constants/types'

const defaultProps = {
  center: {
    lat: 39.7,
    lng: -75.8
  },
  zoom: 11
}

interface MapState {
  center: Number
}

// Define type of component's internal props
interface MapOwnProps {
  // message: String
}

// Define type of data used in 'mapStateToProps' function
interface MapReduxProps {
  coordinates: Coordinates
}

// Define type of functions used in 'mapDispatchToProps' function
interface MapDispatchProps {
  setCoordinatesAction: (payload: Coordinates) => void,
}

type MapProps = MapReduxProps & MapDispatchProps & MapOwnProps

const MapContainer = styled.div`
  height: 600px;
  width: 100%;
`

class Map extends Component<MapProps, MapState> {

  componentDidMount() {
    if (this.props.coordinates) {
      if (this.props.coordinates.lat !== 0 && this.props.coordinates.lng !== 0) {
        // console.log(this.props.coordinates)
      }
    }
  }

  componentDidUpdate() {
    if (this.props.coordinates) {
      if (this.props.coordinates.lat !== 0 && this.props.coordinates.lng !== 0) {
        // console.log(this.props.coordinates)
      }
    }
  }

  handleChangeInCenter = (map: any) => {
    const lat = map.getCenter().lat()
    const lng = map.getCenter().lng()
    const coords: Coordinates = {
      lat: lat,
      lng: lng
    };

    this.props.setCoordinatesAction(coords);
  }

  generatePins = () => {
    
  }

  render() {
    return(
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBSQKUX7ialx0RwFfXinne5OtzTiIsJR3E' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onDragEnd={(map) => this.handleChangeInCenter(map)}
        />
      </MapContainer>
    )
  }
}

const mapStateToProps = (state: any, ownProps?: MapOwnProps) => {
  return {
    coordinates: state.coordinates.coordinates
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: MapOwnProps): MapDispatchProps => {
  return {
    setCoordinatesAction: (payload: Coordinates) => dispatch(setCoordinates(payload))
  }
};

export default connect<MapReduxProps, MapDispatchProps, MapOwnProps>(mapStateToProps, mapDispatchToProps)(Map);