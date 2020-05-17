import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Article as ArticleType, Coordinates } from '../constants/types'
import { PRIMARY, BUTTON_HOVER } from '../style/colors';

import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  article: ArticleType,
  coordinates: Coordinates,
  isSelected?: boolean,
  onClick?: any, // callback function for when marker is clicked. Not yet sure how to type this. 
}

type CircleProps = {
  isSelected?: boolean
}

const Circle = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 14px;
  border: 4px solid;
  border-color: ${(props: CircleProps) => (props.isSelected ? BUTTON_HOVER : 'transparent')};
  background: ${PRIMARY};

  &:hover {
    cursor: pointer;
    border: 4px solid ${BUTTON_HOVER};
  }
`

export default class Marker extends Component<Props, {}> {

  getHoverTooltipContent = (dataTip: any) => {
    const { article } = this.props;

    return (
      <div>
        {article ? article.title : 'No title'}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Circle data-tip='' 
          isSelected={this.props.isSelected}
          onClick={this.props.onClick} />
        <ReactTooltip getContent={this.getHoverTooltipContent}
          effect='solid'
          place={'right'}
          border={true}
          globalEventOff={'click'} // toggles tooltip away on click
          backgroundColor={PRIMARY}
        />
      </div>
    )
  }

}