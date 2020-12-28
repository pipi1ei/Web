import React, { PureComponent } from "react";
import styled from "styled-components";

const HomeWrapper = styled.div`
  color: purple;

  h2 {
    font-size: 50px;
  }

  ul > li {
    color: orange;

    &.active {
      color: red;
    }

    &:hover {
      background: #aaa;
    }

    &::after {
      content: "abc"
    }
  }
`

class Home extends PureComponent {
  render() {
    return (
      <div>
        <HomeWrapper>
          <h2>我是Home标题</h2>
          <ul>
            <li>我是列表1</li>
            <li>我是列表2</li>
            <li>我是列表3</li>
          </ul>
        </HomeWrapper>
      </div>
    )
  }
}

class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}

export default App;
