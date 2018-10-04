import warning from '../utils/warning';

function verify(selector, methodName, displayName) {
  if (!selector) throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') if (!selector.hasOwnProperty('dependsOnOwnProps')) warning('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
  return "verified";
}

export default function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  //console.group/*Collapsed*/("verify("+mapStateToProps.name+", 'mapStateToProps',",displayName,")");
    let verifyMapState = verify(mapStateToProps, 'mapStateToProps', displayName);
    //console.log(verifyMapState," --> verifyMapState");
  //console.groupEnd();
	//console.group/*Collapsed*/("verify("+mapDispatchToProps.name+", 'mapDispatchToProps',",displayName,")")
	  let verifyMapDispatch = verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
	  //console.log(verifyMapDispatch," --> verifyMapDispatch");
	//console.groupEnd();
	//console.group/*Collapsed*/("verify("+mergeProps.name+", 'mergeProps',",displayName,")")
	  let verifyMergeProps = verify(mergeProps, 'mergeProps', displayName);
	  //console.log(verifyMergeProps," --> verifyMergeProps");
	//console.groupEnd();
}