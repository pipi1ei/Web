import React, { PureComponent } from 'react'

class Home extends PureComponent {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <p>我是Home的元素</p>
      </div>
    )
  }
}

class Detail extends PureComponent {
  render() {
    return (
      <div>
        <h2>我是Detail的元素</h2>
        <p>我是我是Detail的元素的元素</p>
      </div>
    )
  }
}

function logRenderTime(WrappedCpn) {
  return class extends PureComponent {
    UNSAFE_componentWillMount() {
      this.begin = Date.now()
    }
  
    componentDidMount() {
      this.displayName = WrappedCpn.name
      this.end = Date.now()
      const interval = this.end - this.begin;
      console.log(`${this.displayName}渲染使用时间:${interval}`)
    }

    render() {
      return <WrappedCpn {...this.props} />
    }
  }
}

const LogHome = logRenderTime(Home)
const LogDetail = logRenderTime(Detail)

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <LogHome />
        <LogDetail />
      </div>
    )
  }
}