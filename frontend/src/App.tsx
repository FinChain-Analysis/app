import './App.scss'
import GeoMapTrends from './components/GeoMap/GeoMapTrends'
import GoogleTrends from './components/GoogleTrends/GoogleTrends'
import PowerBiDashboard from './components/PowerBiDashboard/PowerBiDashboard'
import PriceInfo from './components/PriceInfo/PriceInfo'
import SentimentalAnalysis from './components/SentimentalAnalysis/SentimentalAnalysis'

function App() {

  return (
    <div id="app">
      <PriceInfo />
      <SentimentalAnalysis />
      <div className='trends'>
        <GoogleTrends />
        <GeoMapTrends />
      </div>
    </div>
  )
}

export default App
