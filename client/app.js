import React from 'react'
import {NewNavbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="container-fluid">
      <NewNavbar />
      <Routes />
    </div>
  )
}

export default App
