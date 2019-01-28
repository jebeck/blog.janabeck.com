import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

function MatchesMobile({ children }) {
  const mediaQuery = /(\(.*\))/.exec(MOBILE_MEDIA_QUERY)[1]
  return <MediaQuery query={mediaQuery}>{children}</MediaQuery>
}

MatchesMobile.propTypes = {
  children: PropTypes.func.isRequired,
}

export default MatchesMobile
