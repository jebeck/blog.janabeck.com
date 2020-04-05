import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

import { text } from "../../janabeck.com/src/utils/colors"
import PostSummary from "../components/PostSummary"
import Tags from "./Tags"
import TimeToRead from "./TimeToRead"

const MainText = styled.div`
  ${MOBILE_MEDIA_QUERY} {
    font-size: 0.875rem;
    a {
      text-decoration: underline;
    }
  }
  font-size: 1.3333333333rem;
  line-height: 1.5;
  span {
    color: ${text};
  }
`

function PostDetails({
  fields: { slug },
  frontmatter: { date, summary, tags, title },
  timeToRead,
}) {
  return (
    <li>
      <TimeToRead timeToRead={timeToRead} />
      <MainText style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
        <span style={{ color: text }}>{`${date}: `}</span>
        <Link to={slug}>{title}</Link>
      </MainText>
      <PostSummary summary={summary} />
      <Tags tags={tags} />
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
