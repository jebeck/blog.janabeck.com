import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

import { darkPurple } from '../utils/colors'
import MatchesMobile from '../utils/MatchesMobile'
import { rhythm } from '../utils/typography'

const SummaryP = styled.p`
  ${MOBILE_MEDIA_QUERY} {
    margin: ${rhythm(0.125)} 0 0 ${rhythm(0.25)};
  }
  color: ${darkPurple};
  margin: ${rhythm(0.25)} 0 ${rhythm(0.25)} ${rhythm(0.5)};
  text-align: right;
`

function PostSummary({ summary }) {
  return (
    <MatchesMobile>
      {matches => {
        if (matches) {
          return (
            <SummaryP style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
              {summary}
            </SummaryP>
          )
        }
        return (
          <SummaryP style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
            {summary}
          </SummaryP>
        )
      }}
    </MatchesMobile>
  )
}

PostSummary.propTypes = {
  summary: PropTypes.string.isRequired,
}

export default PostSummary
