import Home from '../Components/Home'
import Profile from '../Components/Profile'
import About, { AboutProduct, AboutMessage } from '../Components/About'
import NoMatch from '../Components/NoMatch'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/about',
    component: About,
    routes: [
      {
        path: '/about',
        exact: true,
        component: AboutProduct
      },
      {
        path: '/about/message',
        component: AboutMessage
      }
    ]
  },
  {
    component: NoMatch
  }
]

export default routes