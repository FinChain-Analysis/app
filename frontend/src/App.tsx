import './App.scss'
import GoogleTrends from './components/GoogleTrends/GoogleTrends'
import PowerBiDashboard from './components/PowerBiDashboard/PowerBiDashboard'
import PriceInfo from './components/PriceInfo/PriceInfo'

function App() {

  return (
    <div id="app">
      <PriceInfo />
      <PowerBiDashboard />
      <GoogleTrends />
    </div>
  )
}

export default App
