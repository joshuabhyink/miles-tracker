import './App.css';
import {Component} from 'react'
import Miles_dateTracker from './Components/Miles_dateTracker';
import './App.css'

const App = () => {
  return(
    <div className='body'>
      <h1 className='title'>Miles Tracker</h1>
      <Miles_dateTracker/>
    </div>
  )
}

export default App;
