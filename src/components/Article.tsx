import React from 'react';
import styled from 'styled-components'

interface ArticleProps {
  title: String
  img?: String,
  desc?: String
}

const ArticleContainer = styled.div`
  height: 10px;
  width: 10px;
  color: blue;
`

export const Article = (props: ArticleProps) => {
  return (
    <div>
      <ArticleContainer/>
    </div>
  )
}