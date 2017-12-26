import React from 'react';
import './things-page.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as thingActions from '../../actions/thingActions';
import {bindActionCreators} from 'redux';
import {toArray} from '../../utils/normalize';

class ThingsPage extends React.Component {
  constructor(){
    super();
    this.state = {
      newThing: '',
      error: null
    }
  }
  componentWillMount(){
    this.props.thingActions.getThings();
  }
  onFormChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  onFormSubmit(e){
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    this.props.thingActions.addThing(this.state.newThing)
    .then(() => this.setState({newThing: '', error: null}))
    .catch(error => this.setState({error}))
  }
  deleteThing(id){
    this.props.thingActions.deleteById(id)
    .catch(err => console.error(err))
  }
  render(){
    let error = this.state.error ? <div className="alert alert-error">{this.state.error}</div> : '';
    let things = toArray(this.props.things).map(thing => {
      return (
        <div className="card card-full" key={thing._id}>
          <a onClick={() => this.deleteThing(thing._id)} className="close-button pull-right">x</a>
          <h3>{thing.name}</h3>
          {thing.info}
        </div>
      )
    })
    return (
      <div className="top-spaced">
        <h2 className="alt-header">Things</h2>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input className="thing-input" name="newThing" onChange={this.onFormChange.bind(this)} placeholder="Add new thing..." value={this.state.newThing}/>
          {error}
        </form>
        {things}
      </div>
    );
  }
}

ThingsPage.propTypes = {
  things: PropTypes.object.isRequired,
  thingActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    things: state.things
  };
}

function mapDispatchToProps(dispatch) {
  return {
    thingActions: bindActionCreators(thingActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThingsPage);
