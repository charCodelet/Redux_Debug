import { bindActionCreators } from 'redux';

export default function wrapActionCreators(actionCreators) {
  debugger;
  return function wrapActionCreatorsReturn(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  };
}