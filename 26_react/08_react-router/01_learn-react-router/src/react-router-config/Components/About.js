import { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

export function AboutProduct() {
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
    </ul>
  )
}

export function AboutMessage() {
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
    console.log('about', this.props.route.routes)

    return (
      <div>
        <Link to="/about">商品</Link>
        <Link to="/about/message">消息</Link>

        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}