// import NavBar from './NavBarChildren'
import NavBar from './NavBarProps'

function App() {
  const navLeft = <div>返回</div>
  const navCenter = <div>购物街</div>
  const navRight = <div>更多</div>

  return (
    <div>
      <NavBar leftSlot={navLeft} centerSlot={navCenter} rightSlot={navRight} />

      {/* children 方式实现插槽 */}
      <NavBar>
        <div>返回</div>
        <div>购物街</div>
        <div>更多</div>
      </NavBar>
    </div>
  );
}

export default App;
