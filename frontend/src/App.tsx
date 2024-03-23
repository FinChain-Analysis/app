import './App.scss'
import GoogleTrends from './components/GoogleTrends/GoogleTrends'
import PoolIndicator from './components/PoolIndicator/PoolIndicator'
import PowerBiDashboard from './components/PowerBiDashboard/PowerBiDashboard'
import PriceInfo from './components/PriceInfo/PriceInfo'

function App() {

  return (
    <div id="app">
      <PriceInfo />
      <PowerBiDashboard />
      <GoogleTrends />
      <PoolIndicator />
    </div>
  )
}

export default App
