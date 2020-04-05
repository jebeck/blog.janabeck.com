import React from "react"
import PropTypes from "prop-types"

import { analogous } from "../../janabeck.com/src/utils/colors"
import { rhythm } from "../../janabeck.com/src/utils/typography"

function TimeToRead({ timeToRead }) {
  return (
    <div
      style={{
        color: analogous[3],
        fontSize: "0.6666666667rem",
        paddingBottom: rhythm(1 / 2),
        textAlign: "right",
      }}
    >
      <span role="img" aria-label="mantelpiece clock emoji">
        🕰️
      </span>
      &nbsp;{`approx. ${timeToRead}m to read`}
    </div>
  )
}

TimeToRead.propTypes = {
  timeToRead: PropTypes.number.isRequired,
}

export default TimeToRead
