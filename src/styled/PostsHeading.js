import styled from "styled-components"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

import { analogous } from "../../janabeck.com/src/utils/colors"

const Heading = styled.h1`
  ${MOBILE_MEDIA_QUERY} {
    font-size: 1.5rem;
  }
  color: ${analogous[0]};
  font-weight: 900;
`

export default Heading
