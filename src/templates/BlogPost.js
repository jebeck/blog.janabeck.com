import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { darkGrey, darkPurple } from '../utils/colors'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'
import SEO from '../components/SEO'
import Tags from '../components/Tags'

function BlogPost({ data: { markdownRemark } }) {
  const {
    frontmatter: { date, summary, tags, title },
    html,
  } = markdownRemark

  return (
    <Layout>
      <SEO title={title} description={summary} keywords={tags} />
      <h1>{title}</h1>
      <div style={{ color: darkPurple }}>
        <p
          style={{
            ...scale(-1 / 5),
            color: darkGrey,
            display: `block`,
            marginBottom: rhythm(0.25),
            marginTop: rhythm(-1),
            textAlign: 'right',
          }}
        >
          {date}
        </p>
        <Tags tags={tags} />
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          style={{ lineHeight: 1.6875, marginTop: rhythm(1) }}
        />
      </div>
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
