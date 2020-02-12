import React, { Component } from 'react';
import styled from 'styled-components'
import { Article as ArticleType } from '../constants/types'
import { LIGHT_GREY, SUBHEADING } from '../style/colors';
import { cropToAspectRatio } from '../helpers/image-helpers';

const MAX_TITLE_LEN = 30
const IMG_ASPECT_RATIO = 4/3

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 2px ${LIGHT_GREY};
  border-width: 2px;
  padding-left: 10px;
  transition: 0.2s ease-in;

  &:hover {
    -webkit-box-shadow: 0px 7px 11px -1px rgba(158,158,158,0.6);
    -moz-box-shadow: 0px 7px 11px -1px rgba(158,158,158,0.6);
    box-shadow: 0px 7px 11px -1px rgba(158,158,158,0.6);
  }
`

const ArticleTitle = styled.a`
  padding-top: 10px;
  font-size: 18px;
  text-align: left;

  @media (max-width: 767px) {
    font-size: 24px;
  }
`

const ArticleCoordinates = styled.span`
  margin-top: auto;
  padding-bottom: 4px;
  font-size: 12px;
  text-align: left;
  color: ${SUBHEADING}

  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const ArticleImageContainer = styled.div`
  height: 100px;
  width: 100px;
`

const ArticleImageCanvasContainer = styled.div`
  max-width: 100px; 
`

interface ArticleProps {
  article: ArticleType
}

export class Article extends Component<ArticleProps, {}> {
  constructor(props: ArticleProps) {
    super(props);
  }
  
  renderImage = () => {
    if (!this.props.article.img) return null;

    cropToAspectRatio(this.props.article.img, IMG_ASPECT_RATIO).then(canvas => {
      return React.createElement
    })

    // return (
    //   <ArticleImage src={this.props.article.img}/>
    // )
  }

  generateTitle = (): string => {
    return this.props.article.title.length > MAX_TITLE_LEN ? 
                this.props.article.title.slice(0, 30) + '...' : this.props.article.title;
  }
  
  render() {
    return (
      <div>
        <ArticleContainer>
          <div>
            <ArticleTitle>{this.generateTitle()}</ArticleTitle>
            <ArticleImageContainer>
              {this.renderImage()}
            </ArticleImageContainer>
          </div>
          <ArticleCoordinates>Lat: {this.props.article.lat} Lng: {this.props.article.lng}</ArticleCoordinates>
        </ArticleContainer>
      </div>
    )
  }
}