import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps';

export function whenMapStateToPropsIsFunction(mapStateToProps) {
		if(typeof mapStateToProps === 'function') console.group/*Collapsed*/("wrapMapToPropsFunc( (mapStateToProps)",typeof mapStateToProps === 'function' ? mapStateToProps.name : mapStateToProps,", 'mapStateToProps')");
		else console.group/*Collapsed*/("undefined");
    let typeOfMapStateToProps = typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
    console.log(typeOfMapStateToProps.name+" --> typeOfMapStateToProps (return)")
	console.groupEnd();
  return typeOfMapStateToProps;
}

export function whenMapStateToPropsIsMissing(mapStateToProps) {
  	if(!mapStateToProps) console.group/*Collapsed*/("wrapMapToPropsConstant(function wrapMapToPropsConstantArgument() {return {}})");
  	else console.group/*Collapsed*/("undefined");
    let notMapStateToProps = !mapStateToProps ? wrapMapToPropsConstant(function wrapMapToPropsConstantArgument() {return {}}) : undefined;
    console.log((typeof notMapStateToProps === "function" ? notMapStateToProps.name : notMapStateToProps)+" --> notMapStateToProps (return)")
  console.groupEnd();
  return notMapStateToProps
}

export default [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];