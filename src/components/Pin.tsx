import React from 'react';
import styled from 'styled-components'

const PinContainer = styled.div`
  height: 10px;
  width: 10px;
  color: blue;
`

export const Pin = () => {
  return (
    <div>
      <PinContainer/>
    </div>
  )
}