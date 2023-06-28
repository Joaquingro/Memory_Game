
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './components/Landing/Landing'
import { Home } from './components/Home/Home'

function App() {

  return (
    <>
    <Routes>
      <Route exact path='/' element= {<Landing/>}></Route>
      <Route path='/home' element= {<Home/>}></Route>
    </Routes>
    </>
  )
}

export default App
