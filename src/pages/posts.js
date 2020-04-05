import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import styled from "styled-components"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

import Layout from "../components/Layout"
import PostList from "../styled/PostList"
import PostDetails from "../components/PostDetails"
import Heading from "../styled/PostsHeading"
import SEO from "../components/SEO"

const Container = styled.div`
  ${MOBILE_MEDIA_QUERY} {
    height: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh;
`

function Posts({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const heading = "all posts"
  return (
    <Layout>
      <SEO title={heading} keywords={["blog"]} />
      <Container>
        <Heading>{heading}</Heading>
        <PostList id="recent-posts">
          {edges.map(({ node }) => {
            return <PostDetails key={node.id} {...node} />
          })}
        </PostList>
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
