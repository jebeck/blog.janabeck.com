import React from 'react'

import { rhythm, scale } from '../utils/typography'

const Footer = () => (
  <footer
    style={{
      bottom: rhythm(0.125),
      position: 'fixed',
      right: rhythm(0.25),
      ...scale(-0.5),
    }}
  >
    {`© jana e. beck 2012–${new Date().getFullYear()}`}
  </footer>
)

export default Footer
