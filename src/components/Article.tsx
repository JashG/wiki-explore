import React, { Component } from 'react';
import styled from 'styled-components'
import { Article as ArticleType } from '../constants/types'
import { LIGHT_GREY, SUBHEADING, PRIMARY_TEXT, PRIMARY_HOVER, SECONDARY_HOVER } from '../style/colors';

// Max length of an article title we will display before clipping
const MAX_TITLE_LEN = 35

const ArticleContainer = styled.div`
  height: 70px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  border-bottom: solid 2px ${LIGHT_GREY};
  transition: 0.2s ease-in;
  color: ${PRIMARY_TEXT};

  &:hover {
    border-bottom: solid 2px ${PRIMARY_HOVER};
  }
`

const ArticleTitle = styled.a`
  text-align: left;
  padding-top: 10px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: inherit;
  }

  @media (max-width: 767px) {
    font-size: 24px;
  }
`

const ArticleCoordinates = styled.span`
  font-size: 12px;
  text-align: left;
  color: ${SUBHEADING}

  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const OptionsContainer = styled.div`
  padding-top: 6px;

  &:hover {
    
  }
`

const Option = styled.span`
  font-size: 14px;
  text-align: left;
  padding: 2px;
  color: ${PRIMARY_TEXT};
  transition: 0.2s ease-in-out;

  &:hover {
    border-radius: 4px;
    background: ${SECONDARY_HOVER};
    cursor: pointer;
  }

  @media (max-width: 767px) {
    font-size: 18.5px;
  }
`

interface ArticleProps {
  article: ArticleType
}

export class Article extends Component<ArticleProps, {}> {

  formatTitle = (): string => {
    // If titles is > MAX_TITLE_LEN, clip text with ellipsis 
    return this.props.article.title.length > MAX_TITLE_LEN ? 
                this.props.article.title.slice(0, 30) + '...' : this.props.article.title;
  }

  formatCoordinates = (): string => {
    const lat = this.props.article.lat.toFixed(5)
    const lng = this.props.article.lng.toFixed(5)

    return 'Lat: ' + lat + ' | Lng: ' + lng
  }
  
  render() {
    return (
      <ArticleContainer>
        <div>
          <ArticleTitle href={this.props.article.link}>{this.formatTitle()}</ArticleTitle>
        </div>
        <ArticleCoordinates>{this.formatCoordinates()}</ArticleCoordinates>
        <OptionsContainer>
          <Option>&#8592; Find on Map</Option>
        </OptionsContainer>
      </ArticleContainer>
    )
  }
}