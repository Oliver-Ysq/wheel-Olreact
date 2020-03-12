const Olreact = {
  createElement
}
const OlreactDom = { render }

function createElement(type, config, ...children) {
  return {
    type, config, children
  }
}
function render(vnode, container) {
  container.innerHTML = ''
  _render(vnode, container)
}
function _render(vnode, container) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return container.appendChild(document.createTextNode(vnode))
  }
  if (typeof vnode === 'object') {
    let dom = document.createElement(vnode.type)
    setConfig(dom, vnode.config)
    if (vnode.children && Array.isArray(vnode.children)) {
      vnode.children.forEach(vnodeChild => {
        _render(vnodeChild, dom)
      })
    }
    container.appendChild(dom)
  }
}

function setConfig(dom, config) {
  for (let key in config) {
    if (/^on/.test(key)) {
      dom[key.toLocaleLowerCase()] = config[key]
    } else if (key === 'style') {
      Object.assign(dom.style, config[key])
    } else {
      dom[key] = config[key]
    }
  }
}


let name = 'Oliver'
let num = 0
let timer = null
const styleObj = {
  color: 'red',
  fontSize: '20px'
}

const onStart = () => {
  console.log('start')
  timer = setInterval(() => {
    num++
    OlreactDom.render((  //虚拟dom
      <div className="container">
        <h1 namex="title" style={styleObj}>Number:{num}</h1>
        <button onClick={onStart}> start </button>
        <button onClick={onPause}> pause </button>
      </div>
    ), document.querySelector('#app'))
  }, 1000)
}
const onPause = () => {
  clearInterval(timer)
}

onStart()

const el = (  //虚拟dom
  <div className="container">
    <h1 namex="title" style={styleObj}>Number:{num}</h1>
    <button onClick={onStart}> start </button>
    <button onClick={onPause}> pause </button>
  </div>
)

OlreactDom.render(el, document.querySelector('#app'))