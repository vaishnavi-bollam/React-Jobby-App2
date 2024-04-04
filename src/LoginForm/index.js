import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmiterror: false,
    errorMsg: '',
  }

  onUsernameChange = event => this.setState({username: event.target.value})

  onPasswordChange = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({
      showSubmiterror: true,
      errorMsg: error,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => (
    <div>
      <label htmlFor="username">USERNAME</label>
      <input
        type="text"
        id="username"
        placeholder="UserName"
        onChange={this.onUsernameChange}
      />
    </div>
  )

  renderPassword = () => (
    <div>
      <label htmlFor="password">PASSWORD</label>
      <input
        type="password"
        id="password"
        placeholder="PASSWORD"
        onChange={this.onPasswordChange}
      />
    </div>
  )

  render() {
    const {showSubmiterror, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
          <div>{this.renderUsername()}</div>
          <div>{this.renderPassword()}</div>
          <button type="submit">Login</button>
          {showSubmiterror && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
