import React from 'react'

import { rhythm, scale } from '../utils/typography'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer
      style={{
        bottom: rhythm(0.125),
        position: 'fixed',
        right: rhythm(0.25),
        ...scale(-0.5),
      }}
    >
      {`© jana e. beck, 2019${currentYear > '2019' ? `–${currentYear}` : ''}`}
    </footer>
  )
}

export default Footer
