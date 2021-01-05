// 路由传递参数

import { PureComponent } from "react";
import { Link, NavLink, Route } from "react-router-dom";

import Detail from './components/Details'
import Detail2 from './components/Details2'
import Detail3 from './components/Details3'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        {/* 动态路由方式 */}
        <Link to="/detail/123">详情</Link>
        <Route exact path="/detail/:id" component={Detail}></Route>

        {/* search方式 */}
        <Link to="/detail2?name=why&age=18">详情2</Link>
        <Route exact path="/detail2" component={Detail2}></Route>


        {/* to传递对象方式 */}
        <NavLink to={{
          pathname: "/detail3", 
          query: {name: "kobe", age: 30},
          state: {height: 1.98, address: "洛杉矶"},
          search: "?apikey=123"
        }}>
          详情2
        </NavLink>
        <Route exact path="/detail3" component={Detail3}></Route>
      </div>
    )
  }
}