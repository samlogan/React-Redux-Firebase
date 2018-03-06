import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { isClient } from '../../../config/app';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgottenPassword from './ForgottenPassword';

const getModalTitle = (type) => {
  if (!type) return null;
  switch (type) {
    case 'login':
      return 'Login';
    case 'register':
      return 'Register';
    case 'forgottenPassword':
      return 'Forgotten Password';
    default:
      return null;
  }
};

const appRoot = isClient ? document.getElementById('app') : null;

export default class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.handleEscKey = this.handleEscKey.bind(this);
    this.state = { type: 'login' };
  }
  componentWillMount() {
    const { type } = this.props;
    this.setState({ type });
  }
  componentDidMount() {
    if (isClient) document.addEventListener('keydown', this.handleEscKey, false);
  }
  componentWillReceiveProps(nextProps) {
    const { type } = nextProps;
    if (this.props.type !== type) this.setState({ type });
  }
  componentWillUnmount() {
    if (isClient) document.removeEventListener('keydown', this.handleEscKey, false);
  }
  getAuthForm(type) {
    switch (type) {
      case 'login':
        return <LoginForm switchAuthForm={(event, authType) => this.props.openAuthModal(event, authType)} />;
      case 'register':
        return <RegisterForm switchAuthForm={(event, authType) => this.props.openAuthModal(event, authType)} />;
      case 'forgottenPassword':
        return <ForgottenPassword switchAuthForm={(event, authType) => this.props.openAuthModal(event, authType)} />;
      default:
        return <span />;
    }
  }
  handleEscKey(event) {
    if (event.keyCode === 27) this.props.closeAuthModal(event);
  }
  handleModalBackgroundClick(event) {
    if (event.target.className === 'modal') this.props.closeAuthModal(event);
  }
  render() {
    const { type } = this.state;
    const { active, closeAuthModal } = this.props;
    if (!active) return <span />;
    return ReactDOM.createPortal(
      <div className="modal" onClick={event => this.handleModalBackgroundClick(event)}>
        <div className="modal-content">
          <div className="modal-title">
            <h3>{getModalTitle(type)}</h3>
          </div>
          {this.getAuthForm(type)}
          <Link className="close" to="#" onClick={event => closeAuthModal(event)}>Close</Link>
        </div>
      </div>,
      appRoot
    );
  }
}
