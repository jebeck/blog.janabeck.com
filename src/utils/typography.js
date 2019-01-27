import gray from 'gray-percentage'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import Typography from 'typography'

import * as colors from './colors'

// a slightly-modified typography-theme-grand-view
const theme = {
  title: 'janabeck.com',
  includeNormalize: false,
  baseFontSize: '24px',
  baseLineHeight: 1.6875,
  googleFonts: [
    {
      name: 'Lato',
      styles: ['400', '700', '900'],
    },
    {
      name: 'Gentium Book Basic',
      styles: ['400', '400i', '700'],
    },
  ],
  headerFontFamily: ['Lato', 'sans-serif'],
  bodyFontFamily: ['Gentium Book Basic', 'serif'],
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
    },
    footer: {
      color: colors.darkPurple,
      fontFamily: options.headerFontFamily.join(', '),
    },
    header: {
      fontFamily: options.headerFontFamily.join(', '),
    },
  }),
}

const typography = new Typography(theme)

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
