import './App.css';
import {Component} from 'react'
import axios from 'axios'

class App extends Component {
  constructor(){
    super()

  }
  render(){
    return(
      <div>
        <entries/>
      </div>
    )
  }
}

export default App;
