import './App.scss'
import PoolIndicator from './components/PoolIndicator/PoolIndicator'
import PowerBiDashboard from './components/PowerBiDashboard/PowerBiDashboard'
import PriceInfo from './components/PriceInfo/PriceInfo'

function App() {

  return (
    <div id="app">
      <PriceInfo />
      <PowerBiDashboard />
      <PoolIndicator />
    </div>
  )
}

export default App
