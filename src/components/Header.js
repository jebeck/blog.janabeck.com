import PropTypes from 'prop-types'
import React from 'react'

import Link from '../styled/LinkWithOverline'
import { scale } from '../utils/typography'

const Header = ({ siteTitle }) => {
  return (
    <header
      style={{
        borderBottom: '1px solid #affcf8',
        display: 'flex',
        justifyContent: 'space-between',
        left: '0',
        margin: '0.5rem 1.25rem',
        position: 'fixed',
        top: '0',
        width: 'calc(100% - 2.5rem)',
      }}
    >
      <Link to="/" style={{ fontWeight: 900, ...scale(0.45) }}>
        {siteTitle}
      </Link>
      <nav>
        {['about', 'archive', 'contact', 'projects', 'résumé', 'speaking'].map(
          page => (
            <Link
              key={page}
              to={`/${page.replace(/é/g, 'e')}/`}
              style={{ fontWeight: 400, padding: `0 0.75rem` }}
            >
              {page}
            </Link>
          )
        )}
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
