import React, { PropTypes } from 'react'

const stroke = '#333333'
const strokeWidth = 3
const highlightedStrokeWidth = 4

const Link = ({
  x, y,
  x2, y2,
  pinRadius,
  selected, selectLink
}) => (
  <g
    onMouseDown={selectLink}
  >
    <circle
      cx={x}
      cy={y}
      r={strokeWidth}
    />
    <line
      x1={x} y1={y} x2={x2} y2={y2}
      stroke={stroke}
      strokeWidth={selected ? highlightedStrokeWidth : strokeWidth}
    />
    <circle
      cx={x2}
      cy={y2}
      r={strokeWidth}
    />
  </g>
)

Link.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  selectLink: PropTypes.func.isRequired
}

export default Link