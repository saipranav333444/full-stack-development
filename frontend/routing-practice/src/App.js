import './App.css'
import {Route, Switch} from 'react-router-dom'

import About from './components/About'
import Contact from './components/Contact'
import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'

const App = () => (
  <div className="app-container">
    <div className="container">
      <div className="components">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </div>
)

export default App
