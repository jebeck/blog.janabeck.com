import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { transparentize } from "polished"

import { analogous } from "../../janabeck.com/src/utils/colors"
import { rhythm } from "../../janabeck.com/src/utils/typography"

const Tag = styled.div`
  background-color: ${transparentize(0.33, analogous[4])};
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
        display: "flex",
        flexWrap: "wrap",
        fontSize: "0.6666666667rem",
        justifyContent: "flex-end",
      }}
    >
      {tags.map((tag) => (
        <Tag key={tag}>{`#${tag}`}</Tag>
      ))}
    </div>
  )
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Tags
