import verifyPlainObject from '../utils/verifyPlainObject';

export function defaultMergeProps(stateProps, dispatchProps, ownProps) {
	console.log("%cThis is where state becomes *merged* into the other props","color:magenta;font-weight:bolder");
  console.group/*Collapsed*/("Object.assign({}, (ownProps)",ownProps,", (stateProps)",stateProps,", (dispatchProps)",dispatchProps,")")
    let defaultMergePropsReturn = Object.assign({}, ownProps, stateProps, dispatchProps);
    console.log(defaultMergePropsReturn," --> defaultMergePropsReturn (return)");
  console.groupEnd();

  return defaultMergePropsReturn
}
export function wrapMergePropsFunc(mergeProps) {
  debugger;
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName, pure = _ref.pure, areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps = void 0;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      }
      else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (process.env.NODE_ENV !== 'production') verifyPlainObject(mergedProps, displayName, 'mergeProps');
      }
      return mergedProps;
    };
  };
}

export function whenMergePropsIsFunction(mergeProps) {
  debugger;
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
export function whenMergePropsIsOmitted(mergeProps) {
  if(!mergeProps) console.group/*Collapsed*/("function mergePropsOrUndefined() {return defaultMergeProps}");
  else console.group/*Collapsed*/("undefined");
    let mergePropsOrNo = !mergeProps ? function mergePropsOrUndefined() {return defaultMergeProps} : undefined;
    console.log((typeof mergePropsOrNo === "function" ? mergePropsOrNo.name : undefined)+" --> mergePropsOrNo (return)");
	console.groupEnd();
  return mergePropsOrNo
}
export default [whenMergePropsIsFunction, whenMergePropsIsOmitted]; // note these are exported as an array which is why the for loop in the match method in connect.js uses index numbers to call each function..