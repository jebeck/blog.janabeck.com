import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { seafoam } from '../utils/colors'
import { rhythm } from '../utils/typography'

const Tag = styled.div`
  background-color: ${seafoam};
  border-radius: ${rhythm(0.125)};
  display: inline-block;
  font-weight: 300;
  margin: ${rhythm(0.125)} ${rhythm(0.0625)} 0;
  padding: ${rhythm(0.0625)} ${rhythm(0.25)};
`

function Tags({ tags }) {
  return (
    <div
      id="tags"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '0.6666666667rem',
        justifyContent: 'flex-end',
      }}
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
