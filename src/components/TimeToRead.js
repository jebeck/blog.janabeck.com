import React from 'react'
import PropTypes from 'prop-types'

function TimeToRead({ timeToRead }) {
  return (
    <div style={{ fontSize: '0.6666666667rem', textAlign: 'right' }}>
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
