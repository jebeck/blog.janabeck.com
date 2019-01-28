import { createGlobalStyle } from 'styled-components'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

import { lightSeafoam } from '../utils/colors'

const GlobalStyles = createGlobalStyle`
  :root {
    background-color: ${lightSeafoam};
    color: #2e0927;
  }
  main {
    ${MOBILE_MEDIA_QUERY} {
      margin: 0 0.5rem;
      width: calc(100% - 1rem);
    }
    margin: 0 auto;
    max-width: 36rem;
    min-height: 100vh;
  }
  pre {
    border-radius: 0.5rem;
  }
`

export default GlobalStyles
