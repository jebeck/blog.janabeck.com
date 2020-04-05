import React from "react"

import { rhythm } from "../../janabeck.com/src/utils/typography"
import { text } from "../../janabeck.com/src/utils/colors"

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer
      style={{
        bottom: "0.25rem",
        color: text,
        fontSize: "0.75rem",
        position: "absolute",
        right: rhythm(0.25),
      }}
    >
      {`© jana e. beck, 2019${currentYear > "2019" ? `–${currentYear}` : ""}`}
    </footer>
  )
}

export default Footer
