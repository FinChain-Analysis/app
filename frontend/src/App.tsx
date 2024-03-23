import './App.scss'
import GeoMapTrends from './components/GeoMap/GeoMapTrends'
import GoogleTrends from './components/GoogleTrends/GoogleTrends'
import PriceInfo from './components/PriceInfo/PriceInfo'
import SentimentalAnalysis from './components/SentimentalAnalysis/SentimentalAnalysis'

function App() {

  return (
    <div id="app">
      <div className="sentiment-price">
        <PriceInfo />
        <SentimentalAnalysis />
      </div>
      <div className='trends'>
        <GoogleTrends />
        <GeoMapTrends />
      </div>
    </div>
  )
}

export default App
