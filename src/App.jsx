
import './App.css'
import FreeToPlaySection from './components/FreeToPlaySection'
import HeroSection from './components/HeroSection'
import HowToPlay from './components/HowToPlay'
import  Navbar  from './components/Navbar'
import SweepstakesPlatforms from './components/SweepStakes'

function App() {
 

  return (
    <div className='bg-black'>
      <Navbar/>
      <HeroSection/>
      <FreeToPlaySection/>
      <SweepstakesPlatforms/>
      <HowToPlay/>
    </div>
  )
}

export default App
