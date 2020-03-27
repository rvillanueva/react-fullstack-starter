import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Provider, connect } from 'react-redux';
import App from './App';
import {bindActionCreators} from 'redux';
import {getMyProfile} from '../actions/authActions';
import 'loaders.css/loaders.min.css';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false
    };
  }
  async componentDidMount() {
    try {
      await this.props.getMyProfile();
    } catch(err) {
      console.error(err);
    }
    this.setState({isLoaded: true});
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <App
            isAuthenticated={!!this.props.auth.user && this.props.auth.user.role !== 'unverified'}
            isLoaded={this.state.isLoaded}
            isAuthenticating={this.props.auth.isAuthenticating}
          />
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getMyProfile: PropTypes.func.isRequired,
  activeAccount: PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getMyProfile: bindActionCreators(getMyProfile, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
