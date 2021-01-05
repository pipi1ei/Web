import { PureComponent } from "react";

export default class Details extends PureComponent {
  render() {
    console.log(this.props.match.params)
    return (
      <div>
        <h2>动态路由方式</h2>
        <h2>Detail: {this.props.match.params.id}</h2>
      </div>
    )
  }
}