import { Link } from 'gatsby'
import styled from 'styled-components'

import * as colors from '../utils/colors'

const LinkWithOverline = styled(Link)`
  color: ${colors.red};
  text-decoration: none;
  :hover,
  :active {
    color: ${colors.darkPurple};
    text-decoration: overline;
  }
  :visited {
    color: ${colors.teal};
    :hover {
      color: ${colors.darkPurple};
    }
  }
`

export default LinkWithOverline
