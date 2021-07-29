import React from 'react';
import logo from './logo.svg';
import './App.css';

const validEmailRegex = RegExp( /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      errors: {
        companyName: true,
        firstName: true,
        lastName: true,
        email: true,
        password: {
          lowercase: true,
          uppercase: true,
          number: true,
          special: true,
          length: true,
          sum: true
        },
      },
      touch: {
        companyName: false,
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        sum: false
      },
      url: '',
      modalTitle: ''
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'companyName':
        errors.companyName = value === '' ? true : false;
        break;
      case 'firstName':
        errors.firstName = value === '' ? true : false;
        break;
      case 'lastName':
        errors.lastName = value === '' ? true : false;
        break;
      case 'email':
        errors.email = !validEmailRegex.test(value);
        break;
      case 'password': 
        errors.password.length =  value.length < 8 ? true : false;
        errors.password.uppercase = !/[A-Z]/.test(value);
        errors.password.lowercase = !/[a-z]/.test(value);
        errors.password.number = !/[0-9]/.test(value);
        errors.password.special = !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
        errors.password.sum = errors.password.lowercase || errors.password.uppercase || errors.password.number || errors.password.special || errors.password.length ? true : false;
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  onBlur = (event) => {
    event.preventDefault();
    let touch = this.state.touch;
    const { name } = event.target;
    switch (name) {
      case 'companyName': 
        touch.companyName = true;
        break;
      case 'firstName':
        touch.firstName = true;
        break;
      case 'lastName':
        touch.lastName = true;
        break;
      case 'email': 
        touch.email = true;
        break;
      case 'password': 
        touch.password = true;
        break;
      default:
        break;
    }
    this.setState({touch});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }

  TermsClick = (event) => {
    event.preventDefault();
    this.setState({ url: 'http://www.helpscout.net/company/terms-of-service/', modalTitle: 'Terms' });

  }

  PrivacyClick = (event) => {
    event.preventDefault();
    this.setState({ url: 'http://www.helpscout.net/company/privacy/', modalTitle: 'Privacy Policy' });
  }

  SecurityClick = (event) => {
    event.preventDefault();
    this.setState({ url: 'http://www.helpscout.net/company/security/', modalTitle: 'Security Policy' });
  }

  render() {
    const {errors} = this.state;
    const { touch } = this.state;
    return (
      <div className="App">
        <div className="App-header"><a href="/"><img src={logo} className="App-logo" alt="logo" /></a></div>
        <div className="sign-up_container">
          <div className="sign-up">
            <div className="sign-up_form">
              <div className="sign-up_header">
                <h1>Start your free Help Scout trial</h1>

              </div>
              <div className="sign-up_deets">
                <form id='signupForm' onSubmit={this.handleSubmit} noValidate>
                  <div className='u-pad-b-0'>
                    <fieldset>
                      <section className='control-group flex'>
                        <input className={touch.companyName ? errors.companyName ? 'error': 'ok' : ''} name='companyName' placeholder='Company name' onChange={this.handleChange} onBlur={this.onBlur} autoFocus noValidate />
                        {touch.companyName ? errors.companyName ? <span className='mark fa fa-times danger'></span> : <span className='mark fa fa-check success'></span> : ''}
                      </section>
                      <div className="name">
                        <section className='control-group firstname flex'>
                          <input className={touch.firstName ? errors.firstName ? 'error': 'ok' : ''} name='firstName' placeholder='First name' onChange={this.handleChange} onBlur={this.onBlur} noValidate />
                          {touch.firstName ? errors.firstName ? <span className='mark fa fa-times danger'></span> : <span className='mark fa fa-check success'></span> : ''}
                        </section>
                        <section className='control-group lastname flex'>
                          <input className={touch.lastName ? errors.lastName ? 'error': 'ok' : ''} name='lastName' placeholder='Last name' onChange={this.handleChange} onBlur={this.onBlur} noValidate />
                          {touch.lastName ? errors.lastName ? <span className='mark fa fa-times danger'></span> : <span className='mark fa fa-check success'></span> : ''}
                        </section>
                      </div>
                      <section className='control-group flex'>
                        <input type='email' className={touch.email ? errors.email ? 'error': 'ok' : ''} name='email' placeholder='Email' onChange={this.handleChange} onBlur={this.onBlur} noValidate />
                        {touch.email ? errors.email ? <span className='mark fa fa-times danger'></span> : <span className='mark fa fa-check success'></span> : ''}
                      </section>
                      <section className='control-group flex'>
                        <input type='password' className={touch.password ? errors.password.sum ? 'error': 'ok' : ''} name='password' id='password' placeholder='Password' onChange={this.handleChange} onBlur={this.onBlur} noValidate />
                        {touch.password ? errors.password.sum ? <span className='mark fa fa-times danger'></span> : <span className='mark fa fa-check success'></span> : ''}
                      </section>
                      <section className='control-group' id='password_valid'>
                        <div className='list-div'>
                          <li className={errors.password.lowercase ? 'lastname danger' : 'lastname success'}>One lowercase charater</li>
                          <li className={errors.password.uppercase ? 'lastname danger' : 'lastname success'}>One uppercase charater</li><br/>
                        </div>                        
                        <div className='list-div'>
                          <li className={errors.password.number ? 'lastname danger' : 'lastname success'}>One number</li>
                          <li className={errors.password.special ? 'lastname danger' : 'lastname success'}>One special charater</li>
                        </div>
                        <div className='list-div'>
                          <li className={errors.password.length ? 'lastname danger' : 'lastname success'}>8 charaters minium</li>
                        </div>
                      </section>
                      <div className="u-pad-t-2">
                        <button className="btn btn-large btn-success" type="submit">Create My Account</button>
                        <p id="agree">By clicking this button, you agree to our 
                          <a className="openModal" href="#" onClick={this.TermsClick}>Terms</a>, 
                          <a className="openModal" href="#" onClick={this.PrivacyClick}>Privacy Policy</a> and 
                          <a className="openModal" href="#" onClick={this.SecurityClick}>Security Policy.</a></p>
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </div>
            <div className="sign-up_sidebar-bg"></div>
            <div className="sign-up_sidebar">
              <div className="sign-up_plan">
                <h3 className="sign-up_plan--standard">Standard plan</h3>
                <ul>
                  <li>Unlimited Users</li>
                  <li>5 Mailboxes</li>
                  <li>1 Docs knowledge base</li>
                  <li>Workflows</li>
                  <li>50+ integrations</li>
                  <li> <a className="more-features" data-plan="standard" href="#">View all features</a></li>
                </ul>

                <ul className="all-features standard">
                  <li>Unlimited Users</li>
                  <li>Unlimited messages</li>
                  <li>Unlimited storage</li>
                  <li>5 mailboxes</li>
                  <li>1 Docs knowledge base</li>
                  <li>Reports (Full history)</li>
                  <li>Saved replies</li>
                  <li>Beacon</li>
                  <li>@mentions</li>
                  <li>iOS &amp; Android apps</li>
                  <li>Workflows</li>
                  <li>Satisfaction ratings</li>
                  <li>Office hours</li>
                  <li>50+ integrations</li>
                  <li>API access</li>
                </ul>
              </div>
              <div className="sign-up_brands">
                <h4><span>Join 7,000+ Companies</span>
                </h4>
                <ul className="sign-up_brands-list">
                  <li><img alt="Trello" src="img/trello.png" />
                  </li>
                  <li><img alt="" src="img/buffer.png" />
                  </li>
                  <li><img alt="" src="img/basecamp.png" />
                  </li>
                  <li><img alt="" src="img/pocket.png" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close">&times;</span>
              <h2>{this.state.modalTitle}</h2>
            </div>
            <div className="modal-body">
              <iframe id='iframe' src={this.state.url} width="100%" height="500">
              </iframe>
            </div>
          </div>

        </div>
      </div>
    );
  }
}