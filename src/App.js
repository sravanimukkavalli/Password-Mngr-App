import {Component} from 'react'

import {v4} from 'uuid'
import EachItem from './Components/EachItem'

import './App.css'

class App extends Component {
  state = {
    passwordLists: [],
    username: '',
    password: '',
    website: '',
    search: '',
    isChecked: false,
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  updateList = password => {
    this.setState(prevState => ({
      passwordLists: prevState.passwordLists.filter(each => {
        if (each.password !== password) {
          return {each}
        }
        return null
      }),
    }))
  }

  renderPasswordSection = () => {
    const {passwordLists, search, isChecked} = this.state
    const filteredList = passwordLists.filter(each =>
      each.website.toLowerCase().includes(search.toLowerCase()),
    )
    const isPassword = filteredList.length > 0

    return (
      <>
        <div className="first-row">
          <div className="your-password-container">
            <p className="your-password">Your Passwords</p>
            <p className="password-length">{filteredList.length}</p>
          </div>
          <div className="search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="form-icons"
            />
            <input
              type="search"
              value={search}
              className="search"
              onChange={this.onChangeSearch}
            />
          </div>
        </div>
        <hr />
        <div className="button-container">
          <input
            id="checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={this.onChangeCheckbox}
            className="icons"
          />
          <label htmlFor="checkbox" className="your-password">
            Show Passwords
          </label>
        </div>
        {isPassword ? (
          <ul className="unordered-list">
            {filteredList.map(eachList => (
              <EachItem
                key={eachList.id}
                listDetails={eachList}
                isChecked={isChecked}
                updateList={this.updateList}
              />
            ))}
          </ul>
        ) : (
          <div className="no-password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="no-password-img"
            />
            <p className="no-password">No Passwords</p>
          </div>
        )}
      </>
    )
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const randomNumber = Math.ceil(Math.random() * 9)
    const userDetails = {
      id: v4(),
      username,
      website,
      password,
      number: randomNumber,
    }

    this.setState(prevState => ({
      passwordLists: [...prevState.passwordLists, userDetails],
      username: '',
      password: '',
      website: '',
      isChecked: false,
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  render() {
    const {username, password, website} = this.state

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="website-logo"
        />
        <div className="first-container">
          <div className="small-first-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-img"
            />
            <form
              className="form-details-container"
              onSubmit={this.onSubmitForm}
            >
              <h1 className="password-heading">Add New Password</h1>
              <div className="data-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="form-icons"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="form-input"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="data-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="form-icons"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="form-input"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="data-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="form-icons"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-input"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-lg-img"
            />
          </div>
        </div>
        <div className="second-container">{this.renderPasswordSection()}</div>
      </div>
    )
  }
}

export default App
