import  { PureComponent } from "react"
import { Route, Link, Switch } from 'react-router-dom'

function AboutProduct() {
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
    </ul>
  )
}

function AboutMessage() {
  return (
    <ul>
      <li>消息列表1</li>
      <li>消息列表2</li>
      <li>消息列表3</li>
    </ul>
  )
}

export default class About extends PureComponent {
  render() {
    return (
      <div>
        <Link to="/about">商品</Link>
        <Link to="/about/message">消息</Link>

        <Switch>
          <Route exact path="/about" component={AboutProduct} />
          <Route path="/about/message" component={AboutMessage} />
        </Switch>
      </div>
    )
  }
}