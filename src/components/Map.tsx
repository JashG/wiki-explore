import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { setCoordinates, setArticleCoordinates } from '../store/actions';
import { Article, Coordinates } from '../constants/types'
import Marker from '../components/Marker';
import { key } from '../credentials';

const defaultProps = {
  coordinates: {
    lat: 39.7,
    lng: -75.8
  }
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
  coordinates: Coordinates,
  articles: Article[],
  fetchingArticles: boolean,
}

// Define type of functions used in 'mapDispatchToProps' function
interface MapDispatchProps {
  setCoordinatesAction: (payload: Coordinates) => void,
  setArticleCoordinatesAction: (payload: Coordinates) => void,
}

type MapProps = MapReduxProps & MapDispatchProps & MapOwnProps

const MapContainer = styled.div`
  height: 600px;
  width: 100%;
`

class Map extends Component<MapProps, MapState> {

  componentDidMount() {
    // Fetch user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords: Coordinates = {
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        };

        this.props.setCoordinatesAction(coords);
      });
    }
  }

  componentDidUpdate() {
    if (this.props.coordinates) {
      if (this.props.coordinates.lat !== 0 && this.props.coordinates.lng !== 0) {
        // console.log(this.props.coordinates)
      }
    }
  }

  getDefaultCenter = () => {
    if (this.props.coordinates.lat !== 0 && this.props.coordinates.lng !== 0) {
      return this.props.coordinates
    }

    return defaultProps.coordinates
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

  renderMarkers = () => {
    const { articles, fetchingArticles } = this.props;

    // We will store each Marker here
    const renderFragment: JSX.Element[] = [];

    if (!fetchingArticles && articles) {
      articles.forEach(article => {
        if (article) {
          renderFragment.push(
            <Marker
              key={article.id}
              article={article}
              lat={article.lat}
              lng={article.lng}
            />
          )
        }
      });
    }

    return renderFragment;
  }

  render() {
    return(
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          defaultCenter={this.getDefaultCenter()}
          defaultZoom={12}
          yesIWantToUseGoogleMapApiInternals
          onDragEnd={(map) => this.handleChangeInCenter(map)}
        >
          {this.renderMarkers()}
        </GoogleMapReact>
      </MapContainer>
    )
  }
}

const mapStateToProps = (state: any, ownProps?: MapOwnProps) => {
  return {
    coordinates: state.coordinates.coordinates,
    articles: state.articles.articles,
    fetchingArticles: state.articles.fetchingArticles,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: MapOwnProps): MapDispatchProps => {
  return {
    setCoordinatesAction: (payload: Coordinates) => dispatch(setCoordinates(payload)),
    setArticleCoordinatesAction: (payload: Coordinates) => dispatch(setArticleCoordinates(payload)),
  }
};

export default connect<MapReduxProps, MapDispatchProps, MapOwnProps>(mapStateToProps, mapDispatchToProps)(Map);