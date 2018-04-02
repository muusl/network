import React from "react"
import PropTypes from "prop-types"
import { render as reactrender } from "react-dom"

export function render(network, activations) {
  const root = document.getElementById("root")
  reactrender(<Network network={network} activations={activations} />, root)
  // network.layers.forEach(layer => {
  //   render
  // })
}

class Network extends React.Component {
  render() {
    const { network, activations } = this.props
    return (
      <div>
        <h1>Network</h1>
        {network.layers.map(({ type }) => type).join(" => ")}

        {network.layers.map((layer, i) => {
          console.log(layerRenderers)
          const Comp = layerRenderers[layer.type] || Layer
          return <Comp layer={layer} activation={activations[i]} />
        })}
      </div>
    )
  }
}

class Layer extends React.Component {
  render() {
    return (
      <div style={{ border: "1px solid black" }}>
        <h3>{this.props.layer.type}</h3>
      </div>
    )
  }
}

class LinearLayer extends React.Component {
  render() {
    const { activation, layer } = this.props
    return (
      <div style={{ border: "1px solid black" }}>
        <h3>{layer.type}</h3>
        <Image data={activation.output} height={1} width={layer.in} />
        <pre>{JSON.stringify(layer, null, " ")}</pre>
      </div>
    )
  }
}

class ConvolutionalLayer extends React.Component {
  render() {
    const { layer, activation } = this.props
    return (
      <div style={{ border: "1px solid black" }}>
        <h3>Convolutional Layer</h3>
        <fieldset>
          <legend>Input</legend>
          <Image
            data={activation.input[0]}
            width={layer.inW}
            height={layer.inH}
          />
        </fieldset>
        <fieldset>
          <legend>Filters ({layer.filters.length})</legend>
          {layer.filters.map(filter => {
            return (
              <Image
                data={filter}
                width={layer.filterSize}
                height={layer.filterSize}
              />
            )
          })}
        </fieldset>
        <fieldset>
          <legend>Output</legend>
          {layer.filters.map((_, i) => {
            const data = activation.output[0].slice(
              layer.outW * layer.outH * i,
              layer.outW * layer.outH * (i + 1)
            )
            return <Image data={data} width={layer.outW} height={layer.outH} />
          })}
        </fieldset>
      </div>
    )
  }
}

const layerRenderers = {
  convolutional: ConvolutionalLayer,
  linear: LinearLayer,
}

class Image extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number),
    width: PropTypes.number,
    height: PropTypes.number,
  }

  state = {
    val: "",
  }

  renderPixels() {
    const { width, height, data } = this.props
    let pixels = []
    const mx = Math.max.apply(null, data)
    const mn = Math.min.apply(null, data)
    const scale = x => Math.floor(256 * (x - mn) / mx)

    for (let i = 0; i < height; i++) {
      let row = data.slice(i * width, (i + 1) * width)
      row = row.map((val, x) => {
        const col = scale(val)
        return (
          <rect
            width={10}
            height={10}
            x={x * 10}
            y={i * 10}
            style={{ fill: `rgb(${col}, ${col}, ${col})` }}
            onMouseEnter={e => this.setState({ val })}
          />
        )
      })
      pixels = pixels.concat(row)
    }
    return pixels
  }

  render() {
    const { width, height, data } = this.props
    return (
      <div style={{ display: "inline-block", verticalAlign: "top" }}>
        <svg
          width={width * 10}
          height={height * 10}
          style={{ padding: 10 }}
          onMouseLeave={() => this.setState({ val: null })}
        >
          {this.renderPixels()}
        </svg>
        <p>{this.state.val}</p>
      </div>
    )
  }
}
