import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actions/formActions';

import FinanciadorUserForm1 from '../components/bedinViews/FinanciadorUserForm1.jsx';


function mapStateToProps(state) {
  return {
    isRequesting: state.formReducers.isRequesting,
    createSuccess: state.formReducers.createSuccess,
    requestFail: state.formReducers.requestFail,
    error: state.formReducers.error,
    name: state.formReducers.name,
    address: state.formReducers.address,
    phone:  state.formReducers.phone,
    email: state.formReducers.email,
    username: state.formReducers.username,
    password: state.formReducers.password,
    type: state.formReducers.type,
    osCode: state.formReducers.osCode,
    financiadors: state.formReducers.financiadors
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}



class FinanciadorUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this)
  }

  componentWillMount() {
    this.props.fetchFinanciadorList();
  }

  componentWillUnmount() {
    this.props.resetCreateSuccess();
  }

  create(e) {    
    let radios = document.querySelectorAll('input[type="radio"]:checked');
    let checkedFinanciador = radios.length>0? radios[0].value: null;
    e.preventDefault();
    this.props.createUser({
      name:  document.getElementById("inputNombre").value,
      username: document.getElementById("inputUserName").value,
      password: document.getElementById("inputPass").value,
      type: "Financiador",
      osCode: checkedFinanciador //[0]._id
    })
  }
  render() {
    return (
      <div>
        <FinanciadorUserForm1 financiadors={this.props.financiadors} createUser={this.create} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanciadorUserForm);
