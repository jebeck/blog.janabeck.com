import React from 'react'
import PropTypes from 'prop-types'

import { darkGrey } from '../utils/colors'
import Link from '../styled/LinkWithOverline'
import MatchesMobile from '../utils/MatchesMobile'
import PostSummary from '../components/PostSummary'
import { rhythm } from '../utils/typography'
import Tags from './Tags'
import TimeToRead from './TimeToRead'

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
              // manually calculate lineHeight because scale() doesn't go below base when negative :(
              <div style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                <span style={{ color: darkGrey }}>{`${date}: `}</span>
                <Link to={slug} style={{ textDecoration: 'underline' }}>
                  {title}
                </Link>
              </div>
            )
          }
          return (
            <>
              <TimeToRead timeToRead={timeToRead} />
              <div style={{ fontSize: '1.3333333333rem', lineHeight: 1.5 }}>
                <span style={{ color: darkGrey }}>{`${date}: `}</span>
                <Link to={slug}>{title}</Link>
              </div>
            </>
          )
        }}
      </MatchesMobile>
      <div style={{ marginBottom: rhythm(0.25) }}>
        <PostSummary summary={summary} />
        <Tags tags={tags} />
      </div>
      <MatchesMobile>
        {matches => {
          if (matches) {
            return <TimeToRead timeToRead={timeToRead} />
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
