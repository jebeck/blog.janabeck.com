import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

import 'normalize.css'

import Header from './header'
import Footer from './Footer'

const ResponsiveMain = styled.main`
  margin: 0 auto;
  ${MOBILE_MEDIA_QUERY} {
    max-width: 95%;
  }
  max-width: 36rem;
`

const Layout = ({ children }) => (
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
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <ResponsiveMain>{children}</ResponsiveMain>
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
