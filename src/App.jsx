import { useState } from 'react'

import './App.css'
import Weather from './Component/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='app'>
    <Weather/>
   </div>
  )
}

export default App
