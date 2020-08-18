const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  name: state => state.user.name,
  password: state => state.user.password,
  userId: state => state.user.userId,
  roles: state => state.user.roles,
  routes: state => state.permission.routes,
}

export default getters