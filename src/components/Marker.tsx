import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Article as ArticleType } from '../constants/types'
import { PRIMARY, BUTTON_HOVER } from '../style/colors';

import 'bootstrap/dist/css/bootstrap.min.css';

interface MarkerProps {
  article: ArticleType,
  isSelected?: boolean,
  onClick?: any, // callback function for when marker is clicked. Not yet sure how to type this. 
}

interface OuterProps {
  lat: number,
  lng: number,
}

type Props = MarkerProps & OuterProps;

type CircleProps = {
  isSelected?: boolean
}

const Circle = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 14px;
  border: 4px solid;
  border-color: ${(props: CircleProps) => (props.isSelected ? BUTTON_HOVER : PRIMARY + '50')};
  background: ${PRIMARY};

  -moz-background-clip: border;
  -webkit-background-clip: border;
  background-clip: border-box;
				
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;
				
  -moz-background-clip: content;
  -webkit-background-clip: content;
  background-clip: content-box;

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
    const { onClick } = this.props;

    return (
      <div>
        <Circle data-tip='' 
          isSelected={this.props.isSelected}
          onClick={onClick ? onClick(this.props.article) : undefined} />
        <ReactTooltip getContent={this.getHoverTooltipContent}
          effect='solid'
          place={'right'}
          border={true}
          // globalEventOff={'click'} // toggles tooltip away on click
          backgroundColor={PRIMARY}
        />
      </div>
    )
  }

}