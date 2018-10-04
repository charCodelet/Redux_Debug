import { bindActionCreators } from 'redux';
import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps';

export function whenMapDispatchToPropsIsFunction(mapDispatchToProps) { // if it's a function
		if(typeof mapDispatchToProps === 'function') console.group/*Collapsed*/(wrapMapToPropsFunc.name+"( (mapDispatchToProps) "+mapDispatchToProps.name+", 'mapDispatchToProps')");
		else console.group/*Collapsed*/("undefined");
    let mapDispatchToPropsRef = typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
    console.log(mapDispatchToPropsRef.name+" --> mapDispatchToPropsRef (return)");
  console.groupEnd();
  return mapDispatchToPropsRef
}

export function whenMapDispatchToPropsIsMissing(mapDispatchToProps) { // if it's null or undefined
  if(!mapDispatchToProps) console.group/*Collapsed*/("wrapMapToPropsConstant(function wrapMapToPropsConstantReturnDispatch(dispatch) {return { dispatch }})");
	else console.group/*Collapsed*/("undefined");
    let mapDispatchToPropsRef = !mapDispatchToProps ? wrapMapToPropsConstant(function wrapMapToPropsConstantReturnDispatch(dispatch) {return { dispatch }}) : undefined;
    console.log(typeof mapDispatchToPropsRef === "function" ? mapDispatchToPropsRef.name : mapDispatchToPropsRef+" --> mapDispatchToPropsRef (return)");
  console.groupEnd();
  return mapDispatchToPropsRef;
}

export function whenMapDispatchToPropsIsObject(mapDispatchToProps) { // if it's an object
		if(mapDispatchToProps && typeof mapDispatchToProps === 'object') console.group/*Collapsed*/("wrapMapToPropsConstant(function wrapMapToPropsConstantReturnBindActionCreators(dispatch) {return bindActionCreators(mapDispatchToProps, dispatch)})");
		else console.group/*Collapsed*/("undefined");
    let mapDispatchToPropsObjRef = mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(
    	function wrapMapToPropsConstantReturnBindActionCreators(dispatch) {return bindActionCreators(mapDispatchToProps, dispatch);}
    	) : undefined;
    console.log((typeof mapDispatchToPropsObjRef === "function" ? mapDispatchToPropsObjRef.name : mapDispatchToPropsObjRef)+" --> mapDispatchToPropsObjRef (return)");
	console.groupEnd();
  return mapDispatchToPropsObjRef;
}

export default [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]; // note these are exported as an array which is why the for loop in the match method in connect.js uses index numbers to call each function..