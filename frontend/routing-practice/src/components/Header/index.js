import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="logo-and-items-container">
    <div className="logo-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png"
        className="logo"
        alt="wave"
      />
      <h1 className="logo-heading">Wave</h1>
    </div>

    <ul className="nav-items-container">
      <li>
        <Link to="/" className="components-link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" className="components-link">
          About
        </Link>
      </li>
      <li>
        <Link to="/contact" className="components-link">
          Contact
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header
