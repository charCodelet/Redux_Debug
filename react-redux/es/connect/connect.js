function _objectWithoutProperties(obj, keys) {
	var target = {};
	for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;
		if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
		target[i] = obj[i];
	}
	return target;
}

import connectAdvanced from '../components/connectAdvanced';
import shallowEqual from '../utils/shallowEqual';
import defaultMapDispatchToPropsFactories from './mapDispatchToProps';
import defaultMapStateToPropsFactories from './mapStateToProps';
import defaultMergePropsFactories from './mergeProps';
import defaultSelectorFactory from './selectorFactory';

/*
connect is a facade over connectAdvanced. It turns its args into a compatible selectorFactory, which has the signature: (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
connect passes its args to connectAdvanced as options, which will in turn pass them to selectorFactory each time a Connect component instance is instantiated or hot reloaded.
selectorFactory returns a final props selector from its mapStateToProps, mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps, mergePropsFactories, and pure args.
The resulting final props selector is called by the Connect component instance whenever it receives new props or store state.
*/

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
  	console.groupCollapsed("for (var i = "+(factories.length - 1)+";",i,">= 0;",i+")");
			console.group/*Collapsed*/(factories[i].name+"(",(typeof arg === 'function' ? arg.name : arg),")");
				var result = factories[i](arg);
				console.log((result ? result.name : result)+" --> result");
			console.groupEnd();
		console.groupEnd();
    if (result) {
    	console.group/*Collapsed*/("if("+result.name+")")
      	console.log((typeof result === "function" ? result.name : result)+" --> result (return)");
    	console.groupEnd();
      return result;
		}
		//console.log("Continue loop...");
  }
  return function matchReturn(dispatch, options) {
    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}
function strictEqual(a, b) {
	console.log((a === b)+" --> a === b)");
  return a === b;
}
export function createConnect() { // createConnect with default args builds the 'official' connect behavior. Calling it with different options opens up some testing and extensibility scenarios
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				_ref$connectHOC = _ref.connectHOC, connectHOC = _ref$connectHOC === undefined ? connectAdvanced : _ref$connectHOC, _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
				mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF, _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
				mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro, _ref$mergePropsFactor = _ref.mergePropsFactories,
				mergePropsFactories = _ref$mergePropsFactor === undefined ? defaultMergePropsFactories : _ref$mergePropsFactor, _ref$selectorFactory = _ref.selectorFactory, selectorFactory = _ref$selectorFactory === undefined ? defaultSelectorFactory : _ref$selectorFactory;
				/*
				console.log(_ref$connectHOC," --> _ref$connectHOC");
				console.log(mapStateToPropsFactories," --> mapStateToPropsFactories");
				console.log(mapDispatchToPropsFactories," --> mapDispatchToPropsFactories");
				console.log(mergePropsFactories," --> mergePropsFactories");
				*/
		return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {

			var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}, // no third argument...
					_ref2$pure = _ref2.pure, pure = _ref2$pure === undefined ? true : _ref2$pure, _ref2$areStatesEqual = _ref2.areStatesEqual, areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
					_ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual, areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? shallowEqual : _ref2$areOwnPropsEqua,
					_ref2$areStatePropsEq = _ref2.areStatePropsEqual, areStatePropsEqual = _ref2$areStatePropsEq === undefined ? shallowEqual : _ref2$areStatePropsEq, _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
					areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? shallowEqual : _ref2$areMergedPropsE;

			console.groupCollapsed("_objectWithoutProperties(",_ref2,", ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']");
				var extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);
				console.log(extraOptions," --> extraOptions");
			console.groupEnd();

			console.log("%cThis corresponds to the chosen initMapStateToProps returned function","color: blue; font-weight: bolder");
			console.groupCollapsed("match("+(typeof mapStateToProps === "function" ? mapStateToProps.name : mapStateToProps)+", (mapStateToPropsFactories) ["+mapStateToPropsFactories.map(factory => factory.name).join(", ")+"], 'mapStateToProps')");
				var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
				console.log("%c"+initMapStateToProps.name+" --> initMapStateToProps","color:blue;font-weight:bolder");
			console.groupEnd();

			console.log("%cThis corresponds to the chosen initMapDispatchToProps returned function","color: maroon; font-weight: bolder");
			console.groupCollapsed("match(",(typeof mapDispatchToProps === "function" ? mapDispatchToProps.name : mapDispatchToProps),", (mapDispatchToPropsFactories) ["+mapDispatchToPropsFactories.map(factory => factory.name).join(", ")+"], 'mapDispatchToProps')");
				var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
				console.log("%c"+initMapDispatchToProps.name+" --> initMapDispatchToProps","color:blue;font-weight:bolder");
			console.groupEnd();

			console.log("%cThis corresponds to the chosen initMergeProps returned function","color: green; font-weight: bolder");
			console.groupCollapsed("match("+(typeof mergeProps === "function" ? mergeProps.name : mergeProps)+", (mergePropsFactories) ["+mergePropsFactories.map(factory => factory.name).join(", ")+"], 'mergeProps')");
				var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
				console.log("%c"+initMergeProps.name+" --> initMergeProps","color:blue;font-weight:bolder");
			console.groupEnd();

			console.groupCollapsed("Object.assign({methodName: 'connect', getDisplayName: function getDisplayName(name) {return 'Connect('+name+')'}, shouldHandleStateChanges: Boolean(mapStateToProps), initMapStateToProps, initMapDispatchToProps, initMergeProps, pure, areStatesEqual,areOwnPropsEqual, areStatePropsEqual, areMergedPropsEqual})");
				let objectAssignArgument = Object.assign({
					methodName: 'connect',  // used in error messages
					getDisplayName: function getDisplayName(name) {return 'Connect('+name+')';}, // used to compute Connect's displayName from the wrapped component's displayName.
					shouldHandleStateChanges: Boolean(mapStateToProps),  // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes passed through to selectorFactory
					initMapStateToProps, initMapDispatchToProps, initMergeProps, pure, areStatesEqual,areOwnPropsEqual, areStatePropsEqual, areMergedPropsEqual,
				});
				console.log(objectAssignArgument," --> objectAssignArgument");
			console.groupEnd();

			console.groupCollapsed(connectHOC.name+"( (selectorFactory) "+selectorFactory.name+",",objectAssignArgument,", (extraOptions)",extraOptions,")");
				let connectHoc = connectHOC(selectorFactory, objectAssignArgument, extraOptions);
				console.log(connectHoc.name+" --> connectHoc (return)");
			console.groupEnd();
			return connectHoc;
  };
}

//console.groupCollapsed("createConnect()");
	let createConnectRef = createConnect();
	//console.log(createConnectRef.name+" --> createConnectRef");
	export default createConnectRef;
//console.groupEnd();