'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

var _createStore = require('./createStore');
var _isPlainObject = require('lodash/isPlainObject');
var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
var _warning = require('./utils/warning');
var _warning2 = _interopRequireDefault(_warning);


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  console.log(reducerKeys," --> reducerKeys");
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
  if (reducerKeys.length === 0) return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  if (!(0, _isPlainObject2['default'])(inputState)) return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  if(Object.keys(inputState).length > 0) {
		console.group/*Collapsed*/(Object.keys(inputState), ".filter(function(key) {...})");
		var unexpectedKeys = Object.keys(inputState).filter(function (key) {
			console.group/*Collapsed*/(Object.keys(inputState), ".filter(function (" + key + ") {...})");
			console.group/*Collapsed*/(reducers, ".hasOwnProperty(" + key + ")");
			let reducersHasOwnProp = reducers.hasOwnProperty(key);
			console.log(reducersHasOwnProp + " --> reducersHasOwnProp");
			console.log(unexpectedKeyCache[key] + " --> unexpectedKeyCache[" + key + "]")
			console.groupEnd();
			console.groupEnd();
			return !reducersHasOwnProp && (console.log("never get here..."), !unexpectedKeyCache[key]);
		});
		console.log(unexpectedKeys, " --> unexpectedKeys");
		console.groupEnd();
		unexpectedKeys.forEach(function (key) {
			debugger;
			console.groupCollapsed(unexpectedKeys, ".forEach(function (" + key + ") {...})");
				unexpectedKeyCache[key] = true;
				console.log(unexpectedKeyCache[key], " --> unexpectedKeyCache[" + key + "]");
			console.groupEnd();
		});
		if (unexpectedKeys.length > 0) return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
		else {
			console.group/*Collapsed*/("else(" + unexpectedKeys.length + " = 0)");
				console.warn("No unexpected keys, i.e. the keys match the reducer keys (as opposed to passing {bear: 'cute'} in lien of currentState from createStore.js...");
			console.groupEnd();
		}
	}
	else console.log("input state has no keys...");
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {

		console.log("\n");

    console.group/*Collapsed*/(Object.keys(reducers),".forEach(function ("+key+") {...})");
      var reducer = reducers[key];

			console.log("\n");

      console.group/*Collapsed*/(reducer.name+"(undefined, {type:",ActionTypes.INIT+"})");
        var initialState = reducer(undefined, { type: ActionTypes.INIT });
        console.log("\n");
        console.log(initialState," --> initialState");
      console.groupEnd();

      if (typeof initialState === 'undefined') {
      	//console.group/*Collapsed*/("if(typeof",initialState,"=== 'undefined')");
      		console.log("throw error...");
				//console.groupEnd();
      	throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
			}
			else {
				//console.group/*Collapsed*/("else(typeof",initialState,"!== 'undefined')");
					//console.log(initialState," --> initialState");
				//console.groupEnd();
			}

      var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');

			console.log("\n");

      console.group/*Collapsed*/(reducer.name+"(undefined, {type:",type,"})");
        let reducerCheck = reducer(undefined, { type: type });

        console.log("\n");

				// this determines whether the state is an object or a type string like "READY" or "ONLINE"...
        //if(Array.from([...reducerCheck])[0].hasOwnProperty("date")) console.log([...reducerCheck]," --> [...reducerCheck]");
        //else console.log(reducerCheck+" --> reducerCheck")

      console.groupEnd();

      if (typeof reducerCheck === 'undefined') {
				//console.group/*Collapsed*/("if(typeof",initialState,"=== 'undefined')");
					console.log("throw error...");
				//console.groupEnd();
      	throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
			}
			else {
        //console.group/*Collapsed*/("else(typeof",reducerCheck,"!== 'undefined')");
          //console.log("reducerCheck is not undefined");
        //console.groupEnd();
      }

    console.groupEnd();
  });
}
function combineReducers(reducers) {

	console.log("\n");

	console.groupCollapsed("Object.keys(",reducers,")");
    var reducerKeys = Object.keys(reducers);
    console.log(reducerKeys," --> reducerKeys");
	console.groupEnd();
	var finalReducers = {};
	for (var i = 0; i < reducerKeys.length; i++) {

		console.log("\n");

		console.groupCollapsed("for (var i = 0;",i,"<",reducerKeys.length+";",i+")");
      var key = reducerKeys[i];
      if (process.env.NODE_ENV !== 'production') if (typeof reducers[key] === 'undefined') warning('No reducer provided for key "' + key + '"');
      if (typeof reducers[key] === 'function') {
        console.group/*Collapsed*/("if(typeof "+reducers[key].name+" === 'function')");
          finalReducers[key] = reducers[key];
          console.log(finalReducers[key].name+" --> finalReducers["+key+"]");
        console.groupEnd();
      }
		console.groupEnd();
	}

	console.log("\n");

	console.groupCollapsed("Object.keys(",finalReducers,")");
    var finalReducerKeys = Object.keys(finalReducers);
    console.log(finalReducerKeys," --> finalReducerKeys");
	console.groupEnd();
	var unexpectedKeyCache = {};
	var shapeAssertionError = void 0;
	try {
	  console.log("\n");
		console.group/*Collapsed*/("assertReducerShape(",finalReducers,")");
		  assertReducerShape(finalReducers);
		console.groupEnd();
	} catch (e) {
		shapeAssertionError = e;
	}
	return function combination() {

		console.log("\n");

		console.group/*Collapsed*/("state and action logic");
			console.warn("state is asking if the state argument exists; if so, is it undefined; if so, return empty object; if not, return the state arugment");
			var state = (  console.log((arguments.length > 0)+" --> arguments.length > 0"),arguments.length > 0) && arguments[0] !== undefined ? (console.log(arguments[0]," --> arguments[0] [arguments[0] !== undefined]"),arguments[0]) : (console.log({}," --> {} [arguments[0] === undefined]"),{});
			var action = arguments[1];
			console.log(state," --> state");
			console.log(action," --> action");
		console.groupEnd();

		if (shapeAssertionError) throw shapeAssertionError;
		if (process.env.NODE_ENV !== 'production') {
		  console.log("\n");
			console.group/*Collapsed*/("getUnexpectedStateShapeWarningMessage( (state) "+state.name+", (finalReducers)",finalReducers,", (action)",action,", (unexpectedKeyCache)",unexpectedKeyCache,")");
        var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
        console.log(warningMessage+" --> warningMessage");
			console.groupEnd();
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
				console.log("(previousStateForKey)",previousStateForKey," = (state[_key])",state,"["+_key+"] --> "+state[_key]);

				console.log("\n\n\n\n");

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
				console.log(nextState[_key]," --> nextState["+_key+"]");
        console.log(nextState," --> nextState");
				console.group/*Collapsed*/("(nextStateForKey)",nextStateForKey,"!== (previousStateForKey)",previousStateForKey,")");
					let nextStateAndPreviousState = nextStateForKey !== previousStateForKey;
					console.log((nextStateAndPreviousState)+" --> nextStateAndPreviousState");
				console.groupEnd();
				console.log(hasChanged," --> hasChanged");
				hasChanged = hasChanged || nextStateAndPreviousState
        console.log((nextStateForKey !== previousStateForKey)+" --> nextStateForKey !== previousStateForKey");
        console.log("(hasChanged) "+hasChanged+" = (hasChanged) "+hasChanged+" || (nextStateForKey)",nextStateForKey,"!== (previousStateForKey) "+previousStateForKey+")");
			console.groupEnd();
		}
		let hasChangedRef = hasChanged ? nextState : (console.log("yes"),state);
		console.log(hasChangedRef," --> hasChangedRef");
		return hasChangedRef
	};
}

