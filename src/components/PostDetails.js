import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { darkGrey } from '../utils/colors'
import Link from '../styled/LinkWithOverline'
import MatchesMobile from '../utils/MatchesMobile'
import PostSummary from '../components/PostSummary'
import { scale } from '../utils/typography'
import Tags from './Tags'
import TimeToRead from './TimeToRead'

const ReadTime = styled(TimeToRead)`
  text-align: right;
`

const PostDate = styled.span`
  color: ${darkGrey};
`

function PostDetails({
  fields: { slug },
  frontmatter: { date, summary, tags, title },
  timeToRead,
}) {
  return (
    <li>
      <MatchesMobile>
        {matches => {
          if (matches) {
            return (
              <div style={{ ...scale(-0.25) }}>
                <PostDate>{`${date}: `}</PostDate>
                <Link to={slug} style={{ textDecoration: 'underline' }}>
                  {title}
                </Link>
              </div>
            )
          }
          return (
            <>
              <ReadTime timeToRead={timeToRead} />
              <div style={{ ...scale(0.5) }}>
                <PostDate>{`${date}: `}</PostDate>
                <Link to={slug}>{title}</Link>
              </div>
            </>
          )
        }}
      </MatchesMobile>
      <div>
        <PostSummary summary={summary} />
        <Tags tags={tags} />
      </div>
      <MatchesMobile>
        {matches => {
          if (matches) {
            return <ReadTime timeToRead={timeToRead} />
          }
          return null
        }}
      </MatchesMobile>
    </li>
  )
}

PostDetails.propTypes = {
  fields: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired,
  frontmatter: PropTypes.shape({
    date: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  timeToRead: PropTypes.number.isRequired,
}

export default PostDetails
