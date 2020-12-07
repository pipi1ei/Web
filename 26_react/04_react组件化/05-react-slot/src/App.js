// import NavBar from './NavBarChildren'
import NavBar from './NavBarProps'

function App() {
  const navLeft = <div>返回</div>
  const navCenter = <div>购物街</div>
  const navRight = <div>更多</div>

  return (
    <div>
      <NavBar leftSlot={navLeft} centerSlot={navCenter} rightSlot={navRight} />
    </div>
  );
}

export default App;
