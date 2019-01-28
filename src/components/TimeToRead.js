import React from 'react'
import PropTypes from 'prop-types'

import { scale } from '../utils/typography'

function TimeToRead({ className, timeToRead }) {
  return (
    <div className={className} style={{ ...scale(-3 / 5) }}>
      <span role="img" aria-label="mantelpiece clock emoji">
        🕰️
      </span>
      &nbsp;{`approx. ${timeToRead}m to read`}
    </div>
  )
}

TimeToRead.propTypes = {
  className: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
}

export default TimeToRead
