'use strict';

exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
	return function createThunkMiddlewareReturn(_ref) {
		var dispatch = _ref.dispatch;
		var getState = _ref.getState;
		console.dir(dispatch);
		console.dir(getState);
		console.log("%cOh wow, this is a good get...so the reason we have these two is so we can access the getState property on the middlewareAPI object from applyMiddleware...","color:green;font-weight:bolder");
		console.log("%cOkay, so redux-thunk holds a reference to the original dispatch function...","color:green;font-weight:bolder");
		return function nextThunk(next) {
			//console.log(next);debugger;
			return function actionThunk(action) {

				console.log("\n");
				
				if (typeof action === 'function') {
					console.group/*Collapsed*/("%cif(typeof "+action.name+" === 'function')","color:green;font-weight:bolder");

						console.log("\n");

						console.group/*Collapsed*/("(action) "+action.name+"( (dispatch) "+dispatch.name+", (getState) ",getState(),", (extraArgument) 'redux-thunk extra argument sanity check')");
							let actionRef = action(dispatch, getState, extraArgument = "redux-thunk extra argument sanity check");
							console.log(actionRef," --> actionRef (return)");
						console.groupEnd();

					console.groupEnd();
					return actionRef;
				}
				else {
					//console.log("\nAsync\n\n");
					console.log("action will not render as an object due to console coloring and such...");
					console.group/*Collapsed*/("%celse(typeof "+action+" !== 'function')","color:purple;font-weight:bolder");

						console.log("\n");

						console.group/*Collapsed*/(next.name+"( (action)",action,")");
							let nextActionThunkFinalReturn = next(action);
							console.log(nextActionThunkFinalReturn, " --> nextActionThunkFinalReturn (return)");
						console.groupEnd();
						
					console.groupEnd();
					return nextActionThunkFinalReturn;
				}
			};
		};
	};
}

//console.groupCollapsed("createThunkMiddleware()");
	var thunk = createThunkMiddleware();
	//console.log(thunk.name+" --> thunk (return)");
//console.groupEnd();

thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;