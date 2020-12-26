import React, { PureComponent } from 'react'

class Header extends PureComponent {
  render() {
    const { name, age, height } = this.props

    return <h2>Header { name + age + height }</h2>
  }
}

function enhanceProps(WrappedCpn, otherProps) {
  return props => <WrappedCpn {...props} {...otherProps} />
}

const EnhanceHeader = enhanceProps(Header, { height: 188 });

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <EnhanceHeader name="pipilei" age="18" />
      </div>
    );
  }
  
}
