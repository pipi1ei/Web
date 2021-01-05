import { PureComponent } from "react";

export default class Details extends PureComponent {
  render() {
    console.log(this.props.location.search)
    return (
      <div>
        <h2>search方式</h2>
        <h2>Detail: {this.props.location.search}</h2>
      </div>
    )
  }
}