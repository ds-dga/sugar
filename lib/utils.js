import React from "react"
import styled from "styled-components"

export const CustomLinkWrapper = React.forwardRef((props, ref) => (
  <A ref={ref} {...props}>
    {props.children}
  </A>
))

const A = styled.a`
  svg:hover {
    background: transparent !important;
  }
`