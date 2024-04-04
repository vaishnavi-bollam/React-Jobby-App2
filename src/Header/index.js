import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutClicked = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>

      <div className="nav-text">
        <li>
          <Link to="/">
            <p className="text">Home</p>
          </Link>
        </li>

        <li>
          <Link to="/jobs">
            <p>Jobs</p>
          </Link>
        </li>
      </div>
      <button onClick={logoutClicked} type="button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
