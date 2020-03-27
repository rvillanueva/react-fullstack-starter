import React from 'react';
import PropTypes from 'prop-types';
import {
  LOADING_MODAL,
  FORM_MODAL
} from '../../constants/overlayTypes';
import {
  LoadingModal,
  FormModal
} from './components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {close as closeOverlay} from '../../actions/overlayActions';
import './overlay-manager.scss';

class OverlayManager extends React.Component {
  renderOverlay() {
    const {type, data} = this.props;
    switch (type) {
    case LOADING_MODAL:
      return <LoadingModal {...data} onClose={this.props.closeOverlay}/>;
    case FORM_MODAL:
      return <FormModal {...data} onClose={this.props.closeOverlay}/>;
    default:
      throw new Error(`Did not recognize overlay type ${this.props.type}.`);
    }
  }
  render() {
    const {isVisible} = this.props;
    if(!isVisible) return null;
    return <div className="overlay overlay--filled">
      {this.renderOverlay()}
    </div>;
  }
}

OverlayManager.propTypes = {
  isVisible: PropTypes.bool,
  type: PropTypes.string,
  data: PropTypes.object,
  closeOverlay: PropTypes.func.isRequired,
  onSuccess: PropTypes.func
};


function mapStateToProps(state) {
  return {
    isVisible: state.overlay.isVisible,
    type: state.overlay.type,
    data: state.overlay.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeOverlay: bindActionCreators(closeOverlay, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlayManager);
