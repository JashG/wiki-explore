import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from './ArticleList'
import Map from './Map'
import styled from 'styled-components';
import { setCoordinates } from '../store/actions';
import { Coordinates } from '../constants/types'

const ContentContainer = styled.div`
  display: flex;
  width: 100%;

  @media (max-width:768px) {
    flex-direction: column;
  }
`

// Define type of component's internal props
interface HomeOwnProps {
  // message: String
}

// Define type of data used in 'mapStateToProps' function
interface HomeReduxProps {
  coordinates: Coordinates
}

// Define type of functions used in 'mapDispatchToProps' function
interface HomeDispatchProps {
  setCoordinatesAction: (payload: Coordinates) => void,
}

type HomeProps = HomeReduxProps & HomeDispatchProps & HomeOwnProps

class Home extends Component<HomeProps, {}> {
  
  componentDidMount() {
    // get user's current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
        const coords: Coordinates = {
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        };

        this.props.setCoordinatesAction(coords);
      });
    }
  }

  render() {
    return(
      <div className={'container-fluid'} style={{padding: 'none'}}>
        <ContentContainer>
          <div className={'col-12 col-md-8'}>
            <Map/>
          </div>
          <div className={'col-12 col-md-4'}>
            <ArticleList/>
          </div>
        </ContentContainer>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps?: HomeOwnProps) => {
  return {
    coordinates: state.coordinates.coordinates
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: HomeOwnProps): HomeDispatchProps => {
  return {
    setCoordinatesAction: (payload: Coordinates) => dispatch(setCoordinates(payload))
  }
};

export default connect<HomeReduxProps, HomeDispatchProps, HomeOwnProps>(mapStateToProps, mapDispatchToProps)(Home);