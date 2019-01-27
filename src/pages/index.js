import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const IndexPage = () => (
  <Layout>
    <SEO title="home" />
    <h1 style={{ fontWeight: 900 }}>recent blog posts</h1>
  </Layout>
)

export default IndexPage
