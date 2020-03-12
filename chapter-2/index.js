import Olreact from './lib/Olreact'
import OlreactDom from './lib/OlreactDom'

class App extends Olreact.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'jack',
      hobby: 'swim'
    }
  }
  update(newName) {
    console.log
    this.setState({ name: newName })
  }
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <Foo update={this.update.bind(this)} name={this.state.name}></Foo>
        <Hobby hobby={this.state.hobby} />
      </div>
    )
  }
}

class Foo extends Olreact.Component {
  updateName() {
    this.props.update('Oliver')
  }
  render() {
    return (
      <div>
        {this.props.name}
        <button onClick={this.updateName.bind(this)}>修改名字</button>
      </div>
    )
  }
}

function Hobby(props) {
  let sayHi = () => { console.log('hi') }
  return (
    <p onClick={sayHi}>我的兴趣是{props.hobby}</p>
  )
}

OlreactDom.render(<App />, document.querySelector('#app'))