import React from 'react'

import { rhythm, scale } from '../utils/typography'

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer
      style={{
        bottom: rhythm(-0.75),
        position: 'absolute',
        right: rhythm(0.25),
        ...scale(-0.5),
      }}
    >
      {`© jana e. beck, 2019${currentYear > '2019' ? `–${currentYear}` : ''}`}
    </footer>
  )
}

export default Footer
