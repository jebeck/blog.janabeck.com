import styled from "styled-components"
import { transparentize } from "polished"

import { analogous, textBg } from "../../janabeck.com/src/utils/colors"

export default function addGradientBorder(Component) {
  return styled(Component)`
    background-color: ${transparentize(0.4, textBg)};
    border: solid;
    border-image-slice: 10;
    border-image-source: ${`linear-gradient(
    ${analogous[0]} 33.33%,
    ${analogous[1]} 46.67%,
    ${analogous[2]} 60%,
    ${analogous[3]} 73.33%,
    ${analogous[4]} 86.67%
  )`};
    border-image-width: 0.25rem;
  `
}
