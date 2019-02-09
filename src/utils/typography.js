import gray from 'gray-percentage'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import Typography from 'typography'

import * as colors from './colors'

const theme = {
  title: 'janabeck.com',
  includeNormalize: false,
  baseFontSize: '24px',
  baseLineHeight: 1.6875,
  googleFonts: [
    {
      name: 'Lato',
      styles: ['300', '400', '700', '900'],
    },
    {
      name: 'Georgia',
      styles: ['400', '400i', '700'],
    },
  ],
  headerFontFamily: ['Lato', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
  headerColor: colors.purple,
  bodyColor: colors.teal,
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    a: {
      color: colors.red,
      textDecoration: 'none',
    },
    'a:hover,a:active': {
      color: options.bodyColor,
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(2),
    },
    blockquote: {
      ...scale(1 / 5),
      color: gray(41),
      paddingLeft: rhythm(13 / 16),
      marginLeft: 0,
      // TODO: customize this color (it's a remnant from Grand View)
      borderLeft: `${rhythm(3 / 16)} solid #fca206`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    [MOBILE_MEDIA_QUERY]: {
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
      code: {
        fontSize: '0.75rem',
      },
      'pre > code': {
        fontSize: '0.625rem',
      },
      'h1,h2,h3,h4,h5,h6': {
        marginBottom: rhythm(0.5),
        marginTop: rhythm(0.75),
      },
      h1: {
        fontSize: '1.5rem',
      },
      h2: {
        fontSize: '1.25rem',
      },
      h3: {
        fontSize: '1.125rem',
      },
      h4: {
        fontSize: '1rem',
      },
      h5: {
        fontSize: '0.875rem',
      },
      h6: {
        fontSize: '0.75rem',
      },
    },
    footer: {
      color: colors.darkPurple,
      fontFamily: options.headerFontFamily.join(', '),
    },
    header: {
      fontFamily: options.headerFontFamily.join(', '),
    },
    '#recent-posts': {
      fontFamily: options.headerFontFamily.join(', '),
    },
    '#tags': {
      fontFamily: options.headerFontFamily.join(', '),
    },
  }),
}

const typography = new Typography(theme)

delete typography.googleFonts

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
