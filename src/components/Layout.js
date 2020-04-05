import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import 'normalize.css'

import Header from './Header'
import Footer from './Footer'
import GlobalStyles from '../styled/GlobalStyles'
import { rhythm } from '../../janabeck.com/src/utils/typography'

function Layout({ children, location }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={() => (
        <div
          style={{
            minHeight: `calc(100vh - ${rhythm(0.75)})`,
            position: 'relative',
          }}
        >
          <GlobalStyles />
          <Header showBackToPostsLink={Boolean(location)} />
          <main>{children}</main>
          <Footer />
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }),
}

export default Layout
