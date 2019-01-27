import { createGlobalStyle } from 'styled-components'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

import { lightSeafoam } from '../utils/colors'

const GlobalStyles = createGlobalStyle`
  :root {
    background-color: ${lightSeafoam};
    color: #2e0927;
  }
  main {
    margin: 0 auto;
    ${MOBILE_MEDIA_QUERY} {
      max-width: 95%;
    }
    max-width: 36rem;
    min-height: 100vh;
  }
  pre {
    border-radius: 0.5rem;
  }
`

export default GlobalStyles
