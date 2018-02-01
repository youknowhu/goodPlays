import { connect } from 'react-redux';
import { login, createNewUser, clearSessionErrors } from '../../actions/session';
import Session from './session';

const mapStateToProps = (state, ownProps) => {
  let errors = state.errors.session;
  let type = 'signup';
  if (ownProps.match.path === '*/login') {
    type = 'login';
  }
  return ({
    type,
    errors
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let action;
  if (ownProps.match.path === '*/login') {
    action = formUser => (dispatch(login(formUser)));
  } else {
    action = formUser => dispatch(createNewUser(formUser));
  }
  return ({
    action,
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    login: (user) => dispatch(login(user))

  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Session);
