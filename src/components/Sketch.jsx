import React, { Component } from 'react'
import PropTypes from 'prop-types'
import p5 from 'p5/lib/p5.min'

class P5Wrapper extends Component {
  constructor(props) {
    super(props)
    this.element = React.createRef()
  }

  componentDidMount() {
    const { sketch } = this.props
    this.redrawSketch(sketch)
  }

  componentWillReceiveProps(newprops) {
    const { sketch } = this.props

    if (sketch !== newprops.sketch) {
      this.redrawSketch(newprops.sketch)
    }
  }

  redrawSketch(sketch) {
    const canvas = this.element.current

    if (canvas.childNodes[0]) {
      canvas.removeChild(canvas.childNodes[0])
    }

    // eslint-disable-next-line new-cap
    this.element.current = new p5(sketch, canvas)
  }

  render() {
    return <div ref={this.element} />
  }
}

P5Wrapper.propTypes = {
  sketch: PropTypes.func.isRequired,
}

const withSketch = sketch => () => <P5Wrapper sketch={sketch} />

export default P5Wrapper
export { withSketch }
