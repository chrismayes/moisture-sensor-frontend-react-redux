import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/index";

import Main from "./Main";

function mapStateToProps(state) {
  return {
    storeData: state.storeData
  }
}

function mapDispachToProps(dispach) {
  return bindActionCreators(actionCreators, dispach);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
