export default function Icon(props) {
  const { size, color, icon, title, style: styleArg, ...svgProps } = props
  let svgExtraProps = {}

  if (size !== undefined) {
    svgExtraProps.width = `${size}px`
    svgExtraProps.height = `${size}px`
  } else {
    // default
    svgExtraProps.width = "24px"
    svgExtraProps.height = "24px"
  }

  if (color !== undefined) {
    svgExtraProps.style = { color, ...styleArg }
  }

  const IconComp = icon
  return <IconComp {...svgProps} {...svgExtraProps} />
}

