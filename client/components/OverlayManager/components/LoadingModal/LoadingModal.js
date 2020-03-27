import React from 'react';
import './loading-modal.scss';
import Loader from 'react-loaders';

export default class LoadingModal extends React.Component {
  render() {
    return <div className="modal-container loading-modal">
      <Loader className="loading-modal__loader-icon" type="ball-scale-ripple" />
    </div>;
  }
}
