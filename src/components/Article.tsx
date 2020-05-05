import React, { Component } from 'react';
import styled from 'styled-components'
import { Article as ArticleType } from '../constants/types'
import { LIGHT_GREY, SUBHEADING } from '../style/colors';
import { LeftAlignDiv } from '../components/generic/components'

// Max length of an article title we will display before clipping
const MAX_TITLE_LEN = 35

const ArticleContainer = styled.div`
  height: 60px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  border-bottom: solid 2px ${LIGHT_GREY};
  transition: 0.2s ease-in;

  &:hover {
    color: 
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
  font-size: 12px;
  text-align: left;
  color: ${SUBHEADING}

  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const ArticleImageContainer = styled.div`
  width: 100px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ArticleImage = styled.img`
  height: 100px;
`

interface ArticleProps {
  article: ArticleType
}

export class Article extends Component<ArticleProps, {}> {
  
  renderImage = () => {
    if (!this.props.article.img) return null;

    return (
      <ArticleImage src={this.props.article.img} alt={this.props.article.title}/>
    )
  }

  formatTitle = (): string => {
    // If titles is > MAX_TITLE_LEN, clip text with ellipsis 
    return this.props.article.title.length > MAX_TITLE_LEN ? 
                this.props.article.title.slice(0, 30) + '...' : this.props.article.title;
  }

  formatCoordinates = (): string => {
    const lat = this.props.article.lat.toFixed(3)
    const lng = this.props.article.lng.toFixed(3)

    return 'Lat: ' + lat + ' | Lng: ' + lng
  }
  
  render() {
    return (
      <div>
        <ArticleContainer>
          <LeftAlignDiv>
            <ArticleTitle>{this.formatTitle()}</ArticleTitle>
            {/* <ArticleImageContainer>{this.renderImage()}</ArticleImageContainer> */}
          </LeftAlignDiv>
          <ArticleCoordinates>{this.formatCoordinates()}</ArticleCoordinates>
        </ArticleContainer>
      </div>
    )
  }
}