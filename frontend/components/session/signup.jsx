import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  handleInput(type) {
    return (e) => {
      this.setState({
          [type]: e.target.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewUser(this.state)
      .then( () => this.props.history.push(this.props.match.params[0]));
  }

  closeForm(e) {
    if (e.currentTarget === e.target) {
      this.props.history.push(this.props.match.params[0]);
    }
  }

  render(){
    return (
      <div onClick={this.closeForm} className='session-form-background'>

        <form className='session-form-modal'>
          <ul className='tabs'>
            <li>
              <Link to={`${this.props.match.params[0]}/login`}>
                Log In
              </Link>
            </li>

            <li className='target'>
              <Link to={`${this.props.match.params[0]}/signup`}>
                Sign Up
              </Link>
            </li>

          </ul>
          <label>Username: </label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleInput('username')}/>

          <label>Password: </label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')}/>

            <label>Email: </label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInput('email')}/>

          <div className="submit-container">
            <button className="btn" onClick={this.handleSubmit}>Sign Up</button>
          </div>
        </form>
        <div className="close-form-button">
          <Link to={this.props.match.params[0]}>
            x
          </Link>
        </div>
      </div>
    );
  }
}

export default Signup;
