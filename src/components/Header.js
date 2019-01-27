import React from 'react'
import styled from 'styled-components'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

import Link from '../styled/LinkWithOverline'

const ResponsiveHeader = styled.header`
  ${MOBILE_MEDIA_QUERY} {
    margin: 0.25rem 0.5rem;
    width: calc(100% - 1rem);
  }
  border-bottom: 1px solid #affcf8;
  left: 0;
  margin: 0.5rem 1.25rem;
  position: fixed;
  top: 0;
  width: calc(100% - 2.5rem);
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

const JanaBeckDotComLink = styled(Link)`
  font-size: 20px;
  font-weight: 900;
  &:hover {
    text-decoration: none;
  }
`

const NavLink = styled(Link).attrs(() => {
  return { activeClassName: 'active' }
})`
  ${MOBILE_MEDIA_QUERY} {
    padding: 0 0.25rem;
  }
  font-weight: 400;
  padding: 0 0.75rem;
`

const Header = () => {
  return (
    <ResponsiveHeader>
      <Nav>
        <JanaBeckDotComLink as="a" href="http://janabeck.com">
          <span role="img" aria-label="left arrow">
            ⬅️
          </span>
          &nbsp;back to janabeck.com
        </JanaBeckDotComLink>
        <div>
          <NavLink to={`/`}>recent</NavLink>
          <NavLink to={`/posts/`}>all posts</NavLink>
        </div>
      </Nav>
    </ResponsiveHeader>
  )
}

export default Header
