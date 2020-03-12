import Olreact from './Olreact'

function render(vnode, container) {
  container.innerHTML = ''
  _render(vnode, container)
}
function _render(vnode, container) {
  let dom = createDomFromVnode(vnode)
  container.appendChild(dom)
}

function createDomFromVnode(vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(vnode)
  }
  if (typeof vnode === 'object') {
    if (typeof vnode.type === 'function') {
      let component = createComponent(vnode.type, vnode.config)
      renderComponent(component)
      return component.$root
    }
    let dom = document.createElement(vnode.type)
    setConfig(dom, vnode.config)
    // 如果有子节点
    if (vnode.children && Array.isArray(vnode.children)) {
      vnode.children.forEach(vnodeChild => {
        _render(vnodeChild, dom)
      })
    }
    return dom
  }
}

function setConfig(dom, config) {
  for (let key in config) {
    if (/^on/.test(key)) {  //如果是on开头的事件
      dom[key.toLocaleLowerCase()] = config[key]  //把事件名改为小写，并且作为属性加到dom节点上
    } else if (key === 'style') {     //如果是style
      //把样式信息拷贝到dom.style上。注意：这里必须使用assign，若直接给style赋值不生效。
      Object.assign(dom.style, config[key])
    } else {
      console.log(key)
      dom[key] = config[key]
    }
  }
}

let c = []
function createComponent(constructor, config) {
  let component
  if (constructor.prototype instanceof Olreact.Component) { //如果是类组件
    component = new constructor(config)//调用类组件，生成实例
  } else {  //如果是函数组件
    component = new Olreact.Component(config)
    component.constructor = constructor
    component.render = function () {
      return this.constructor(config)
    }
  }
  c.push(component)
  return component
}
function renderComponent(component) {
  let vnode = component.render()
  let dom = createDomFromVnode(vnode)

  if (component.$root && component.$root.parentNode) {
    component.$root.parentNode.replaceChild(dom, component.$root)
  }
  component.$root = dom
}
export default {
  render, renderComponent
}