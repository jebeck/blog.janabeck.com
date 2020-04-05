import { createGlobalStyle } from "styled-components"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

import { bg, text } from "../../janabeck.com/src/utils/colors"

const LINK_COLORS = {
  active: "#ff6a7e",
  base: "#ff5068",
  underline: "#6b2831",
}

const GlobalStyles = createGlobalStyle`
  :root {
    background-color: ${bg};
    color: ${text};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Exo 2';
  }

  a {
    color: ${LINK_COLORS.base};
    text-decoration: underline double ${LINK_COLORS.underline};
    &:hover,
    &:active {
      color: ${LINK_COLORS.active};
    }
    &.active {
      color: ${LINK_COLORS.active};
    }
  }

  main {
    ${MOBILE_MEDIA_QUERY} {
      margin: 0 0.5rem;
      width: calc(100% - 1rem);
    }
    margin: 0 auto;
    max-width: 36rem;
  }

  /* for syntax highlighting */
  :not(pre) > code[class*="language-"] {
    padding: 0.125em 0.25em;
  }
  .gatsby-highlight + p, h1, h2, h3, h4, h5, h6 {
    margin-top: 1.4rem;
  }
  pre {
    border-radius: 0.5rem;
  }
  /* endfor */

  /* for footnotes from Markdown */
  li[id*="fn-"] {
    ${MOBILE_MEDIA_QUERY} {
      font-size: 0.675rem;
    }
    font-size: 0.875rem;
    p {
      display: inline;
    }
    a {
      text-decoration: none;
    }
  }
  /* endfor */
`

export default GlobalStyles
