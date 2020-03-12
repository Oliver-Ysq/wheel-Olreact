import OlreactDom from './OlreactDom'
function createElement(type, config, ...children) {
  return {
    type, config, children
  }
}
class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }
  setState(state) {
    this.state = Object.assign(this.state, state)
    OlreactDom.renderComponent(this)
  }
}

export default {
  createElement,
  Component
}