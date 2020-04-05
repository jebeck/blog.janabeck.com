import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"
import styled from "styled-components"
import { transparentize } from "polished"

import { analogous, text, textBg } from "../../janabeck.com/src/utils/colors"
import Layout from "../components/Layout"
import { rhythm } from "../../janabeck.com/src/utils/typography"
import SEO from "../components/SEO"
import Tags from "../components/Tags"

const MainText = styled.div`
  ${MOBILE_MEDIA_QUERY} {
    font-size: 0.875rem;
  }
  color: ${text};
  font-family: "Source Sans Pro";
  line-height: ${rhythm(1)};
`

const ContentContainer = styled.div`
  background-color: ${transparentize(0.4, textBg)};
  ${MOBILE_MEDIA_QUERY} {
    padding: ${rhythm(3 / 8)};
  }
  padding: ${rhythm(1.5)};
`

function Content({ data }) {
  const {
    frontmatter: { date, summary, tags, title },
    html,
  } = data
  return (
    <ContentContainer>
      <SEO title={title} description={summary} keywords={tags} />
      <h1 style={{ color: analogous[0] }}>{title}</h1>
      <Tags tags={tags} />
      <MainText>
        <p
          style={{
            color: analogous[3],
            display: `block`,
            marginBottom: rhythm(0.25),
            marginTop: rhythm(0.5),
            textAlign: "right",
          }}
        >
          {date}
        </p>
        <article
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            marginTop: rhythm(1),
          }}
        />
      </MainText>
    </ContentContainer>
  )
}

Content.propTypes = {
  data: PropTypes.shape({
    frontmatter: PropTypes.shape({
      date: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
}

function BlogPost({ data: { markdownRemark }, location }) {
  return (
    <Layout location={location}>
      <Content data={markdownRemark} />
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
