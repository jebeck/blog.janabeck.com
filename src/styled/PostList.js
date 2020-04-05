import styled from "styled-components"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

import addGradientBorder from "./addGradientBorder"
import { rhythm } from "../../janabeck.com/src/utils/typography"

const PostList = styled.ul`
  ${MOBILE_MEDIA_QUERY} {
    margin-left: ${rhythm(0.5)};
  }
  list-style-type: none;
  padding: ${rhythm(1)};
  li {
    margin-bottom: 0;
  }
`

export default addGradientBorder(PostList)
