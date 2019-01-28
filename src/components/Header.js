import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

import Link from '../styled/LinkWithOverline'
import { scale } from '../utils/typography'
import { lightSeafoam, seafoam } from '../utils/colors'

const ResponsiveHeader = styled.header`
  ${MOBILE_MEDIA_QUERY} {
    margin: 0 0.5rem 0.25rem;
    padding-top: 0;
    width: calc(100% - 1rem);
  }
  background-color: ${lightSeafoam};
  border-bottom: 1px solid ${seafoam};
  left: 0;
  line-height: 51.2px;
  margin: 0 1rem 0.5rem;
  padding-top: 8px;
  position: sticky;
  top: 0;
  width: calc(100% - 2rem);
  z-index: 100;
`

const Nav = styled.nav`
  ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    justify-content: flex-start;
    div {
      display: flex;
      justify-content: flex-end;
    }
  }
  display: flex;
  justify-content: space-between;
`

const BackLink = styled(Link)`
  font-size: 20px;
  font-weight: 900;
  &:hover {
    text-decoration: none;
  }
`

const NavLink = styled(Link).attrs(() => {
  return { activeClassName: 'active', style: { ...scale(0) } }
})`
  ${MOBILE_MEDIA_QUERY} {
    padding: 0 0.25rem;
  }
  font-weight: 400;
  padding: 0 0.75rem;
`

function Header({ showBackToPostsLink }) {
  return (
    <ResponsiveHeader>
      <Nav>
        {showBackToPostsLink ? (
          <BackLink to="/">
            <span role="img" aria-label="left arrow">
              ⬅️
            </span>
            &nbsp;back to recent posts
          </BackLink>
        ) : (
          <BackLink as="a" href="http://janabeck.com">
            <span role="img" aria-label="left arrow">
              ⬅️
            </span>
            &nbsp;back to janabeck.com
          </BackLink>
        )}
        <div>
          <NavLink to={`/`}>recent</NavLink>
          <NavLink to={`/posts/`}>all posts</NavLink>
        </div>
      </Nav>
    </ResponsiveHeader>
  )
}

Header.propTypes = {
  showBackToPostsLink: PropTypes.bool.isRequired,
}

export default Header
