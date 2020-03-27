import React from 'react';
import PropTypes from 'prop-types';
import {ModalCloseButton} from '..';
import './form-modal.scss';
import * as FieldTypes from '../../../../constants/fieldTypes';
import {stopEvent} from '../../../../utils/dom';
import {SubmitButton} from '../../../../components';
import DatePicker from 'react-datepicker';
import {PaymentDatePicker} from './components';
import moment from 'moment';

export default class FormModal extends React.Component {
  constructor() {
    super();
    this.state = {
      formData: {},
      fields: [],
      isSubmitting: false
    };
  }
  componentDidMount() {
    const formData = {};
    const fields = Object.keys(this.props.fieldTypes).map(key => {
      const fieldType = this.props.fieldTypes[key];
      if(this.props.data[key]) {
        formData[key] = {
          value: this.props.data[key],
          isDirty: false
        };
      } else {
        formData[key] = {
          value: this.getDefaultValueByFieldType(fieldType.type),
          isDirty: false
        };
      }
      return {
        ...fieldType,
        name: key
      };
    });
    this.setState({
      formData,
      fields
    });
  }
  getDefaultValueByFieldType = fieldType => {
    switch (fieldType) {
    case FieldTypes.TEXT:
      return '';
    case FieldTypes.DATEPICKER:
      return moment();
    default:
      return undefined;
    }
  }
  updateFormField = (key, value) => {
    this.setState({
      formData: Object.assign({}, this.state.formData, {
        [key]: {
          value,
          isDirty: true
        }
      })
    });
  }
  renderFieldInput = field => {
    switch (field.type) {
    case FieldTypes.TEXT:
      return <input
        className="form-modal__text-input"
        value={this.state.formData[field.name].value}
        onChange={e => this.updateFormField(field.name, e.target.value)} />;
    case FieldTypes.DATEPICKER:
      return <DatePicker
        customInput={<PaymentDatePicker />}
        selected={this.state.formData[field.name] ? moment(this.state.formData[field.name].value) : null}
        minDate={new Date()}
        maxDate={moment().add(6, 'months').toDate()}
        onChange={date => this.updateFormField(field.name, date.toDate())} />;
    default:
      throw new Error(`Unrecognized field type ${field.type}.`);
    }
  }
  renderField = field => <div className="modal--small__form-field">
    <label className="modal--small__label">{field.label}</label>
    <div className="modal--small__input-container">
      {this.renderFieldInput(field)}
    </div>
  </div>;
  handleSubmit = async e => {
    stopEvent(e);
    const changedData = {};
    Object.keys(this.state.formData).forEach(key => {
      if(this.state.formData[key].isDirty) {
        changedData[key] = this.state.formData[key].value;
      }
    });
    try {
      this.setState({ isSubmitting: true });
      if(Object.keys(changedData).length > 0) await this.props.onSubmit(changedData);
      this.props.onClose();
    } catch(err) {
      console.error(err);
      this.setState({
        error: err,
        isSubmitting: false
      });
    }
  }
  render() {
    return <div className="modal-container--centered">
      <div className="modal modal--small form-modal">
        <ModalCloseButton onClose={this.props.onClose}/>
        <form onSubmit={this.handleSubmit}>
          <div className="modal__body">
            {this.state.error ? <div>An unexpected error occurred.</div> : null}
            {this.state.fields.map((field, f) => <div key={f}>{this.renderField(field)}</div>)}
          </div>
          <div className="modal__footer">
            <div className="modal__footer__right">
              <SubmitButton className="btn btn-sm btn-primary" value="Save" isSubmitting={this.state.isSubmitting} onClick={this.handleSubmit} />
            </div>
          </div>
        </form>
      </div>
    </div>;
  }
}

FormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
  fieldTypes: PropTypes.object.isRequired
};
