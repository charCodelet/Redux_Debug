import { ActionTypes } from './createStore';
import isPlainObject from 'lodash-es/isPlainObject';
import warning from './utils/warning';

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
  if (reducerKeys.length === 0) return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  if (!isPlainObject(inputState)) return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}
function assertReducerShape(reducers) {
	Object.keys(reducers).forEach(key => {
		console.group/*Collapsed*/(`[${Object.keys(reducers).map(reduce => reduce).join(", ")}].forEach(${key} => {...})`);

			var reducer = reducers[key];

			console.group/*Collapsed*/(reducer.name+"( [state] undefined, { [action] type: "+ActionTypes.INIT+"})");
				var initialState = reducer(undefined, { type: ActionTypes.INIT });
				console.log(initialState," --> initialState");
			console.groupEnd();

			if (typeof initialState === 'undefined') throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
			var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');

			console.group/*Collapsed*/(reducer.name+"(undefined, {type:",type,"})");
				let reducerCheck = reducer(undefined, { type });
				console.log(reducerCheck," --> reducerCheck");
			console.groupEnd();

			if (typeof reducerCheck === 'undefined') throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
		console.groupEnd();
	});
}
export default function combineReducers(reducers) {
	console.group/*Collapsed*/("Object.keys( (reducers)",reducers,")");
    var reducerKeys = Object.keys(reducers);
    console.log(reducerKeys," --> reducerKeys");
	console.groupEnd();
	var finalReducers = {};
	for (var i = 0; i < reducerKeys.length; i++) {
		console.group/*Collapsed*/("for (var i = 0;",i,"<",reducerKeys.length+";",i+")");
      var key = reducerKeys[i];
      if (process.env.NODE_ENV !== 'production') if (typeof reducers[key] === 'undefined') warning('No reducer provided for key "' + key + '"');
      if (typeof reducers[key] === 'function') {
        console.group/*Collapsed*/("if(typeof (reducers[key]) "+reducers[key].name+" === 'function')");
          finalReducers[key] = reducers[key];
          console.log(reducers," --> reducers");
          console.log(finalReducers," --> finalReducers"); // transfering the reducers object to the finalReducers object. Reducers object was passed in; finalReducers is a created empty object.
          console.log(finalReducers[key].name+" --> finalReducers["+key+"]");
        console.groupEnd();
      }
		console.groupEnd();
	}
	console.group/*Collapsed*/("Object.keys( (finalReducers)",finalReducers,")");
    var finalReducerKeys = Object.keys(finalReducers);
    console.log(finalReducerKeys," --> finalReducerKeys"); // compare finalReducerKeys with reducerKeys. It is the same; not clear what situation would make this different...
	console.groupEnd();
	var unexpectedKeyCache = {};
	var shapeAssertionError = void 0;
	try {
		console.group/*Collapsed*/("assertReducerShape( (finalReducers)",finalReducers,")");
		  assertReducerShape(finalReducers);
		console.groupEnd();
	} catch (e) {
		shapeAssertionError = e;
	}
  return function combination(...args) {

		/*
		let [{colors, sort}, type] = args;
		let stateAndActionArray = [];
		stateAndActionArray["state"] = [colors, sort];
		stateAndActionArray["action"] = type;
		console.log(stateAndActionArray," --> stateAndActionArray");

		let stateAndActionObject = {};
		stateAndActionObject["state"] = stateAndActionArray["state"];
		stateAndActionObject["action"] = stateAndActionArray["action"];
		console.log(stateAndActionObject," --> stateAndActionObject");
		*/
		
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

		console.log(state," --> state (compare with hasChangedRef)");
		console.log(action," --> action");

    if (shapeAssertionError) throw shapeAssertionError;
    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) warning(warningMessage);
    }
    var hasChanged = false;
    var nextState = {};
		for (var _i = 0; _i < finalReducerKeys.length; _i++) {

			console.log("\n");

      console.groupCollapsed("for (var _i = 0;",_i,"< (finalReducerKeys.length)",finalReducerKeys.length+";",_i+")");
        var _key = finalReducerKeys[_i];
        var reducer = finalReducers[_key];
        var previousStateForKey = state[_key];

        console.log(_key+" --> _key");
        console.log(reducer.name+" --> reducer");
				console.log(previousStateForKey," --> previousStateForKey");
				
				console.log("%cCalling reducer","color:red;font-size: 16px");
				console.group/*Collapsed*/(reducer.name+"( (previousStateForKey)",previousStateForKey,", (action)",action,")");
					var nextStateForKey = reducer(previousStateForKey, action);
					console.log(nextStateForKey," --> nextStateForKey");
				console.groupEnd();
				if (typeof nextStateForKey === 'undefined') {
					debugger;
					var errorMessage = getUndefinedStateErrorMessage(_key, action);
					throw new Error(errorMessage);
				}
				nextState[_key] = nextStateForKey;
				try {
					(previousStateForKey || nextStateForKey);
					console.group/*Collapsed*/("(nextStateForKey)",...nextStateForKey,"!== (previousStateForKey)",...previousStateForKey,")");	 //If we were to change the default branch to merge in a new key/value on the state object (see reducers.js commented out stuff for example denoted by ***), this would be true...
				} catch(e) {
					console.group/*Collapsed*/("(nextStateForKey)",nextStateForKey,"!== (previousStateForKey)",previousStateForKey,")");
				}
					let nextStateAndPreviousState = nextStateForKey !== previousStateForKey;
					console.log((nextStateAndPreviousState)+" --> nextStateAndPreviousState");
				console.groupEnd();
				hasChanged = hasChanged || nextStateAndPreviousState;
				console.log(hasChanged+" --> hasChanged");
			console.groupEnd();
		}

		console.log("\n");

		if(hasChanged) console.group/*Collapsed*/("nextState [has changed]");
		else console.group/*Collapsed*/("state [has not changed]");
			let hasChangedRef = hasChanged ? nextState : state;
			console.log(hasChangedRef," --> hasChangedRef (compare with state)");
			console.log("upshot --> we will return a new state unless *none* of the reducers have changed their state...");
			//console.log("Good breakthrough: so the reason router is different on the initialization is because we don't have any default state for it. If I add one (which I have done), nothing changes. Of course, this is merely academic, but it helps understand the process...");
		console.groupEnd();
		return hasChangedRef
  };
}