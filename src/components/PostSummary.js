import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

import { darkPurple } from '../utils/colors'
import { rhythm } from '../../janabeck.com/src/utils/typography'

const SummaryP = styled.p`
  ${MOBILE_MEDIA_QUERY} {
    font-size: 0.75rem;
    margin: ${rhythm(0.125)} 0 0 ${rhythm(0.25)};
  }
  color: ${darkPurple};
  font-size: 0.875rem;
  line-height: 1.5;
  margin: ${rhythm(0.25)} 0 ${rhythm(0.25)} ${rhythm(0.5)};
  text-align: right;
`

function PostSummary({ summary }) {
  return <SummaryP>{summary}</SummaryP>
}

PostSummary.propTypes = {
  summary: PropTypes.string.isRequired,
}

export default PostSummary
