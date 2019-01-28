import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

import Layout from '../components/Layout'
import Link from '../styled/LinkWithOverline'
import MatchesMobile from '../utils/MatchesMobile'
import PostList from '../styled/PostList'
import PostDetails from '../components/PostDetails'
import { scale } from '../utils/typography'
import SEO from '../components/SEO'

const Container = styled.div`
  ${MOBILE_MEDIA_QUERY} {
    height: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh;
`

const Heading = styled.h1`
  font-weight: 900;
`

function Posts({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const heading = 'all posts'
  return (
    <Layout>
      <SEO title={heading} keywords={['blog']} />
      <Container>
        <MatchesMobile>
          {matches => {
            if (matches) {
              return <Heading style={{ ...scale(0.5) }}>{heading}</Heading>
            }
            return <Heading style={{ ...scale(1) }}>{heading}</Heading>
          }}
        </MatchesMobile>
        <PostList id="recent-posts">
          {edges.map(({ node }) => {
            return <PostDetails key={node.id} {...node} />
          })}
        </PostList>
        <MatchesMobile>
          {matches => {
            if (matches) {
              return (
                <h2 style={{ textAlign: 'right', ...scale(3 / 10) }}>
                  pre-2019 posts on{' '}
                  <Link
                    as="a"
                    href="http://janabeck.com/archive/"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                    target="_blank"
                  >
                    janabeck.com
                  </Link>
                </h2>
              )
            }
            return (
              <h2 style={{ textAlign: 'right' }}>
                pre-2019 posts on{' '}
                <Link
                  as="a"
                  href="http://janabeck.com/archive/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  janabeck.com
                </Link>
              </h2>
            )
          }}
        </MatchesMobile>
      </Container>
    </Layout>
  )
}

Posts.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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

export default Posts
