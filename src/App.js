import React, { Component } from 'react';
import './App.css';

import axios from 'axios'

class App extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      email: '',
      password: '',
      view: 'login',
      user: null
    }

  }

  componentDidMount() {
    axios.get('/auth/currentUser').then(response => {
      this.setState({
        user: response.data
      })
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = () => {
    const { email, password } = this.state
    axios.post('/auth/login', { email, password }).then(response => {
      this.setState({
        email: '',
        password: '',
        user: response.data
      })
    })
  }

  handleRegistration = () => {
    const { email, password, name } = this.state
    axios.post('/auth/register', { name, email, password }).then(response => {
      this.setState({
        email: '',
        password: '',
        name: '',
        user: response.data
      })
    })
  }

  toggleView = () => {
    this.setState({
      view: this.state.view === 'login' ? 'register' : 'login'
    })
  }

  render() {
    return (
      <div className="App">
      {
        this.state.user ? 
        <div>
          <h1>Welcome, { this.state.user.name }</h1>
        </div> : this.state.view === 'login' ?
        <div>
          <h1>Login</h1>
          email <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          password <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          <button onClick={this.handleLogin}>login</button>
          <p>Don't have an account? <a href="#/register" onClick={this.toggleView}>click here</a></p>
        </div> : 
        <div>
          <h1>Registration</h1>
          name <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
          email <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          password <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          <button onClick={this.handleRegistration}>register</button>
          <p>Already have an account? <a href="#/login" onClick={this.toggleView}>click here</a></p>
        </div>
      }
      </div>
    );
  }
}

export default App;
