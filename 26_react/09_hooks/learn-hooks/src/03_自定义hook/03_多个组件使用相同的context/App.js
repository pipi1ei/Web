import { useContext, createContext } from 'react'

const UserContext = createContext({name: '默认', age: 0})
const TokenContext = createContext({token: '000000'})

function useUserAndToken() {
  const user = useContext(UserContext)
  const token = useContext(TokenContext)

  return [user, token]
}

function Home() {
  const [user, token] = useUserAndToken()
  console.log("Home", {user, token})

  return <h2>Home</h2>
}

function Profile() {
  const [user, token] = useUserAndToken()
  console.log("Profile", {user, token})

  return <h2>Profile</h2>
}

export default function App() {

  return (
    <div>
      <UserContext.Provider value={{name: 'pipi1ei', age: 18}}>
        <TokenContext.Provider value={{token: '123456'}}>
          <Home/>
          <Profile/>
        </TokenContext.Provider>
      </UserContext.Provider>
    </div>
  )
}