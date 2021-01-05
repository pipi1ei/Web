import { PureComponent } from "react";

export default class Details extends PureComponent {
  render() {
    console.log(this.props.location)
    return (
      <div>
        <h2>to传递对象方式</h2>
        <h2>Detail3: 
          {this.showObject(this.props.location)}
        </h2>
      </div>
    )
  }

  showObject(obj) {
    const keys = Object.keys(obj)
    return keys.map(key => {
      let result = '';
      if(typeof obj[key] === 'object') {
        result = this.showObject(obj[key])
      } else {
        result = <p key={key}>{key}: {obj[key]}</p>
      }
      return result
    })
  }
}