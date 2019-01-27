import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostList from '../styled/PostList'
import PostSummary from '../components/PostSummary'
import SEO from '../components/SEO'

const Index = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <Layout>
      <SEO title="recent posts" keywords={['blog']} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <h1 style={{ fontWeight: 900 }}>recent blog posts</h1>
        <PostList id="recent-posts">
          {edges.map(({ node }) => {
            return <PostSummary key={node.id} {...node} />
          })}
        </PostList>
      </div>
    </Layout>
  )
}

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            summary
            tags
            title
          }
          id
          timeToRead
        }
      }
    }
  }
`

export default Index
