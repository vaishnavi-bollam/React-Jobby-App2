import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <ul>
        <Header />
      </ul>

      <div className="home-page">
        <h1>Find The Job That Fits Your Life</h1>
        <p>Millions of people are searching for jobs</p>
        <Link to="/jobs">
          <button type="button">Find Jobs</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
