import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

import { darkGrey, darkPurple } from '../utils/colors'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'
import SEO from '../components/SEO'
import Tags from '../components/Tags'

const MainText = styled.div`
  ${MOBILE_MEDIA_QUERY} {
    font-size: 0.75rem;
  }
  color: ${darkPurple};
`

function BlogPost({ data: { markdownRemark }, location }) {
  const {
    frontmatter: { date, summary, tags, title },
    html,
  } = markdownRemark

  return (
    <Layout location={location}>
      <SEO title={title} description={summary} keywords={tags} />
      <h1>{title}</h1>
      <Tags tags={tags} />
      <MainText>
        <p
          style={{
            color: darkGrey,
            display: `block`,
            marginBottom: rhythm(0.25),
            marginTop: rhythm(0.5),
            textAlign: 'right',
          }}
        >
          {date}
        </p>
        <article
          dangerouslySetInnerHTML={{ __html: html }}
          style={{ marginTop: rhythm(1) }}
        />
      </MainText>
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        summary
        tags
        title
      }
      html
    }
  }
`
