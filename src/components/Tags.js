import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { seafoam } from '../utils/colors'
import { rhythm, scale } from '../utils/typography'

const Tag = styled.div`
  background-color: ${seafoam};
  border-radius: ${rhythm(0.125)};
  display: inline-block;
  font-weight: 300;
  margin: 0 ${rhythm(0.0625)};
  padding: ${rhythm(0.0625)} ${rhythm(0.25)};
`

function Tags({ tags }) {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'flex-end', ...scale(-3 / 5) }}
    >
      {tags.map(tag => (
        <Tag key={tag}>{`#${tag}`}</Tag>
      ))}
    </div>
  )
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Tags
