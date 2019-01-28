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

  /* for syntax highlighting */
  :not(pre) > code[class*="language-"] {
    padding: 0.125em 0.25em;
  }
  .gatsby-highlight + p {
    margin-top: 1.4rem;
  }
  pre {
    border-radius: 0.5rem;
  }
  /* endfor */

  /* for footnotes from Markdown */
  li[id*="fn-"] {
      font-size: 0.875rem;
    p {
      display: inline;
    }
  }
  /* endfor */
`

export default GlobalStyles
