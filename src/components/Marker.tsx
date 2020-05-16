import React, { Component } from 'react';
import styled from 'styled-components';
import { PRIMARY, BUTTON_HOVER } from '../style/colors';

import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  lat: number,
  lng: number,
}

const Circle = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 14px;
  border: 4px solid ${PRIMARY};
  background: ${PRIMARY};

  &:hover {
    cursor: pointer;
    border: 4px solid ${BUTTON_HOVER};
  }
`

export default class Marker extends Component<Props, {}> {

  handleClick = () => {
    // stuff
  }

  render() {
    return (
      <Circle onClick={this.handleClick}/>
    )
  }

}