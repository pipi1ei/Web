import React, { PureComponent } from 'react'

function LoginPage() {
  return <h2>LoginPage</h2>
}

function CartPage() {
  return <h2>CartPage</h2>
}

function authentication(Page) {
  return props => {
    if(props.isLogin) {
      return <Page />
    } else {
      return <LoginPage />
    }
  }
}

const AuthCart = authentication(CartPage)

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <AuthCart isLogin={true} />
      </div>
    )
  }
}